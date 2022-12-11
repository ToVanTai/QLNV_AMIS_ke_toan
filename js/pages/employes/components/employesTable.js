import { $, $$ } from "/js/common/index.js"
import { employesUrl } from "/js/configs/index.js"
import { showPopupEmployeeShowinfo } from "./employeeForm.js"
/**
 * useTo: fake data employes, add event click để hiện form thông tin chi tiết nhân viên
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022 
 */
export function generateEmployes () {
  try {
    // fake data employes
    var employesContainer = $("#employestable")
    var employesHtml = ""
    for (let i = 1; i <= 20; i++) {
      employesHtml += `<tr>
    <td class="checkbox"><input type="checkbox" /></td>
    <td>00012</td>
    <td>Nguyễn Văn Liệt</td>
    <td>Nam</td>
    <td class="date">31/12/1969</td>
    <td>01849242842</td>
    <td>Trưởng nhóm</td>
    <td>Xay Keo - Phối Trộn</td>
    <td></td>
    <td></td>
    <td></td>
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
            class="employespage__table__action__dropdown--item">
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
 * useTo: "hiển loading trong 2 giấy. 
 * sau đó ẩn loading và hiện dữ liệu lên bảng"
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
function startFn () {
  showPendingTable()
  $("#employestable").innerHTML = ""
  setTimeout(() => {
    hidePendingTable();
    generateEmployes();
  }
    , 2000)
}
startFn()

var btnReloadDataEmployesTable = $(".employespage .employespage__controller__iconreload")
btnReloadDataEmployesTable.addEventListener("click", startFn)