

export const URL = 'https://vast-boom-utensil.glitch.me/api/goods/';

export const fetchRequest = async (url, {
  method = 'GET',
  callBack,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      if (callBack) callBack(null, data);
      return data;
    }

    throw new Error(` Ошибка ${response.status}: ${response.statusText}`);

  } catch (err) {
    return callBack(err);
  }
};




