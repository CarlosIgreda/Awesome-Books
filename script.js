/* eslint-disable no-plusplus */
const $books = document.querySelector('.books');
const $title = document.querySelector('.title');
const $author = document.querySelector('.author');
const $addButton = document.querySelector('.addButton');

document.addEventListener('DOMContentLoaded', () => {
  class Books {
    constructor() {
      this.bookList = JSON.parse(localStorage.getItem('bookList')) || [];
      this.arr = [];
      this.bookList.forEach((book) => {
        $books.insertAdjacentHTML(
          'beforeend',
          `
            <span><p>${book.title}<br>${book.author}</p><button type="button" id="${book.title}${book.author}">Remove</button><hr></span>
          `,
        );
        this.arr.push(`${book.title}${book.author}`);
        const $removeButton = document.getElementById(`${book.title}${book.author}`);
        $removeButton.addEventListener('click', () => {
          $removeButton.parentElement.remove();
          const arrayObjects = JSON.parse(localStorage.getItem('bookList'));
          for (let i = 0; i < arrayObjects.length; i++) {
            if (
              `${arrayObjects[i].title}${arrayObjects[i].author}`
              === $removeButton.getAttribute('id')
            ) {
              arrayObjects.splice(i, 1);
              break;
            }
          }
          localStorage.setItem('bookList', JSON.stringify(arrayObjects));
        });
      });
    }

    add(title, author) {
      const book = { title, author };
      this.bookList.push(book);
      $books.insertAdjacentHTML(
        'beforeend',
        `
            <span><p>${title}<br>${author}</p><button type="button" id="${title}${author}">Remove</button><hr></span>
        `,
      );
      this.arr.push(`${title}${author}`);
      if (this.arr.length >= 1) {
        const $removeButton = document.getElementById(`${title}${author}`);
        $removeButton.addEventListener('click', () => {
          $removeButton.parentElement.remove();
          const arrayObjects = JSON.parse(localStorage.getItem('bookList'));
          for (let i = 0; i < arrayObjects.length; i++) {
            if (
              `${arrayObjects[i].title}${arrayObjects[i].author}`
              === $removeButton.getAttribute('id')
            ) {
              arrayObjects.splice(i, 1);
              break;
            }
          }
          localStorage.setItem('bookList', JSON.stringify(arrayObjects));
        });
      }

      localStorage.setItem('bookList', JSON.stringify(this.bookList));
      $title.value = null;
      $author.value = null;
    }
  }

  const bookObj = new Books();

  $addButton.addEventListener('click', () => {
    bookObj.add($title.value, $author.value);
  });
});
