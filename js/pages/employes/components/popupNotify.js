import { $ } from "/js/common/index.js"
/**
 * useTo: hiển thị popup
 * updateAt: tovantai_11/12/2022
 * author: tovantai
 * createAt: 11/12/2022
 * type: popup-warningyellow, popup-warningred, popup-question
 * messengers: []
 */
export function showPopupNotify (messengers = [], type = null) {
  let popupNotifyElm = $("#employespage__popupnotify")
  if (type == "popup-warningred") {
    popupNotifyElm.classList.remove("popup-question")
    popupNotifyElm.classList.add("popup-warningred")
  } else if (type == "popup-question") {
    popupNotifyElm.classList.remove("popup-warningred")
    popupNotifyElm.classList.add("popup-question")
  } else {
    popupNotifyElm.classList.remove("popup-warningred")
    popupNotifyElm.classList.remove("popup-question")
  }
  popupNotifyElm.classList.add("show")
  let popupNotifyHtml = ""
  for (let messenger of messengers) {
    popupNotifyHtml += `${messenger} <br/>`
  }
  popupNotifyElm.querySelector(".employespage__popupnotify__body__messenger").innerHTML = popupNotifyHtml
}

/**
 * useTo: đóng popup
 * updateAt: tovantai_11/12/2022
 * author: tovantai
 * createAt: 11/12/2022
 */
export function closePopupNotify () {
  $("#employespage__popupnotify").classList.remove("show")
}
