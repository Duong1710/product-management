module.exports.createPost = async (req, res, next) => {
    if(!req.body.title){
        req.flash("error", "Tiêu đề không được để trống!");
        res.redirect("back");
        return;
    }
    if(req.body.title.length < 5){
        req.flash("error", "Tiêu đề không được ít hơn 5 kí tự!");
        res.redirect("back");
        return;
    }
    next(); // Phải khai báo biến next ở trên đầu 
}