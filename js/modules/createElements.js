

export const createRow = ({id, title, category, units, count, price}) => {

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
