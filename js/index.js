'use strict';

const title = document.querySelector('.form__title');
const cardId = document.querySelector('.title--id');
const btnId = document.querySelector('.title__btn--id');
const form = document.querySelector('.form');
const checkbox = document.querySelector('.checkbox__input');
const inputCheckbox = document.querySelector('.form__input_disabled');
const totalPrice = document.querySelector('.total-table__price');
const totalPriceModal = document.querySelector('.total-cost__price');
const tbody = document.querySelector('tbody');
const tableBtn = document.querySelector('.table__btn');
const table = document.querySelector('.table-product');
const overlayCardProduct = document.querySelector('.overlay__card-product');
const close = document.querySelector('.close');
const cardProduct = document.querySelector('.card-product');

let product = [
  {
    "id": 253842678,
    "title": "Смартфон Xiaomi 11T 8/128GB",
    "price": 27000,
    "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
    "category": "mobile-phone",
    "discont": false,
    "count": 3,
    "units": "шт",
    "images": {
      "small": "img/smrtxiaomi11t-m.jpg",
      "big": "img/smrtxiaomi11t-b.jpg"
    }
  },
  {
    "id": 296378448,
    "title": "Радиоуправляемый автомобиль Cheetan",
    "price": 4000,
    "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
    "category": "toys",
    "discont": 5,
    "count": 1,
    "units": "шт",
    "images": {
      "small": "img/cheetancar-m.jpg",
      "big": "img/cheetancar-b.jpg"
    }
  },
  {
    "id": 215796548,
    "title": "ТВ приставка MECOOL KI",
    "price": 12400,
    "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
    "category": "tv-box",
    "discont": 15,
    "count": 4,
    "units": "шт",
    "images": {
      "small": "img/tvboxmecool-m.jpg",
      "big": "img/tvboxmecool-b.jpg"
    }
  },
  {
    "id": 246258248,
    "title": "Витая пара PROConnect 01-0043-3-25",
    "price": 22,
    "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
    "category": "cables",
    "discont": false,
    "count": 420,
    "units": "шт",
    "images": {
      "small": "img/lan_proconnect43-3-25.jpg",
      "big": "img/lan_proconnect43-3-25-b.jpg"
    }
  }
];

const closeModal = () => {
  overlayCardProduct.style.display = 'none';
  table.style.display = 'flex';
};

const totalPriceTable = () => {

  let num = 0;

  product.forEach(obj => {
    num += (obj.price * obj.count);
  });

  totalPrice.textContent = `$${num}`;
};

const createRow = ({id, title, category, units, count, price}) => {

  const tr = document.createElement('tr');

  tr.classList.add('tableRow');

  tr.dataset.id = id;

  tr.insertAdjacentHTML('beforeend', `
    <td>${id}</td>
    <td>${title}</td>
    <td>${category}</td>
    <td>${units}</td>
    <td>${count}</td>
    <td>$${price}</td>
    <td>$${price * count}</td>
    <td>
      <button  class="btn_product" type="submit">
        <img src="./image/img-product.svg" alt="Изображение товара">
      </button>
      <button class="btn_product" type="submit">
        <img src="./image/add-product.svg" alt="Добавить товар">
      </button>
      <button class="btn_product delite_product" type="submit">
        <img src="./image/delite-product.svg" alt="Удалить товар">
      </button>
    </td>
  `);

  return tr;
};

const renderGoods = (arr) => {
  arr.map((el) => {
    tbody.append(createRow(el));
  });
  totalPriceTable();
};

renderGoods(product);

tableBtn.addEventListener('click', () => {
  overlayCardProduct.style.display = 'flex';
  table.style.display = 'none';
});

overlayCardProduct.addEventListener('click', e => {
  const target = e.target;
  if (target ===  close ||
  target === overlayCardProduct) {
    closeModal();
  };
});

tbody.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.delite_product')) {
      const idProduct = target.closest('.tableRow');
      idProduct.remove();

      product.forEach((elem, index) => {
        if (elem.id == idProduct.dataset.id) {
          product.splice(index, 1);
        };
      });
      console.log(product);
    };
    totalPriceTable();
  });

checkbox.addEventListener('change', (e) => {

      if (e.target.checked) {
        inputCheckbox.removeAttribute('disabled');
      } else {
        inputCheckbox.value = '';
        inputCheckbox.setAttribute('disabled', 'true' );
      }
  });

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const newProduct = Object.fromEntries(formData);

  newProduct.id = cardId.textContent;

  product.push(newProduct);

  tbody.append(createRow(newProduct));

  form.reset();
  closeModal();

  totalPriceTable();
  console.log(newProduct);
});

form.addEventListener('change', () => {
  let num = 0;

  num = form.price.value * form.count.value;

  totalPriceModal.textContent = `$${num}`;
});
