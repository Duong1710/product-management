
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
// Hết tìm kiếm

// Tính năng phân trang
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if(listButtonPagination.length > 0){
    let url = new URL(location.href);
    listButtonPagination.forEach(button => {
        button.addEventListener("click", () =>{
            const page = button.getAttribute("button-pagination");
            
            if(page){
                url.searchParams.set("page",page);
            }
            else{
                url.searchParams.delete("page");
            }

            location.href = url.href;
        })
    })

    // Hiển thị trang mặc định
    const pageCurrent = url.searchParams.get("page") || 1;
    const buttonCurrent = document.querySelector(`[button-pagination="${pageCurrent}"]`);
    if(buttonCurrent) {
        buttonCurrent.parentNode.classList.add("active");
    }
}
// Hết Phân trang

// Đổi trạng thái
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
// Lấy toàn bộ các nút trạng thái
if(listButtonChangeStatus.length > 0){ //check chắc chắn rằng có nút trạng thái
    listButtonChangeStatus.forEach(button => { // forEach để đi vào từng nút
        button.addEventListener("click", () => { // bắt sự kiện click cho từng nút
            const itemId = button.getAttribute("item-id"); // lấy ra id của nút
            const statusChange = button.getAttribute("button-change-status"); // lấy ra trạng thái của nút
            const path = button.getAttribute("data-path");
            const data = {
                id: itemId,
                status : statusChange
            }
            // gom vào thành 1 object
            // front-end gửi dữ liệu cho back-end qua đường dẫn dưới
            fetch(path, { // đường dẫn kia thì chúng ta phải tạo 1 đường dẫn mới trong file routes
                headers: {
                    "Content-Type": "application/json",
                },
                method : "PATCH", // phương thức patch cho phép cơ sở dữ liệu cập nhật dữ liệu
                body : JSON.stringify(data) 
                // front-end gửi dữ liệu cho back end thì phải đổi dữ liệu thành dạng json
            })
                .then(res => res.json()) 
                // back-end có phản hồi thì đây là đoạn code giúp front-end
                // chuyển json thành js
                .then(data => {
                    if(data.code == "success"){ // 
                        location.reload(); // load lại trang
                    }
                })
        })
    })
}
