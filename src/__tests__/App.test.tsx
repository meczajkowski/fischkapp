import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { render } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.enableMocks();
});

describe('Editing flashcard', () => {
  // render app with mocked 1 card
  it('should open the edit card mode when the edit button is clicked.', async () => {
    fetchMock.mockResponse(
      JSON.stringify([
        { _id: '1', front: 'initial front', back: 'initial back' },
      ])
    );
    render(<App />);
    // find and click edit button
  });
  // find input expect value from side of cart where opened
  // change input value
  // mock patch req with chenged value
  //  find save btn and save card
  // mock get req
  // expect card with new value
});
