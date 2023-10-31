import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.enableMocks();
});

describe("App", () => {
  // render app with mocked 0 cards
  it("should render app component with new card form closed initially", async () => {
    await act(async () => {
      render(<App />);
      fetchMock.mockResponseOnce(JSON.stringify([]));
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
      expect(screen.getByText("Add your first flashcard")).toBeInTheDocument();
      expect(screen.queryByTestId("new-card-form")).not.toBeInTheDocument();
      expect(screen.queryByTestId("cards-list")).toBeEmptyDOMElement();
    });
  });

  // open form when CTA clicked
  it("should open the new card form when the 'Add Card' button is clicked.", async () => {
    await act(async () => {
      render(<App />);
      fetchMock.mockResponse(JSON.stringify([]));
    });

    const ctaButton = screen.getByRole("button");
    fireEvent.click(ctaButton);

    expect(screen.getByTestId("new-card-form")).toBeInTheDocument();
    // screen.debug();

    // debug returned html after header closing tag ->
    // why ul is a selfclosing tag?

    //   <div
    //     data-testid="new-card-form"
    //   >
    //     <input
    //       class=" "
    //       type="text"
    //       value=""
    //     />
    //     <div>
    //       <button
    //         class="undefined  false"
    //       >
    //         Cancel
    //       </button>
    //       <button
    //         class="undefined  undefined"
    //         disabled=""
    //       >
    //         Next
    //       </button>
    //     </div>
    //   </div>
    // </div>
    // <ul
    //   data-testid="cards-list"
    // />
  });

  // dont send form whith front input empty
  it("should not be possible to add a flashcard when front card value is empty", async () => {
    await act(async () => {
      render(<App />);
      fetchMock.mockResponse(JSON.stringify([]));
    });

    const ctaButton = screen.getByRole("button");
    fireEvent.click(ctaButton);

    expect(screen.getByTestId("new-card-form")).toBeInTheDocument();

    const frontInput = await screen.findByRole("textbox");
    fireEvent.change(frontInput, { target: { value: "" } });

    expect(screen.getByText("Next")).toBeDisabled();

    // screen.debug();

    // returns html - button disabled="" ul still selfclosing

    // <div
    //     class="undefined undefined"
    //   >
    //     <div
    //       data-testid="new-card-form"
    //     >
    //       <input
    //         class=" "
    //         type="text"
    //         value=""
    //       />
    //       <div>
    //         <button
    //           class="undefined  false"
    //         >
    //           Cancel
    //         </button>
    //         <button
    //           class="undefined  undefined"
    //           disabled=""
    //         >
    //           Next
    //         </button>
    //       </div>
    //     </div>
  });

  // dont send form when back input empty
  it("should not be possible to add a flashcard when back card value is empty", async () => {
    await act(async () => {
      render(<App />);
      fetchMock.mockResponse(JSON.stringify([]));
    });

    const ctaButton = screen.getByRole("button");
    fireEvent.click(ctaButton);

    expect(screen.getByTestId("new-card-form")).toBeInTheDocument();

    const frontInput = await screen.findByRole("textbox");
    fireEvent.change(frontInput, { target: { value: "This is front" } });

    const nextStepButton = await screen.findByText("Next");
    fireEvent.click(nextStepButton);

    const backInput = await screen.findByRole("textbox");
    expect(backInput).toBeInTheDocument();

    fireEvent.change(backInput, { target: { value: "" } });
    expect(screen.getByText("Save")).toBeDisabled();

    // screen.debug();
  });

  it("should be possible to add a flashcard when front and back card value is not empty", async () => {
    await act(async () => {
      render(<App />);
      fetchMock.mockResponse(
        JSON.stringify([{ _id: "1", front: "first front", back: "first back" }])
      );
    });

    const ctaButton = screen.getByRole("button");
    fireEvent.click(ctaButton);

    expect(screen.getByTestId("new-card-form")).toBeInTheDocument();

    const frontInput = await screen.findByRole("textbox");
    fireEvent.change(frontInput, { target: { value: "This is front" } });

    const nextStepButton = await screen.findByText("Next");
    fireEvent.click(nextStepButton);

    const backInput = await screen.findByRole("textbox");
    expect(backInput).toBeInTheDocument();

    fireEvent.change(backInput, { target: { value: "This is back" } });

    await act(async () => {
      // Mock the POST request to add the new card.
      fetchMock.mockResponse(
        JSON.stringify([
          { _id: "2", front: "This is front", back: "This is back" },
        ])
      );

      fireEvent.click(screen.getByText("Save"));

      // Mock the GET request again to fetch the updated list of cards.
      fetchMock.mockResponse(
        JSON.stringify([
          { _id: "1", front: "first front", back: "first back" },
          { _id: "2", front: "This is front", back: "This is back" },
        ])
      );
    });

    const initialCard = screen.getByText("first front");
    const addedCard = screen.getByText("This is front");
    expect(initialCard).toBeInTheDocument();
    expect(addedCard).toBeInTheDocument();

    screen.debug();
  });
});
