import { $, $$ } from "/js/common/index.js"
import { employesUrl } from "/js/configs/index.js"
import { showPopupEmployeeShowinfo } from "./employeeForm.js"
import employesPagination, { employesSelectQuantities } from "./employesPagination.js"
import EmployesFilter from "../classes/EmployesFilter.js"
import { httpGetAsync } from "/js/utils/request.js"
import { formatDate } from "/js/utils/format.js"
import { showPopupNotify, closePopupNotify } from "./popupNotify.js"
/**
 * useTo: gender employes vào bảng, thêm sk dblclick hiển thị form chi tiết nhân viên
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022 
 */
export function renderEmployes (data = []) {
  try {
    // fake data employes
    var employesContainer = $("#employestable")
    var employesHtml = ""
    for (let item of data) {
      employesHtml += `<tr data-employeeId=${item.EmployeeId}>
    <td class="checkbox"><input type="checkbox" /></td>
    <td>${item.EmployeeCode}</td>
    <td>${item.EmployeeName}</td>
    <td>${item.Gender == 1 ? "Nam" : item.Gender == 0 ? "Nữ" : "Khác"}</td>
    <td class="date">${formatDate(item.DateOfBirth)}</td>
    <td>${item.IdentityNumber}</td>
    <td>${item.PositionName}</td>
    <td>${item.DepartmentName}</td>
    <td>${item.BankAccountNumber}</td>
    <td>${item.BankName}</td>
    <td>${item.BankBranchName}</td>
    <td class="more">
      <div class="employespage__table__action__dropdown">
        Sửa
        <div
          class="employespage__table__action__dropdown--toggle">
          <i class="fas fa-sort-down"></i>
        </div>
        <div class="employespage__table__action__dropdown--list">
          <div
            class="employespage__table__action__dropdown--item">
            Nhân bản
          </div>
          <div
          data-delete=${item.EmployeeId} data-name=${item.EmployeeName} data-code=${item.EmployeeCode}
            class="employespage__table__action__dropdown--item delete">
            Xóa
          </div>
          <div
            class="employespage__table__action__dropdown--item">
            Ngừng sử dụng
          </div>
        </div>
      </div>
    </td>
      </tr>`
    }

    employesContainer.innerHTML = employesHtml

    //add event dblclick để hiện form thông tin chi tiết nhân viên
    var employeeListHtml = $$("#employestable tr")
    for (let i = 0; i < employeeListHtml.length; i++) {
      employeeListHtml[i].addEventListener("dblclick", function (event) {
        if (!event.target.closest(".checkbox") && !event.target.closest(".more")) {
          showPopupEmployeeShowinfo(data[i])
        }
      })
    }

    //add event click để hiện popup xóa
    var employeeListBtnDelHtml = $$("#employestable tr .employespage__table__action__dropdown--item.delete")
    for (let i = 0; i < employeeListBtnDelHtml.length; i++) {
      employeeListBtnDelHtml[i].addEventListener("click", function (event) {
        handleShowPopupDelEmployee(event)
      })
    }
  } catch (err) {
    console.log(err);
  }

}

/**
 * useTo: lấy danh sách nhân viên
 * updateBy: tovantai_12/12/2022
 * author: tovantai
 * createdAt: 12/12/2022
 */
async function getEmployes (querystring) {
  var result = {}
  await new Promise((resolve, reject) => {
    httpGetAsync(`${employesUrl}/filter${querystring}`, { method: "GET" }, resolve, reject, null)
  }).then(res => result = JSON.parse(res)).catch(err => {
    // xử lý khi không lấy được mã nhân viên mới
  })
  return result
}

/**
 * useTo: hiển thị icon loading
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022 
 */
export function showPendingTable () {
  try {
    let employesTableElm = $(".employespage .employespage__table")
    employesTableElm.classList.add("pending")
  } catch (err) {
    console.log(err);
  }

}

/**
 * useTo: ẩn icon loading
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022 
 */
export function hidePendingTable () {
  try {
    let employesTableElm = $(".employespage .employespage__table")
    employesTableElm.classList.remove("pending")
  } catch (err) {
    console.log(err);
  }

}

