import React from "react";
import { render, prettyDOM } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DateFormatter} from "./DateFormatter"; 
import { displayDate } from "../../helpers/helper";

describe("DateFormatter Component", () => {
  it("renders a formatted date for single date selection", () => {
    const date = "2023-08-07";
    const locale = "en-US";
    const monthFormat = "short";
    const yearFormat = "2-digit";

    const { getByTestId } = render(
      <DateFormatter date={date} locale={locale} monthFormat={monthFormat} yearFormat={yearFormat} />
    );

    const formattedDate = displayDate(date, locale, monthFormat, yearFormat);
    expect(getByTestId("formatted-date").textContent).toBe(formattedDate);
  });

  it("renders a formatted date range for date range selection", () => {
    const startDate = "2023-08-07";
    const endDate = "2023-08-10";
    const dateRange = [startDate, endDate];
    const locale = "en-US";
    const monthFormat = "short";
    const yearFormat = "2-digit";

    const { getByTestId } = render(
      <DateFormatter date={dateRange} locale={locale} monthFormat={monthFormat} yearFormat={yearFormat} />
    );

    const formattedStartDate = displayDate(startDate, locale, monthFormat, yearFormat);
    const formattedEndDate = displayDate(endDate, locale, monthFormat, yearFormat);
    const expectedText = `${formattedStartDate} ${formattedEndDate}`;

    const renderedText = getByTestId("formatted-date").textContent.replace(/\s+/g, " ");;
    console.log(prettyDOM(getByTestId("formatted-date")));

    expect(renderedText).toBe(expectedText);
  });

  it("renders an empty div when date prop is undefined", () => {
    const { getByTestId } = render(<DateFormatter />);

    expect(getByTestId("formatted-date")).toBeEmptyDOMElement();
  });

  it("renders an empty div when date prop is null", () => {
    const { getByTestId } = render(<DateFormatter date={null} />);

    expect(getByTestId("formatted-date")).toBeEmptyDOMElement();
  });
});
