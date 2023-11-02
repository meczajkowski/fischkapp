import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { render, screen, fireEvent } from '@testing-library/react';
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
    expect(await screen.findByTestId('cards-list')).not.toBeEmptyDOMElement();
  });

  // find and click edit button
  it('should be possible to enter editing mode by clicking edit button', async () => {
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

  // exit edit mode
  it('should be possible to exit editing mode by clicking cancel button', async () => {
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

    expect(await screen.findByTestId('cards-list')).not.toBeEmptyDOMElement();
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
  // change input value
  // mock patch req with chenged value
  //  find save btn and save card
  // mock get req
  // expect card with new value
});

// It should not be possible to edit a flashcard by clicking Save button when edited value is empty
// It should be possible to edit a flashcard by clicking Save button when edited value is not empty
// It should be possible to exit editing mode by clicking cancel button
