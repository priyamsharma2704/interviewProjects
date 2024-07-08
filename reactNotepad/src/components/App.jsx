import React, { useState } from 'react'

import { NotesList } from './NotesList'
import { NoteForm } from './NoteForm'

export const App = (props) => {
    const { service } = props

    const [notes, setNotes] = useState([])
    const [selected, setSelected] = useState(null)

    // (!) Get notes from service

    // Select new empty note
    function newNote(){

    }

    // Set note as selected
    function onSelect(note){

    }

    // Save note to service
    function onSubmit(note){

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
                    <NotesList notes={[]} />
                </div>
                <div className="col-md-8">
                    <NoteForm />
                    <div><button id="new-note">New Note</button></div>
                </div>
            </div>
        </div>
    )
}
