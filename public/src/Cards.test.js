import Cards from "./Cards";

describe("Given a new Cards class ", () => {
  describe("When it receives a two parent div and any page type", () => {
    test("Then it should render a list with classname 'cards__list'", () => {
      const container = document.createElement("div");
      const container2 = document.createElement("div");

      new Cards(container, container2, "index");

      const searchUl = container.querySelector("ul.cards__list");

      expect(searchUl).not.toBeNull();
    });

    test("Then it should render a list with classname 'pagination' under second container", () => {
      const container = document.createElement("div");
      const container2 = document.createElement("div");

      new Cards(container, container2, "index");

      const searchUl = container2.querySelector("ul.pagination");

      expect(searchUl).not.toBeNull();
    });
  });
});
