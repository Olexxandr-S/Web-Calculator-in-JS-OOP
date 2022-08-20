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

    addHistory(record) {
        this.history.add(record);
    }

    getView() {
        return this.root;
    }
}

class History {
    constructor() {
        this.init();
        this.clear();
    }

    init() {
        this.root = document.createElement("div");
        this.root.className = "history"; 
    }

    add({a, action}) {
        this.lastValue = {a: a, action: action};
        this.history.push(this.lastValue);
    }

    update({b, result}) {
        Object.assign(this.lastValue, {b: b, result: result});
    }

    clear() {
        this.history = new Array();
        this.lastValue = {};
        this.render();
    }

    getView() {
        return this.root;
    }

    render() {
                
        // if `a` and `action` are present show `$a $action`
        // if `a` and `action` and `b` are present show `$a $action $b =`

        if(this.lastValue.a && this.lastValue.action && this.lastValue.b) {
            this.root.innerText = `${this.lastValue.a} ${this.lastValue.action} ${this.lastValue.b} =`;
        } else if(this.lastValue.a && this.lastValue.action) {
            this.root.innerText = `${this.lastValue.a} ${this.lastValue.action}`;
        } else {
            this.root.innerText = "";
        }
    }
}

class Display {
    static maxLen = 16;
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

        this.root.innerText = String(value).length > Display.maxLen ? 
            Number(this.value).toExponential() : this.value;
    }

    getView() {
        return this.root;
    }
}

export {Display, History, Screen};
