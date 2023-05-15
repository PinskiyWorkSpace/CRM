import {URL, fetchRequest} from './request.js';
import {createModal} from './modal.js';
import {createRow} from './createElements.js'

const totalPrice = document.querySelector('.total-table__price');

const table = document.querySelector('.table-product');
const tableBtn = document.querySelector('.table__btn');
const tbody = document.querySelector('tbody');
const search = document.querySelector('.search');

search.addEventListener('input', async () => {
  const data = await fetchRequest(URL, {
    method: 'GET',
  });
  data.forEach((el, index) => {
    const resultTitle = el.title.toLowerCase().includes(search.value.toLowerCase());
    const resultСategory = el.category.toLowerCase().includes(search.value.toLowerCase());
    if(resultTitle || resultСategory) {
      tbody.rows[index].style.display = 'table-row';
    }else{
      tbody.rows[index].style.display = 'none';
    }
  });
});

export const closeModal = () => {
  const overlayCardProduct = document.querySelector('.overlay__card-product');
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

tbody.addEventListener('click', async e => {
    const target = e.target;

    if (target.closest('.delite_product')) {
      const idProduct = target.closest('.tableRow');
      idProduct.remove();

      await fetchRequest(`${URL}${idProduct.dataset.id}`, {
        method: 'DELETE',
      });
    }

    if (target.closest('.edit_product')) {
      const idProduct = target.closest('.tableRow');
      table.style.display = 'none';

      await fetchRequest(`${URL}${idProduct.dataset.id}`, {
        method: 'GET',
        callBack: createModal,
      });
    }

    await fetchRequest(URL, {
      method: 'GET',
      callBack: totalPriceTable,
    });
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

      open(image, 'image', `width=600, height=600,left=${left}, top=${top}`);
    }
  });
};

getImage();

tableBtn.addEventListener('click', () => {
  table.style.display = 'none';
  createModal();
});







