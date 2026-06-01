import mongoose from "mongoose"
import { title } from "node:process"

//1st step: create a schema
//2nd step: create a model based on it

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } //createdAt,updatedAt,etc
);

const Note = mongoose.model("Note", noteSchema);

export default Note;