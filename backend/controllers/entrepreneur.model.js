import { EntrepreneurModel } from "../models/entrepreneur.model.js";

export const getEntrepreneurs = async (req, res) => {
    try {
        const entrepreneurs = await EntrepreneurModel.find().populate("projects");
        return res.status(200).json({ data: entrepreneurs });
    } catch (error) {
        return res.status(500).json({ msg: "Error del servidor", error: error.message });
    }   
};
