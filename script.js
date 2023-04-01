const $books = document.querySelector('.listcontainer');
const $title = document.querySelector('.title');
const $author = document.querySelector('.author');
const $addButton = document.querySelector('.addbutton');
const $error = document.querySelector('.error');
const $date = document.querySelector('.datepage');
const $addPage = document.querySelector('.addpage');
const $contactPage = document.querySelector('.acontact');
const $listPage = document.querySelector('.listpage');
const $booksSection = document.querySelector('.books');
const $newSection = document.querySelector('.newbooks');
const $contactSection = document.querySelector('.contactinfo');

document.addEventListener('DOMContentLoaded', () => {
  class Books {
    constructor() {
      this.bookList = JSON.parse(localStorage.getItem('bookList')) || [];
      if (this.bookList.length > 0) {
        this.bookList.forEach((book) => {
          $books.insertAdjacentHTML(
            'beforeend',
            `
            <div class="itemcontainer"><p class="content">"${book.title}" by ${book.author}</p><button type="button" class="remove shadow" id="${book.title}${book.author}">Remove</button></div>
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
        <div class="itemcontainer"><p class="content">"${item.title}" by ${item.author}</p><button type="button" class="remove shadow" id="${item.title}${item.author}">Remove</button></div>
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

  function obtenerSufijo(dia) {
    let sufijo = 'th';
    if (dia < 11 || dia > 13) {
      switch (dia % 10) {
        case 1:
          sufijo = 'st';
          break;
        case 2:
          sufijo = 'nd';
          break;
        case 3:
          sufijo = 'rd';
          break;
        default:
          break;
      }
    }
    return sufijo;
  }

  function mostrarFecha() {
    const fecha = new Date();
    const meses = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const mes = meses[fecha.getMonth()];
    const dia = fecha.getDate();
    const sufijo = obtenerSufijo(dia);
    const anio = fecha.getFullYear();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    const ampm = hora >= 12 ? 'pm' : 'am';
    hora %= 12;
    hora = hora || 12;
    minutos = minutos < 10 ? `0${minutos}` : minutos;
    segundos = segundos < 10 ? `0${segundos}` : segundos;
    const horaCompleta = `${hora}:${minutos}:${segundos} ${ampm}`;
    const fechaCompleta = `${mes}, ${dia}${sufijo} ${anio}, ${horaCompleta}`;
    $date.innerHTML = fechaCompleta;
  }

  mostrarFecha();
  setInterval(mostrarFecha, 1000);

  $addPage.addEventListener('click', () => {
    $booksSection.style.display = 'none';
    $contactSection.style.display = 'none';
    $newSection.style.display = 'block';
  });

  $contactPage.addEventListener('click', () => {
    $booksSection.style.display = 'none';
    $contactSection.style.display = 'block';
    $newSection.style.display = 'none';
  });

  $listPage.addEventListener('click', () => {
    $booksSection.style.display = 'block';
    $contactSection.style.display = 'none';
    $newSection.style.display = 'none';
  });
});
