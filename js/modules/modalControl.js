import {closeModal} from './control.js';
import {fetchRequest} from './request.js';
import {totalPriceTable} from './control.js';
import {createRow} from './createElements.js';


export const modalControl = () => {

  const overlay = document.querySelector('.overlay__card-product');
  const form = document.querySelector('.form');
  const checkbox = document.querySelector('.checkbox__input');
  const inputCheckbox = document.querySelector('.form__input_disabled');
  const totalPriceModal = document.querySelector('.total-cost__price');
  const modal = document.querySelector('.modal');
  const modalClose = document.querySelector('.modal__close');
  const tbody = document.querySelector('tbody');
  const close = document.querySelector('.close');
  const preview = document.querySelector('.preview');
  const file = document.querySelector('.form__image-upload');
  const warning = document.querySelector('.warning');

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('loadend', () => {
      resolve(reader.result);
    });

    reader.addEventListener('error', err => {
      reject(err);
    });

    reader.readAsDataURL(file);
  });

  checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
      inputCheckbox.removeAttribute('disabled');
    } else {
      inputCheckbox.value = '';
      inputCheckbox.setAttribute('disabled', 'true');
    }
  });

  overlay.addEventListener('click', e => {
    const target = e.target;
    if (target === close ||
      target === overlay) {
      closeModal();
    }
  });

  form.addEventListener('change', () => {

    let num = 0;

    num = form.price.value * form.count.value;

    totalPriceModal.textContent = `$${num}`;
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);
    newProduct.image = await toBase64(newProduct.image);

    await fetchRequest('https://vast-boom-utensil.glitch.me/api/goods', {
      method: 'POST',
      body: newProduct,
      callBack(err, data) {
        if (err) {
          console.log('err: ', err);
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

    await fetchRequest('https://vast-boom-utensil.glitch.me/api/goods', {
      method: 'GET',
      callBack: totalPriceTable,
    });
  });

  file.addEventListener('change', () => {
    if (file.files.length > 0) {
      if (file.files[0].size < 1e6) {
        console.log('1e6: ', 1e6);
        console.log('file.files[0]: ', file.files[0]);
        const src = URL.createObjectURL(file.files[0]);
        preview.src = src;
      } else {
        warning.style.display = 'block';
      }
    }
  });

  form.addEventListener('input', ({target}) => {
    if (target === form.title || target === form.category || target === form.description) {
      target.value = target.value.replace(/[^а-яё-]/i, '');
    };

    if (target === form.units ) {
      target.value = target.value.replace(/[^а-яё]/i, '');
    };

    if (target === form.count || target === form.discont || target === form.price ) {
      target.value = target.value.replace(/[^0-9]/i, '');
    };
  });
};
