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


    //confirm 창 나왔을 때 무조건 yes 처리
page.on("dialog", (dialog) => {
    dialog.accept();
});

    // 웹사이트 로딩
    await page.goto('http://localhost:3000', {timeout: 0, waitUntil: 'domcontentloaded'});
    // await page2.goto('http://google.com/', {timeout: 1, waitUntil: 'domcontentloaded'});

    await page.waitForSelector('.btn-default'); // 버튼이 로드될 때까지 기다리기
    await page.click('.btn-default');    // 로드되면 클릭

    await page.waitForSelector('.btn-primary');
    await page.evaluate((a,b)=> {
        document.querySelector('input[name=name]').value = a;
        document.querySelector('textarea[name=description').value = b;
        document.querySelector('.btn-primary').click();
    }, insert_name, insert_description);

    await page.waitForSelector('.btn-default');

    //수정하는 부분    
    await page.click('table tr:nth-child(2) td:nth-child(1) a'); //selector 공부해보기
    await page.waitForSelector('.btn-primary'); // 수정버튼 기다리기
    await page.click('.btn-primary');

    await page.waitForSelector('.btn-primary');
    await page.evaluate((a,b)=> {
        document.querySelector('input[name=name]').value = a;
        document.querySelector('textarea[name=description').value = b;
        document.querySelector('.btn-primary').click();
    }, modi_name, modi_description);
    
    //목록보기로 돌아오기
    await page.waitForSelector('.btn-default');
    await page.click('.btn-default');

    //삭제하기
    await page.waitForSelector('.btn-danger');
    await page.click('.btn-danger');
    //todo
    await page.waitFor(5000); //5초동안 기다리기
    // 브라우저 닫기


    await browser.close();
}

run();
