import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.enableMocks();
});

describe('Editing flashcard', () => {
  // render app with mocked 1 card
  it('should render App with 1 mocked card initially', async () => {
    fetchMock.mockResponse(
      JSON.stringify([
        { _id: '1', front: 'initial front', back: 'initial back' },
      ])
    );
    render(<App />);
    expect(await screen.findByTestId('cards-list')).not.toBeEmptyDOMElement();
  });

  // find and click edit button
  it('should open the edit card mode when the edit button is clicked', async () => {
    fetchMock.mockResponse(
      JSON.stringify([
        { _id: '1', front: 'initial front', back: 'initial back' },
      ])
    );
    render(<App />);

    expect(await screen.findByTestId('cards-list')).not.toBeEmptyDOMElement();
    expect(screen.getByText('initial front'));

    const editButton = screen.getByTestId('edit-icon');
    fireEvent.click(editButton);

    expect(screen.getByTestId('edit-form'));
  });

  // find input expect value from .side of cart where opened
  // change input value
  // mock patch req with chenged value
  //  find save btn and save card
  // mock get req
  // expect card with new value
});

// It should not be possible to edit a flashcard by clicking Save button when edited value is empty
// It should be possible to edit a flashcard by clicking Save button when edited value is not empty
// It should be possible to exit editing mode by clicking cancel button
