import { $, $$ } from "/js/common/index.js"
import employesMainFN from "./employesTable.js"
import EmployesFilter from "../classes/EmployesFilter.js"
/**
 * useTo: rendering pagination khi click vào pagination, thêm sự kiện click vào pagination sau khi rendering pagination
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
export default function employesPagination (total, current) {
  try {
    // rendering pagination khi click vào pagination
    var paginationElm = $(".employespage__pagination__right--pagination .pagination")
    var liTagHtml = ``
    if (total >= 1 && total <= 5) {
      if (current > 1) {
        liTagHtml += `<li data-index=${current - 1} class="prev">Trước</li>`
      }
      for (let i = 1; i <= total; i++) {
        if (i == current) {
          liTagHtml += `<li class="num active">${i}</li>`
        } else {
          liTagHtml += `<li data-index=${i} class="num">${i}</li>`
        }
      }
      if (current < total) {
        liTagHtml += `<li data-index=${current + 1} class="next">Sau</li>`
      }
    } else if (total > 5) {
      let before = current - 1
      let after = current + 1
      if (current > 1) {
        liTagHtml += `<li data-index=${current - 1} class="prev">Trước</li>`
      }
      if (current > 2) {
        liTagHtml += `<li data-index=1 class="num">1</li>`
        if (current > 3) {
          liTagHtml += `<li class="dots">...</li>`
        }
      }
      if (current == 1) {
        before++
        after++
      }
      if (current == total) {
        before--
        after--
      }
      for (let i = before; i <= after; i++) {
        if (i == current) {
          liTagHtml += `<li class="num active">${i}</li>`
        } else {
          liTagHtml += `<li data-index=${i} class="num">${i}</li>`
        }
      }
      if (current < total - 1) {
        if (current < total - 2) {
          liTagHtml += `<li class="dots">...</li>`
        }
        liTagHtml += `<li data-index=${total} class="num">${total}</li>`
      }
      if (current < total) {
        liTagHtml += `<li data-index=${current + 1} class="next">Sau</li>`
      }
    }
    paginationElm.innerHTML = liTagHtml

    // thêm sự kiện click vào pagination sau khi rendering pagination
    var paginationListItem = $$(".employespage__pagination__right--pagination .pagination li:not(.dots)")
    let employeeFilterObj = new EmployesFilter()
    for (let i = 0; i < paginationListItem.length; i++) {
      if (!paginationListItem[i].classList.contains("active")) {
        paginationListItem[i].addEventListener("click", function () {
          let pageDirection = Number(this.dataset.index)
          employeeFilterObj.pageNumber = Number(this.dataset.index)
          EmployesFilter.changeUrl(employeeFilterObj)
          employesMainFN()
          employesPagination(total, pageDirection)
        })
      }
    }
  } catch (err) {
    console.log(err);
  }


}

/**
 * useTo: rendering pagination khi click vào pagination, thêm sự kiện click vào pagination sau khi rendering pagination
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
export function employesSelectQuantities (quantity) {
  try {
    var employesSelectQuantitiesElm = $(".employespage__pagination__right--selectquantity select")
    var employesSelectQuantitiesItems = `
      <option value="5" ${quantity == 5 ? "selected" : ""}>5 bản ghi trên 1 trang</option>
      <option value="10" ${quantity == 10 ? "selected" : ""}>10 bản ghi trên 1 trang</option>
      <option value="15" ${quantity == 15 ? "selected" : ""}>15 bản ghi trên 1 trang</option>
      <option value="20" ${quantity == 20 ? "selected" : ""}>20 bản ghi trên 1 trang</option>
    `
    employesSelectQuantitiesElm.innerHTML = employesSelectQuantitiesItems

    //add sự kiện onchange
    let employeeFilterObj = new EmployesFilter()
    employesSelectQuantitiesElm.onchange = function (e) {
      employeeFilterObj.pageSize = Number(e.target.value)
      employeeFilterObj.pageNumber = 1
      EmployesFilter.changeUrl(employeeFilterObj)
      employesMainFN()
    }
  }
  catch (err) {
    console.log(err);
  }

}