import CompanyInfo from './company_info.js';
import Nav from './nav.js';
import Revenue from './revenue.js';

class Main{
    constructor(){
        const nav = new Nav();
        const company_info = new CompanyInfo();
        const revenue = new Revenue();
    }
}

window.onload = ()=>{
    new Main();
}