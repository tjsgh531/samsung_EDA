import ChartUtils from './chart_utils.js';

class Share{
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
        const max_page = 4;

        const left_btn = document.querySelector('.left_btn_share');
        const right_btn = document.querySelector('.right_btn_share');

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
        const pages = document.querySelectorAll('.share_page');
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
        else if(activepage === 4){
            this.page4();
        }
    }

    page1(){
        if(this.chart_1){
            this.chart_1.destroy();
        }
        
        const file = "src/data/share_df.json";
        this.chart_utils.dataReader(file)
        .then(data=>{
            const ctx = document.querySelector('#share_chart_1');
            const title="시장 점유율 변화(단위 : %)";
            const labels = [];
            const xdata = [2021, 2022, 2023];
            const ydata = [];

            for(let i=0; i<5; i++){
                const temp = [];
                labels.push(data['제품'][i]);
                temp.push(Number(data['2021년'][i]));
                temp.push(Number(data['2022년'][i]));
                temp.push(Number(data['2023년'][i]));
                ydata.push(temp);
            }
            
            this.chart_1 = this.chart_utils.linechart(ctx, title, labels, xdata, ydata);
        })
    }

    page2(){
        if(this.chart_2){
            this.chart_2.destroy();
        }
        if(this.chart_2_2){
            this.chart_2_2.destroy();
        }

        const file = "src/data/tv_share.json";
        this.chart_utils.dataReader(file)
        .then(data=>{
            const ctx = document.querySelector('#share_chart_2');
            const title="시장 점유율 변화(단위 : %)";
            const labels = [];
            const xdata = [2021, 2022, 2023];
            const ydata = [];

            for(let i=0; i<5; i++){
                const temp = [];
                labels.push(data['기업'][i]);
                temp.push(Number(data['2021년'][i]));
                temp.push(Number(data['2022년'][i]));
                temp.push(Number(data['2023년'][i]));
                ydata.push(temp);
            }
            
            this.chart_2 = this.chart_utils.linechart(ctx, title, labels, xdata, ydata);
        })

        const premium_tv = "src/data/premium_tv_share.json";
        this.chart_utils.dataReader(premium_tv)
        .then(data=>{
            const ctx = document.querySelector('#share_chart_2_2');
            const xdata = []
            const ydata = [];

            for(let i =0; i< 5; i++){
                xdata.push(data["기업"][i]);
                ydata.push(data["점유율"][i]); 
            }

            this.chart_2_2 = this.chart_utils.piechart(ctx, "프리미엄 TV 시장 점유율(2023)", xdata, ydata);
            
        })
    }

    page3(){
        if(this.chart_3){
            this.chart_3.destroy();
        }
        if(this.chart_3_2){
            this.chart_3_2.destroy();
        }
        
        const file = "src/data/phone_share.json";
        this.chart_utils.dataReader(file)
        .then(data=>{
            const ctx = document.querySelector('#share_chart_3');
            const title="시장 점유율 변화(단위 : %)";
            const labels = [];
            const xdata = [2021, 2022, 2023];
            const ydata = [];

            for(let i=0; i<6; i++){
                const temp = [];
                labels.push(data['기업'][i]);
                temp.push(Number(data['2021년'][i]));
                temp.push(Number(data['2022년'][i]));
                temp.push(Number(data['2023년'][i]));
                ydata.push(temp);
            }
            
            this.chart_3 = this.chart_utils.linechart(ctx, title, labels, xdata, ydata);
        })

        const premium_phone = "src/data/premium_phone_share.json";
        this.chart_utils.dataReader(premium_phone)
        .then(data=>{
            const ctx = document.querySelector('#share_chart_3_2');
            const xdata = []
            const ydata = [];

            for(let i =0; i< 5; i++){
                xdata.push(data["기업"][i]);
                ydata.push(data["점유율"][i]); 
            }

            this.chart_3_2 = this.chart_utils.piechart(ctx, "프리미엄 스마트폰 시장 점유율(2023)", xdata, ydata);
        })
    }

    page4(){
        if(this.chart_4){
            this.chart_4.destroy();
        }
        
        const file = "src/data/dram_share.json";
        this.chart_utils.dataReader(file)
        .then(data=>{
            console.log(data);

            const ctx = document.querySelector('#share_chart_4');
            const title="시장 점유율 변화(단위 : %)";
            const labels = [];
            const xdata = [2021, 2022, 2023];
            const ydata = [];

            for(let i=0; i<4; i++){
                const temp = [];
                labels.push(data['기업'][i]);
                temp.push(Number(data['2021년'][i]));
                temp.push(Number(data['2022년'][i]));
                temp.push(Number(data['2023년'][i]));
                ydata.push(temp);
            }
            
            this.chart_4 = this.chart_utils.linechart(ctx, title, labels, xdata, ydata);
        })
    }
}

export default Share;