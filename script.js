const button = document.getElementById("add-book-button");
const form = document.querySelector("form");
const library = document.querySelector("section");
let addBookContainer = document.getElementById("add-book");
let booksDisplayed = 0;

document.addEventListener("click", (e) => {
    if (
        form.classList.contains("open") &&
        !form.contains(e.target) &&
        !button.contains(e.target)
    )
        form.classList.remove("open");
});

button.addEventListener("click", () => {
    if (!form.classList.contains("open")) form.classList.toggle("open");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addBookToLibrary(
        form.title.value,
        form.author.value,
        form.pages.value,
        form.read.checked
    );

    form.reset();
    form.classList.remove("open");
});

let myLibrary = [];

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    display = false;
}

Book.prototype.changeReadSatus = function () {
    this.read = this.read ? false : true;
};

function changeButtonStatus(button, read) {
    if (read) {
        button.textContent = "Yes";
        button.classList.add("yes");
        if (button.classList.contains("no")) button.classList.remove("no");
    } else {
        button.textContent = "No";
        button.classList.add("no");
        if (button.classList.contains("yes")) button.classList.remove("yes");
    }
}

function textContainer(container, h3Text, pText, book = null) {
    const h3 = document.createElement("h3");
    h3.textContent = h3Text;
    const p = document.createElement("p");
    const div = document.createElement("div");
    div.appendChild(h3);
    const button = document.createElement("button");
    if (!h3Text.includes("read")) {
        p.textContent = pText;
        div.appendChild(p);
    } else {
        const button = document.createElement("button");
        changeButtonStatus(button, pText);
        button.addEventListener("click", () => {
            book.changeReadSatus();
            changeButtonStatus(button, book.read);
        });
        div.appendChild(button);
    }
    container.appendChild(div);
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    let container = document.createElement("div");
    let divClose = document.createElement("div");
    library.removeChild(addBookContainer);

    divClose.textContent = "X";
    divClose.classList.toggle("close");
    container.appendChild(divClose);
    divClose.addEventListener(
        "click",
        () => {
            removeBook(container, title);
        },
        { once: true }
    ); // remove event listener after firing once

    textContainer(container, "Title: ", title);
    textContainer(container, "Author: ", author);
    textContainer(container, "Nr. of pages: ", pages);
    textContainer(container, "Did you read it?: ", read, book);
    container.classList.toggle("book");
    library.appendChild(container);

    library.appendChild(addBookContainer);
    booksDisplayed++;
}

function removeBook(container, title) {
    myLibrary = myLibrary.filter((book) => book.title !== title);
    container.querySelector(button).removeEventListener();
    container.remove();
}
