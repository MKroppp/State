document.addEventListener("DOMContentLoaded", function () {
    
    var accordions = document.querySelectorAll(".accordion");
    accordions.forEach(function (acc) {
        var header = acc.querySelector(".accordion-header");
        var panel = acc.querySelector(".accordion-panel");
        header.addEventListener("click", function () {
            acc.classList.toggle("active");
            if (acc.classList.contains("active")) {
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.classList.add("active");
            } else {
                panel.style.maxHeight = "0";
                panel.classList.remove("active");
            }
        });
    });

    var menuButton = document.getElementById('menuButton');
    var menu = document.getElementById('menu');

    menuButton.addEventListener('click', function () {
        menu.classList.toggle('show-menu');
    });

    $(document).ready(function () {
        $('.image-carousel').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            arrows: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    });

    var showFormButton = document.getElementById("purchaseButton");
    var purchaseForm = document.getElementById("purchaseForm");
    var purchaseFormContent = document.getElementById("purchaseFormContent");

    showFormButton.addEventListener("click", function () {
        purchaseForm.style.display = "block";
    });

    purchaseForm.addEventListener("click", function (event) {
        if (event.target === purchaseForm) {
            purchaseForm.style.display = "none";
        }
    });
});
