import React, { useState } from 'react'

import { NotesList } from './NotesList'
import { NoteForm } from './NoteForm'

export const App = (props) => {
    const { service } = props

    const [notes, setNotes] = useState([])
    const [selected, setSelected] = useState(null)

    // (!) Get notes from service
    let notesData = service.getNotes().then(resp => {
        setNotes(resp);
    });

    // Select new empty note
    function newNote(){

    }

    // Set note as selected
    function onSelect(note){
        setSelected(note);
    }

    // Save note to service
    function onSubmit(note){
        service.saveNote(note).then((resp)=>setNotes(resp));
    }

    // Unselect note
    function onCancel(){

    }

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
                    <NoteForm onSubmitEvent={onSubmit} note={selected}/>
                    <div><button id="new-note">New Note</button></div>
                </div>
            </div>
        </div>
    )
}
