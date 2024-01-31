import { getGoogleAuth, getGoogleSheets } from "@/libs/googleConnect";
import { NextApiRequest, NextApiResponse } from "next";

type SheetForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const body = req.body as SheetForm;

  try {
    const auth = await getGoogleAuth();
    const sheets = await getGoogleSheets(auth);

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: "1dQWj1PeyYgyBrnC-Fw2U37N5sPJlWC8hr4LfFvRsCu0",
      range: "A1:D1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[body.name, body.email, body.phone, body.message]],
      },
    });

    return res.status(201).json({
      data: response.data,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(error.code).send({ message: error.message });
  }
}
