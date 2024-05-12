import ChartUtils from './chart_utils.js';

class CompanyInfo{
    constructor(){        
        this.chart_utils = new ChartUtils();

        this.pages = document.querySelectorAll('.company_info_page');
     
        this.pageManager();
    }
    pageManager(){   
        const max_page = 3;
        let current_page = 1;
        

        const left_btn = document.querySelector('.left_btn');
        const right_btn = document.querySelector('.right_btn');

        left_btn.addEventListener('click', ()=>{
            if(current_page > 1){
                current_page--;
                this.pageChange(current_page);
            }

            if(current_page === 1){
                left_btn.classList.add('unactive');
            }

            if(right_btn.classList.contains('unactive')){
                right_btn.classList.remove('unactive');
            }
        });

        right_btn.addEventListener('click', ()=>{
            if(current_page < max_page){
                current_page++;
                this.pageChange(current_page);
            }
            
            if(current_page === max_page){
                right_btn.classList.add('unactive');
            }

            if(left_btn.classList.contains('unactive')){
                left_btn.classList.remove('unactive');
            }
        })
    }
    pageChange(activepage){
        let active_page = document.querySelector('.active_page');
        active_page.classList.remove('active_page');
        active_page.classList.add('unactive');

        this.pages[activepage-1].classList.add('active_page');
        this.pages[activepage-1].classList.remove('unactive');

        if(activepage === 2){
            this.page2();
        }
        else if(activepage === 3){
            this.page3();
        }
    }

    page2(){
        const ctx = document.getElementById('company_info_chart2');
        // 데이터 불러오기
        const file = "src/data/sale_revenue_by_sector.json"

        this.chart_utils.dataReader(file)
        .then(data => {
            let labels = [];
            let ydata = [];

            for(let i=0; i<5; i++){
                labels.push(data["부문"][i]);
                ydata.push(Number(data["비중"][i]));
            }

            // 차트 설정
            this.chart_utils.barchart(ctx, "부문 별 매출 비중(단위: %)", labels, ydata);
            ctx.style.transform = "scale(0.6)";
            ctx.style.left = "-15%";

        });
    }

    page3(){
        const ctx = document.getElementById('company_info_chart3');

        const file = "src/data/stock_price.json";
        const history_file = "src/data/company_history.json";

        const imgdata = ["./src/img/Neo-QLED_2.png", "./src/img/co2.jpg", "src/img/DDR5.jpg", "src/img/foundary.jpg", 
        "src/img/bisfork.jpg", "src/img/3nano.jpg", "src/img/R&D.jpg", "src/img/vNand.jpg", "src/img/hp2.jpg",
        "src/img/s23.jpg", "src/img/Dram.jpg", "src/img/12nano_dram.jpg", "src/img/samsung_gang.jpg", "src/img/GDDR7.jpg",
        "src/img/zfilp5.jpg", "src/img/32_ddr5.jpg", "src/img/LPC.jpg", "src/img/gaus.jpg"];


        this.chart_utils.dataReader(history_file).then(history_data=>{
            this.chart_utils.dataReader(file)
            .then(data=>{
                console.log(history_data);
                let xdata = [];
                let ydata = [];
                let points = [];
                let points_data = [];
                let points_color = [];

                // company history 데이터
                for(let i=0; i<26; i++){
                    const date = new Date(history_data['날짜'][i]);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');

                    points.push(`${year}-${month}-${day}`);
                    points_data.push(`<span style="font-size:1.2rem; font-weight:700;">${history_data['내용'][i]}</span><br><img src='${imgdata[i-8]}' style='margin-top:1rem;' width="300px">`);
                }
    
                // 주가 데이터
                for(let i=0; i<738; i++){
                    const date = new Date(data['Date'][i]);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
    
                    xdata.push(`${year}-${month}-${day}`);
                    ydata.push(Number(data['High'][i]));

                    // company history 데이터와 주가 데이터의 날짜가 같으면 색상을 변경
                    if(points.includes(`${year}-${month}-${day}`)){
                        points_color.push('red');
                    }
                    else{
                        points_color.push('rgba(0, 0, 0, 0)');
                    }
                }
    
    
                this.chart_utils.linechart(ctx, "주가 변동", xdata, ydata, points_color, points, points_data);
            })
        })
       

    }
}

export default CompanyInfo;