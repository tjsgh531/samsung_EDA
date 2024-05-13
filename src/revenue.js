import ChartUtils from './chart_utils.js';

class Revenue{
    constructor(){
        this.chart_utils = new ChartUtils();

        this.current_page = 1;
        this.init();
    }

    init(){
        this.pageChange(this.current_page);
        this.pageManager();
    }

    pageManager(){   
        const max_page = 3;

        const left_btn = document.querySelector('.left_btn_revenue');
        const right_btn = document.querySelector('.right_btn_revenue');

        left_btn.addEventListener('click', ()=>{            
            if(this.current_page > 1){
                this.current_page--;
                this.pageChange(this.current_page);
            }

            // 버튼 사라지고 나타나는 것 조절
            if(this.current_page === 1){
                left_btn.classList.add('unactive');
            }

            if(right_btn.classList.contains('unactive')){
                right_btn.classList.remove('unactive');
            }
        });

        right_btn.addEventListener('click', ()=>{
            if(this.current_page < max_page){
                this.current_page++;
                this.pageChange(this.current_page);
            }
            
            // 버튼 사라지고 나타나는 것 조절
            if(this.current_page === max_page){
                right_btn.classList.add('unactive');
            }

            if(left_btn.classList.contains('unactive')){
                left_btn.classList.remove('unactive');
            }
        })
    }
    pageChange(activepage){
        const pages = document.querySelectorAll('.revenue_page');
        let active_page;

        pages.forEach(page=>{
            if(page.classList.contains('active_page')){
                active_page = page;
            }
        });

        active_page.classList.remove('active_page');
        active_page.classList.add('unactive');

        pages[activepage-1].classList.add('active_page');
        pages[activepage-1].classList.remove('unactive');

        if(activepage === 1){
            this.page1();
        }
        else if(activepage === 2){
            this.page2();
        }
        else if(activepage === 3){
            this.page3();
        }
    }

    page1(){
        if(this.page1_chart){
            this.page1_chart.destroy();
        }
        const ctx = document.querySelector('#revenue_chart_1');

        const file = "src/data/sale_revenue_by_sector_for_each_year.json";
        this.chart_utils.dataReader(file)
        .then(data => {
            let labels = [];
            let xdata = [2021, 2022, 2023];
            let ydata = []; //sector별로 해야해요!!

            // barlabels 데이터 넣기
            for(let i=0; i<5; i++){
                labels.push(data['부문'][i]);
            }

            //barydate 데이터 넣기
            for(let i=0; i<5; i++){
                const temp = [];
                temp.push(Number(data['2021년'][i]));
                temp.push(Number(data['2022년'][i]));
                temp.push(Number(data['2023년'][i]));
                ydata.push(temp);
            }

            //linedata 데이터 넣기
            const linelabes = ['총 매출액'];
            const linexdata = [2021, 2022, 2023];
            const lineydata = [[Number(data['2021년'][5]), Number(data['2022년'][5]), Number(data['2023년'][5])]];

            this.page1_chart = this.chart_utils.stackbarNlinechart(ctx, '부문별 매출액 변화', labels, xdata, ydata, linelabes, linexdata, lineydata);
        })
    }

    page2(){
        if(this.page2_chart){
            this.page2_chart.destroy();
        }

        const ctx = document.querySelector('#revenue_chart_2');
        const file = "src/data/main_product_sale_price.json";

        this.chart_utils.dataReader(file)
        .then(data =>{
            console.log(data);

            const title = "주요 제품별 매출액 변화";
            const labels = [];
            const xdata = [2021, 2022, 2023];
            const ydata = [];

            for(let i=0; i<4; i++){
                const temp = [];
                labels.push(data['제품'][i]);
                temp.push(Number(data['2021년'][i]));
                temp.push(Number(data['2022년'][i]));
                temp.push(Number(data['2023년'][i]));
                ydata.push(temp);
            }

            this.page2_chart = this.chart_utils.linechart(ctx, title, labels, xdata, ydata);
        })
    }

    page3(){
        if(this.page3_chart){
            this.page3_chart.destroy();
        }

        const ctx = document.querySelector('#revenue_chart_3');
        const file = "src/data/product_sale_price_change.json";

        this.chart_utils.dataReader(file)
        .then(data => {
            console.log(data);
            const title = "주요 제품 가격 변동률";
            const xdata = [];
            const ydata = [];

            for(let i = 0; i < 5 ; i++){
                xdata.push(data['product'][i]);
                ydata.push(data['price_change(%)'][i]);
            }

            this.page3_chart = this.chart_utils.barchart(ctx, title, xdata, ydata);
        })
    }
}

export default Revenue;