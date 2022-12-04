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

function employesPagination () {
  let paginationElm = document.querySelector(".employespage__pagination__right--pagination .pagination")
  console.log(paginationElm);
}
employesPagination()