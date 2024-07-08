import React from 'react'

export const NoteForm = (props) => {
    const { note = { title: '', text: '' } } = props

    return <form>
        <div className="form-group">
            <label>Title:</label>
            <input
                className="form-control"
                data-testid="input-title"
                name="title"
            />
        </div>
        <div className="form-group">
            <label>Note:</label>
            <textarea
                className="form-control"
                data-testid="input-text"
                name="text"
            />
        </div>
        <div className="form-group">
            <input
                type="button"
                data-testid="cancel-note"
                className="btn btn-default pull-right"
                value="Cancel"
            />
            <input
                type="submit"
                data-testid="save-note"
                className="btn btn-default pull-right"
                value="Save"
            />
        </div>
    </form>
}
