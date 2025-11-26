import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders header brand and API indicator", () => {
  render(<App />);
  expect(screen.getByRole("banner")).toBeInTheDocument();
  // API indicator label
  expect(screen.getByText(/API:/i)).toBeInTheDocument();
});
