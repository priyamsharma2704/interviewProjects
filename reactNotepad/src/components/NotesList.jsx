import React from 'react'

export const NotesList = (props) => {
    const { notes, onSelectEvent } = props;

    function handleNoteOnClick(note)
    {
        onSelectEvent(note);
    }

    return <div className="list-group">
            {notes.map((note,index) => (<div key={index} onClick={()=>handleNoteOnClick(note)}>{note.title}</div>))}
        </div>
}
