import React from "react";
import { render } from "@testing-library/react";
import EventsList from "./EventsList";

describe("EventsList Component", () => {
  const props = {
    tabSelected: "Events",
    events: [
      {
        city: "Gatineau",
        endDate: "2023-08-17T16:30:00-04:00",
        id: "6495bd2395ffd60064aaa3dd",
        image: "https://example.org",
        place: "Musée de l'Auberge Symmes",
        startDate: "2023-08-14T12:00:00-04:00",
        streetAddress: "1 rue Front",
        title:
          "Guided tour - Fenêtre sur l'Outaouais, une exposition du Musée de",
      },
    ],
    widgetProps: {
      orgUrl: "https://example.org",
      eventUrl: "https://example.com",
      locale: "en",
      eventSearchUrl: "https://example.org",
      orgSearchUrl: "https://example.org",
    },
  };

  it("renders Event components when tabSelected is not 'Organizations'", () => {
    const { container } = render(<EventsList {...props} />);
    const eventComponents = container.querySelectorAll(".container");
    const dateComponent = container.querySelectorAll(".date");

    expect(eventComponents.length).toBe(props.events.length);
    expect(dateComponent.length).toBe(props.events.length);
  });

  it("renders Organization components when tabSelected is 'Organizations'", () => {
    const orgProps = {
      ...props,
      tabSelected: "Organizations",
    };
    const { container } = render(<EventsList {...orgProps} />);
    const organizationComponents = container.querySelectorAll(".container");
    const dateComponent = container.querySelectorAll(".date");

    expect(organizationComponents.length).toBe(props.events.length);
    expect(dateComponent.length).toBe(0);
  });
});
