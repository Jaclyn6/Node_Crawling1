const express = require('express');
const request = require('request-promise');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.set('json spaces', 2);//json 뿌릴 때 beauty하게 뿌림

app.get('/shipping/:invc_no', async (req,res) => {
    try{
        
        const url = `https://www.doortodoor.co.kr/parcel/ \
        doortodoor.do?fsp_action=PARC_ACT_002&fsp_cmd=retrieveInvNoACT&invc_no=${req.params.invc_no}`; // 테스트용 송장번호 630925527481

        let result = [];
        
        const html = await request(url);

        const $ = cheerio.load(html, 
            {
                decodeEntities: false //한글 변환
            });

        const tdElements = $(".board_area").find("table.mb15 tbody tr td"); // td의 데이터를 전부 가져옴
        console.log(tdElements[0].children[0].data.trim());
        
        var temp = {}
        for(let i=0; i<tdElements.length; i++){

            if(i%4 == 0) {
                temp = {};
                temp['step'] = tdElements[i].children[0].data.trim();
            }else if(i%4 == 1){
                temp['date'] = tdElements[i].children[0].data.trim();
            }else if(i%4 == 2){
                temp["status"] = tdElements[i].children[0].data.trim(); // 여러줄이 있는 경우가 있어서 이렇게 함
                for(let j=1; j<tdElements[i].children.length; j++) {
                    //console.log(tdElements[i].children[j]);
                    if(tdElements[i].children[j].data != undefined) { //<br> 태그 제거
                        //console.log(tdElements[i].children[j].data);
                        temp["status"] += tdElements[i].children[j].data;
                    }
                }
            }else if(i%4 == 3){
                temp["location"] = tdElements[i].children[1].children[0].data;
                result.push(temp);
            }
        }

        res.json(result);
        


    }catch(e){
        console.log(e)
    }    
});

app.listen( port, function(){
    console.log('Express listening on port', port);
});