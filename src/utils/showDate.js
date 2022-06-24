export function showDate(ms) {
  const date = new Date(parseInt(ms));
  const dateNow = new Date();
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
  const fullDate = `${day}.${month}.${date.getFullYear()}`;

  const differenceMinutes = dateNow.getMinutes() - date.getMinutes();
  const diferenceHourse = dateNow.getHours() - date.getHours();
  const diferenceDay = dateNow.getDate() - date.getDate();
  const diferenceMonth = dateNow.getMonth() - date.getMonth();
  const diferenceYears = dateNow.getFullYear() - date.getFullYear();

  const showSeconds =
    differenceMinutes <= 0 &&
    diferenceHourse <= 0 &&
    diferenceDay <= 0 &&
    diferenceMonth <= 0 &&
    diferenceYears <= 0;

  const showMinutes =
    diferenceHourse <= 0 &&
    diferenceDay <= 0 &&
    diferenceMonth <= 0 &&
    diferenceYears <= 0;

  const showMonth =
    diferenceDay <= 0 && diferenceMonth <= 0 && diferenceYears <= 0;

  if (showSeconds) {
    return `${dateNow.getSeconds()} секунд назад`;
  }
  if (showMinutes) {
    return `${differenceMinutes} минут назад`;
  }
  if (showMonth) {
    return `${diferenceHourse} часов назад`;
  }
  if (diferenceMonth <= 0 && diferenceYears <= 0) {
    return `${diferenceDay} дней назад`;
  }
  if (diferenceYears <= 0) return `${diferenceMonth} месяцев назад`;

  return fullDate;
}
