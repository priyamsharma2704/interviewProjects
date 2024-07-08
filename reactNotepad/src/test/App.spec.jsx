import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import { createMockService, flushPromises } from './utils';
import { App } from '../components/App'

describe('App Component', () => {

    const notes = [{
        id: '4567', title: 'take the exam', text: 'take devskiller assessment'
    }]

    it('should call notesService.getNotes() when rendered', async () => {
        // given
        const mockService = createMockService(notes)
        render(<App service={mockService} />)
        await flushPromises() // HTTP data exchange

        // then
        expect(mockService.getNotes).toHaveBeenCalled()
    })

    it('should call notesService.saveNote() method after the form is submitted', async () => {
        // given
        const mockService = createMockService(notes)
        const selectedNote = mockService.notes[0]
        const { findByText, getByTestId } = render(<App service={mockService} />)
        await flushPromises() // HTTP data exchange

        // when
        const noteEl = await findByText("take the exam")
        fireEvent.click(noteEl)
        fireEvent.click(getByTestId('save-note'))
        await flushPromises() // HTTP data exchange

        // then
        expect(mockService.saveNote).toHaveBeenCalledWith(selectedNote)
    })

    it('should fetch notes from notesService and update notes list after the form is submitted', async () => {
        // given
        const mockService = createMockService(notes)
        const originalLength = mockService.notes.length
        const { getAllByTestId, getByTestId } = render(<App service={mockService} />)
        await flushPromises() // HTTP data exchange

        // then
        expect(getAllByTestId('note-item')).toHaveLength(originalLength)

        // when selecting an existing note, submitting the form
        fireEvent.click(getAllByTestId('note-item')[0])
        fireEvent.change(getByTestId('input-title'), { target: { name: "title", value: "urgent task" }})
        fireEvent.change(getByTestId('input-text'), { target: { name: "text", value: "need to do it very fast" }})
        fireEvent.click(getByTestId('save-note'))
        await flushPromises() // HTTP data exchange

        // then
        expect(getAllByTestId('note-item')).toHaveLength(originalLength)
    })

    it('should add a new note to the list after the note is saved', async () => {
        // given
        const mockService = createMockService(notes)
        const { container, getAllByTestId, getByTestId } = render(<App service={mockService} />)
        await flushPromises() // HTTP data exchange

        // then
        expect(mockService.getNotes).toHaveBeenCalledTimes(1);

        // when
        fireEvent.click(getByTestId('new-note'))
        fireEvent.change(getByTestId('input-title'), { target: { name: "title", value: "buy milk" }})
        fireEvent.change(getByTestId('input-text'), { target: { name: "text", value: "need some fresh milk" }})
        fireEvent.click(getByTestId('save-note'))
        await flushPromises() // HTTP data exchange

        // then
        expect(mockService.saveNote).toHaveBeenCalledTimes(1);
        expect(mockService.getNotes).toHaveBeenCalledTimes(2);
        expect(getAllByTestId('note-item')).toHaveLength(mockService.notes.length)
        expect(container).toHaveTextContent("buy milk")
        expect(container).toHaveTextContent("need some fresh milk")
    })

    it('when existing note is saved it should be updated on list', async () => {
        // given
        const mockService = createMockService(notes)
        const { getAllByTestId, getByTestId } = render(<App service={mockService} />)
        await flushPromises() // HTTP data exchange

        // then
        expect(mockService.getNotes).toHaveBeenCalledTimes(1);

        // when changing note title
        fireEvent.click(getAllByTestId('note-item')[0])
        fireEvent.change(getByTestId('input-title'), { target: { name: "title", value: "changed task" }})
        fireEvent.click(getByTestId('save-note'))
        await flushPromises() // HTTP data exchange

        expect(mockService.saveNote).toHaveBeenCalledTimes(1);
        expect(mockService.getNotes).toHaveBeenCalledTimes(2);

        // then
        const item = getAllByTestId('note-item')[0]
        expect(item).toHaveTextContent("changed task")
    })
})
