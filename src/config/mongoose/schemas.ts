import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  subscription: {
    status: { type: String, required: false, default: "inactive" },
    plan: { type: String, required: false, default: "free" },
    start_date: { type: Date, required: false },
    end_date: { type: Date, required: false },
  },
  utilityImages: [
    {
      url: {
        type: String,
        required: false,
      },
      publicId: {
        type: String,
        required: false,
      },
    },
  ],
  profileType: { type: String, required: false, default: "public" },
  imageUrl: { type: String, required: false },
});

const userProfileSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ownerClerkId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  location: { type: String, required: false },
  links: [
    {
      title: { type: String, required: false },
      href: { type: String, required: false },
    },
  ],
  skills: [
    {
      label: { type: String, required: false },
      values: { type: String, required: false },
    },
  ],
  experiences: [
    {
      title: { type: String, required: false },
      company: { type: String, required: false },
      location: { type: String, required: false },
      startDate: { type: String, required: false },
      endDate: { type: String, required: false },
      description: { type: String, required: false },
    },
  ],
  projects: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      imageUrl: { type: String, required: false },
      technologies: { type: String, required: false },
      GitHub: { type: String, required: false },
      Demo: { type: String, required: false },
    },
  ],
  education: [
    {
      degree: { type: String, required: false },
      institution: { type: String, required: false },
      location: { type: String, required: false },
      startDate: { type: String, required: false },
      endDate: { type: String, required: false },
      marks: { type: String, required: false },
    },
  ],
  achievements_Certification: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
    },
  ],
});

let User: any;
try {
  User = mongoose.model("User");
} catch {
  User = mongoose.model("User", userSchema);
}

let UserProfile: any;
try {
  UserProfile = mongoose.model("UserProfile");
} catch {
  UserProfile = mongoose.model("UserProfile", userProfileSchema);
}

export { User, UserProfile };
