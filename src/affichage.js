const nbLignes = 20;
const nbColonnes = 10;

class Affichage {
    constructor() {
        this.state = 'menu';
        this.jeuDraw = new Paint(nbLignes, nbColonnes);
        this.jeuListener = new Listener();
        this.affichage();
    }
    
    affichage() {
        switch (this.state) {
            case "menu":
            this.jeuDraw.drawMenu();
            this.jeuListener.mouseListener();
            break;
            case "start":
            this.jeu = new Game(tetros);
            this.jeu.start();
            this.jeuListener.keyListener();
            break;
            case "over":
            this.state = "restartmenu";
            this.affichage();
            break;
            case "restartmenu":
            this.jeuDraw.drawRestart();
            break;
            case "restart":
            this.jeu.restart();
            break;
            default:
            this.jeuDraw.drawGrid(this.jeu.grilleComplete, this.jeu.tetros, this.jeu.currentTetros, this.jeu.currentRotation);
            break;
        }
    }
}