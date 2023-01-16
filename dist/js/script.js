"use strict"
document.addEventListener(`DOMContentLoaded`, () => {
    // Мобильное меню
    (function(){
        const body = document.querySelector(`body`),
          menu = document.querySelector(`.mobile-menu`),
          burger = document.querySelector(`.nav__burger`),
          mobileMenuLink = document.querySelectorAll(`.mobile-menu__item a`);
        
      
      burger.addEventListener(`click`, (e) =>{


        body.classList.toggle(`overflow`);
        menu.classList.toggle(`mobile-menu__active`);
        burger.classList.toggle(`nav__burger__active`);
      });

      mobileMenuLink.forEach((item) =>{
        item.addEventListener(`click`, (e) =>{

          body.classList.remove(`overflow`);
          menu.classList.remove(`mobile-menu__active`);
          burger.classList.remove(`nav__burger__active`);
        });
      });

      
    }());

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
    if (document.documentElement.clientWidth < 1024) {
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