"use strict"
document.addEventListener(`DOMContentLoaded`, () => {

    //Табы
    const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = "block") =>{
        const header = document.querySelector(headerSelector),
            tab = document.querySelectorAll(tabSelector),
            content = document.querySelectorAll(contentSelector);
        function hideTabContent(){
            content.forEach(item =>{
                item.style.display = `none`;
            });
            tab.forEach(item =>{
                item.classList.remove(activeClass);
                item.style.cursor = `pointer`;
            });
        }
    
        function showTabContent(i = 0){
            content[i].style.display = display;
            tab[i].classList.add(activeClass);
        }
    
        hideTabContent();
        showTabContent();
    
        header.addEventListener(`click`, (e) =>{
            const target = e.target;
            if( target &&
                (target.classList.contains(tabSelector.replace(/\./, "")) || 
            target.parentNode.classList.contains(tabSelector.replace(/\./ , "")))){
                tab.forEach((item, i)=>{
                    if(target == item || target.parentNode == item){
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    };
    if (document.documentElement.clientWidth < 768) {
        tabs(`.advantage__tabs-header`, `.advantage__tab`,`.advantage__tab-content`,`advantage__tab_active`)
     }
    
    // Аккардион
    (function () {
        const accordions = document.querySelectorAll(".question__accordion");

        const openAccordion = (accordion) => {
            const content = accordion.querySelector(".question__accordion__content");
            accordion.classList.add("question__accordion__active");
            content.style.maxHeight = content.scrollHeight + "px";
        };

        const closeAccordion = (accordion) => {
            const content = accordion.querySelector(".question__accordion__content");
            accordion.classList.remove("question__accordion__active");
            content.style.maxHeight = null;
        };

        accordions.forEach((accordion) => {
            const intro = accordion.querySelector(".question__accordion__intro");
            const content = accordion.querySelector(".question__accordion__content");

            intro.onclick = () => {
                if (content.style.maxHeight) {
                    closeAccordion(accordion);
                } else {
                    accordions.forEach((accordion) => closeAccordion(accordion));
                    openAccordion(accordion);
                }
            };
        });
    }());



});