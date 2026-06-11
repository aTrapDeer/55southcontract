import { NextResponse } from "next/server";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

export const runtime = "nodejs";

interface ContactFormData {
  name: string;
  email?: string;
  phone: string;
  service?: string;
  message?: string;
}

const sesClient = new SESv2Client({
  region: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION,
});

const toEmail = process.env.CONTACT_FORM_TO_EMAIL;
const fromEmail =
  process.env.CONTACT_FORM_FROM_EMAIL || "website@55southcontractors.com";

function clean(value?: string) {
  return value?.trim().slice(0, 2000) || "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildTextEmail(data: ContactFormData) {
  return [
    "New inquiry from 55southcontractors.com",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "Not provided"}`,
    `Service: ${data.service || "Not specified"}`,
    "",
    "Project details:",
    data.message || "No message provided",
  ].join("\n");
}

function buildHtmlEmail(data: ContactFormData) {
  const rows = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "Not provided"],
    ["Service", data.service || "Not specified"],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.5;">
      <h1 style="font-size: 20px; margin: 0 0 16px;">New inquiry from 55southcontractors.com</h1>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: 700; width: 130px;">${escapeHtml(label)}</td>
                  <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(value)}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
      <h2 style="font-size: 16px; margin: 20px 0 8px;">Project details</h2>
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(data.message || "No message provided")}</p>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    if (!toEmail) {
      console.error("CONTACT_FORM_TO_EMAIL is not configured");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const body: ContactFormData = await request.json();
    const data: ContactFormData = {
      name: clean(body.name),
      email: clean(body.email),
      phone: clean(body.phone),
      service: clean(body.service),
      message: clean(body.message),
    };

    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    await sesClient.send(
      new SendEmailCommand({
        FromEmailAddress: fromEmail,
        Destination: {
          ToAddresses: [toEmail],
        },
        ReplyToAddresses: data.email ? [data.email] : undefined,
        Content: {
          Simple: {
            Subject: {
              Data: `New 55 South inquiry from ${data.name}`,
              Charset: "UTF-8",
            },
            Body: {
              Text: {
                Data: buildTextEmail(data),
                Charset: "UTF-8",
              },
              Html: {
                Data: buildHtmlEmail(data),
                Charset: "UTF-8",
              },
            },
          },
        },
      })
    );

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
