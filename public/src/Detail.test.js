import Detail from "./Detail";

describe("Given a new Detail class ", () => {
  describe("When it receives a parent div ", () => {
    test("Then it should render a div with classname 'card'", () => {
      const container = document.createElement("div");

      new Detail(container);

      const searchDiv = container.querySelector("div.card");

      expect(searchDiv).not.toBeNull();
    });
    test("Then it should have a url property wwith value https://pokeapi.co/api/v2/pokemon/tp://localhost//", () => {
      const container = document.createElement("div");
      const expected = "https://pokeapi.co/api/v2/pokemon/tp://localhost//";

      const detail = new Detail(container);
      const result = detail.url;

      expect(expected).toBe(result);
    });
  });
});
