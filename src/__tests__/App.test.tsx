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
  it("should open form when CTA button is clicked", async () => {
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

  it("should not be possible to add a flashcard when front card value is empty", async () => {
    await act(async () => {
      render(<App />);
      fetchMock.mockResponse(JSON.stringify([]));
    });

    const ctaButton = screen.getByRole("button");
    fireEvent.click(ctaButton);

    const frontInput = await screen.findByRole("textbox");
    fireEvent.change(frontInput, { target: { value: "" } });

    expect(screen.getByText("Next")).toBeDisabled();

    screen.debug();

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

  // it("should not be possible to add a flashcard when back card value is empty", async () => {
  //   await act(async () => {
  //     render(<App />);
  //     fetchMock.mockResponse(JSON.stringify([]));
  //   });

  //   const ctaButton = screen.getByRole("button");
  //   fireEvent.click(ctaButton);

  //   let newCardInput = await screen.findByRole("textbox");
  //   fireEvent.change(newCardInput, { target: { value: "" } });

  //   const nextStepButton = await screen.findByText("Next");
  //   fireEvent.click(nextStepButton);

  //   let saveCardButton = screen.queryByText("Save");
  //   expect(saveCardButton).not.toBeInTheDocument();

  //   fireEvent.change(newCardInput, { target: { value: "This is front" } });
  //   fireEvent.click(nextStepButton);

  //   saveCardButton = await screen.findByText("Save");
  //   expect(saveCardButton).toBeInTheDocument();

  //   newCardInput = await screen.findByRole("textbox");

  //   fireEvent.change(newCardInput, { target: { value: "" } });
  //   fireEvent.click(saveCardButton);
  //   expect(saveCardButton).toBeInTheDocument();
  // });

  // it("should be possible to add a flashcard when front and back card value is not empty", async () => {
  //   await act(async () => {
  //     render(<App />);
  //     fetchMock.mockResponse(JSON.stringify([]));
  //   });

  //   const ctaButton = screen.getByRole("button");
  //   fireEvent.click(ctaButton);

  //   let newCardInput = await screen.findByRole("textbox");
  //   fireEvent.change(newCardInput, { target: { value: "" } });

  //   const nextStepButton = await screen.findByText("Next");
  //   fireEvent.click(nextStepButton);

  //   let saveCardButton = screen.queryByText("Save");
  //   expect(saveCardButton).not.toBeInTheDocument();

  //   fireEvent.change(newCardInput, { target: { value: "This is front" } });
  //   fireEvent.click(nextStepButton);

  //   saveCardButton = await screen.findByText("Save");
  //   expect(saveCardButton).toBeInTheDocument();

  //   newCardInput = await screen.findByRole("textbox");

  //   fireEvent.change(newCardInput, { target: { value: "" } });
  //   fireEvent.click(saveCardButton);
  //   expect(saveCardButton).toBeInTheDocument();

  //   fireEvent.change(newCardInput, { target: { value: "This is back" } });
  //   await act(async () => {
  //     saveCardButton = await screen.findByText("Save");
  //     fireEvent.click(saveCardButton);
  //   });
  //   screen.debug();
  // });
});
