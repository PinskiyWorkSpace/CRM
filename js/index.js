import {renderGoods, tbody} from './modules/render.js';
import {totalPriceTable, product, closeModal, overlayCardProduct, table} from './modules/control.js';
import {createRow} from './modules/createElements.js';


const cardId = document.querySelector('.title--id');
const form = document.querySelector('.form');
const checkbox = document.querySelector('.checkbox__input');
const inputCheckbox = document.querySelector('.form__input_disabled');
const totalPriceModal = document.querySelector('.total-cost__price');
const tableBtn = document.querySelector('.table__btn');
const close = document.querySelector('.close');

const init = () => {
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
};

init();
