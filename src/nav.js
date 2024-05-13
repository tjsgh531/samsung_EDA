class Nav{
    constructor(){
        this.nav_items = document.querySelectorAll('.nav_item');
        this.active_nav = document.querySelector('.active_nav_item');
        this.all_contents = document.querySelectorAll('.content');
        let active_content = 0;

        this.nav_items.forEach(item=>{
            item.addEventListener('click', ()=>{
                //nav change
                this.active_nav.classList.remove('active_nav_item');
                this.active_nav.classList.add('unactive_nav_item');

                this.active_nav = item;
                this.active_nav.classList.add('active_nav_item');
                this.active_nav.classList.remove('unactive_nav_item');

                // content change
                active_content = Number(this.active_nav.dataset.contentnum);
                this.all_contents.forEach(content=>{
                    content.classList.add('unactive');
                });
                this.all_contents[active_content].classList.remove('unactive');
            });
        });
    }
}

export default Nav;