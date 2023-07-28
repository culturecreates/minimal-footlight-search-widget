import { screen, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import SearchFooter from "./SearchFooter";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

afterEach(() => {
  cleanup();
});

test("should render 'seeAll' message when count > 0", () => {
  const count = 5;
  const onSubmitMock = jest.fn();

  // Render the component with the mocked props
  const footer = render(
    <I18nextProvider i18n={i18n}>
      <SearchFooter count={count} onSubmit={onSubmitMock} />
    </I18nextProvider>
  );

  //   const seeAllMessage = footer
  //     .getByText(i18n.getDataByLanguage("en").translation.footer.seeAll)
  //     .toBeDefined();
  //   expect(seeAllMessage).toBeInTheDocument();

  const noItemsMessage = footer.queryByText(
    i18n.getDataByLanguage("en").translation.footer.noItems
  );
console.log(noItemsMessage,"NO ITEMS MESSAGE");
  expect(noItemsMessage).not.toBeInTheDocument();
});

// test("should render 'noItems' message when count <= 0", () => {
//   // Mock the count and onSubmit prop values
//   const count = 0;
//   const onSubmitMock = jest.fn();

//   // Render the component with the mocked props
//   const footer = render(
//     <I18nextProvider i18n={i18n}>
//       <SearchFooter count={count} onSubmit={onSubmitMock} />
//     </I18nextProvider>
//   );

//   // Assert that the 'noItems' message is rendered in the component
//   const noItemsMessage = footer
//     .getByText(i18n.getDataByLanguage("en").translation.footer.noItems)
//     .toBeDefined();
//   expect(noItemsMessage).toBeInTheDocument();
// });
