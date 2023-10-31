import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import { render, screen, act, waitFor } from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.resetMocks();
});

describe("App", () => {
  it("should render app component with mocked 0 cards", async () => {
    // Wrap your test code with act
    await act(async () => {
      render(<App />);
      fetchMock.mockResponse(JSON.stringify([]));
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
      expect(screen.queryByRole("input")).not.toBeInTheDocument();
      expect(screen.queryByTestId("cards-list")).toBeEmptyDOMElement();
    });

    screen.debug();
  });

  // it("should open form when CTA button is clicked", async () => {
  //   await act(async () => {
  //     render(<App />);
  //     fetchMock.mockResponse(JSON.stringify([]));
  //   });

  //   const ctaButton = screen.getByRole("button");
  //   fireEvent.click(ctaButton);

  //   const newCardInput = await screen.findByRole("textbox");
  //   expect(newCardInput).toBeInTheDocument();
  // });

  // it("should not be possible to add a flashcard when front card value is empty", async () => {
  //   await act(async () => {
  //     render(<App />);
  //     fetchMock.mockResponse(JSON.stringify([]));
  //   });

  //   const ctaButton = screen.getByRole("button");
  //   fireEvent.click(ctaButton);

  //   let newCardInput = await screen.findByRole("textbox");
  //   fireEvent.change(newCardInput, { target: { value: "" } });

  //   const nextStepButton = screen.getByText("Next");
  //   expect(screen.getByText("Next")).toBeDisabled();

  //   fireEvent.change(newCardInput, { target: { value: "This is front" } });
  //   fireEvent.click(nextStepButton);

  //   const saveCardButton = await screen.findByText("Save");
  //   expect(saveCardButton).toBeInTheDocument();
  // });

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
