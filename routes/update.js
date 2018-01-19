'use strict';
let express = require("express");
let router = express.Router();
let rq = require("request");
let cheerio = require("cheerio");
let _ = require("lodash");
let j = rq.jar();
let request = rq.defaults({ jar: j });
let path = require("path");
router.get("/", async (req, res) => {
    let pageNumber = 1;
    let data = await getBasicInfo(pageNumber);
    for (let i = 0; i < data.length-1; i++){
        let phone = await getPhoneNumber(data[i].link);
        data[i].phone = phone;
    }
    console.log(data);
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
                let tenDN = $(`body > div.wrapper > div.container.content > div.row > div.col-md-9 > div > div.content_page > div:nth-child(${i++}) > div > h2 > a`).text();
                let link = $(`body > div.wrapper > div.container.content > div.row > div.col-md-9 > div > div.content_page > div:nth-child(${i}) > div > h2 > a`).attr("href");
                let maSoThue = $(`body > div.wrapper > div.container.content > div.row > div.col-md-9 > div > div.content_page > div:nth-child(${i}) > div > div:nth-child(2) > div:nth-child(1) > h3 > strong > a`).text();
                let diaChiDN = $(`body > div.wrapper > div.container.content > div.row > div.col-md-9 > div > div.content_page > div:nth-child(${i}) > div > p > strong`).text();
                let daiDienDN = $(`body > div.wrapper > div.container.content > div.row > div.col-md-9 > div > div.content_page > div:nth-child(${i}) > div > div:nth-child(4) > div:nth-child(1) > p > strong`).text();
                let tinhThanh = $(`body > div.wrapper > div.container.content > div.row > div.col-md-9 > div > div.content_page > div:nth-child(${i}) > div > div:nth-child(2) > div:nth-child(2) > p > a > strong`).text();
                let ngayLapDN = $(`body > div.wrapper > div.container.content > div.row > div.col-md-9 > div > div.content_page > div:nth-child(${i}) > div > div:nth-child(2) > div:nth-child(3) > p`).text();
                
                d = {
                    tenDN, maSoThue, diaChiDN, daiDienDN, tinhThanh, ngayLapDN, link
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

