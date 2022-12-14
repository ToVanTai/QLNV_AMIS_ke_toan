import { $, regularEmail } from "/js/common/index.js"
import { employesUrl, departmentsUrl } from "/js/configs/index.js"
import { httpGetAsync } from "/js/utils/request.js"
import { showPopupNotify, closePopupNotify } from "../components/popupNotify.js"
var newEmployeeCode = null
var departments = null
var employeeIdUpdate = null
/**
 * useTo: lấy mã nhân viên mới nhất
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
function clearForm () {
  try {
    $("#txtEmployeeCode").value = ""
    $("#txtEmployeeName").value = ""
    $("#txtDepartmentId").value = ""
    $("#txtPositionName").value = ""
    $("#txtAddress").value = ""
    $("#txtDateOfBirth").value = ""
    $("#txtIdentityNumber").value = ""
    $("#txtIdentityDate").value = ""
    $("#txtIdentityPlace").value = ""
    $("#txtPhoneNumber").value = ""
    $("#txtTelephoneNumber").value = ""
    $("#txtEmail").value = ""
    $("#txtBankAccountNumber").value = ""
    $("#txtBankName").value = ""
    $("#txtBankBranchName").value = ""
  } catch (err) {
    console.log(err);
  }

}

/**
 * useTo: lấy mã nhân viên mới nhất
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
async function getNewEmployeeCode () {
  await new Promise((resolve, reject) => {
    httpGetAsync(`${employesUrl}/NewEmployeeCode`, { method: "GET" }, resolve, reject, null)
  }).then(res => newEmployeeCode = res).catch(err => {
    // xử lý khi không lấy được mã nhân viên mới
  })
}

/**
 * useTo: lấy danh sách phòng ban
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
async function getDepartments () {
  await new Promise((resolve, reject) => {
    httpGetAsync(`${departmentsUrl}`, { method: "GET" }, resolve, reject, null)
  }).then(res => departments = JSON.parse(res)).catch(err => {
    // xử lý khi không lấy được mã nhân viên mới
  })
}

/**
 * useTo: hiển thị popup form thông tin nhân viên
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
export async function showPopupEmployeeShowinfo (employee) {
  try {
    var employeeformElm = document.getElementById("employespage__employeeform")
    employeeformElm.classList.remove("createnew")
    employeeformElm.classList.add("showinfo")
    employeeformElm.classList.add("show")
    employeeIdUpdate = employee.EmployeeId
    clearForm()
    $("#txtEmployeeCode").value = employee.EmployeeCode || ""
    $("#txtEmployeeName").value = employee.EmployeeName || ""
    $("#txtPositionName").value = employee.PositionName || ""
    $("#txtDateOfBirth").value = employee.DateOfBirth || "";
    (Number(employee.Gender) === 1) ? ($("#gender__male").checked = true) : (Number(employee.Gender) === 0) ? ($("#gender__female").checked = true) : ($("#gender__other").checked = true);
    $("#txtIdentityNumber").value = employee.IdentityNumber || ""
    $("#txtIdentityDate").value = employee.IdentityDate || ""
    $("#txtIdentityPlace").value = employee.IdentityPlace || ""
    $("#txtAddress").value = employee.Address || ""
    $("#txtPhoneNumber").value = employee.PhoneNumber || ""
    $("#txtTelephoneNumber").value = employee.TelephoneNumber || ""
    $("#txtEmail").value = employee.Email || ""
    $("#txtBankAccountNumber").value = employee.BankAccountNumber || ""
    $("#txtBankName").value = employee.BankName || ""
    $("#txtBankBranchName").value = employee.BankBranchName || ""
    //hiển thị department
    if (departments == null) {
      showPendingForm()
      await getDepartments()
      hidePendingForm()
    }
    var departmentsHtml = ""
    for (let department of departments) {
      if (department.DepartmentId == employee.DepartmentId) {
        departmentsHtml += `<option value="${department.DepartmentId}" selected>${department.DepartmentName}</option>`
      }
      departmentsHtml += `<option value="${department.DepartmentId}">${department.DepartmentName}</option>`
    }
    $("#txtDepartmentId").innerHTML = departmentsHtml
  } catch (err) {
    console.log(err);
  }

}

/**
 * useTo: hiển thị popup form tạo mới nhân viên
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
async function showPopupEmployeeCreatenew () {
  try {
    var employeeformElm = document.getElementById("employespage__employeeform")
    employeeformElm.classList.remove("showinfo")
    employeeformElm.classList.add("createnew")
    employeeformElm.classList.add("show")
    clearForm()
    //lấy mã nhân viên mới và danh sách phòng ban
    showPendingForm()
    await Promise.all([getDepartments(), getNewEmployeeCode()])
    hidePendingForm()
    $("#txtEmployeeCode").value = newEmployeeCode
    var departmentsHtml = ""
    for (let department of departments) {
      departmentsHtml += `<option value="${department.DepartmentId}">${department.DepartmentName}</option>`
    }
    $("#txtDepartmentId").innerHTML = departmentsHtml
    //focus vào input tên nhân viên
    $("#txtEmployeeName").focus()
  } catch (err) {
    hidePendingForm()
    console.log(err);
  }
}

/**
 * useTo: đóng popup form nhân viên
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
export function closePopupEmployee () {
  try {
    document.getElementById("employespage__employeeform").classList.remove("show")
  } catch (err) { console.log(err); }
}

/**
 * useTo: hiển thị pending form employee
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
export function showPendingForm () {
  $("#employespage__employeeform").classList.add("pending")
}
/**
 * useTo: ẩn thị pending form employee
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
export function hidePendingForm () {
  $("#employespage__employeeform").classList.remove("pending")
}
/**
 * useTo: xử lý khi submit form thêm mới nhân viên
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
function handleSubmitCreateEmployeeForm (e) {
  try {
    e.preventDefault()
    let txtEmployeeName = $("#txtEmployeeName")
    let txtEmail = $("#txtEmail")
    let listErr = []
    let firstErr = ""

    //nếu có lỗi email
    if (!regularEmail.test(txtEmail.value)) {
      listErr.unshift("Email không đúng định dạng")
      txtEmail.focus()
      firstErr = txtEmail
    }
    //nếu có lỗi tên nhân viên
    if (!txtEmployeeName.value || txtEmployeeName.value.trim().length == 0) {
      listErr.unshift("Tên không đúng định dạng")
      txtEmployeeName.focus()
      firstErr = txtEmployeeName
    }
    //hiển thị thông báo nếu có lỗi
    if (listErr.length != 0) {
      showPopupNotify(listErr)
      $("#popupnotify__btnclose").focus()
      //đóng popup
      $("#popupnotify__btnclose").onclick = function () {
        closePopupNotify()
        firstErr.focus()
        $("#popupnotify__btnclose").onclick = null
      }
    } else {
      //lấy form
      let formEmployee = $("#employespage__employeeform form")
      let formData = Object.fromEntries(new FormData(formEmployee).entries());
      //gọi api đẩy dữ liệu lên server
      var headers = new Headers()
      headers.append("Content-Type", "application/json")
      showPendingForm()
      fetch(employesUrl, {
        method: "POST",
        body: JSON.stringify(formData),
        headers
      }).then(res => {
        if (res.status == 201) {
          //xóa pending icon
          hidePendingForm()
          //lấy mã nhân viên mới
          showPopupEmployeeCreatenew()
        } else {
          //hiện lỗi
          res.json().then(res => {
            hidePendingForm()
            showPopupNotify([res.userMsg])
            $("#popupnotify__btnclose").focus()
            //đóng popup
            $("#popupnotify__btnclose").onclick = function () {
              closePopupNotify()
            }
          }
          )
        }
      })
    }
  } catch (err) {
    hidePendingForm()
    console.log(err);
  }
}
/**
 * useTo: xử lý khi submit form thêm mới nhân viên
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
function handleSubmitCreateAndCloseEmployeeForm (e) {
  try {
    e.preventDefault()
    let txtEmployeeName = $("#txtEmployeeName")
    let txtEmail = $("#txtEmail")
    let listErr = []
    let firstErr = ""

    //nếu có lỗi email
    if (!regularEmail.test(txtEmail.value)) {
      listErr.unshift("Email không đúng định dạng")
      txtEmail.focus()
      firstErr = txtEmail
    }
    //nếu có lỗi tên nhân viên
    if (!txtEmployeeName.value || txtEmployeeName.value.trim().length == 0) {
      listErr.unshift("Tên không đúng định dạng")
      txtEmployeeName.focus()
      firstErr = txtEmployeeName
    }
    //hiển thị thông báo nếu có lỗi
    if (listErr.length != 0) {
      showPopupNotify(listErr)
      $("#popupnotify__btnclose").focus()
      //đóng popup
      $("#popupnotify__btnclose").onclick = function () {
        closePopupNotify()
        firstErr.focus()
        $("#popupnotify__btnclose").onclick = null
      }
    } else {
      //lấy form
      let formEmployee = $("#employespage__employeeform form")
      let formData = Object.fromEntries(new FormData(formEmployee).entries());
      //gọi api đẩy dữ liệu lên server
      var headers = new Headers()
      headers.append("Content-Type", "application/json")
      showPendingForm()
      fetch(employesUrl, {
        method: "POST",
        body: JSON.stringify(formData),
        headers
      }).then(res => {
        if (res.status == 201) {
          //xóa pending icon
          hidePendingForm()
          //clear form
          clearForm()
          closePopupEmployee()
        } else {
          //hiện lỗi
          res.json().then(res => {
            hidePendingForm()
            showPopupNotify([res.userMsg])
            $("#popupnotify__btnclose").focus()
            //đóng popup
            $("#popupnotify__btnclose").onclick = function () {
              closePopupNotify()
            }
          }
          )
        }
      })
    }
  } catch (err) {
    hidePendingForm()
    console.log(err);
  }
}
/**
 * useTo: xử lý khi submit form cập nhật nhân viên
 * updateBy: tovantai_12/12/2022
 * author: tovantai
 * createdAt: 12/12/2022
 */
