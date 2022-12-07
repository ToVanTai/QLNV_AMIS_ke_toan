import { $, $$ } from "/js/common/index.js"
/**
 * useTo: rendering pagination khi click vào pagination, thêm sự kiện click vào pagination sau khi rendering pagination
 * updateBy: tovantai_7/12/2022
 * author: tovantai
 * createdAt: 7/12/2022
 */
function employesPagination (total, current) {
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
  } else if (total > 5) { }
  paginationElm.innerHTML = liTagHtml

  // thêm sự kiện click vào pagination sau khi rendering pagination
  var paginationListItem = $$(".employespage__pagination__right--pagination .pagination li:not(.dots)")
  for (let i = 0; i < paginationListItem.length; i++) {
    if (!paginationListItem[i].classList.contains("active")) {
      paginationListItem[i].addEventListener("click", function () {
        let pageDirection = Number(this.dataset.index)
        employesPagination(total, pageDirection)
      })
    }
  }

}
employesPagination(5, 1)