import mongoose from "mongoose";

export interface Category extends mongoose.Document {
  name: string;
}

const CategorySchema = new mongoose.Schema<Category>({
  name: {
    type: String,
    required: [true, "Please provide a name for this category"],
  },
});

export default mongoose.models.Category || mongoose.model<Category>("Category", CategorySchema);
