"use strict"
document.addEventListener(`DOMContentLoaded`, () => {


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