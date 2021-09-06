var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var colorArray = ['white', 'green', 'red', 'blue', 'LawnGreen', 'Gold', 'Aqua', 'Purple'];

class Paint {
    constructor(nbLignes, nbColonnes) {
        this.nbLignes = nbLignes;
        this.nbColonnes = nbColonnes;
        ctx.canvas.width = document.documentElement.scrollWidth;
        ctx.canvas.height = document.documentElement.scrollHeight;
        this.responsive();
    }
    
    responsive() {
        if (document.documentElement.scrollWidth < document.documentElement.scrollHeight) {
            this.tailleCase = document.documentElement.scrollWidth * 55 / 100 / nbColonnes;
            this.emplacementHorizontal = document.documentElement.scrollWidth * 22 / 100;
            this.emplacementVertical = this.tailleCase * 2;
        }
        else {
            this.tailleCase = document.documentElement.scrollWidth * 20 / 100 / nbColonnes;
            this.emplacementHorizontal = document.documentElement.scrollWidth * 40 / 100;
            this.emplacementVertical = this.tailleCase * 2;
        }
    }
    
    
    drawGrid(grilleComplete, tetros, currentTetros, currentRotation) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'black';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.emplacementHorizontal, this.emplacementVertical, this.nbColonnes*this.tailleCase, this.nbLignes*this.tailleCase);
        ctx.fillStyle = 'grey';
        ctx.fillRect(this.emplacementHorizontal + ctx.lineWidth / 2, this.emplacementVertical + ctx.lineWidth / 2, this.nbColonnes*this.tailleCase, this.nbLignes*this.tailleCase);
        
        
        for (let i=0; i<this.nbColonnes; i++) {
            ctx.beginPath();
            ctx.moveTo(this.emplacementHorizontal + this.tailleCase*(i+1), this.emplacementVertical);
            ctx.lineTo(this.emplacementHorizontal + this.tailleCase*(i+1), this.emplacementVertical + (this.nbLignes*this.tailleCase));
            ctx.closePath();
            ctx.stroke();
        }
        for (let i=0; i<this.nbLignes; i++) {
            ctx.beginPath();
            ctx.moveTo(this.emplacementHorizontal, this.emplacementVertical + this.tailleCase*(i+1));
            ctx.lineTo(this.emplacementHorizontal + (this.nbColonnes*this.tailleCase), this.emplacementVertical + this.tailleCase*(i+1));
            ctx.closePath();
            ctx.stroke();
        }
        
        for (var i = 0; i < tetros[currentTetros]['rotation'][currentRotation].length; i++) {
            for (var j = 0; j < tetros[currentTetros]['rotation'][currentRotation].length; j++) {
                if (tetros[currentTetros]['rotation'][currentRotation][i][j] != 0) {
                    ctx.fillStyle = colorArray[tetros[currentTetros]['rotation'][currentRotation][i][j]];
                    ctx.fillStyle = 1;
                    ctx.fillRect(this.emplacementHorizontal + j*this.tailleCase + tetros[currentTetros]['position'][0]*this.tailleCase + ctx.lineWidth / 2, this.emplacementVertical + i*this.tailleCase + tetros[currentTetros]['position'][1]*this.tailleCase + ctx.lineWidth / 2, this.tailleCase - ctx.lineWidth, this.tailleCase - ctx.lineWidth);
                }
            }
        }
        for (var i = 0; i < this.nbLignes; i++) {
            for (var j = 0; j < this.nbColonnes; j++) {
                if (grilleComplete[i][j] != 0) {
                    ctx.fillStyle = colorArray[grilleComplete[i][j]];
                    ctx.fillStyle = 1;
                    ctx.fillRect(this.emplacementHorizontal + j*this.tailleCase + ctx.lineWidth / 2, this.emplacementVertical + i*this.tailleCase + ctx.lineWidth / 2, this.tailleCase - ctx.lineWidth, this.tailleCase - ctx.lineWidth);
                }
            }
        }
        
        //drawButtons
        if (document.documentElement.scrollWidth < document.documentElement.scrollHeight) {
            ctx.font = "40px Georgia";
            ctx.fillStyle = 'black';
            ctx.lineWidth = 2;
            ctx.strokeRect(document.documentElement.scrollWidth * 3 /100, document.documentElement.scrollHeight * 79 / 100, document.documentElement.scrollWidth * 23 /100, document.documentElement.scrollHeight * 5 /100);
            ctx.fillText("Rotation G", document.documentElement.scrollWidth * 5 /100, document.documentElement.scrollHeight * 83 / 100, document.documentElement.scrollWidth * 23 /100, document.documentElement.scrollHeight * 5 /100);
            ctx.strokeRect(document.documentElement.scrollWidth * 3 /100, document.documentElement.scrollHeight * 85 / 100, document.documentElement.scrollWidth * 23 /100, document.documentElement.scrollHeight * 5 /100);
            ctx.fillText("Gauche", document.documentElement.scrollWidth * 8 /100, document.documentElement.scrollHeight * 89 / 100, document.documentElement.scrollWidth * 23 /100, document.documentElement.scrollHeight * 5 /100);
            ctx.strokeRect(document.documentElement.scrollWidth * 3 /100, document.documentElement.scrollHeight * 91 / 100, document.documentElement.scrollWidth * 23 /100, document.documentElement.scrollHeight * 5 /100);
            ctx.fillText("Bas", document.documentElement.scrollWidth * 11 /100, document.documentElement.scrollHeight * 94 / 100, document.documentElement.scrollWidth * 23 /100, document.documentElement.scrollHeight * 5 /100);
            ctx.strokeRect(document.documentElement.scrollWidth * 74 /100, document.documentElement.scrollHeight * 79 / 100, document.documentElement.scrollWidth * 23 /100, document.documentElement.scrollHeight * 5 /100);
            ctx.fillText("Rotation D", document.documentElement.scrollWidth * 76 /100, document.documentElement.scrollHeight * 83 / 100, document.documentElement.scrollWidth * 23 /100, document.documentElement.scrollHeight * 5 /100);
            ctx.strokeRect(document.documentElement.scrollWidth * 74 /100, document.documentElement.scrollHeight * 85 / 100, document.documentElement.scrollWidth * 23 /100, document.documentElement.scrollHeight * 5 /100);
            ctx.fillText("Droite", document.documentElement.scrollWidth * 80 /100, document.documentElement.scrollHeight * 89 / 100, document.documentElement.scrollWidth * 23 /100, document.documentElement.scrollHeight * 5 /100);
            ctx.strokeRect(document.documentElement.scrollWidth * 74 /100, document.documentElement.scrollHeight * 91 / 100, document.documentElement.scrollWidth * 23 /100, document.documentElement.scrollHeight * 5 /100);
            ctx.fillText("Bas", document.documentElement.scrollWidth * 83 /100, document.documentElement.scrollHeight * 94 / 100, document.documentElement.scrollWidth * 23 /100, document.documentElement.scrollHeight * 5 /100);
        }
    }
    
    drawMenu() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = "90px Georgia";
        ctx.fillStyle = "red";
        ctx.fillText("T", document.documentElement.scrollWidth/3, document.documentElement.scrollHeight/2);
        ctx.fillStyle = "blue";
        ctx.fillText("E", document.documentElement.scrollWidth/3+56, document.documentElement.scrollHeight/2);
        ctx.fillStyle = "green";
        ctx.fillText("T", document.documentElement.scrollWidth/3+115, document.documentElement.scrollHeight/2);
        ctx.fillStyle = "Purple";
        ctx.fillText("R", document.documentElement.scrollWidth/3+170, document.documentElement.scrollHeight/2);
        ctx.fillStyle = "Orange";
        ctx.fillText("I", document.documentElement.scrollWidth/3+233, document.documentElement.scrollHeight/2);
        ctx.fillStyle = "Magenta";
        ctx.fillText("S", document.documentElement.scrollWidth/3+268, document.documentElement.scrollHeight/2);
        ctx.strokeStyle = 'black';
        ctx.strokeText("TETRIS", document.documentElement.scrollWidth/3+2, document.documentElement.scrollHeight/2);
        ctx.fillStyle = 'black';
        ctx.lineWidth = 2;
        ctx.strokeRect(document.documentElement.scrollWidth / 3 + 60, document.documentElement.scrollHeight / 2 + 80, 200, 100);
        ctx.font = "60px Georgia";
        ctx.fillStyle = "black";
        ctx.fillText("START", document.documentElement.scrollWidth/3 + 65, document.documentElement.scrollHeight/2 + 140);
        ctx.font = "40px Georgia";
        ctx.fillStyle = "black";
        ctx.fillText("Rotation Gauche ou Droite: touches Q ou W", document.documentElement.scrollWidth * 25 / 100, document.documentElement.scrollHeight * 25 / 100);
        ctx.fillText("Mouvements: touches fléchées", document.documentElement.scrollWidth * 25 / 100, document.documentElement.scrollHeight * 30 / 100);
    }
    
    drawRestart() {
        ctx.fillStyle = 'black';
        ctx.fillRect(document.documentElement.scrollWidth/5 -5, document.documentElement.scrollHeight/2 - 90, 550, 130);
        ctx.font = "90px Georgia";
        ctx.fillStyle = "red";
        ctx.fillText("GAME OVER", document.documentElement.scrollWidth/5, document.documentElement.scrollHeight/2);
        ctx.fillStyle = 'black';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'blue';
        ctx.fillRect(document.documentElement.scrollWidth / 3 + 30, document.documentElement.scrollHeight / 3 - 30, 200, 80);
        ctx.font = "40px Georgia";
        ctx.fillStyle = "black";
        ctx.fillText("RE-START", document.documentElement.scrollWidth/3 + 30, document.documentElement.scrollHeight / 3 + 25);
    }
}