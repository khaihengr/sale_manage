let express = require('express');
let router = express.Router();
let company = require('../controllers/c_company');
let saler = require('../controllers/c_saler');
let moment = require("moment");
/* GET home page. */
router.post("/update", (req, res) => {
    let comp = req.body;
    company.update_comp(comp, (st, re) => {
        if (comp) {
            // res.redirect('/')
        }
    })
    res.redirect('/');
})
router.get('/filter',(req,res)=>{
    let _filter =req.query.filter_rules;
    let _filter_text=`&filter_rules=${_filter}`
    let _page = req.query.page||0;
    let _skip = parseInt(_page)*10;
    switch (_filter){
        case 'no_answer':{
            company.filter_by_no_anwser(_skip,(state,companies)=>{
                res.render("index",{tab:"screen/companies",companies,page_f:_page,_filter_text})
            })
            return;
        }
        case 'call_later':{
            company.filter_by_call_later(_skip,(state,companies)=>{
                res.render("index",{tab:"screen/companies",companies,page_f:_page,_filter_text})
            })
            return;
        }
        case 'called':{
            company.filter_by_called(_skip,(state,companies)=>{
                res.render("index",{tab:"screen/companies",companies,page_f:_page,_filter_text})
            })
            return;
        }
        case 'success':{
            company.filter_by_success(_skip,(state,companies)=>{
                res.render("index",{tab:"screen/companies",companies,page_f:_page,_filter_text})
            })
            return;
        }
    }
})
router.get('/search',(req,res)=>{
    let _search = req.query;
    let _page = req.query.page||0;
    let _skip = parseInt(_page)*10;
    let _search_text=`&search_text=${_search.search_text}&search_rules=${_search.search_rules}`
    switch (_search.search_rules){
        case 'company_name':{
            company.find_by_company_name(_skip,_search.search_text,(state,companies)=>{
                if(state){
                    res.render("index",{tab:"screen/companies",companies,page_s:_page,_search_text})
                }
            })
            return;
        }
        case 'boss_name':{
            company.find_by_boss_name(_skip,_search.search_text,(state,companies)=>{
                if(state){
                    res.render("index",{tab:"screen/companies",companies,page_s:_page,_search_text})
                }
            })
            return;
        }
        case 'phone_number':{
            company.find_by_phone_number(_skip,_search.search_text,(state,companies)=>{
                if(state){
                    res.render("index",{tab:"screen/companies",companies,page_s:_page,_search_text})
                }
            })
            return;
        }
    }
})
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
                res.render("index",{tab:"screen/companies",companies,page:0})
            },1000)
        }
    })
});
router.post('/add', (req, res) => {
    let com = req.body;
    com.date_create = moment().format("DD/MM/YYYY");
    company.add(com, (st,r) => {
        if (st) {
            
        }
    });
    res.redirect('/');
})
router.get('/page', (req, res) => {
    let page = (parseInt(req.query.page)) * 10;
    
    company.findAll(page,10,(err,companies)=>{
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
                res.render("index",{tab:"screen/companies",companies,page:(page/10)})
            },1000)
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
    company.update_state(_state,(isdone,done)=>{
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
