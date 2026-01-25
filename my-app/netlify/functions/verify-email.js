import { nanoid } from "nanoid";
import { pendingSubmissions } from "./pendingStore.js";

// Simple rate limiting store
let recentIPs = {};

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const {
      user_name,
      user_email,
      phone,
      topic,
      message,
      turnstileToken,
      hp_field, // honeypot
    } = JSON.parse(event.body);

    const ip =
      event.headers["client-ip"] ||
      event.headers["x-forwarded-for"] ||
      "unknown";

    // 1️⃣ Honeypot check
    if (hp_field) {
      return { statusCode: 400, body: JSON.stringify({ error: "Bot detected" }) };
    }

    // 2️⃣ Rate limiting (5 submissions per 10 min per IP)
    const now = Date.now();
    recentIPs[ip] = recentIPs[ip] || [];
    recentIPs[ip] = recentIPs[ip].filter((ts) => now - ts < 10 * 60 * 1000);
    if (recentIPs[ip].length >= 5) {
      return { statusCode: 429, body: JSON.stringify({ error: "Too many submissions. Try later." }) };
    }
    recentIPs[ip].push(now);

    // 3️⃣ Verify Turnstile token
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      }
    );

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Captcha verification failed" }),
      };
    }

    // 4️⃣ Generate verification token
    const token = nanoid(32);
    pendingSubmissions[token] = {
      user_name,
      user_email,
      phone,
      topic,
      message,
      createdAt: Date.now(),
    };

    // 5️⃣ Send verification email
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "satyen@cowtheagency.in",
        to: user_email,
        subject: "Verify your submission",
        html: `
          <p>Hello ${user_name},</p>
          <p>Click the link below to verify your submission:</p>
          <a href="https://cowtheagency.in/.netlify/functions/verify-email?token=${token}">Verify Submission</a>
          <p>If you didn't submit this, ignore this email.</p>
        `,
      }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Verification email sent!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
