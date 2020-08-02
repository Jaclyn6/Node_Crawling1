const puppeteer = require('puppeteer');

//입력 할 텍스트
const insert_name =  "insert_" + Math.random().toString(36).substring(2, 15);
const insert_description = "insert_" + Math.random().toString(36).substring(2, 15);

//수정 할 텍스트
const modi_name = "update_" + Math.random().toString(36).substring(2, 15);
const modi_description = "update_" + Math.random().toString(36).substring(2, 15);

async function run (){

    // 브라우저 열기
    const browser = await puppeteer.launch({
        headless : false //웹 브라우저를 포그라운드에 보여 줌
    });
    const page = await browser.newPage();  
    // const page2 = await browser.newPage();  

    // 웹사이트 로딩
    await page.goto('https://search.naver.com/search.naver?sm=top_hty&fbm=0&ie=utf8&query=%EC%BD%94%EC%8A%A4%ED%94%BC', {timeout: 0, waitUntil: 'domcontentloaded'});
    // await page2.goto('http://google.com/', {timeout: 1, waitUntil: 'domcontentloaded'});

    // 상단 테이블의 th 제목을 가져오고 싶은경우
    const tdName = await page.$eval('.spt_con strong', strong => strong.textContent.trim());
    console.log(tdName);

    // 브라우저 닫기
    await browser.close();
}

run();
