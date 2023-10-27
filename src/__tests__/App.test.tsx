import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock'
import { fireEvent, render, screen } from '@testing-library/react';

import App from '../App'

// Before each test, reset and enable fetch mocking
beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.enableMocks();
});

describe('App', () => {
    it('should form not be in the document initially', () => {
        render(<App />)
        fetchMock.mockResponse(JSON.stringify([]));

        expect(screen.queryByRole('input')).not.toBeInTheDocument();
    })

    it('should open form when CTA button is clicked', async () => {
        render(<App />)
        fetchMock.mockResponse(JSON.stringify([]));

        const ctaButton = screen.getByRole('button')
        fireEvent.click(ctaButton)

        const newCardInput = await screen.findByRole('textbox')
        expect(newCardInput).toBeInTheDocument()
    })

    it('should not be possible to add a flashcard when front or back card value is empty', async () => {
        render(<App />)
        fetchMock.mockResponse(JSON.stringify([]));


        const ctaButton = screen.getByRole('button')
        fireEvent.click(ctaButton)

        const newCardInput = await screen.findByRole('textbox')
        fireEvent.change(newCardInput, { target: { value: '' } });

        const nextStepButton = await screen.findByText('Next')
        fireEvent.click(nextStepButton);

        const saveCardButton = await screen.findByText('Save')
        expect(saveCardButton).not.toBeInTheDocument()

    })
})