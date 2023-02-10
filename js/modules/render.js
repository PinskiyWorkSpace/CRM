import {createRow} from './createElements.js';
import {totalPriceTable} from './control.js';

export const tbody = document.querySelector('tbody');

export const renderGoods = (arr) => {
  arr.map((el) => {
    tbody.append(createRow(el));
  });
  totalPriceTable();
};
