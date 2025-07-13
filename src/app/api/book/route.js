import { Resend } from "resend";
import { rtdb } from "../../../firebase";
import { ref, push, serverTimestamp } from "firebase/database";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, phone, registration, date } = await req.json();
    if (!name || !phone || !registration || !date) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // Save booking to Realtime Database
    try {
      await push(ref(rtdb, "bookings"), {
        name,
        phone,
        registration,
        date: typeof date === "string" ? date : date.toISOString(),
        createdAt: serverTimestamp(),
      });
    } catch (dbError) {
      console.error("Realtime DB error:", dbError);
      // Optionally, return error or continue
    }

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // or your verified sender
      to: process.env.ADMIN_EMAIL, // or any recipient
      subject: "New Booking Received",
      html: `<p>New booking received:</p>
             <ul>
               <li><strong>Name:</strong> ${name}</li>
               <li><strong>Phone:</strong> ${phone}</li>
               <li><strong>Registration:</strong> ${registration}</li>
               <li><strong>Date:</strong> ${date}</li>
             </ul>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
