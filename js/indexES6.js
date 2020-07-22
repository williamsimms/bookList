const form = document.getElementById('book-form')
const title = document.getElementById('title')
const author = document.getElementById('author')
const isbn = document.getElementById('isbn')
const list = document.getElementById('book-list')
const container = document.querySelector('.container')

class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class UI {
    addBookToList(book) {
        const row = document.createElement('tr')
        row.innerHTML = `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td><a href = '#' class = 'delete'>X </a></td>
     `
        list.appendChild(row)
    }

    clearFields() {
        title.value = ''
        author.value = ''
        isbn.value = ''
    }

    deleteBook(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove()
        }
    }

    showAlert(message, className) {
        const div = document.createElement('div')
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message))
        //Insert Alert
        container.insertBefore(div, form)

        // Timeout after 3 seconds
        setTimeout(() => {
            const alert = document.querySelector('.alert')
            alert.remove()
        }, 3000)
    }
}

class Store {

    static getBooks() {
        let books
        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }
    static displayBooks() {
        const books = Store.getBooks()
        books.forEach((book) => {
            const ui = new UI
            // Add Book To Ui 
            ui.addBookToList(book)
        })
    }

    static addBooks(book) {
        const books = Store.getBook()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBook(isbn) {
        const books = Store.getBooks()
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}

// DOM Load 
document.addEventListener('DOMContentLoaded', () => {
    Store.displayBooks()
})
//Event Listener For Adding a new Book
form.addEventListener('submit', (e) => {
    e.preventDefault()
    //Getting Form Values
    const titleValue = title.value
    const authorValue = author.value
    const isbnValue = isbn.value

    // Instantiating book constructor
    const book = new Book(titleValue, authorValue, isbnValue)

    // Instantiating UI Constructor 

    const ui = new UI()

    if (titleValue === '' || authorValue === '' || isbnValue === '') {
        ui.showAlert('Please Fill All Fields', 'error')
    } else {
        ui.addBookToList(book)
        Store.addBooks(book)
        ui.clearFields()
        ui.showAlert('Book Added', 'success')
    }

})

// Event Listener For Deleting a Book
list.addEventListener('click', (e) => {
    const ui = new UI()
    // Delete Book
    ui.deleteBook(e.target)
    // remove From Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    ui.showAlert('Book Deleted', 'success')
})