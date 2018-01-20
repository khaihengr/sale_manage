let express = require('express');
let router = express.Router();
let company = require('../controllers/c_company');
let saler = require('../controllers/c_saler');

/* GET home page. */

router.get('/', async function(req, res, next) {
    company.findAll(0,10,(err,companies)=>{
        if(!err){
            for(let i=0;i<companies.length;i++){
                if (companies[i]._saler == '') {
                    continue;
                }
                let _saler =companies[i]._saler;
                saler.get_name(_saler,(isdone,done)=>{
                    if(isdone){
                        companies[i]._saler=done.fullname
                    }
                })
            }
            setTimeout(()=>{
                res.render("index",{tab:"screen/companies",companies})
            },1000)
        }
    })
});

router.get('/page',(req,res)=>{
    let page = req.query.page;
    company.findAll(page,10,(err,companies)=>{
        if(!err){
            res.render("index",{tab:"screen/companies",companies})
        }
    })
})
router.post('/state',(req,res)=>{
    let _state = req.body;
    _state._state=state_switch(_state._state);
    let state = {
        success:false,
        call_later:false,
        no_answer:false,
        called:false,
        note:_state._note
    };
    state[_state._state]=true;
    _state._state=state;
    console.log(_state);
    company.update(_state,(isdone,done)=>{
        res.redirect('/')
    })
})
let state_switch= (state)=>{
    switch (state){
        case 'success':return 'success';
        case 'info':return 'called';
        case 'danger':return 'call_later';
        case 'warning':return 'no_answer';
    }
}
module.exports = router;
