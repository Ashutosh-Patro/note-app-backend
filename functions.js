import notesSchema from "./schema.js";

export const createNote = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        let createNote = await notesSchema.create({
            title,
            content,
        });

        if (createNote) {
            res.status(200).json({
                success: true,
                message: "Notes created successfully!",
                data: null
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Note not created",
                data: null
            })
        }
    } catch (error) {
        // next(new HttpError('', 404, data));
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};
// class HttpError extends Error {

//     constructor(message, status, data){
//         super(message);
//         this.status = status;
//         this.data = data;
//     }
// }
// const err = new HttpError('', 404, null);

export const getNotes = async (req, res) => {
    try {
        const notes = await notesSchema.find({});
        if (notes) {
            res.status(200).json({
                success: true,
                message: "Notes fetched successfully!",
                data: notes,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Data not fetched",
                data: null
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { id, title, content } = req.body;
        const note = await notesSchema.findById(id);
        if (note) {
            note.title = title || note.title;
            note.content = content || note.content;

            await note.save();
            res.status(200).json({
                success: true,
                message: "Note Updated successfully!",
                data: null
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Note failed to update",
                data: null
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.body;
        const deleted = await notesSchema.findByIdAndDelete(id)
        if (deleted) {
            res.status(200).json({
                success: true,
                message: "Note Deleted successfully!",
                data: null
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Note was not deleted",
                data: null
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};