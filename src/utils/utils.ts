import { format, formatDistanceToNowStrict, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";

export function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function uuid(): string {
  return ('' + [1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, ch => {
    let c = Number(ch);
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  }
  )
}

export function setCookie(name: string, value: string | null, props?: any) {
  props = props || {};
  let exp = props.expires;

  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  if (value) {
    value = encodeURIComponent(value);
  }
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie + ";path=/";
}


export const placeOrderDate = (date: string) => {

  const dateCreatedOrder = new Date(date);

  const day = isToday(dateCreatedOrder)
    ? 'Сегодня'
    : isYesterday(dateCreatedOrder)
      ? 'Вчера'
      : formatDistanceToNowStrict(dateCreatedOrder, {
        unit: 'day',      // кол-во дней, если не 'сегодня-вчера'
        addSuffix: true, // 'назад'
        locale: ru,
      });

  const hours = format(dateCreatedOrder, 'p', { locale: ru }); //24-ч 'русская' система

  return `${day}, ${hours} i-GMT+3`;
};

