class Cards {
  parentElement;

  constructor(parentElement, navbarList) {
    this.parentElement = parentElement;
    this.navbarList = navbarList;
    this.createNavbarHTML();
  }

  createNavbarHTML() {
    const navElement = document.createElement("nav");
    navElement.className = "navbar";
    const ulElement = document.createElement("ul");
    ulElement.className = "navbar";
    this.parentElement.appendChild(navElement);
    navElement.appendChild(ulElement);

    this.navbarList.forEach((listItem) => {
      const newItem = document.createElement("li");
      newItem.className = "navbar__item";
      ulElement.appendChild(newItem);
      const newArrow = document.createElement("a");
      newArrow.href = listItem.href;
      newArrow.textContent = listItem.text;
      newItem.appendChild(newArrow);
    });
  }
}

export default Cards;
