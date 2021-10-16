class Cards {
  parentElement;

  cardsList;

  pageType;

  constructor(parentElement, pageType) {
    this.parentElement = parentElement;
    this.pageType = pageType;
    this.createCardsHTML();
  }

  createCardsHTML() {
    this.cardsList = document.createElement("ul");
    this.cardsList.className = "cards__list";
    this.parentElement.appendChild(this.cardsList);
  }
}

export default Cards;
