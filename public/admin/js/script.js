
// Bộ lọc
const boxFilter = document.querySelector("[box-filter]");
if(boxFilter){
    let url = new URL(location.href); // Nhân bản url
    // Bắt sự kiện onchange
    boxFilter.addEventListener("change", () => {
        const value = boxFilter.value;
        if(value){
            url.searchParams.set("status",value);
        }
        else{
            url.searchParams.delete("status");
        }
        location.href = url.href;
    })
    // Hiển thị lựa chọn mặc định
    const statusCurrent = url.searchParams.get("status");
    if(statusCurrent) {
        boxFilter.value = statusCurrent;
    }
}
// Hết Bộ lọc

//Tìm kiếm
const formSearch = document.querySelector("[form-search]");
if(formSearch){
    let url = new URL(location.href); // Nhân bản url

    formSearch.addEventListener("submit", (event) => {
        event.preventDefault(); // ngăn lại việc submit form luôn
        const value = formSearch.keyword.value;
        if(value){
            url.searchParams.set("keyword",value);
        }
        else{
            url.searchParams.delete("keyword");
        }
        location.href = url.href;
    })
    // Hiển thị từ khóa mặc định trên màn hình
    const valueCurrent = url.searchParams.get("keyword");
    if(valueCurrent) {
        formSearch.keyword.value = valueCurrent;
    }
}