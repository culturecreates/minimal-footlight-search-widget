import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tabs from "./Tabs";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("Tabs", () => {
  const tabSelected = "Ateliers";
  const onChangeTab = jest.fn();

  test("renders tabs with the correct text and selected class", () => {

    render(<Tabs tabSelected={tabSelected} onChangeTab={onChangeTab} />);

    const eventsTab = screen.getByText("tabs.Events");
    const ateliersTab = screen.getByText("tabs.Ateliers");
    const organizationsTab = screen.getByText("tabs.Organizations");

    expect(eventsTab).toBeInTheDocument();
    expect(ateliersTab).toBeInTheDocument();
    expect(organizationsTab).toBeInTheDocument();

    expect(eventsTab).not.toHaveClass("selected");
    expect(ateliersTab).toHaveClass("selected");
    expect(organizationsTab).not.toHaveClass("selected");
  });

  test("clicking on tabs triggers onChangeTab with the correct argument", () => {
    render(<Tabs tabSelected={tabSelected} onChangeTab={onChangeTab} />);
    const eventsTab = screen.getByText("tabs.Events");
    const ateliersTab = screen.getByText("tabs.Ateliers");
    const organizationsTab = screen.getByText("tabs.Organizations");

    fireEvent.click(eventsTab);
    fireEvent.click(ateliersTab);
    fireEvent.click(organizationsTab);

    expect(onChangeTab).toHaveBeenCalledTimes(3);
    expect(onChangeTab).toHaveBeenCalledWith("Events");
    expect(onChangeTab).toHaveBeenCalledWith("Ateliers");
    expect(onChangeTab).toHaveBeenCalledWith("Organizations");
  });
});
