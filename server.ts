import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { ConfidentialClientApplication } from "@azure/msal-node";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET!,
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

async function getAccessToken() {
  const result = await cca.acquireTokenByClientCredential({
    scopes: ["https://outlook.office365.com/.default"],
  });

  return result?.accessToken;
}

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "SMTP API healthy",
  });
});

app.post("/contact", async (req, res) => {
  try {
    const {
      name,
      company,
      email,
      phone,
      subject,
      message,
    } = req.body;

    const accessToken = await getAccessToken();

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        type: "OAuth2",
        user: process.env.SMTP_USER,
        accessToken,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `Website Contact: ${subject}`,
      html: `
        <h2>New Contact Request</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`SMTP API running on port ${PORT}`);
});
