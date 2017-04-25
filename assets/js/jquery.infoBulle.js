$.fn.infoBulle = function(options){
    
    
    /* options par défaut pour l'info-bulle */
    var defaults = {
        speed: 200,
        delay: 300
    };
    
    var options = $.extend(defaults, options);
    
    /* création de la fonction permettant de générer le code HTML de l'info-bulle */
    getBulle = function() {
        var tBulle = 
            "<div class='bulle'>" +
                "<div class='bg'>"  +
                "</div>" +
                "<div class='basbulle'></div>" +
            "</div>";
        return tBulle;
    }
    $("body").prepend(getBulle());
    
    /* permettre l'appel du plugin */
    $(this).each(function(){
        
        var $this = $(this);
        var bulle = $('.bulle');
        var bulleInner = $('.bulle .bg');
        
        var tTitle = (this.title);
        this.title = "";
        
        var offset = $(this).offset();
        var tLeft = offset.left;
        var tTop = offset.top;
        var tWidth = $this.width();
        var tHeight = $this.height();
        
        /* fonctions mouse over/out */
        $this.hover(
            function() {
                bulleInner.html(tTitle);
                setBulle(tTop, tLeft);
                setTimer();
            }, 
            function() {
                stopTimer();
                bulle.hide();
            }
        );         
        
        /* animation de la transition */
        setTimer = function() {
            $this.showBulleTimer = setInterval("showBulle()", defaults.delay);
        }
        
        stopTimer = function() {
            clearInterval($this.showBulleTimer);
        }
        
        /* positionnement de l'infobulle */
        setBulle = function(top, left){
            var topOffset = bulle.height();
            var xBulle = (left-30)+"px";
            var yBulle = (top-topOffset-60)+"px";
            bulle.css({'top' : yBulle, 'left' : xBulle});
        }
        
        /*fonction qui arrete le timer et anime la transition */                         
        showBulle = function(){
            stopTimer();
            bulle.animate({"top": "+=20px", "opacity": "toggle"}, defaults.speed);
        }
    });
};