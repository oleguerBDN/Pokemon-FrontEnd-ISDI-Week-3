import Navbar from "./Navbar";

describe("Given a new Navbar class ", () => {
  describe("When it receives a parent div and an object array [{ href: 'index.html', text: 'ALL POKEMONS' }]", () => {
    test("Then it should render a navbar containing a li with class 'navbar'", () => {
      const container = document.createElement("div");
      const navbarList = [{ href: "index.html", text: "ALL POKEMONS" }];

      new Navbar(container, navbarList);

      const searchUl = container.querySelector("ul.navbar");

      expect(searchUl).not.toBeNull();
    });
    test("Then it should render a navbar containing a li list with the arrow from the object", () => {
      const container = document.createElement("div");
      const navbarList = [{ href: "index.html", text: "ALL POKEMONS" }];

      new Navbar(container, navbarList);

      const searchArrow = container.querySelector("a");

      expect(searchArrow).not.toBeNull();
    });
    test("Then it should render a navbar containing (among others) an arrow with href = 'index.html'", () => {
      const container = document.createElement("div");
      const navbarList = [{ href: "index.html", text: "ALL POKEMONS" }];
      const result = "http://localhost/index.html";

      new Navbar(container, navbarList);

      const searchArrowHref = container.querySelector("a").href;

      expect(searchArrowHref).toBe(result);
    });
  });
});
