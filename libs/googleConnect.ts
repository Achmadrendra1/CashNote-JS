import { google, sheets_v4 } from "googleapis";

export async function getGoogleAuth() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/spreadsheets"],
  });

  return auth;
}

export async function getGoogleSheets(auth: any): Promise<sheets_v4.Sheets> {
  return google.sheets({ auth, version: "v4" });
}
