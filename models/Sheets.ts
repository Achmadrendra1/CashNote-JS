import mongoose from "mongoose";
import { Users } from "./Users";

export interface Sheets extends mongoose.Document {
  sheetId: string;
  author: mongoose.Types.ObjectId | Users;
}

const SheetSchema = new mongoose.Schema<Sheets>({
  sheetId: {
    type: String,
    required: [true, "Please provide your Sheet Id"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.models.Sheets || mongoose.model<Sheets>("Sheet", SheetSchema);
