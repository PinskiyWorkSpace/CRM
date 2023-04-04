import loadStyles from './loadStyle.js';
import {
  modalControl
} from './modalControl.js';


export const createModal = async (err, data) => {
  await loadStyles("../../style/card-product.css");

  if (data) {

    const overlay = document.createElement('div');
    overlay.classList.add('overlay__card-product');

    const cardProduct = document.createElement('div');
    cardProduct.classList.add('card-product');

    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('title__wrapper');
    titleWrapper.innerHTML = `
          <h1 class="form__title">Добавить товар</h1>
            <div class="title__wrapper--id">id:
              <div class="title--id">${data.id}</div>
              <button class="title__btn--id">
                <img src="image/add-product.svg" alt="иконка кнопки">
              </button>
            </div>
    `;
    const hr = document.createElement('hr');

    const close = document.createElement('button');
    close.classList.add('close');

    const form = document.createElement('form');
    form.classList.add('form');
    form.innerHTML = `
          <fieldset class="fieldset">

            <label class="name">Наименование
              <input class="form__input" type="text" name="title" value="${data.title}" required>
            </label>

            <label class="category">Категория
              <input class="form__input" type="text" name="category" value="${data.category}" required>
            </label>

            <label class="units">Единицы измерения
              <input class="form__input" type="text" name="units" value="${data.units}" required>
            </label>

            <label class="discount">Дисконт
              <input class="checkbox checkbox__input" type="checkbox" >
              <input class="form__input form__input_disabled" type="text" name="discont"
              disabled="true">
            </label>

            <label class="description">Описание
              <textarea class="form__textarea" name="description" cols="30" rows="3"  required>${data.description}</textarea>
            </label>

            <label class="count">Колличество
              <input class=" form__input" type="number" name="count" value="${data.count}" required>
            </label>

            <label class="prise">Цена
              <input class="form__input " type="number" name="price" value="${data.price}" required>
            </label>

            <label class="image">Добавить изображение
              <input class="form__image-upload" type="file" name="image">
            </label>
          </fieldset>

          <div class="wrapper__preview">
            <img class="preview" src="${'https://vast-boom-utensil.glitch.me/'}${data.image}">
          </div>

          <div class="wrapper">
            <p class="total-cost__text" >Итоговая стоимость:
              <span class="total-cost__price">$ 0</span>
            </p>
            <button class="form__btn" type="submit">Изменить товар</button>
          </div>
    `;

    cardProduct.append(titleWrapper, hr, close, form);
    overlay.append(cardProduct);
    document.body.prepend(overlay);

    modalControl();

  } else {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay__card-product');

    const cardProduct = document.createElement('div');
    cardProduct.classList.add('card-product');

    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('title__wrapper');
    titleWrapper.innerHTML = `
          <h1 class="form__title">Добавить товар</h1>
    `;

    const hr = document.createElement('hr');

    const close = document.createElement('button');
    close.classList.add('close');

    const form = document.createElement('form');
    form.classList.add('form');
    form.innerHTML = `
          <fieldset class="fieldset">

            <label class="name">Наименование
              <input class="form__input" type="text" name="title" required>
            </label>

            <label class="category">Категория
              <input class="form__input" type="text" name="category" required>
            </label>

            <label class="units">Единицы измерения
              <input class="form__input" type="text" name="units" required>
            </label>

            <label class="discount">Дисконт
              <input class="checkbox checkbox__input" type="checkbox" >
              <input class="form__input form__input_disabled" type="text" name="discont" disabled="true">
            </label>

            <label class="description">Описание
              <textarea class="form__textarea" name="description" cols="30" rows="3" required></textarea>
            </label>

            <label class="count">Колличество
              <input class=" form__input" type="number" name="count" required>
            </label>

            <label class="prise">Цена
              <input class="form__input " type="number" name="price" required>
            </label>

            <div class="warning">
              Изображение не должно
              превышать размер 1 Мб
            </div>

            <label class="image">Добавить изображение
              <input class="form__image-upload" type="file" name="image" id="image" accept="image/*">
            </label>

          </fieldset>

          <div class="wrapper__preview">
            <img class="preview">
          </div>

          <div class="wrapper">
            <p class="total-cost__text" >Итоговая стоимость:
              <span class="total-cost__price">$ 0</span>
            </p>
            <button class="form__btn" type="submit">Добавить товар</button>
          </div>
    `;

    cardProduct.append(titleWrapper, hr, close, form);
    overlay.append(cardProduct);
    document.body.prepend(overlay);

    modalControl();
  }

};
