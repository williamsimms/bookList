const form = document.getElementById('book-form')
const title = document.getElementById('title')
const author = document.getElementById('author')
const isbn = document.getElementById('isbn')
const list = document.getElementById('book-list')
const container = document.querySelector('.container')

function Book(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
}

function UI() {}
UI.prototype.addBookToList = function (book) {
    const row = document.createElement('tr')
    row.innerHTML = `
 <td>${book.title}</td>
 <td>${book.author}</td>
 <td>${book.isbn}</td>
 <td><a href = '#' class = 'delete'>X </a></td>
 `
    list.appendChild(row)
}
UI.prototype.clearFields = function () {
    title.value = ''
    author.value = ''
    isbn.value = ''
}
UI.prototype.showAlert = function (message, className) {
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
//Delete Book
UI.prototype.deleteBook = function (target) {
    if (target.classList.contains('delete')) {
        target.parentElement.parentElement.remove()
    }
}


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
        ui.clearFields()
        ui.showAlert('Book Added', 'success')
    }

})

// Event Listener For Deleting a Book
list.addEventListener('click', (e) => {
    const ui = new UI()
    // Delete Book
    ui.deleteBook(e.target)
    ui.showAlert('Book Deleted', 'success')
})