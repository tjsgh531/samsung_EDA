import Nav from './nav.js';

import CompanyInfo from './company_info.js';
import Revenue from './revenue.js';
import Share from './share.js';
import News from './news.js';


class Main{
    constructor(){
        const nav = new Nav();
        const company_info = new CompanyInfo();
        const revenue = new Revenue();
        const share = new Share();
        const news = new News();
    }
}

window.onload = ()=>{
    new Main();
}