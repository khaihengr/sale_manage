let express = require('express');
let router = express.Router();
let saler =require('../controllers/c_saler');
let passport = require("passport");

/* GET users listing. */
router.post('/login', (req, res, next)=> {
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/'
    })(req,res,next);
});
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/')
})
router.post('/register', function(req, res, next) {
    let _saler = req.body;
    saler.add(_saler,(err,result)=>{
        console.log(result);
    })
});

module.exports = router;
