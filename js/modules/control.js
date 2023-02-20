import {createRow} from './createElements.js';

const totalPrice = document.querySelector('.total-table__price');
const overlayCardProduct = document.querySelector('.overlay__card-product');
const table = document.querySelector('.table-product');
const cardId = document.querySelector('.title--id');
const form = document.querySelector('.form');
const checkbox = document.querySelector('.checkbox__input');
const inputCheckbox = document.querySelector('.form__input_disabled');
const totalPriceModal = document.querySelector('.total-cost__price');
const tableBtn = document.querySelector('.table__btn');
const close = document.querySelector('.close');
const tbody = document.querySelector('tbody');

export let product = [
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

export const closeModal = () => {
  overlayCardProduct.style.display = 'none';
  table.style.display = 'flex';
};

export const totalPriceTable = () => {

  let num = 0;

  product.forEach(obj => {
    num += (obj.price * obj.count);
  });

  totalPrice.textContent = `$${num}`;
};

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
      console.log('idProduct: ', idProduct.dataset.pic);
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

const getImage = () => {
  tbody.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.btn_image')) {
      const productPic = target.closest('.tableRow');
      const image = productPic.dataset.pic;
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const left = (screenWidth / 2) - 300;
      const top = (screenHeight / 2) - 300;

      open(image, 'imege', `width=600, height=600,left=${left}, top=${top}`);
    }
  });
};

getImage();
