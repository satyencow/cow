import fetch from "node-fetch";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
});

export async function handler(event) {
  const body = JSON.parse(event.body);
  const ip = event.headers["client-ip"] || event.headers["x-forwarded-for"] || "unknown";
  const token = body.recaptchaToken;
  const honeypot = body.honeypot || "";

  // 1. Block bots: honeypot
  if (honeypot !== "") return { statusCode: 400, body: "Bot detected" };

  // 2. Block bots: reCAPTCHA
  const r = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret: process.env.RECAPTCHA_SECRET, response: token })
  }).then(res => res.json());
  if (!r.success || (r.score !== undefined && r.score < 0.5)) return { statusCode: 400, body: "Captcha failed" };

  // 3. Email validation
  const email = (body.email || "").toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { statusCode: 400, body: "Invalid email" };

  // 4. Rate limit
  const ipKey = `rl:ip:${ip}:${new Date().toISOString().slice(0,10)}`;
  const emailKey = `rl:email:${email}:${new Date().toISOString().slice(0,10)}`;
  const ipCount = await redis.incr(ipKey);
  if (ipCount === 1) await redis.expire(ipKey, 86400);
  const emailCount = await redis.incr(emailKey);
  if (emailCount === 1) await redis.expire(emailKey, 86400);
  if (ipCount > 50 || emailCount > 5) return { statusCode: 429, body: "Rate limit exceeded" };

  // 5. Blocklist (optional)
  const blocklist = ["libero.it", "mailinator.com"];
  if (blocklist.some(domain => email.endsWith("@" + domain))) {
    return { statusCode: 400, body: "Blocked domain" };
  }

  // 6. Send email via Resend
  try {
    const resendRes = await fetch("https://api.resend.com/send", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type":"application/json" },
      body: JSON.stringify({ to: email, from: "no-reply@yourdomain.com", subject: body.subject, html: body.html })
    });
    if (resendRes.status === 429) {
      return { statusCode: 429, body: "Resend daily limit exceeded" };
    }
    return { statusCode: 200, body: "ok" };
  } catch(e) {
    return { statusCode: 500, body: "Server error" };
  }
}