import Cards from "./Cards";

describe("Given a new Cards class ", () => {
  describe("When it receives a parent div and any page type", () => {
    test("Then it should render a list with classname 'cards__list'", () => {
      const container = document.createElement("div");
      new Cards(container, "index");

      const searchUl = container.querySelector("ul.cards__list");

      expect(searchUl).not.toBeNull();
    });
  });
});
