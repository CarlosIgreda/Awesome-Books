const $books = document.querySelector('.books');
const $title = document.querySelector('.title');
const $author = document.querySelector('.author');
const $addButton = document.querySelector('.addButton');
const $error = document.querySelector('.error');

document.addEventListener('DOMContentLoaded', () => {
  class Books {
    constructor() {
      this.bookList = JSON.parse(localStorage.getItem('bookList')) || [];
      if (this.bookList.length > 0) {
        this.bookList.forEach((book) => {
          $books.insertAdjacentHTML(
            'beforeend',
            `
            <div class="itemContainer"><p>"${book.title}" by ${book.author}</p><button type="button" class="remove" id="${book.title}${book.author}">Remove</button></div>
          `,
          );
          const $removeButton = document.getElementById(`${book.title}${book.author}`);
          $removeButton.addEventListener('click', () => {
            this.remove(`${book.title}${book.author}`);
          });
        });
      }
    }

    remove(idSelected) {
      document.getElementById(idSelected).parentElement.remove();
      this.bookList.splice(this.bookList.findIndex((e) => e.title + e.author === idSelected), 1);
      localStorage.setItem('bookList', JSON.stringify(this.bookList));
    }

    add(title, author) {
      const item = { title, author };
      this.bookList.push(item);
      $books.insertAdjacentHTML(
        'beforeend',
        `
        <div class="itemContainer"><p>"${item.title}" by ${item.author}</p><button type="button" class="remove" id="${item.title}${item.author}">Remove</button></div>
      `,
      );
      localStorage.setItem('bookList', JSON.stringify(this.bookList));
      const $removeButton = document.getElementById(`${item.title}${item.author}`);
      $removeButton.addEventListener('click', () => {
        this.remove(`${item.title}${item.author}`);
      });
    }
  }

  const bookObj = new Books();

  $addButton.addEventListener('click', () => {
    if ($title.value !== '' && $author.value !== '') {
      bookObj.add($title.value.trim(), $author.value.trim());
      $error.style.display = 'none';
      $title.value = '';
      $author.value = '';
    } else {
      $error.style.display = 'block';
      setTimeout(() => {
        $error.style.display = 'none';
      }, 1500);
    }
  });
});
