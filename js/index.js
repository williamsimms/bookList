const form = document.getElementById('book-form')
const title = document.getElementById('title')
const author = document.getElementById('author')
const isbn = document.getElementById('isbn')
const list = document.getElementById('book-list')

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

    ui.addBookToList(book)
    ui.clearFields()

})