import { Schema } from "mongoose";

export interface Alert extends Document {
    userId: string;
    alertName: string;
    symbol: string;
    alertType: string
    condition: string
    threshold: string;
    frequency: string;
}

const AlertSchema = new Schema<Alert>({
    alertName: { type: String, required: true, trim: true },
    symbol: { type: String, required: true, uppercase: true, trim: true },
    alertType: { type: String, required: true, trim: true },
    condition: { type: String, required: true, trim: true },
    threshold: { type: String, required: true, trim: true },
    frequency: { type: String, required: true, trim: true },
}, {
    timestamps: false,
})