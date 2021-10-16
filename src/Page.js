import Navbar from "./Navbar.js";

class Page {
  parentElement;

  pageType;

  headerElement;

  cardsElement;

  paginationElement;

  footerElement;

  constructor(parentElement, pageType) {
    this.parentElement = parentElement;
    this.pageType = pageType;
    this.createHeader();
  }

  createHeader() {
    this.headerElement = document.createElement("header");
    this.headerElement.className = "header";
    this.parentElement.appendChild(this.headerElement);

    console.log(this.parentElement);
    console.log(this.headerElement);
    const navbarList = [
      { href: "index.html", text: "ALL POKEMONS" },
      { href: "pokeball.html", text: "POKEBALL" },
    ];
    new Navbar(this.headerElement, navbarList);
  }
}

export default Page;
