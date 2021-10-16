import Pokeball from "./Pokeball";

describe("Given a new Pokeball class ", () => {
  describe("When it receives a  parent div ", () => {
    test("Then it should render a list with classname 'cards__list'", () => {
      const container = document.createElement("div");

      new Pokeball(container);

      const searchUl = container.querySelector("ul.cards__list");

      expect(searchUl).not.toBeNull();
    });
  });
});
