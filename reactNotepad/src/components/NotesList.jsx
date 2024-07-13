import React from 'react'

export const NotesList = (props) => {
    const { notes, onSelect } = props;

    function handleNoteOnClick(note)
    {
        onSelect(note);
    }

    return <div className="list-group">
            <ul>
                {notes.map((note,index) => (<li key={index} onClick={()=>handleNoteOnClick(note)}>{note.title}</li>))}
            </ul>
        </div>
}
