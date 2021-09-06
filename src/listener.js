class Listener {
    
    constructor() {
        this.Mintervall = 0;
    }
    
    keyListener() {
        document.addEventListener('keydown', function kevent(e) {
            if(e.keyCode == 40) {
                affichage.jeu.moveTetroDown();
            }
            if(e.keyCode == 37) {
                affichage.jeu.moveTetroLeft();
            }
            if(e.keyCode == 39) {
                affichage.jeu.moveTetroRight();
            }
            if(e.keyCode == 81) {
                affichage.jeu.rotateLeft();
            }
            if(e.keyCode == 87) {
                affichage.jeu.rotateRight();
            }
        });
    }
    
    mouseListener() {
        canvas.addEventListener('mousedown', function mevent(e) {
            var BB=canvas.getBoundingClientRect();
            if(affichage.state == 'menu' && e.clientX-BB.left >= document.documentElement.scrollWidth / 3 + 60 && e.clientX-BB.left  <= document.documentElement.scrollWidth / 3 + 60 + 200 && e.clientY-BB.top >= document.documentElement.scrollHeight / 2 + 80 && e.clientY-BB.top <= document.documentElement.scrollHeight / 2 + 80 + 100) {
                affichage.state = 'start';
                affichage.affichage();
            }
            else if(affichage.state == 'restartmenu' && e.clientX-BB.left >= document.documentElement.scrollWidth / 3 + 30 && e.clientX-BB.left  <= document.documentElement.scrollWidth / 3 + 30 + 200 && e.clientY-BB.top >= document.documentElement.scrollHeight / 3 - 30 && e.clientY-BB.top <= document.documentElement.scrollHeight / 3 - 30 + 80) {
                affichage.state = 'restart';
                affichage.affichage();
            }
        });

        canvas.addEventListener('touchstart', function tevent(event) {
            if (affichage.state == 'game' && (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX) >= document.documentElement.scrollWidth * 3 /100 && (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX)  <= (document.documentElement.scrollWidth * 23 /100 + document.documentElement.scrollWidth * 3 /100) && (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY) >= document.documentElement.scrollHeight * 79 / 100 && (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY) <= (document.documentElement.scrollHeight * 79 / 100 + document.documentElement.scrollHeight * 5 /100)) {
                clearInterval(this.Mintervall);
                this.Mintervall = setInterval(function(){ affichage.jeu.rotateLeft(); }, 100);
            }
            else if (affichage.state == 'game' && (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX) >= document.documentElement.scrollWidth * 3 /100 && (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX)  <= (document.documentElement.scrollWidth * 23 /100 + document.documentElement.scrollWidth * 3 /100) && (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY) >= document.documentElement.scrollHeight * 85 / 100 && (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY) <= (document.documentElement.scrollHeight * 85 / 100 + document.documentElement.scrollHeight * 5 /100)) {
                clearInterval(this.Mintervall);
                this.Mintervall = setInterval(function(){ affichage.jeu.moveTetroLeft(); }, 100);
            }
            else if (affichage.state == 'game' && (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX) >= document.documentElement.scrollWidth * 3 /100 && (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX)  <= (document.documentElement.scrollWidth * 23 /100 + document.documentElement.scrollWidth * 3 /100) && (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY) >= document.documentElement.scrollHeight * 91 / 100 && (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY)<= (document.documentElement.scrollHeight * 91 / 100 + document.documentElement.scrollHeight * 5 /100)) {
                clearInterval(this.Mintervall);
                this.Mintervall = setInterval(function(){ affichage.jeu.moveTetroDown(); }, 100);
            }
            else if (affichage.state == 'game' && (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX) >= document.documentElement.scrollWidth * 74 /100 && (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX)  <= (document.documentElement.scrollWidth * 23 /100 + document.documentElement.scrollWidth * 74 /100) && (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY) >= document.documentElement.scrollHeight * 79 / 100 && (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY) <= (document.documentElement.scrollHeight * 79 / 100 + document.documentElement.scrollHeight * 5 /100)) {
                clearInterval(this.Mintervall);
                this.Mintervall = setInterval(function(){ affichage.jeu.rotateRight(); }, 100);
            }
            else if (affichage.state == 'game' && (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX) >= document.documentElement.scrollWidth * 74 /100 && (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX)  <= (document.documentElement.scrollWidth * 23 /100 + document.documentElement.scrollWidth * 74 /100) && (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY) >= document.documentElement.scrollHeight * 85 / 100 && (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY) <= (document.documentElement.scrollHeight * 85 / 100 + document.documentElement.scrollHeight * 5 /100)) {
                clearInterval(this.Mintervall);
                this.Mintervall = setInterval(function(){ affichage.jeu.moveTetroRight(); }, 100);
            }
            else if (affichage.state == 'game' && (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX) >= document.documentElement.scrollWidth * 74 /100 && (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX)  <= (document.documentElement.scrollWidth * 23 /100 + document.documentElement.scrollWidth * 74 /100) && (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY)>= document.documentElement.scrollHeight * 91 / 100 && (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY) <= (document.documentElement.scrollHeight * 91 / 100 + document.documentElement.scrollHeight * 5 /100)) {
                clearInterval(this.Mintervall);
                this.Mintervall = setInterval(function(){ affichage.jeu.moveTetroDown(); }, 100);
            }
        });
        
        canvas.addEventListener('touchend', function tuevent(event) {
        clearInterval(this.Mintervall);
        });
    }
}