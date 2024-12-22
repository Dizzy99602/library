document.addEventListener("DOMContentLoaded", function () {
  const myLibrary = [];

  class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
  }

  // Book constructor
  // function Book(title, author, pages, read) {
  //   this.title = title;
  //   this.author = author;
  //   this.pages = pages;
  //   this.read = read;
  // }

  // Add book to library array
  function addBookToLibrary(book) {
    myLibrary.push(book);
  }

  // Display books in the DOM
  function showBooks() {
    const container = document.querySelector("#book-container");
    container.innerHTML = ""; // Clear previous display

    myLibrary.forEach((book, index) => {
      const card = document.createElement("div");
      card.classList.add("book-card");

      card.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: ${book.read ? "Read" : "Not read"}</p>
        <button class="toggleRead" data-index="${index}">${
        book.read ? "Mark as Unread" : "Mark as Read"
      }</button>
        <button class="removeBtn" data-index="${index}">Remove</button>
      `;

      container.appendChild(card);
    });

    // Add event listeners to the remove and toggle buttons
    document.querySelectorAll(".removeBtn").forEach((button) => {
      button.addEventListener("click", function () {
        removeBookFromLibrary(this.getAttribute("data-index"));
      });
    });

    document.querySelectorAll(".toggleRead").forEach((button) => {
      button.addEventListener("click", function () {
        toggleReadStatus(this.getAttribute("data-index"));
      });
    });
  }

  // Remove book from library
  function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1); // Remove book by index
    showBooks(); // Refresh display
  }

  // Toggle book's read status
  function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read; // Toggle read status
    showBooks();
  }

  // Form handling: Add new book
  const showButton = document.getElementById("showDialog");
  const dialogBox = document.getElementById("dialogBox");
  const addBtn = dialogBox.querySelector("#addBtn");

  showButton.addEventListener("click", () => {
    dialogBox.showModal(); // Show modal to add book
  });

  addBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default from submission

    // Get form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    // Create new book and add to library
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    // Refresh display
    showBooks();

    // Clear form and close dialog
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").value = false;
    dialogBox.close();
  });

  // Initial display (if there are any books manually added to the array)
  showBooks();

  // Constraint validation
  const titleInput = document.getElementById("title");
  const errorElement = titleInput.nextElementSibling; // Error message span
  const titleRegExp = /^[a-zA-Z\s]+$/; // Allow letters and spaces only
  const form = document.querySelector("form");

  // Validate the title and update the UI
  function validateTitle() {
    const titleValue = titleInput.value.trim();
    const isValid = titleValue.length > 0 && titleRegExp.test(titleValue);

    if (isValid) {
      titleInput.classList.remove("invalid");
      titleInput.classList.add("valid");
      errorElement.textContent = ""; // Clear error message
      errorElement.classList.remove("active");
    } else {
      titleInput.classList.remove("valid");
      titleInput.classList.add("invalid");
      errorElement.textContent = "Title must contain only letters and spaces.";
      errorElement.classList.add("active");
    }

    return isValid; // Return validation status
  }

  // Add event listeners for real-time validation
  titleInput.addEventListener("input", validateTitle);
  titleInput.addEventListener("blur", validateTitle);

  // Prevent form submission if validation fails
  form.addEventListener("submit", (event) => {
    if (!validateTitle()) {
      event.preventDefault();
      errorElement.textContent =
        "Please provide a valid title before submitting.";
      errorElement.classList.add("active");
    }
  });
});
