import {createRow} from './createElements.js';
import {URL, fetchRequest} from './request.js';

const totalPrice = document.querySelector('.total-table__price');
const overlayCardProduct = document.querySelector('.overlay__card-product');
const table = document.querySelector('.table-product');
const form = document.querySelector('.form');
const checkbox = document.querySelector('.checkbox__input');
const inputCheckbox = document.querySelector('.form__input_disabled');
const totalPriceModal = document.querySelector('.total-cost__price');
const tableBtn = document.querySelector('.table__btn');
const close = document.querySelector('.close');
const tbody = document.querySelector('tbody');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');


const closeModal = () => {
  overlayCardProduct.style.display = 'none';
  table.style.display = 'flex';
};

export const totalPriceTable = (err, data) => {

  let num = 0;

  data.forEach(obj => {
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
  }
});

tbody.addEventListener('click',async e => {
    const target = e.target;

    if (target.closest('.delite_product')) {
      const idProduct = target.closest('.tableRow');
      idProduct.remove();

      await fetchRequest(`${URL}${idProduct.dataset.id}`, {
        method: 'DELETE',
      });
    }

    await fetchRequest(URL, {
      method: 'GET',
      callBack: totalPriceTable,
    });
  });

  checkbox.addEventListener('change', (e) => {

      if (e.target.checked) {
        inputCheckbox.removeAttribute('disabled');
      } else {
        inputCheckbox.value = '';
        inputCheckbox.setAttribute('disabled', 'true' );
      }
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);

    await fetchRequest('https://vast-boom-utensil.glitch.me/api/goods', {
      method: 'POST',
      body: newProduct,
      callBack(err, data) {
        if (err) {
          modal.style.display = 'block';
          form.reset();

          modal.addEventListener('click', (e) => {
            if (e.target === modalClose) {
              modal.style.display = 'none';
            }
          });

          return;
        }

        tbody.append(createRow(data));
        form.reset();
        closeModal();
      },
    });

    await fetchRequest(URL, {
      method: 'GET',
      callBack: totalPriceTable,
    });
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
