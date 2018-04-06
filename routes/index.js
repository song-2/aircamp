var express=require("express"),
    router=express.Router({mergeParams:true}),
    Campground=require("../models/campground"),
    Comment=require("../models/comment"),
    User=require("../models/user"),
    passport=require("passport")


//root rout
router.get("/", function(req, res){
  res.render("landing"); 
});

//show registr form
router.get("/register", function(req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
  var newUser = new User({username:req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
    console.log(err);
    return res.render("register", {error: err.message});
    }
      passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to AirCamp " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
{
  successRedirect:"/campgrounds",
  failureRedirect:"/login"
  
}), function(req, res){
});

//logout logic route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports=router;