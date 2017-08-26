
module.exports.home = function(req, res) {
    
    res.render("home", {title: "express"});
}

module.exports.analyse = function(req, res) {
    
    res.redirect("/");

}