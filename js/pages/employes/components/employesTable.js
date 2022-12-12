import { $, $$ } from "/js/common/index.js"
import { employesUrl } from "/js/configs/index.js"
import { showPopupEmployeeShowinfo } from "./employeeForm.js"
import employesPagination, { employesSelectQuantities } from "./employesPagination.js"
import EmployesFilter from "../classes/EmployesFilter.js"
import { httpGetAsync } from "/js/utils/request.js"
import { formatDate } from "/js/utils/format.js"
/**
 * useTo: gender employes vào bảng
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
          data-delete=${item.EmployeeId}
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
          showPopupEmployeeShowinfo()
        }
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
  var txtEmployeeFilter = $("#employespage__controller__search input[name='txtEmployeeFilter']")
  if (txtEmployeeFilter.value) {
    var employeeFilter = new EmployesFilter()
    employeeFilter.employeeFilter = txtEmployeeFilter.value
    employeeFilter.pageNumber = 1
    EmployesFilter.changeUrl(employeeFilter)
    employesMainFN()
  }
}
//thêm sự kiện cho nút tìm kiếm nhân viên theo mã, tên...
var btnEmployesSearch = $("#employespage__controller__search .input__icon--end")
btnEmployesSearch.addEventListener("click", handleSearchEmployes)


//thêm sk cho nút reload data
var btnReloadDataEmployesTable = $(".employespage .employespage__controller__iconreload")
btnReloadDataEmployesTable.addEventListener("click", employesMainFN)