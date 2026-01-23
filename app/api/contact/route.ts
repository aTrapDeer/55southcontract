import { NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Log the submission (in production, you would send an email or save to database)
    console.log("New contact form submission:", {
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email || "Not provided",
      phone: data.phone,
      service: data.service || "Not specified",
      message: data.message || "No message",
    });

    // In production, you could:
    // 1. Send an email using a service like SendGrid, Resend, or Nodemailer
    // 2. Save to a database
    // 3. Send to a CRM like HubSpot or Salesforce
    // 4. Post to a Slack channel
    // 5. Use a form service like Formspree or Netlify Forms

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process form submission" },
      { status: 500 }
    );
  }
}
