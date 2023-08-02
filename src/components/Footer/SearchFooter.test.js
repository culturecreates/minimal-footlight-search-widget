import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchFooter from "./SearchFooter";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("SearchFooter", () => {
  test("renders with the correct message when count > 0", () => {
    const count = 5;
    const onSubmit = jest.fn();

    render(<SearchFooter count={count} onSubmit={onSubmit} />);

    const footerElement = screen.getByTestId("footer");
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveStyle("background: var(--primary-flash-yellow, #fff649)");
    expect(screen.getByText("footer.seeAll")).toBeInTheDocument();
    expect(screen.getByText(count.toString())).toBeInTheDocument();
  });

  test("renders with the correct message when count is 0", () => {
    const count = 0;
    const onSubmit = jest.fn();

    render(<SearchFooter count={count} onSubmit={onSubmit} />);

    const footerElement = screen.getByTestId("footer");
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveStyle("background: var(--primary-light-yellow, #F2EB9F)");
    expect(screen.getByText("footer.noItems")).toBeInTheDocument();
    expect(screen.getByText(count.toString())).toBeInTheDocument();
  });

  test("does not call onSubmit function when count is 0 and clicked", () => {
    const count = 0;
    const onSubmit = jest.fn();

    render(<SearchFooter count={count} onSubmit={onSubmit} />);
    const footerElement = screen.getByTestId("footer");
    fireEvent.click(footerElement);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("calls onSubmit function when count > 0 and clicked", () => {
    const count = 5;
    const onSubmit = jest.fn();

    render(<SearchFooter count={count} onSubmit={onSubmit} />);
    const footerElement = screen.getByTestId("footer");
    fireEvent.click(footerElement);

    expect(onSubmit).toHaveBeenCalled();
  });
});
