import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import { NoteForm } from '../components/NoteForm'
const notes = require('./notes.json')

describe('NoteForm Component', () => {

    it('should display title and note form input fields after note is selected', () => {
        // given
        const note = notes[1]
        const { getByTestId } = render(<NoteForm note={note} />)

        // then
        expect(getByTestId('input-title')).toHaveProperty('value', note.title)
        expect(getByTestId('input-text')).toHaveProperty('value', note.text)
    })

    it('should call onChange with changed form values', () => {
        // given
        const onChange = jest.fn()
        const note = { title: '', text: '' }
        const { getByTestId } = render(<NoteForm note={note} onChange={onChange} />)

        // when
        const titleInput = getByTestId('input-title')
        fireEvent.change(titleInput, { target: { name: "title", value: "test" } })
        const noteInput = getByTestId('input-text')
        fireEvent.change(noteInput, { target: { name: "text", value: "test" } })

        // then
        expect(onChange).toHaveBeenCalledWith({ text: '', title: 'test' })
        expect(onChange).toHaveBeenCalledWith({ text: 'test', title: '' })
    })

    it('should call onSubmit with changed note after the form is submitted', () => {
        // given
        const onSubmit = jest.fn()
        const note = { title: '', text: '' }
        const { getByTestId } = render(<NoteForm note={note} onSubmit={onSubmit} />)

        // when
        fireEvent.click(getByTestId('save-note'))

        // then
        expect(onSubmit).toHaveBeenCalledWith(note)
    })
})
