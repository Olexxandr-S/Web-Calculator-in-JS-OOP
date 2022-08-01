export default class Screen {
    constructor() {
        this.init();
    }

    init() {
        this.history = new History();
        this.display = new Display();
        
        this.root = document.createElement("div");
        this.root.className = "screen";
        this.root.appendChild(this.history.getView());
        this.root.appendChild(this.display.getView());
    }

    getView() {
        return this.root;
    }
}

class History {
    constructor() {
        this.init()
    }

    init() {
        this.root = document.createElement("div");
        this.root.className = "history";
    }

    getView() {
        return this.root;
    }
}

class Display {
    static maxLen = 16;
    constructor() {
        this.init();
    }

    init() {
        this.value = 0;
        this.root = document.createElement("div");
        this.root.className = "display";
        this.root.innerText = this.value;
    }

    display(value) {
        this.value = value;

        this.root.innerText = String(value).length > maxLen ? 
            Number.toExponential(this.value) : this.value;
    }

    getView() {
        return this.root;
    }
}

export {Display, History, Screen};
