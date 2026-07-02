import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const serviceLabels: Record<string, string> = {
  mern: 'MERN Stack Development',
  web: 'Web Development',
  app: 'App Development',
  seo: 'SEO Optimization',
  uiux: 'UI/UX Design',
  other: 'Other',
};

export async function POST(req: Request) {
  try {
    const { name, email, phone, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'NSTECHX Website <onboarding@resend.dev>', // use your own domain once verified
      to: 'nitishdev026@gmail.com',
      replyTo: email,
      subject: `New Project Inquiry — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #3b82f6, #06b6d4); color: white; padding: 24px;">
            <h2 style="margin: 0; font-size: 20px;">🎯 New Project Inquiry</h2>
          </div>
          <div style="padding: 24px; background: #ffffff;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 130px;">Name</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email</td>
                <td style="padding: 8px 0;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone</td>
                <td style="padding: 8px 0;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Service</td>
                <td style="padding: 8px 0;">${serviceLabels[service] || 'Not selected'}</td>
              </tr>
            </table>
            <div style="margin-top: 16px;">
              <p style="font-weight: bold; margin-bottom: 6px; color: #1e293b;">Project Details:</p>
              <p style="background: #f8fafc; padding: 14px; border-radius: 8px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="background: #f1f5f9; padding: 14px 24px; font-size: 12px; color: #64748b;">
            This email was sent from the NSTECHX website contact form. Hit reply to respond directly to the client.
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}