import React from 'react'

export const NoteForm = (props) => {
    const { note = { title: ' ', text: ' ' }, onSubmitEvent } = props;

    console.log(note);

    function handleNoteTextInput(e)
    {
        note.text = e.target.value;
    }

    function handleNoteTitleInput(e)
    {
        note.title = e.target.value;
    }

    function handleNoteSubmit(e)
    {
        e.preventDefault();
        onSubmitEvent(note);
    }

    return <form>
        { note && (
            <>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        className="form-control"
                        data-testid="input-title"
                        name="title"
                        value={note.title}
                        onChange={(e)=>handleNoteTitleInput(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Note:</label>
                    <textarea
                        className="form-control"
                        data-testid="input-text"
                        name="text"
                        value={note.text}
                        onChange={(e)=>handleNoteTextInput(e)}
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
                        onClick={(e)=>handleNoteSubmit(e)}
                    />
                </div>
            </>
        )}
    </form>
}
