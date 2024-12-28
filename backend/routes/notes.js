const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');// note collecion chahiye jo new schema bante time banya tah 
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const all_note = await Note.find({ user: req.user.id });
        //   if(!notes) return res.json("No note present yet ,Please add note")// return is mandatory
        console.log("total note count  is :",all_note.length)
          res.json(all_note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], 
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(),"error":"filed constrait not satisfy" });
            }
            // Create a new Note
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()
            const all_note = await Note.find({ user: req.user.id });
            // console.log("total note count  is :",all_note.length)
            // console.log(all_note)
        
            res.json(all_note)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
// update karne k liye put requset ko  used karte hai 
// update karne k liye ham title,tag,description bhejeyge jo req,body se jaeeyga
// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
// {:id = : ke baad v string param se liya ja skta hai isliye : likh dete hai }
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    
    try {
        // Find the note by ID
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not Found");
        }

        // Authorization check - Ensure the note belongs to the logged-in user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Create an object with fields to update (only if they exist)
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        console.log("New Note Data:", newNote);
        console.log("Note before update:", note);

        // Perform update and return the updated note
        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true, runValidators: true }
        );

        console.log("Note after update:", note);
        res.json({ note });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
       
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router