/**
 * useTo: "
 * hiển thị combobox thay đói số lượng bản ghi trên 1 trang
 * ẩn, hiện pending
 * clear table
 * lấy, hiện dữ liệu employes
 * render phân trang"
 * sau đó ẩn loading và hiện dữ liệu lên bảng"
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
export default async function employesMainFN () {
  try {
    var employesData = {}
    var employeeFilter = new EmployesFilter()
    //hiển thị combobox thay đói số lượng bản ghi trên 1 trang
    employesSelectQuantities(Number(employeeFilter.pageSize))
    showPendingTable()
    $("#employestable").innerHTML = ""//clear table
    //lấy dữ liệu employes
    employesData = await getEmployes(EmployesFilter.getQueryString(employeeFilter))
    hidePendingTable()
    renderEmployes(employesData.Data)
    //hiện tổng bản ghi
    $(".employespage__pagination__left--text b").innerHTML = employesData.TotalRecord
    //render thanh phân trang
    employesPagination(Number(employesData.TotalPage), Number(employeeFilter.pageNumber))
  } catch (err) {
    console.log(err);
  }
}
employesMainFN()

/**
 * useTo: tìm kiếm employes theo mã, tên,...
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022 
 */
function handleSearchEmployes () {
  try {
    var txtEmployeeFilter = $("#employespage__controller__search input[name='txtEmployeeFilter']")
    var employeeFilter = new EmployesFilter()
    if (txtEmployeeFilter.value !== "") {
      console.log(1);
      employeeFilter.employeeFilter = txtEmployeeFilter.value
    } else {
      console.log(2);
      employeeFilter.employeeFilter = ""
    }
    employeeFilter.pageNumber = 1
    EmployesFilter.changeUrl(employeeFilter)
    employesMainFN()
  } catch (err) {

  }

}

/**
 * useTo: hiển thị popup và add sự kiện cho các button
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022 
 */
function handleShowPopupDelEmployee (event) {
  try {
    let employeeId = event.target.dataset.delete
    let employeeName = event.target.dataset.name
    let employeeCode = event.target.dataset.code
    showPopupNotify([`Bạn có muấn xóa nhân viên: "${employeeName}" - "${employeeCode}"?`], "popup-question")
    $("#popupnotify__btnclose").focus()

    //click vào nút đóng
    $("#popupnotify__btnclose").onclick = function () {
      handleClosePopupDelEmployee()
    }
    //click vào overlay
    $("#employespage__popupnotify").onclick = function (e) {
      if (e.target.matches("#employespage__popupnotify")) {
        handleClosePopupDelEmployee()
      }
    }
    //click vào nút đồng ý
    $("#popupnotify__btnok").onclick = async function () {
      try {
        $("#employespage__popupnotify").classList.add("pending")
        await new Promise((resolve, reject) => {
          httpGetAsync(`${employesUrl}/${employeeId}`, { method: "DELETE" }, resolve, reject, null)
        }).then(res => {
          if (res.status == 200) {
            $("#employespage__popupnotify").classList.remove("pending")
            handleClosePopupDelEmployee()
          } else {
            $("#employespage__popupnotify").classList.remove("pending")
            handleClosePopupDelEmployee()
          }
        }).catch(err => {
          $("#employespage__popupnotify").classList.remove("pending")
          handleClosePopupDelEmployee()
          // xử lý khi không xóa đc
        })
      } catch (err) {

      }

    }
  } catch (err) {
    console.log(err);
  }

}

/**
 * useTo: đóng popup và remove sự kiện cho các button
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022 
 */
function handleClosePopupDelEmployee () {
  closePopupNotify()
  $("#popupnotify__btnclose").onclick = null
  $("#popupnotify__btnok").onclick = null
}



//thêm sự kiện cho nút tìm kiếm nhân viên theo mã, tên...
var btnEmployesSearch = $("#employespage__controller__search .input__icon--end")
btnEmployesSearch.addEventListener("click", handleSearchEmployes)


//thêm sk cho nút reload data
var btnReloadDataEmployesTable = $(".employespage .employespage__controller__iconreload")
btnReloadDataEmployesTable.addEventListener("click", employesMainFN)