function handleSubmitUpdateEmployeeForm (e) {
  try {
    e.preventDefault()
    let txtEmployeeName = $("#txtEmployeeName")
    let txtEmail = $("#txtEmail")
    let listErr = []
    let firstErr = ""

    //nếu có lỗi email
    if (!regularEmail.test(txtEmail.value)) {
      listErr.unshift("Email không đúng định dạng")
      txtEmail.focus()
      firstErr = txtEmail
    }
    //nếu có lỗi tên nhân viên
    if (!txtEmployeeName.value || txtEmployeeName.value.trim().length == 0) {
      listErr.unshift("Tên không đúng định dạng")
      txtEmployeeName.focus()
      firstErr = txtEmployeeName
    }
    //hiển thị thông báo nếu có lỗi
    if (listErr.length != 0) {
      showPopupNotify(listErr)
      $("#popupnotify__btnclose").focus()
      //đóng popup
      $("#popupnotify__btnclose").onclick = function () {
        closePopupNotify()
        firstErr.focus()
        $("#popupnotify__btnclose").onclick = null
      }
    } else {
      //lấy form
      let formEmployee = $("#employespage__employeeform form")
      let formData = Object.fromEntries(new FormData(formEmployee).entries());
      //gọi api đẩy dữ liệu lên server
      var headers = new Headers()
      headers.append("Content-Type", "application/json")
      showPendingForm()
      fetch(`${employesUrl}/${employeeIdUpdate}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers
      }).then(res => {
        if (res.status == 200) {
          //đóng form
          hidePendingForm()
          closePopupEmployee()
        } else {
          //hiện lỗi
          res.json().then(res => {
            hidePendingForm()
            showPopupNotify([res.userMsg])
            $("#popupnotify__btnclose").focus()
            //đóng popup
            $("#popupnotify__btnclose").onclick = function () {
              closePopupNotify()
            }
          }
          )
        }
      })
    }
  } catch (err) {
    hidePendingForm()
    console.log(err);
  }
}
//mở form khi click vào nút thêm nhân viên mới
var btnOpenCreateEmployeeForm = $("#btn__createnew__employee")
btnOpenCreateEmployeeForm.addEventListener("click", showPopupEmployeeCreatenew)

//đóng form khi click vào dấu x
var btnHeaderCloseEmployeeForm = $("#employespage__employeeform .employespage__employeeform--close")
btnHeaderCloseEmployeeForm.addEventListener("click", closePopupEmployee)

//đóng form khi click vào phần overlay
var employeeFormElm = $("#employespage__employeeform")
employeeFormElm.addEventListener("click", function (event) {
  if (event.target.matches("#employespage__employeeform")) {
    closePopupEmployee()
  }
})
//đóng form khi click vào nút hủy
var btnFooterResetEmployeeForm = $("#employespage__employeeform__footer__btnresetform")
btnFooterResetEmployeeForm.addEventListener("click", function (e) {
  e.preventDefault()
  closePopupEmployee()
})
//thêm sự kiện submit form thêm mới nhân viên vào nút cất và thêm
var btnFooterSubmitCreateEmployeeForm = $("#employespage__employeeform__footer__btncreatenew")
btnFooterSubmitCreateEmployeeForm.addEventListener('click', handleSubmitCreateEmployeeForm)
//thêm sự kiện submit form thêm mới nhân viên vào nut cất 
var btnFooterSubmitCreateAndCloseEmployeeForm = $("#employespage__employeeform__footer__btncloseform")
btnFooterSubmitCreateAndCloseEmployeeForm.addEventListener('click', handleSubmitCreateAndCloseEmployeeForm)
//thêm sự kiện submit form cập nhật nhân viên vào nút sửa
var btnFooterSubmitUpdateEmployeeForm = $("#employespage__employeeform__footer__btnupdate")
btnFooterSubmitUpdateEmployeeForm.addEventListener('click', handleSubmitUpdateEmployeeForm)
