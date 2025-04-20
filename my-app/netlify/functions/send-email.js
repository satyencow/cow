const { fetch } = require('undici');  // New import

export async function handler(event, context) {
  if (event.httpMethod === "POST") {
    try {
      const formData = JSON.parse(event.body);
      const { user_name, user_email, phone, topic, message } = formData;

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer re_Zzxu3twM_DG4yGgbREH1aaLpChAJNZt8m`, // Replace with your Resend API Key
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'satyen@cowtheagency.in', // Use your verified email
          to: 'satyen@cowtheagency.in', // Where to receive emails
          subject: `Contact Form Submission from ${user_name}`,
          html: `
            <p><strong>Name:</strong> ${user_name}</p>
            <p><strong>Email:</strong> ${user_email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Topic:</strong> ${topic}</p>
            <p><strong>Message:</strong><br/>${message}</p>
          `,
        }),
      });

      if (res.ok) {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Email sent successfully!" }),
        };
      } else {
        return {
          statusCode: res.status,
          body: JSON.stringify({ error: "Failed to send email" }),
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }
}
