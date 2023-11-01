import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.enableMocks();
});

describe("App", () => {
  // render app with mocked 0 cards
  it("should render app component with new card form closed initially", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    render(<App />);

    await screen.findByText("Add your first flashcard");
    expect(screen.queryByTestId("new-card-form")).not.toBeInTheDocument();
    expect(screen.queryByTestId("cards-list")).toBeEmptyDOMElement();
  });
  // open form when CTA clicked
  it("should open the new card form when the 'Add Card' button is clicked.", async () => {
    fetchMock.mockResponse(JSON.stringify([]));
    render(<App />);

    const ctaButton = await screen.findByRole("button");
    fireEvent.click(ctaButton);
    expect(screen.getByTestId("new-card-form")).toBeInTheDocument();
  });

  // dont send form whith front input empty
  it("should not be possible to add a flashcard when front card value is empty", async () => {
    fetchMock.mockResponse(JSON.stringify([]));
    render(<App />);

    const ctaButton = await screen.findByRole("button");
    fireEvent.click(ctaButton);

    expect(screen.getByTestId("new-card-form")).toBeInTheDocument();

    const frontInput = screen.getByRole("textbox");
    fireEvent.change(frontInput, { target: { value: "" } });

    expect(screen.getByText("Next")).toBeDisabled();
  });

  // dont send form when back input empty
  it("should not be possible to add a flashcard when back card value is empty", async () => {
    fetchMock.mockResponse(JSON.stringify([]));
    render(<App />);

    const ctaButton = await screen.findByRole("button");
    fireEvent.click(ctaButton);

    expect(screen.getByTestId("new-card-form")).toBeInTheDocument();

    const frontInput = screen.getByRole("textbox");
    fireEvent.change(frontInput, { target: { value: "This is front" } });

    const nextStepButton = screen.getByText("Next");
    fireEvent.click(nextStepButton);

    const backInput = screen.getByRole("textbox");
    expect(backInput).toBeInTheDocument();

    fireEvent.change(backInput, { target: { value: "" } });
    expect(screen.getByText("Save")).toBeDisabled();
  });

  it("should be possible to add a flashcard when front and back card value is not empty", async () => {
    fetchMock.mockResponse(
      JSON.stringify([{ _id: "1", front: "first front", back: "first back" }])
    );
    render(<App />);

    const ctaButton = await screen.findByRole("button");
    fireEvent.click(ctaButton);

    expect(screen.getByTestId("new-card-form")).toBeInTheDocument();

    const frontInput = screen.getByRole("textbox");
    fireEvent.change(frontInput, { target: { value: "This is front" } });

    const nextStepButton = screen.getByText("Next");
    fireEvent.click(nextStepButton);

    const backInput = await screen.findByRole("textbox");
    expect(backInput).toBeInTheDocument();

    fireEvent.change(backInput, { target: { value: "This is back" } });

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

    const initialCard = await screen.findByText("first front");
    const addedCard = await screen.findByText("This is front");
    expect(initialCard).toBeInTheDocument();
    expect(addedCard).toBeInTheDocument();
  });
});
