import mongoose, { ObjectId, Schema } from "mongoose";

interface Alert extends Document {
    user: ObjectId;
    alertName: string;
    symbol: string;
    alertType: string
    condition: string
    threshold: string;
    frequency: string;
}

const AlertSchema = new Schema<Alert>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', required: true, index: true
    },
    alertName: { type: String, required: true, trim: true },
    symbol: { type: String, required: true, uppercase: true, trim: true },
    alertType: { type: String, required: true, trim: true },
    condition: { type: String, required: true, trim: true },
    threshold: { type: String, required: true, trim: true },
    frequency: { type: String, required: true, trim: true },
}, {
    timestamps: false,
})

// won't recompile model when server hot reloads
export const AlertModel =
    mongoose.models.Alert || mongoose.model("Alert", AlertSchema);