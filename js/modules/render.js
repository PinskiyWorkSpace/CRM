import {createRow} from './createElements.js';
import {totalPriceTable} from './control.js';
import { URL, fetchRequest } from './request.js';

const tbody = document.querySelector('tbody');

export const renderGoods = (err, data) => {
  if (err) {
    console.warn(data);
    const h2 = document.createElement('h2');
    h2.style.color = 'red';
    h2.textContent = err;
    document.body.append(h2);
    return;
  }

  data.map((el) => {
    tbody.append(createRow(el));
  });
  fetchRequest(URL, {
    method: 'GET',
    callBack: totalPriceTable,
  });
};



