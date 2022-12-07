import { $, $$ } from "/js/common/index.js"
/**
 * useTo: hiển thị popup form tạo mới nhân viên
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
function showPopupEmployeeCreatenew () {
  var employeeformElm = document.getElementById("employespage__employeeform")
  employeeformElm.classList.remove("showinfo")
  employeeformElm.classList.add("createnew")
  employeeformElm.classList.add("show")
}
/**
 * useTo: hiển thị popup form thông tin nhân viên
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
export function showPopupEmployeeShowinfo () {
  var employeeformElm = document.getElementById("employespage__employeeform")
  employeeformElm.classList.remove("createnew")
  employeeformElm.classList.add("showinfo")
  employeeformElm.classList.add("show")
}
/**
 * useTo: đóng popup form nhân viên
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
export function closePopupEmployee () {
  document.getElementById("employespage__employeeform").classList.remove("show")
}

var btnOpenCreateEmployeeFormElm = $("#btn__createnew__employee")
btnOpenCreateEmployeeFormElm.addEventListener("click", showPopupEmployeeCreatenew)

var btnCloseEmployeeFormHeadingElm = $("#employespage__employeeform .employespage__employeeform--close")
btnCloseEmployeeFormHeadingElm.addEventListener("click", closePopupEmployee)

var employeeFormElm = $("#employespage__employeeform")
employeeFormElm.addEventListener("click", function (event) {
  if (event.target.matches("#employespage__employeeform")) {
    closePopupEmployee()
  }
})

var btnCloseEmployeeFormFooter = $("#employespage__employeeform__footer__btncloseform")
btnCloseEmployeeFormFooter.addEventListener("click", closePopupEmployee)