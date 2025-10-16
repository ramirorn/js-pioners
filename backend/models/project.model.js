import { model, Schema } from "mongoose";

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 100,
        },
        description: {
            type: String,
            required: true,
            minLength: 50,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {   
        timestamps:true,
        versionKey: false
    }
);

export const ProjectModel = model("Project", ProjectSchema)