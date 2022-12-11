/**
 * useTo: lọc bản ghi employes
 * updatedAt: tovantai_11/12/2022
 * author: tovantai
 * createdAt: 11/12/2022 
 */
export default class EmployesFilter {
  constructor(url) {
    let urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    this.pageSize = params.pageSize || 10//số bản ghi /1 trang
    this.pageNumber = params.pageNumber || 1,//trang hiện tại
      this.employeeFilter = params.employeeFilter || null,//mã||tên||số điện thoại
      this.departmentId = params.departmentId || null,//mã phòng ban
      this.positionId = params.positionId || null//mã vị trí
  }

  //tạo query string ví dụ: ?name=tai&id=1
  static getQueryString (employeeFilterObj) {
    let result = ""
    for (let key in employeeFilterObj) {
      if (employeeFilterObj[key] != null)
        result += `&${key}=${employeeFilterObj[key]}`
    }
    result = result.replace('&', "?")
    return result
  }
  //thay đổi history
  static changeUrl (employeeFilterObj) {
    const url = new URL(window.location)
    for (let key in employeeFilterObj) {
      if (employeeFilterObj[key] != null)
        url.searchParams.set(key, employeeFilterObj[key])
    }
    history.pushState({}, "", url)
  }
}