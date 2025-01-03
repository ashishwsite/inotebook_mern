import React, {useContext, useState} from 'react'
import NoteContext from '../context/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    //addNote is function 

    const [note, setNote] = useState({title: "", description: "", tag: ""})
// to form submission
    const handleClick = (e)=>{
        e.preventDefault();
        //addNote function context me define hai jo UI ke note me data leta hai aur db ke note me add kar raha hai 
        addNote(note.title, note.description, note.tag);
        //UI note ko kali kar raha hai
        setNote({title: "", description: "", tag: ""})
    }

    const onChange = (e)=>{
        // this is syntex to set note using input changinh data
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                </div>
               
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote