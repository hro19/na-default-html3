"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // ページ内リンク
  var pageLinks = document.querySelectorAll('a[href^="#"]:not(.aco)');
  pageLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var speed = 500;
      var href = link.getAttribute("href");
      var target = document.querySelector(href === "#" || href === "" ? "html" : href);
      var position = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    });
  });

  // pageTop アニメーション fadeIn & Out
  var pageTop = document.querySelector(".gotop");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      pageTop.style.display = "block";
    } else {
      pageTop.style.display = "none";
    }
  });

  // pageTop アニメーション
  pageTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ハンバーガーメニューによるスライド
  var menuButton = document.querySelector("#menu");
  var menuTrigger = document.querySelector(".menu-trigger");
  var spGnav = document.querySelector("#sp_gnav");

  menuButton.addEventListener("click", function () {
    menuTrigger.classList.toggle("active");
    if (spGnav.style.display === "none" || spGnav.style.display === "") {
      spGnav.style.display = "block";
    } else {
      spGnav.style.display = "none";
    }
  });

  /* PC版 グローバルメニュー固定 */
  var gnav = document.querySelector("#gnav");
  var header = document.querySelector("#header");

  var gnavHeight = gnav.offsetHeight;
  var gnavPosition = gnav.offsetTop;

  window.addEventListener("scroll", function () {
    var windowHeight = window.innerHeight;
    var topWindow = window.scrollY;
    var prepFixedPostion = gnavPosition + gnavHeight;
    var FixedPostion = 470;

    if (topWindow > FixedPostion) {
      gnav.classList.add("fixed");
      gnav.classList.remove("prep_fixed");
    //   header.style.marginTop = gnavHeight + "px";
    } else if (topWindow > prepFixedPostion) {
      gnav.classList.add("prep_fixed");
      gnav.classList.remove("fixed");
    //   header.style.marginTop = gnavHeight + "px";
    } else if (prepFixedPostion > topWindow) {
      gnav.classList.remove("fixed");
      gnav.classList.remove("prep_fixed");
      header.style.marginTop = "0px";
    }
  });

  /* スマホのときは #header マージンを無効にする */
  window.addEventListener("load", function () {
    var width = window.innerWidth;
    headerMarginNone(width);
  });

  window.addEventListener("resize", function () {
    var width = window.innerWidth;
    headerMarginNone(width);
  });

  function headerMarginNone(width) {
    if (width < 640) {
      header.style.marginTop = "0px";
    }
  }

  /* PC←→SP ImgChange */
  window.addEventListener("load", function () {
    var width = window.innerWidth;
    imgChange(width);
  });

  window.addEventListener("resize", function () {
    var width = window.innerWidth;
    imgChange(width);
  });

  function imgChange(width) {
    var chimgElements = document.querySelectorAll(".chimg");
    chimgElements.forEach(function (element) {
      var src = element.getAttribute("src");
      if (width < 640) {
        element.setAttribute("src", src.replace("_pc", "_sp"));
        element.style.visibility = "visible";
      } else if (width > 640) {
        element.setAttribute("src", src.replace("_sp", "_pc"));
        element.style.visibility = "visible";
      }
    });
  }

  // userAgent check
  var device = navigator.userAgent;
  if (
    (device.indexOf("iPhone") > 0 && device.indexOf("iPad") === -1) ||
    device.indexOf("iPod") > 0 ||
    device.indexOf("Android") > 0
  ) {
    device = "sp";
  } else {
    device = "pc";
  }

  // スマホの時だけ tel を有効にする
  if (device === "sp") {
    var telElements = document.querySelectorAll(".tel");
    telElements.forEach(function (telElement) {
      var tel = telElement.getAttribute("data-tel");
      var telLink = document.createElement("a");
      telLink.href = "tel:" + tel;
      telElement.appendChild(telLink);
      while (telElement.firstChild) {
        telLink.appendChild(telElement.firstChild);
      }
    });

    var telImgElements = document.querySelectorAll(".tel_img");
    telImgElements.forEach(function (telImgElement) {
      var tel_img = telImgElement.getAttribute("data-tel");
      var telLink = document.createElement("a");
      telLink.href = "tel:" + tel_img;
      telImgElement.parentNode.replaceChild(telLink, telImgElement);
      telLink.appendChild(telImgElement);
    });
  }

  /* Acodion */
  var acoElements = document.querySelectorAll(".aco");
  acoElements.forEach(function (acoElement) {
    acoElement.addEventListener("click", function () {
      acoElement.nextElementSibling.style.display =
        acoElement.nextElementSibling.style.display === "block" ? "none" : "block";
      acoElement.classList.toggle("active");
    });
  });

  // URL
  var now = location.href.split("/");
  var secondDir = now[3];
  var thirdDir = now[4];
  var fourthDir = now[5];
  var endDir = now.slice(now.length - 2, now.length - 1);

  if (now.length >= 7) {
    var collectionTabLinks = document.querySelectorAll(
      '#collection_tab nav ul li a[href^="/' + secondDir + "/" + thirdDir + '/"]'
    );
    collectionTabLinks.forEach(function (link) {
      link.parentNode.classList.add("active");
    });
  } else if (now.length >= 6) {
    var collectionTabLinks = document.querySelectorAll(
      '#collection_tab nav ul li a[href^="/' + secondDir + '/"]'
    );
    collectionTabLinks.forEach(function (link) {
      link.parentNode.classList.add("active");
    });
  }
});
