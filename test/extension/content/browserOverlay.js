window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    WebdriverIOTestExtension.init();
},false);

var WebdriverIOTestExtension = {
  init: function() {
    var appcontent = document.getElementById("appcontent");   // browser
    if(appcontent){
      appcontent.addEventListener("DOMContentLoaded", WebdriverIOTestExtension.onPageLoad, true);
    }
  },

  onPageLoad: function(aEvent) {
    var doc = aEvent.originalTarget;
    doc.querySelector(".header").innerHTML = 'WebdriverIOTestExtension successfully installed!';
  }
};
