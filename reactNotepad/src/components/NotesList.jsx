import React from 'react'

export const NotesList = (props) => {
    const { notes = [] } = props
    return <div className="list-group">
        <div data-testid="note-item" className="list-group-item active">Active note example</div>
        <div data-testid="note-item" className="list-group-item">Inactive note example</div>
    </div>
}
