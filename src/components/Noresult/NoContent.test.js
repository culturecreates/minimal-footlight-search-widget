import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NoContent from "./NoContent";

describe("NoContent", () => {
  const message = "No results found for the selected tab";
  const date = new Date("2023-08-02T12:34:56");
  const locale = "en-US";
  const tabSelected = "Organizations";

  test("renders message correctly", () => {
    const props = { message, date, locale, tabSelected };

    render(<NoContent {...props} />);

    const messageContainer = screen.getByText(message);
    expect(messageContainer).toBeInTheDocument();
  });

  test("does not render date-container when tabSelected is 'Organizations'", () => {
    const props = { message, date, locale, tabSelected };

    render(<NoContent {...props} />);

    const dateContainer = screen.queryByTestId("date-container");
    expect(dateContainer).not.toBeInTheDocument();
  });

  test("renders date-container when tabSelected is not 'Organizations'", () => {
    const props = {
      message,
      date,
      locale,
      tabSelected: "SomeOtherTab",
    };

    render(<NoContent {...props} />);

    const dateContainer = screen.getByTestId("date-container");
    expect(dateContainer).toBeInTheDocument();
    const formattedDate = screen.getByText("August 2, 2023"); // Format might vary based on locale
    expect(formattedDate).toBeInTheDocument();
  });

  test("updates when isLoading prop changes", () => {
    const initialProps = { message, date, locale, tabSelected, isLoading: true };
    const updatedProps = { message, date, locale, tabSelected, isLoading: false };

    const { rerender } = render(<NoContent {...initialProps} />);

    const loadingMessage = screen.getByText(message);
    expect(loadingMessage).toBeInTheDocument();
    const dateContainer = screen.queryByTestId("date-container");
    expect(dateContainer).not.toBeInTheDocument();

    rerender(<NoContent {...updatedProps} />);

    const messageContainer = screen.getByText(message);
    expect(messageContainer).toBeInTheDocument();
  });
});
