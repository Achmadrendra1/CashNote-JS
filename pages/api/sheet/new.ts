import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/libs/dbConnect";
import Sheets from "@/models/Sheets";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    const { user_id, spreadsheetId } = req.body;

    try {
      const Sheet = await Sheets.findOne({ author: user_id });

      if (Sheet) {
        return res.status(400).json({ message: "Cannot Add More Sheets" });
      }

      const newSheet = new Sheets({
        sheetId: spreadsheetId,
        author: user_id
      });

      await newSheet.save();

      res.status(200).json({ message: "Add New Sheet Success" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
