import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate lengths
    if (name.length > 100 || email.length > 255 || message.length > 2000) {
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum length" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      // Fallback: log the message (useful during development)
      console.log("Contact form submission:", { name, email, message });
      return new Response(
        JSON.stringify({ success: true, fallback: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send notification email to owner
    const ownerRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["iimtiiyazhussainsoomro11@gmail.com"],
        subject: `Portfolio Contact from ${name}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Imtiyaz<span style="color: #2dd4bf;">.</span></h1>
              <p style="margin: 8px 0 0; font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px;">New Contact Message</p>
            </div>
            <div style="padding: 36px 40px; background-color: #ffffff;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 16px; background-color: #f8fafc; border-radius: 8px 8px 0 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">From</span><br/>
                    <span style="font-size: 15px; color: #0f172a; font-weight: 600;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: #f8fafc; border-radius: 0 0 8px 8px;">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">Email</span><br/>
                    <a href="mailto:${email}" style="font-size: 15px; color: #2dd4bf; text-decoration: none; font-weight: 500;">${email}</a>
                  </td>
                </tr>
              </table>
              <div style="margin-bottom: 24px;">
                <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600; margin: 0 0 12px;">Message</p>
                <div style="padding: 20px; background-color: #f8fafc; border-left: 3px solid #2dd4bf; border-radius: 0 8px 8px 0;">
                  <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #334155; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              <div style="text-align: center; margin-top: 32px;">
                <a href="mailto:${email}" style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%); color: #0f172a; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 8px; letter-spacing: 0.5px;">Reply to ${name}</a>
              </div>
            </div>
            <div style="padding: 20px 40px; background-color: #f1f5f9; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">Sent via your portfolio contact form &bull; imtiyaz.lovable.app</p>
            </div>
          </div>
        `,
        reply_to: email,
      }),
    });

    if (!ownerRes.ok) {
      const errorData = await ownerRes.text();
      console.error("Resend API error (owner):", errorData);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send auto-reply to the sender
    const autoReplyRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Imtiyaz Soomro <onboarding@resend.dev>",
        to: [email],
        subject: "Thank you for your message — Imtiyaz Soomro",
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Imtiyaz<span style="color: #2dd4bf;">.</span></h1>
            </div>

            <!-- Body -->
            <div style="padding: 36px 40px; background-color: #ffffff;">
              <h2 style="margin: 0 0 16px; font-size: 22px; font-weight: 700; color: #0f172a;">Dear ${name},</h2>
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #334155;">
                Thank you for contacting me through my portfolio. I have received your message and appreciate you taking the time to reach out.
              </p>

              <!-- Response time notice -->
              <div style="margin: 24px 0; padding: 16px 20px; background-color: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #0f766e;">
                  <strong style="color: #0f172a;">Expected response time:</strong> I typically respond to inquiries within <strong>24&ndash;48 hours</strong> on business days.
                </p>
              </div>

              <!-- Their message recap -->
              <div style="margin: 24px 0; padding: 20px; background-color: #f8fafc; border-left: 3px solid #2dd4bf; border-radius: 0 8px 8px 0;">
                <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600; margin: 0 0 8px;">Your Message</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #475569; white-space: pre-wrap;">${message}</p>
              </div>

              <p style="margin: 0 0 8px; font-size: 15px; line-height: 1.7; color: #334155;">
                In the meantime, you are welcome to explore additional work and connect with me through the links below.
              </p>

              <!-- CTA Buttons -->
              <div style="text-align: center; margin-top: 28px;">
                <a href="https://imtiyaz.lovable.app/portfolio" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%); color: #0f172a; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 8px; letter-spacing: 0.5px; margin: 0 6px 8px;">View Portfolio</a>
                <a href="https://www.linkedin.com/in/imtiyazsoomro/" style="display: inline-block; padding: 12px 28px; background-color: #0f172a; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; letter-spacing: 0.5px; margin: 0 6px 8px;">Connect on LinkedIn</a>
              </div>

              <p style="margin: 32px 0 0; font-size: 15px; line-height: 1.7; color: #334155;">
                Best regards,<br/>
                <strong style="color: #0f172a;">Imtiyaz Soomro</strong>
              </p>
            </div>

            <!-- Footer -->
            <div style="padding: 20px 40px; background-color: #f1f5f9; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                This is an automated reply from <a href="https://imtiyaz.lovable.app" style="color: #2dd4bf; text-decoration: none;">imtiyaz.lovable.app</a>
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!autoReplyRes.ok) {
      console.error("Resend API error (auto-reply):", await autoReplyRes.text());
      // Don't fail the whole request if auto-reply fails
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
