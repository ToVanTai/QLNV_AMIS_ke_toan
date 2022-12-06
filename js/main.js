// start generate employes table
function generateEmployes () {
  let employesContainer = document.getElementById("employestable")
  let employesHtml = ""
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
}
generateEmployes()
// end generate employes table

// start pagination
// end pagination

function employesPagination (total, current) {
  let paginationElm = document.querySelector(".employespage__pagination__right--pagination .pagination")
  let liTagHtml = ``
  if (total >= 1 && total <= 5) {
    if (current > 1) {
      liTagHtml += `<li data-index=${current - 1} onclick="employesPagination(${total}, ${current - 1})" class="prev">Trước</li>`
    }
    for (let i = 1; i <= total; i++) {
      if (i == current) {
        liTagHtml += `<li class="num active" data-index=${i} onclick="employesPagination(${total}, ${i})">${i}</li>`
      } else {
        liTagHtml += `<li data-index=${i} onclick="employesPagination(${total}, ${i})" class="num">${i}</li>`
      }
    }
    if (current < total) {
      liTagHtml += `<li data-index=${current + 1} onclick="employesPagination(${total}, ${current + 1})" class="next">Sau</li>`
    }
  } else if (total > 5) { }
  paginationElm.innerHTML = liTagHtml
}
let total = 5
let current = 1
employesPagination(5, 1)