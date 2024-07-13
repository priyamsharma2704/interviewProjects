import React from 'react'

export const NotesList = (props) => {
    const { notes, onSelectEvent } = props;

    function handleNoteOnClick(note)
    {
        onSelectEvent(note);
    }

    return <div className="list-group">
            <ul>
                {notes.map((note,index) => (<li key={index} onClick={()=>handleNoteOnClick(note)}>{note.title}</li>))}
            </ul>
        </div>
}
