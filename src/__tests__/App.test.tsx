import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.enableMocks();
});

describe('App', () => {
  // render app with mocked 0 cards
  it('should render app component with new card form closed initially', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    render(<App />);

    await screen.findByText('Add your first flashcard');
    expect(screen.queryByTestId('new-card-form')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cards-list')).toBeEmptyDOMElement();
  });

  // render app with 3 cards
  it('should display flashcards in the list properly', async () => {
    fetchMock.mockResponse(
      JSON.stringify([
        { _id: '1', front: 'first front', back: 'first back' },
        { _id: '2', front: 'This is front', back: 'This is back' },
        { _id: '3', front: 'This is third front', back: 'This is third back' },
      ])
    );
    render(<App />);

    const cardElements = await screen.findAllByTestId('card');
    expect(cardElements).toHaveLength(3);
  });
});

// Adding flashcard
describe('Adding flashcard', () => {
  // open form when CTA clicked
  it("should open the new card form when the 'Add Card' button is clicked.", async () => {
    fetchMock.mockResponse(JSON.stringify([]));
    render(<App />);

    const ctaButton = await screen.findByRole('button');
    fireEvent.click(ctaButton);
    expect(screen.getByTestId('new-card-form')).toBeInTheDocument();
  });

  // dont send form whith front input empty
  it('should not be possible to add a flashcard when front card value is empty', async () => {
    fetchMock.mockResponse(JSON.stringify([]));
    render(<App />);

    const ctaButton = await screen.findByRole('button');
    fireEvent.click(ctaButton);

    expect(screen.getByTestId('new-card-form')).toBeInTheDocument();

    const frontInput = screen.getByRole('textbox');
    fireEvent.change(frontInput, { target: { value: '' } });

    expect(screen.getByText('Next')).toBeDisabled();
  });

  // dont send form when back input empty
  it('should not be possible to add a flashcard when back card value is empty', async () => {
    fetchMock.mockResponse(JSON.stringify([]));
    render(<App />);

    const ctaButton = await screen.findByRole('button');
    fireEvent.click(ctaButton);

    expect(screen.getByTestId('new-card-form')).toBeInTheDocument();

    const frontInput = screen.getByRole('textbox');
    fireEvent.change(frontInput, { target: { value: 'This is front' } });

    const nextStepButton = screen.getByText('Next');
    fireEvent.click(nextStepButton);

    const backInput = screen.getByRole('textbox');
    expect(backInput).toBeInTheDocument();

    fireEvent.change(backInput, { target: { value: '' } });
    expect(screen.getByText('Save')).toBeDisabled();
  });

  it('should be possible to add a flashcard when front and back card value is not empty', async () => {
    fetchMock.mockResponse(
      JSON.stringify([{ _id: '1', front: 'first front', back: 'first back' }])
    );
    render(<App />);

    const ctaButton = await screen.findByRole('button');
    fireEvent.click(ctaButton);

    expect(screen.getByTestId('new-card-form')).toBeInTheDocument();

    const frontInput = screen.getByRole('textbox');
    fireEvent.change(frontInput, { target: { value: 'This is front' } });

    const nextStepButton = screen.getByText('Next');
    fireEvent.click(nextStepButton);

    const backInput = await screen.findByRole('textbox');
    expect(backInput).toBeInTheDocument();

    fireEvent.change(backInput, { target: { value: 'This is back' } });

    // Mock the POST request to add the new card.
    fetchMock.mockResponse(
      JSON.stringify([
        { _id: '2', front: 'This is front', back: 'This is back' },
      ])
    );

    fireEvent.click(screen.getByText('Save'));

    // Mock the GET request again to fetch the updated list of cards.
    fetchMock.mockResponse(
      JSON.stringify([
        { _id: '1', front: 'first front', back: 'first back' },
        { _id: '2', front: 'This is front', back: 'This is back' },
      ])
    );

    const initialCard = await screen.findByText('first front');
    const addedCard = await screen.findByText('This is front');
    expect(initialCard).toBeInTheDocument();
    expect(addedCard).toBeInTheDocument();
  });
});

