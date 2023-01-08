$(function () {
  // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse("hide");
    }
  });

  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Refer to issue #28 in the repo.
  // Solution: force focus on the element that the click event fired on
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });

});

(function (global) {
  var dc = {};

  var homeHtml = "snippets/home-snippet.html";
  var aboutusHtml = "snippets/abus-snippet.html";
  var quantumHtml = "snippets/quantum-snippet.html";
  var aiHtml = "snippets/categories-title-snippet.html";
  var telemedicineHtml = "snippets/category-snippet.html";
  var applicationsHtml = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";

  // Convenience function for inserting innerHTML for 'select'
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  // Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/loading.gif'></div>";
    insertHtml(selector, html);
  };

  // Remove the class 'active' from home and switch to Menu button
  var switchMenuToActive = function () {
    // Remove 'active' from home button
    var classes = document.querySelector("#navHomeButton").className;
    classes = classes.replace(new RegExp("active", "g"), "");
    document.querySelector("#navHomeButton").className = classes;

  //   // Add 'active' to menu button if not already there
    classes = document.querySelector("#navMenuButton").className;
    if (classes.indexOf("active") == -1) {
      classes += " active";
      document.querySelector("#navMenuButton").className = classes;
    }
  };

  // On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {
    // On first load, show home view
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      homeHtml,
      function (responseText) {
        document.querySelector("#main-content").innerHTML = responseText;
      },
      false
    );
  });

  // Load the menu categories view
  dc.loadPage = function (address) {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      address,
      function (responseText) {
        document.querySelector("#main-content").innerHTML = responseText;
        // Sticky Navbar for secondary pages
        var navSelector = '#toc';
        var $myNav = $(navSelector);
        Toc.init($myNav);
        $('body').scrollspy({
          target: navSelector
        });
      },
      false);
  };


  global.$dc = dc;
})(window);
