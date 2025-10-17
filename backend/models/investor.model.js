import { Schema, model } from "mongoose";

const InvestorSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Investor", "Admin"],
        default: "Investor",
        required: true,
    }
}, { timestamps: true, versionKey: false });

export const InvestorModel = model("Investor", InvestorSchema);