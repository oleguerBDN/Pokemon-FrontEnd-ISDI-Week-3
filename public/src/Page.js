import Cards from "./Cards.js";
import Navbar from "./Navbar.js";
import Detail from "./Detail.js";

class Page {
  parentElement;

  pageType;

  headerElement;

  cardsElement;

  paginationElement;

  footerElement;

  detailElement;

  constructor(parentElement, pageType) {
    this.parentElement = parentElement;
    this.pageType = pageType;
    this.createHeader();
    if (this.pageType !== "detail") {
      this.createMain();
    } else {
      this.createMainDetail();
    }
  }

  createHeader() {
    this.headerElement = document.createElement("header");
    this.headerElement.className = "header";
    this.parentElement.appendChild(this.headerElement);

    const navbarList = [
      { href: "index.html", text: "ALL POKEMONS" },
      { href: "pokeball.html", text: "POKEBALL" },
    ];
    new Navbar(this.headerElement, navbarList);
  }

  createMain() {
    this.mainElement = document.createElement("main");
    this.mainElement.className = "main";
    this.parentElement.appendChild(this.mainElement);
    this.mainElement.innerHTML = `
    <h1 class="main__title"></h1>
        <section class="cards">
        </section>
        <section class="pagination">
        </section>
    `;
    const mainTitle = this.mainElement.querySelector(".main__title");
    switch (this.pageType) {
      case "index":
        mainTitle.textContent = "ALL POKEMONS";
        break;
      case "pokeball":
        mainTitle.textContent = "MY POKEBALL";
        break;
      default:
        break;
    }

    this.cardsElement = this.mainElement.querySelector("section.cards");
    this.paginationElement =
      this.mainElement.querySelector("section.pagination");
    new Cards(this.cardsElement, this.paginationElement);
  }

  createMainDetail() {
    this.mainElement = document.createElement("main");
    this.mainElement.className = "main";
    this.parentElement.appendChild(this.mainElement);
    this.mainElement.innerHTML = `
    <h1 class="main__title"></h1>
        <section class="detail">
        </section>
    `;
    this.mainElement.querySelector(".main__title").textContent = "CARD DETAILS";

    this.detailElement = this.mainElement.querySelector("section.detail");

    new Detail(this.detailElement);
  }
}

export default Page;
