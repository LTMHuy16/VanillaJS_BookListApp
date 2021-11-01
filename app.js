// BookClass: Represent a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UiI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    // const StoredBooks = [
    //   {
    //     title: "Book One",
    //     author: "Minh Huy",
    //     isbn: "16010"
    //   },
    //   {
    //     title: "Book Two",
    //     author: "Minh Huy",
    //     isbn: "2103"
    //   }
    // ]
    // Loop the storeBook
    // const books = StoredBooks;

    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }


  // Add book to ListBook
  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a class="btn btn-sm btn-danger delete">X</a></td>`;

    list.appendChild(row);
  }

  // Clear Input value after submit
  static clearFields() {
    const title = document.querySelector('#title').value = '';
    const author = document.querySelector('#author').value = '';
    const isbn = document.querySelector('#isbn').value = '';
  }

  // Delete book when click
  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  // Show Alert
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.container .alert').remove(), 1500);
  }
}

/*================== Học phần này ====================== */
// Store Class: Handle Storage
class Store {
  static getBooks () {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}


// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)


// Event: Add Book
document.querySelector('#book-form').addEventListener('submit', function(e) {
  // Prevent Actual submit
  e.preventDefault();

  // Get values from input
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

    // Validate
    if (title === '' || author === '' || isbn === '') {
      UI.showAlert("Please fill in all fields", "danger")
    }
    else {
      // Instantiate Book 
      const book = new Book (title, author, isbn);

      // Add book to UI
      UI.addBookToList(book);

      // Add book to LocalStore
      Store.addBook(book);

      // Clear fields
      UI.clearFields();

      // show Alert Success
      UI.showAlert("Add book successfully !!!", "success")
    }
});

// Event: Remove Books
document.querySelector('#book-list').addEventListener('click', function(e) {
  // Remove from UI
  UI.deleteBook(e.target);

  // Remove from Store (a -> td -> sibling td -> book's isbn)
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // show Alert Success
  UI.showAlert("Remove successfully !!!", "success")
})

