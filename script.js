document.addEventListener('DOMContentLoaded', function () {
  const myLibrary = [];

  // Book constructor
  function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  // Add book to library array
  function addBookToLibrary(book) {
    myLibrary.push(book);
  }

  // Display books in the DOM
  function showBooks() {
    const container = document.querySelector('#book-container');
    container.innerHTML = ''; // Clear previous display

    myLibrary.forEach((book, index) => {
      const card = document.createElement('div');
      card.classList.add('book-card');

      card.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: ${book.read ? "Read" : "Not read"}</p>
        <button class="toggleRead" data-index="${index}">${book.read ? "Mark as Unread" : "Mark as Read"}</button>
        <button class="removeBtn" data-index="${index}">Remove</button>
      `;

      container.appendChild(card);
    });

    // Add event listeners to the remove and toggle buttons
    document.querySelectorAll('.removeBtn').forEach(button => {
      button.addEventListener('click', function () {
        removeBookFromLibrary(this.getAttribute('data-index'));
      });
    });

    document.querySelectorAll('.toggleRead').forEach(button => {
      button.addEventListener('click', function () {
        toggleReadStatus(this.getAttribute('data-index'));
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
  const showButton = document.getElementById('showDialog');
  const dialogBox = document.getElementById('dialogBox');
  const addBtn = dialogBox.querySelector('#addBtn');

  showButton.addEventListener("click", () => {
    dialogBox.showModal(); // Show modal to add book
  });

  addBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default from submission

    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    // Create new book and add to library
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    // Refresh display
    showBooks();

    // Clear form and close dialog
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').value = false;
    dialogBox.close();
  });

  // Initial display (if there are any books manually added to the array)
  showBooks();
});