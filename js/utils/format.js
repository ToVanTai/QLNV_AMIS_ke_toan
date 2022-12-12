function padTo2Digits (num) {
  try {
    return num.toString().padStart(2, '0');
  } catch (err) {
    console.log(err);
  }
}
/**
 * useTo: định dạng date
 * updateAt: tovantai_12/12/2022
 * author: tovantai
 * createdAt: 12/12/2022 
 */
export function formatDate (dateString) {
  try {
    let date = new Date(dateString)
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('/');
  } catch (err) {
    console.log(err);
  }
}