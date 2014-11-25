(function(window, document, version, callback) { // http://stackoverflow.com/questions/2170439/how-to-embed-javascript-widget-that-depends-on-jquery-into-an-unknown-environmen
    var loaded_j = false; 
    
    // document.head not standard before HTML5
    var insertionPoint = document.head || document.getElementsByTagName('head').item(0) || document.documentElement.childNodes[0];
 
    function cmp_vers(v1, v2) {
        var a1 = v1.split('.');
        var a2 = v2.split('.');       
        for(var i = 0; i < Math.min(a1.length, a2.length); i++) {
            var n1 = parseInt(a1[i]);
            var n2 = parseInt(a2[i]);
            var d = n1 - n2;
            if(d) {
                return d;
            }
        }
    
        return(a1.length - a2.length);
    }
       
    function load_jquery(version, cb) {
        var js, d;       
        if (!(js = window.jQuery) || cmp_vers(version, js.fn.jquery) > 0 || cb(js)) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "http://code.jquery.com/jquery-1.9.1.min.js";       
            script.onload = script.onreadystatechange = function() {
                if(!loaded_j && (!(d = this.readyState) || d == "loaded" || d == "complete")) {
                    js = window.jQuery.noConflict(1);
                    cb(js, loaded_j = true);
                    js(script).remove();               
                }
            };       
            insertionPoint.appendChild(script);
        } 
    }
    
    load_jquery(version, function(j) {
               callback(j);   
    });
     
})(window, document, "0.1", function($) {    
    $(document).ready(function () {
        var CONTEXT_CONFIG = {

        }
        $.extend(CONTEXT_CONFIG, window.CONTEXT_CONFIG)
        // global vars
        window.soundcite = {};

        // check for mobile        
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            soundcite.mobile = true;
        } else {
            soundcite.mobile = false;
        }
    
    

        var soundcite_array = $('.soundcite');
        
        for(var i = 0; i < soundcite_array.length; i++) {
            var el = soundcite_array[i];          
            if(el.hasAttribute('data-url')) {
                new PopcornClip(el);
            } else { //if(!soundcite.mobile) {
                new SoundCloudClip(el);
            } 
        }
        
    });  
});