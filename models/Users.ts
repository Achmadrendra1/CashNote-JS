import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  name: string;
  phone: string;
  email: string
  password: string;
}

const UserSchema = new mongoose.Schema<Users>({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
  }
});

export default mongoose.models.User || mongoose.model<Users>("User", UserSchema);
