
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
            // front-end gửi dữ liệu cho back-end qua đường dẫn dưới, tạo đường dẫn để BE và FE tương tác với nhau
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
                    if(data.code == "success"){ // nếu back end phản hồi thành công thì thuộc tính code = success 
                        location.reload(); // load lại trang
                    }
                })
        })
    })
}
// Hết đổi trạng thái cho 1 bản ghi


// Đổi trạng thái cho nhiều bản ghi
const formChangeMulti = document.querySelector("[form-change-multi]"); // lấy ra nút submit ấy
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (event) => { // gán sự kiện submit
        event.preventDefault(); // ngăn chặn việc mở 1 trang, đường dẫn mới khi submit
        const status = formChangeMulti.status.value; // lấy ra status của sản phẩm
        if(status == 'delete'){
            const isConfirm = confirm("Bạn có chắc muốn xóa những bản ghi này không ?");
            if(isConfirm){
                const path = formChangeMulti.getAttribute("data-path"); // lấy ra đường dẫn mà BE tương tác với FE
                const ids = []; // mảng để lưu đường link của các sản phẩm được chọn thông qua cái listInputChangeChecked bên dưới
                const listInputChangeChecked = document.querySelectorAll("[input-change]:checked"); // lấy ra toàn bộ các nút được chọn, được tick vào, checked: được tick
                listInputChangeChecked.forEach(input => {
                    const id = input.getAttribute("input-change");
                    ids.push(id);
                })
                const data = {
                    ids : ids,
                    status : status
                };

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
                        if(data.code == "success"){ // nếu back end phản hồi thành công thì thuộc tính code = success 
                            location.reload(); // load lại trang
                        }
                    })
            }
        }
        else if(status == 'delete-permanent'){
            const isConfirm = confirm("Bạn có chắc muốn xóa những bản ghi này vĩnh viễn không ?");
            if(isConfirm){
                const path = formChangeMulti.getAttribute("data-path"); // lấy ra đường dẫn mà BE tương tác với FE
                const ids = []; // mảng để lưu đường link của các sản phẩm được chọn thông qua cái listInputChangeChecked bên dưới
                const listInputChangeChecked = document.querySelectorAll("[input-change]:checked"); // lấy ra toàn bộ các nút được chọn, được tick vào, checked: được tick
                listInputChangeChecked.forEach(input => {
                    const id = input.getAttribute("input-change");
                    ids.push(id);
                })
                const data = {
                    ids : ids,
                    status : status
                };

                fetch(path, { // đường dẫn kia thì chúng ta phải tạo 1 đường dẫn mới trong file routes
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method : "DELETE", // phương thức patch cho phép cơ sở dữ liệu cập nhật dữ liệu
                    body : JSON.stringify(data) 
                    // front-end gửi dữ liệu cho back end thì phải đổi dữ liệu thành dạng json
                })
                    .then(res => res.json()) 
                    // back-end có phản hồi thì đây là đoạn code giúp front-end
                    // chuyển json thành js
                    .then(data => {
                        if(data.code == "success"){ // nếu back end phản hồi thành công thì thuộc tính code = success 
                            location.reload(); // load lại trang
                        }
                    })
            }
        }
        else if(status == 'restore'){
            const isConfirm = confirm("Bạn có muốn khôi phục lại những bản ghi này không ?");
            if(isConfirm){
                const path = formChangeMulti.getAttribute("data-path"); // lấy ra đường dẫn mà BE tương tác với FE
                const ids = []; // mảng để lưu đường link của các sản phẩm được chọn thông qua cái listInputChangeChecked bên dưới
                const listInputChangeChecked = document.querySelectorAll("[input-change]:checked"); // lấy ra toàn bộ các nút được chọn, được tick vào, checked: được tick
                listInputChangeChecked.forEach(input => {
                    const id = input.getAttribute("input-change");
                    ids.push(id);
                })
                const data = {
                    ids : ids,
                    status : status
                };

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
                        if(data.code == "success"){ // nếu back end phản hồi thành công thì thuộc tính code = success 
                            location.reload(); // load lại trang
                        }
                    })
            }
        }
    })
}
// Hết đổi trạng thái cho nhiều bản ghi

// Tính năng xóa sản phẩm - xóa mềm
const listButtonDelete = document.querySelectorAll("[button-delete]");
if(listButtonDelete.length > 0){
    listButtonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa bản ghi này?");
            if(isConfirm){
                const id = button.getAttribute("item-id");
                const path = button.getAttribute("data-path");
                const data = {
                    id : id
                }
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
                        if(data.code == "success"){ // nếu back end phản hồi thành công thì thuộc tính code = success 
                            location.reload(); // load lại trang
                        }
                    })
            }
        })
    })
}
// Xóa vĩnh viễn khác với xóa mềm ở chỗ method, xóa mềm chỉ là PATCH để cập nhật lại trạng thái của thuộc tính deleted thôi
// việc cập nhật này thì lại phải sửa đổi theo đường link, cụ thể sẽ sửa ở mục controller

// TÍNH NĂNG CỦA TRASH
// Tính năng xóa sản phẩm - xóa vĩnh viễn (trash)
const listButtonDeletePermanent = document.querySelectorAll("[button-delete-permanent]");
if(listButtonDeletePermanent.length > 0){
    listButtonDeletePermanent.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa vĩnh viễn bản ghi này?");
            if(isConfirm){
                const id = button.getAttribute("item-id");
                const path = button.getAttribute("data-path");
                const data = {
                    id : id
                }
                fetch(path, { // đường dẫn kia thì chúng ta phải tạo 1 đường dẫn mới trong file routes, chính là đường dẫn tương tác giữa FE và BE
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method : "DELETE", // phương thức delete cho phép cơ sở dữ liệu xóa hẳn dữ liệu
                    body : JSON.stringify(data) 
                    // front-end gửi dữ liệu cho back end thì phải đổi dữ liệu thành dạng json, dữ liệu chính là cái đối tượng data kia kìa
                })
                    .then(res => res.json()) 
                    // back-end có phản hồi thì đây là đoạn code giúp front-end
                    // chuyển json thành js
                    .then(data => {
                        if(data.code == "success"){ // nếu back end phản hồi thành công thì thuộc tính code = success 
                            location.reload(); // load lại trang
                        }
                    })
            }
        })
    })
}
// Xóa vĩnh viễn khác với xóa mềm ở chỗ method, xóa mềm chỉ là PATCH để cập nhật lại trạng thái của thuộc tính deleted thôi
// việc cập nhật này thì lại phải sửa đổi theo đường link, cụ thể sẽ sửa ở mục controller
// Hết xóa vĩnh viễn

// Tính năng Khôi phục sản phẩm
const listRestoreButton = document.querySelectorAll("[button-restore]");
if(listRestoreButton.length > 0){
    listRestoreButton.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn muốn khôi phục bản ghi này chứ ?");
            if(isConfirm){
                const id = button.getAttribute("item-id");
                const path = button.getAttribute("data-path");
                const data = {
                    id : id
                }
                fetch(path, { // đường dẫn kia thì chúng ta phải tạo 1 đường dẫn mới trong file routes, đây là đường dẫn để tương tác giữa FE và BE đó
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
                        if(data.code == "success"){ // nếu back end phản hồi thành công thì thuộc tính code = success 
                            location.reload(); // load lại trang
                        }
                    })
            }
        })
    })
}
