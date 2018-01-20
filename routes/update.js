'use strict';
let express = require("express");
let router = express.Router();
let rq = require("request");
let cheerio = require("cheerio");
let _ = require("lodash");
let j = rq.jar();
let request = rq.defaults({ jar: j });
let path = require("path");
let company = require("../controllers/c_company");

router.get("/", async (req, res) => {
    // let pageNumber = 1;
    for(let i=1;i<=465;i++){
        let data = await getBasicInfo(i);
        for (let i = 0; i < data.length-1; i++){
            let phone = await getPhoneNumber(data[i].link);
            data[i].phone = phone;
            data[i].saler="";
            console.log(parseInt((100/data.length)*i));
        }
        data.forEach(c=>{
            company.add(c);
        })
    }
    // console.log(data);
})

let getBasicInfo = (p)=>{
    return new Promise((resolve, reject) => {
        let url = `https://www.tracuuhoso.com/page-${p}-ho-so-thai-nguyen.aspx`;
        request.get(url, (err,r,body) => {
            let $1 = cheerio.load(body);
            let $ = $1;
            let i = 2;
            let data=[]
            $1(".news-v3.bg-color-white").each((d, e) => {
                let name = $(`body > div.wrapper > div.container.content > div.row > div.col-md-9 > div > div.content_page > div:nth-child(${i++}) > div > h2 > a`).text();
                let link = $(`body > div.wrapper > div.container.content > div.row > div.col-md-9 > div > div.content_page > div:nth-child(${i}) > div > h2 > a`).attr("href");
                let tax = $(`body > div.wrapper > div.container.content > div.row > div.col-md-9 > div > div.content_page > div:nth-child(${i}) > div > div:nth-child(2) > div:nth-child(1) > h3 > strong > a`).text();
                let address = $(`body > div.wrapper > div.container.content > div.row > div.col-md-9 > div > div.content_page > div:nth-child(${i}) > div > p > strong`).text();
                let boss = $(`body > div.wrapper > div.container.content > div.row > div.col-md-9 > div > div.content_page > div:nth-child(${i}) > div > div:nth-child(4) > div:nth-child(1) > p > strong`).text();
                let town = $(`body > div.wrapper > div.container.content > div.row > div.col-md-9 > div > div.content_page > div:nth-child(${i}) > div > div:nth-child(2) > div:nth-child(2) > p > a > strong`).text();
                let date_create = $(`body > div.wrapper > div.container.content > div.row > div.col-md-9 > div > div.content_page > div:nth-child(${i}) > div > div:nth-child(2) > div:nth-child(3) > p`).text();
                date_create=date_create.substr(11,10);
                d = {
                    name, tax, address, boss, town, date_create, link
                }
                data.push(d);
            });
            resolve(data);
        })
    })
}
let getPhoneNumber = (link) => {
    return new Promise((resolve, reject) => {
        request.get(link, {
            headers: {
                "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36"
            }
        } ,(err, res, body) => {
            let $ = cheerio.load(body);
            let d = $("body > div.wrapper > div.container.content > div.row > div.col-md-9 > div:nth-child(2) > div > div.tc_have > div.items-container > div.alert.alert-warning.fade.in.info_tc > div > div.article-content > span > ul > li:nth-child(9) > b > font").text();
            resolve(d);
        })
    })
}
module.exports = router;

