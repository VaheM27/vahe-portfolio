import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL   = "vmnatsakanyan27@gmail.com";
const FROM_EMAIL = "Portfolio <onboarding@resend.dev>"; // change after verifying your domain

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Basic server-side guard
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to:   TO_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="margin:0 0 4px;color:#059669">New message from your portfolio</h2>
          <p style="margin:0 0 24px;color:#6b7280;font-size:13px">Received via contact form</p>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:80px">From</td>
              <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:600">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #e5e7eb">
                <a href="mailto:${email}" style="color:#059669">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Subject</td>
              <td style="padding:10px 0;border-bottom:1px solid #e5e7eb">${subject}</td>
            </tr>
          </table>
          <div style="margin-top:24px">
            <p style="color:#6b7280;font-size:13px;margin:0 0 8px">Message</p>
            <div style="background:#f9fafb;border-radius:8px;padding:16px;line-height:1.7;white-space:pre-wrap">${message}</div>
          </div>
          <p style="margin-top:24px;font-size:12px;color:#9ca3af">
            Hit reply to respond directly to ${name}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }
}
