import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

import App from "../App";

beforeEach(() => {
  fetchMock.resetMocks();
});

test("renders App component", async () => {
  const mockCards = [
    { _id: "1", front: "Front 1", back: "Back 1" },
    { _id: "2", front: "Front 2", back: "Back 2" },
  ];

  fetchMock.mockResponse(JSON.stringify(mockCards));

  const { debug } = render(<App />);
  debug();

  // Loading message should be displayed initially
  expect(screen.getByText("Loading...")).toBeInTheDocument();

  // Wait for the data to load
  await waitFor(() => {
    expect(screen.getByText("Front 1")).toBeInTheDocument();
    expect(screen.getByText("Front 2")).toBeInTheDocument();
    expect(screen.queryByText("Loading...")).toBeNull();
    debug()
  });

});
