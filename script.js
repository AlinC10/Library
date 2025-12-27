const button = document.getElementById("add-book-button");
const form = document.querySelector("form");
const main = document.querySelector("main");
let addBookContainer = document.getElementById("add-book");

document.addEventListener("click", (e) => {
    if(form.classList.contains("open") && !form.contains(e.target) && !button.contains(e.target))
        form.classList.remove("open");
})

button.addEventListener("click", () => {
    if(!form.classList.contains("open"))
        form.classList.toggle("open");
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    addBookToLibrary(form.title.value, form.author.value, form.pages.value, form.read.checked);
    
    form.reset();
    form.classList.remove("open");
})

const myLibrary = [];

function Book(title, author, pages, read=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    display = false;
}


function textContainer(container, h3Text, pText) {
    const h3 = document.createElement("h3");
    h3.textContent = h3Text;
    const p = document.createElement("p");
    if(h3Text.includes("read"))
        p.textContent = (pText ? "Yes" : "No");
    else
        p.textContent = pText;
    const div = document.createElement("div");
    div.appendChild(h3);
    div.appendChild(p);
    container.appendChild(div);
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    let container = document.createElement("div");
    let divClose = document.createElement("div");
    main.removeChild(addBookContainer);

    divClose.textContent = "X";
    divClose.classList.toggle("close");
    container.appendChild(divClose);
    // divClose.addEventListener("click", removeBook(divClose));


    textContainer(container, "Title: ", title);
    textContainer(container, "Author: ", author);
    textContainer(container, "Nr. of pages: ", pages);
    textContainer(container, "Did you read it?: ", read);
    container.classList.toggle("book");
    main.appendChild(container);

    main.appendChild(addBookContainer);
}

function updateLibrary() {

}

// function removeBook(div) {
//     myLibrary = myLibrary.filter(book => book.title === div.title);

//     updateLibrary();
// }
