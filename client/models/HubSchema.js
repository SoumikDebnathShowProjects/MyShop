import mongoose from "mongoose";

const HubSchema = new mongoose.Schema(
  {
    hubName: { type: String, required: true, trim: true },
    hubType: { type: String, enum: ["mother", "normal", "branch"], required: true },
    address: { type: String, required: true },
    parentHubId: { type: mongoose.Schema.Types.ObjectId, ref: "Hub", default: null }, // null for mother hubs
  },
  { timestamps: true }
);

const Hub = mongoose.model("Hub", HubSchema);
export default Hub;