// Editing flashcard
describe('Editing flashcard', () => {
  // render app with mocked 1 card
  it('should render App with 1 mocked card initially', async () => {
    fetchMock.mockResponse(
      JSON.stringify([
        { _id: '1', front: 'initial front', back: 'initial back' },
      ])
    );
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('cards-list')).toContainElement(
        screen.getByTestId('card')
      );
    });
  });

  // find and click edit button
  it('should be possible to enter editing mode by clicking edit button', async () => {
    fetchMock.mockResponse(
      JSON.stringify([
        { _id: '1', front: 'initial front', back: 'initial back' },
      ])
    );
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('cards-list')).toContainElement(
        screen.getByTestId('card')
      );
    });

    expect(screen.getByText('initial front'));

    const editButton = screen.getByTestId('edit-icon');
    fireEvent.click(editButton);

    expect(screen.getByTestId('edit-form'));
  });

  // exit edit mode
  it('should be possible to exit editing mode by clicking cancel button', async () => {
    fetchMock.mockResponse(
      JSON.stringify([
        { _id: '1', front: 'initial front', back: 'initial back' },
      ])
    );
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('cards-list')).toContainElement(
        screen.getByTestId('card')
      );
    });

    expect(screen.getByText('initial front'));

    const editButton = screen.getByTestId('edit-icon');
    fireEvent.click(editButton);

    expect(screen.getByTestId('edit-form'));

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(screen.queryByTestId('edit-form')).not.toBeInTheDocument();
  });

  // dont save card when input empty
  it('should not be possible to edit a flashcard by clicking Save button when edited value is empty', async () => {
    fetchMock.mockResponse(
      JSON.stringify([
        { _id: '1', front: 'initial front', back: 'initial back' },
      ])
    );
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('cards-list')).toContainElement(
        screen.getByTestId('card')
      );
    });

    expect(screen.getByText('initial front'));

    const editButton = screen.getByTestId('edit-icon');
    fireEvent.click(editButton);

    expect(screen.getByTestId('edit-form'));

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('initial front');

    fireEvent.change(input, { target: { value: '' } });
    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeDisabled();
  });

  // save card when input is not empty
  it('should be possible to edit a flashcard by clicking Save button when edited value is not empty', async () => {
    fetchMock.mockResponse(
      JSON.stringify([
        { _id: '1', front: 'initial front', back: 'initial back' },
      ])
    );
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('cards-list')).toContainElement(
        screen.getByTestId('card')
      );
    });

    expect(screen.getByText('initial front'));

    const editButton = screen.getByTestId('edit-icon');
    fireEvent.click(editButton);

    expect(screen.getByTestId('edit-form'));

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('initial front');

    fireEvent.change(input, { target: { value: 'edited front' } });
    const saveButton = screen.getByText('Save');
    expect(saveButton).not.toBeDisabled();

    // mock patch req with changed value
    fetchMock.mockResponse(
      JSON.stringify([
        { _id: '1', front: 'edited front', back: 'initial back' },
      ])
    );

    fireEvent.click(saveButton);

    // Mock the GET request again to fetch the updated list of cards.
    fetchMock.mockResponse(
      JSON.stringify([
        { _id: '1', front: 'edited front', back: 'initial back' },
      ])
    );

    const editedCard = await screen.findByText('edited front');
    expect(editedCard).toBeInTheDocument();
  });
});

// deleting flashcard
describe('Deleting flashcard', () => {
  it('should delete flashcard from the list when clicking on Trash icon', async () => {
    fetchMock.mockResponse(
      JSON.stringify([{ _id: '1', front: 'first front', back: 'first back' }])
    );
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('cards-list')).toContainElement(
        screen.getByTestId('card')
      );
    });

    expect(screen.getByText('first front'));

    // click edit button to open edit form where trash icon lives
    const editButton = screen.getByTestId('edit-icon');
    fireEvent.click(editButton);

    // check if edit form is opened
    expect(screen.getByTestId('edit-form'));

    // mock delete request
    fetchMock.mockResponse(JSON.stringify([]));

    // click trash button to delete card
    const trashButton = screen.getByTestId('trash-icon');
    fireEvent.click(trashButton);

    // check if cards list contain no cards
    expect(await screen.findByTestId('cards-list')).toBeEmptyDOMElement();
  });
});
