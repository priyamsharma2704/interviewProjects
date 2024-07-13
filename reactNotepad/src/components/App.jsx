import React, { useState, useEffect } from 'react'

import { NotesList } from './NotesList'
import { NoteForm } from './NoteForm'

export const App = (props) => {
    const { service } = props

    const [notes, setNotes] = useState([])
    const [selected, setSelected] = useState(null)
    const [originalSelectedNote, setOriginalSelectedNote] = useState(null);

    // (!) Get notes from service
    let notesData = service.getNotes().then(resp => {
        setNotes(resp);
    });

    // Select new empty note
    function newNote(){
        setSelected({title: " ", text: " "});
    }

    // Set note as selected
    function onSelect(note){
        setOriginalSelectedNote(note);
        setSelected(note);
    }

    // Save note to service
    function onSubmit(note){
        service.saveNote(note).then((resp)=>setNotes(resp));
    }

    // Unselect note
    function onCancel(){
        setSelected(originalSelectedNote);
    }

    const handleNoteOnChange = (note) =>
    {
        setSelected(note);
    }

    // useEffect(()=>{
    //     console.log(notes);
    // },[notes]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>React notes</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <NotesList onSelectEvent={onSelect} notes={notes} />
                </div>
                <div className="col-md-8">
                    <NoteForm onSubmit={onSubmit} note={selected} onChange={handleNoteOnChange} onCancel={onCancel}/>
                    <div><button id="new-note" onClick={newNote}>New Note</button></div>
                </div>
            </div>
        </div>
    )
}
