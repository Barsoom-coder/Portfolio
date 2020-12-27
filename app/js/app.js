import $ from "jquery";
window.jQuery = $;
window.$ = $; // import jQuery module (npm i -D jquery)
import slick from "slick-carousel";
import validate from "jquery-validation";
// require('~/app/libs/mmenu/js/jquery.mmenu.all.min.js') // import vendor jQuery plugin example (not module)

document.addEventListener("DOMContentLoaded", () => {
  $(".slider__row").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: ".slider__button--next",
    prevArrow: ".slider__button--prev",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $("#myForm").validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      email: {
        required: true,
        email: true,
      },
      subject: {
        required: true,
        minlength: 5,
      },
      message: {
        required: true,
        minlength: 20,
      },
    },

    messages: {
      name: {
        required: "Пожалуйста, введите свое имя",
        minlength: "Длина имени должна быть не менее трёх букв",
      },
      email: {
        required: "Пожалуйста, введите свой email",
        email: "Email адрес должен быть в формате name@domain.com. Возможно вы ввели email с ошибкой.",
      },
      subject: {
        required: "Пожалуйста, введите название темы",
        minlength: "Название темы должно быть не менее пяти букв",
      },
      message: {
        required: "Пожалуйста, введите текст сообщения",
        minlength: "Не менее двадцати символов",
      },
    },

    submitHandler: function (form) {
      ajaxFormSubmit();
    },
  });

  function ajaxFormSubmit() {
    var string = $("#myForm").serialize();
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: string,

      success: function (html) {
        $("#myForm").slideToggle(800);
        $("#answer").html(html);

        $(".contact-form__success").on("click", function () {
          $("#myForm")[0].reset();
          $(".contact-form__success").detach();
          $("#myForm").slideToggle(800);
        });
      },
    });
    return false;
  }

  $(window).scroll(function () {
    if ($(this).scrollTop() > $(window).height() * 0.2) {
      $(".btnScroll").fadeIn();
    } else {
      $(".btnScroll").fadeOut();
    }
  });

  $(".btnScroll").click(function (e) {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      "slow"
    );
    return false;
  });

  $(".scroll").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $(hash).offset().top - ($('ul').height() - 1)  
          },
          800,
        );
    }
  });


});
