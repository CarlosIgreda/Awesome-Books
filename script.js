const $books = document.querySelector('.books');
const $title = document.querySelector('.title');
const $author = document.querySelector('.author');
const $addButton = document.querySelector('.addButton');
const bookList = JSON.parse(localStorage.getItem('bookList')) || [];

document.addEventListener('DOMContentLoaded', () => {
  function remove(idSelected) {
    document.getElementById(idSelected).parentElement.remove();
    bookList.splice(bookList.findIndex((book) => book.title + book.author === idSelected), 1);
    localStorage.setItem('bookList', JSON.stringify(bookList));
  }

  function add(title, author) {
    const item = { title, author };
    item.title = title;
    item.author = author;
    bookList.push(item);
    $books.insertAdjacentHTML(
      'beforeend',
      `
        <span><p>${item.title}<br>${item.author}</p><button type="button" id="${item.title}${item.author}">Remove</button><hr></span>
      `,
    );
    localStorage.setItem('bookList', JSON.stringify(bookList));
    const $removeButton = document.getElementById(`${item.title}${item.author}`);
    $removeButton.addEventListener('click', () => {
      remove(`${item.title}${item.author}`);
    });
  }

  if (bookList.length > 0) {
    bookList.forEach((book) => {
      $books.insertAdjacentHTML(
        'beforeend',
        `
          <span><p>${book.title}<br>${book.author}</p><button type="button" id="${book.title}${book.author}">Remove</button><hr></span>
        `,
      );
      const $removeButton = document.getElementById(`${book.title}${book.author}`);
      $removeButton.addEventListener('click', () => {
        remove(`${book.title}${book.author}`);
      });
    });
  }

  $addButton.addEventListener('click', () => {
    if ($title.value !== '' && $author.value !== '') {
      add($title.value.trim(), $author.value.trim());
      $title.value = '';
      $author.value = '';
    }
  });
});
