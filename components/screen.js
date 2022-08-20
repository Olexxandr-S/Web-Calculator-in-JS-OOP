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
        this.history = new Array();
        this.value = {};
        this.init()
    }

    init() {
        this.root = document.createElement("div");
        this.root.className = "history";
    }

    add({a, action}) {
        this.value = {a: a, action: action};
        this.history.push(this.value);
    }

    update({b, result}) {
        Object.assign(this.value, {b: b, result:result });
    }

    clear() {
        this.history = new Array();
        this.value = {};
        this.render();
    }

    render() {
        this.root.innerText = this.history.length > 0 ?
            "$a $action $b $equal"
            .replace("$a", this.value.a ? this.value.a : "")
            .replace("$action", this.value.action ? this.value.action : "")
            .replace("$b $equal", this.value.b && this.value.result ? `${this.value.b} =` : "")
            .trim() : ""
    }

    getView() {
        return this.root;
    }
}

class Display {
    static MAX_LEN = 16;
    constructor() {
        this.value = 0;
        this.init();
    }

    init() {
        this.root = document.createElement("div");
        this.root.className = "display";
        this.root.innerText = this.value;
    }

    display(value) {
        this.value = value;

        this.root.innerText = String(value).length > Display.MAX_LEN ? 
            Number(this.value).toExponential() : this.value;
    }

    getView() {
        return this.root;
    }
}

export {Display, History, Screen};
