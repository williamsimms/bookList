const form = document.getElementById('book-form')
const title = document.getElementById('title')
const author = document.getElementById('author')
const isbn = document.getElementById('isbn')
const list = document.getElementById('book-list')
const container = document.querySelector('.container')


class Book {
    constructor(book, author, title) {
        this.book = book
        this.author = author
        this.title = title
    }
}


class UI {

}