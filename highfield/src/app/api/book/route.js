import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, phone, registration, date } = await req.json();
    if (!name || !phone || !registration || !date) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // Configure transporter (use environment variables in production)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL, // Your Gmail address
        pass: process.env.ADMIN_EMAIL_PASS, // App password or real password
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL, // Send to admin
      subject: "New Booking Received",
      text: `New booking received:\n\nName: ${name}\nPhone: ${phone}\nRegistration: ${registration}\nDate: ${date}`,
    };

    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
