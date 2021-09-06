var music = new Audio('/sound/theme.mp3');
music.volume = 0.3;
var lineSound = new Audio('/sound/line.wav');
var fallSound = new Audio('/sound/fall.wav');
var rotateSound = new Audio('/sound/selection.wav');
var overSound = new Audio('/sound/gameover.wav');

if (typeof music.loop == 'boolean')
{
    music.loop = true;
}
else
{
    music.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

class Game {
    constructor(tetros) {
        this.tetros = tetros;
        this.grilleComplete = [];
        this.intervall = 0;
        this.currentTetros = 0;
        this.currentRotation = 0;
        this.timer = 0;
        this.intervall = 0;
        this.tetrosBag = [];
        this.mobile = false;
        this.timeintervall = 1000;
        this.countLine = 0;
        if (document.documentElement.scrollWidth < document.documentElement.scrollHeight)
        this.mobile = true;
    }
    
    tetrosRandom() {
        for (var i = 0; i < this.tetros.length; i++) {
            for (var j = 0; j < 5; j++) {
                this.tetrosBag.push(i);
            }
        }
    }
    
    fillGrid() {
        let Grid = [];
        for (var i = 0; i < nbLignes; i++) {
            Grid[i] = [];
            for (var j = 0; j < nbColonnes; j++) {
                Grid[i][j] = this.grilleComplete[i][j];
            }
        }
        let tetros = this.tetros[this.currentTetros]['rotation'][this.currentRotation];
        let PosX = this.tetros[this.currentTetros]['position'][1];
        let PosY = this.tetros[this.currentTetros]['position'][0];
        
        for (var i = 0; i < tetros.length; i++) {
            for (var j = 0; j < tetros.length; j++) {
                if (tetros[i][j] != 0) {
                    Grid[i + PosX][j + PosY] = tetros[i][j];
                }
            }
        }
        this.grilleComplete = Grid;
    }
    
    moveTetroDown() {
        if (Date.now() - this.timer < 200 || affichage.state != 'game')
        return;
        this.tetros[this.currentTetros]['position'][1] += 1;
        if (this.collideDown() == true) {
            this.tetros[this.currentTetros]['position'][1] -= 1;
            if (this.mobile == false)
            fallSound.play();
            this.fillGrid();
            this.checkLine();
            this.newTetro();
        }
        if(this.collideDown()){
            if (this.mobile == false) {
                music.pause();
                overSound.play();
            }
            affichage.state = 'over';
        }
        clearInterval(this.intervall);
        this.intervall = 0;
        this.intervall = setInterval(run, this.timeintervall);
        affichage.affichage();
    }
    
    moveTetroLeft() {
        this.tetros[this.currentTetros]['position'][0] -= 1;
        if (this.collideLeft() == true) {
            this.tetros[this.currentTetros]['position'][0] += 1;
        }
        affichage.affichage();
    }
    
    moveTetroRight() {
        this.tetros[this.currentTetros]['position'][0] += 1;
        if (this.collideLeft() == true) {
            this.tetros[this.currentTetros]['position'][0] -= 1;
        }
        affichage.affichage();
    }
    
    rotateLeft() {
        var rotateSound = new Audio('/sound/selection.wav');
        rotateSound.volume = 0.2;
        if (this.mobile == false)
        rotateSound.play();
        let previousRotation = this.currentRotation;
        this.currentRotation -= 1;
        if (this.currentRotation < 0)
        this.currentRotation = this.tetros[this.currentTetros]['rotation'].length - 1;
        if(this.collideRotation() == true)
        this.currentRotation = previousRotation;
        affichage.affichage();
    }
    
    rotateRight() {
        var rotateSound = new Audio('/sound/selection.wav');
        rotateSound.volume = 0.2;
        if (this.mobile == false)
        rotateSound.play();
        let previousRotation = this.currentRotation;
        this.currentRotation += 1;
        if (this.currentRotation > this.tetros[this.currentTetros]['rotation'].length - 1)
        this.currentRotation = 0;
        if(this.collideRotation() == true)
        this.currentRotation = previousRotation;
        affichage.affichage();
    }
    
    collideRotation() {
        for (var i = 0; i < this.tetros[this.currentTetros]['rotation'][this.currentRotation].length; i++) {
            for (var j = 0; j < this.tetros[this.currentTetros]['rotation'][this.currentRotation].length; j++) {
                if (this.tetros[this.currentTetros]['rotation'][this.currentRotation][i][j] != 0 && (this.tetros[this.currentTetros]['position'][1] + i > nbLignes || this.tetros[this.currentTetros]['position'][0] + j < 0 || this.tetros[this.currentTetros]['position'][0] + j > nbColonnes || this.grilleComplete[this.tetros[this.currentTetros]['position'][1] + i][j + this.tetros[this.currentTetros]['position'][0]] != 0)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    collideLeft() {
        for (var i = 0; i < this.tetros[this.currentTetros]['rotation'][this.currentRotation].length; i++) {
            for (var j = 0; j < this.tetros[this.currentTetros]['rotation'][this.currentRotation].length; j++) {
                if (this.tetros[this.currentTetros]['rotation'][this.currentRotation][i][j] != 0 && (this.tetros[this.currentTetros]['position'][0] + j < 0 || this.grilleComplete[this.tetros[this.currentTetros]['position'][1] + i][j + this.tetros[this.currentTetros]['position'][0]] != 0)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    collideRight() {
        for (var i = 0; i < this.tetros[this.currentTetros]['rotation'][this.currentRotation].length; i++) {
            for (var j = 0; j < this.tetros[this.currentTetros]['rotation'][this.currentRotation].length; j++) {
                if (this.tetros[this.currentTetros]['rotation'][this.currentRotation][i][j] != 0 && (this.tetros[this.currentTetros]['position'][0] + j > nbColonnes || this.grilleComplete[this.tetros[this.currentTetros]['position'][1] + i][j + this.tetros[this.currentTetros]['position'][0]] != 0)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    collideDown() {
        const testPosition = this.tetros[this.currentTetros]['position'][1];
        for (var i = 0; i < this.tetros[this.currentTetros]['rotation'][this.currentRotation].length; i++) {
            for (var j = 0; j < this.tetros[this.currentTetros]['rotation'][this.currentRotation].length; j++) {
                if (this.tetros[this.currentTetros]['rotation'][this.currentRotation][i][j] != 0 && (testPosition + i >= nbLignes || this.grilleComplete[testPosition + i][j + this.tetros[this.currentTetros]['position'][0]] != 0)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    checkLine() {
        let i = nbLignes - 1;
        while(i >= 0) {
            if (this.grilleComplete[i].indexOf(0) == -1) {
                this.deleteLine(i);
                i = nbLignes;
                this.countLine++;
                if (this.countLine == 10) {
                    this.countLine = 0;
                    if (this.timeintervall>200)
                    this.timeintervall -= 100;
                }
            }
            i--;
        }
    }
    
    deleteLine(Line) {
        let newGrid = this.grilleComplete;
        let i = Line;
        if (this.mobile == false)
        lineSound.play();
        while(i >= 1) {
            newGrid[i] = this.grilleComplete[i - 1];
            i--;
        }
        this.grilleComplete = newGrid;
    }
    
    
    newTetro() {
        if (this.tetrosBag.length <= 0) {
            this.tetrosRandom();
        }
        
        const bagKey = Math.floor(Math.random() * this.tetrosBag.length);
        const bagValue = this.tetrosBag[bagKey];
        this.tetrosBag.splice(bagKey, 1);
        this.currentTetros = bagValue;
        this.tetros[this.currentTetros]['position'][0] = nbColonnes / 2 - Math.floor(this.tetros[this.currentTetros]['rotation'][0].length / 2);
        this.tetros[this.currentTetros]['position'][1] = 0;
        this.currentRotation = 0;
        this.timer = Date.now();
    }
    
    start() {
        
        for (var i = 0; i < nbLignes; i++) {
            this.grilleComplete[i] = [];
            for (var j = 0; j < nbColonnes; j++) {
                this.grilleComplete[i][j] = 0;
            }
        }
        this.newTetro();
        this.intervall = setInterval(run, this.timeintervall);
        affichage.state = 'game';
        if (this.mobile == false)
        music.play();
        affichage.affichage();
    }
    
    restart() {
        
        for (var i = 0; i < nbLignes; i++) {
            this.grilleComplete[i] = [];
            for (var j = 0; j < nbColonnes; j++) {
                this.grilleComplete[i][j] = 0;
            }
        }
        clearInterval(this.intervall);
        this.newTetro();
        this.timeintervall = 1000;
        this.intervall = setInterval(run, this.timeintervall);
        affichage.state = 'game';
        if (this.mobile == false)
        music.play();
        affichage.affichage();
    }
}
affichage = new Affichage();

function run() {
    update();
}

function update() {
    affichage.jeu.moveTetroDown();
}