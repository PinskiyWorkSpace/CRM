import {renderGoods} from './modules/render.js';
import {URL, fetchRequest} from './modules/request.js';
import { totalPriceTable } from './modules/control.js';

const init = () => fetchRequest('https://vast-boom-utensil.glitch.me/api/goods', {
  method: 'GET',
  callBack: renderGoods,
  }
);

init();





