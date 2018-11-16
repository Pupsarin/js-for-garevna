'use strict';

class DomOperations {
    constructor() {}

    static createElem(tagName, container) {
        return (!container ? document.body : container)
            .appendChild(
                document.createElement(tagName)
            )
    }

    static deleteElem(tagName, container) {
        return (!container ? document.body : container)
            .removeChild(
                document.querySelector(tagName)
            )
    }
}

class AddSmthing extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: 'open'
        });
        this.container = DomOperations.createElem('div');
        this.h2 = DomOperations.createElem('h2', this.container);
        this.form = DomOperations.createElem('form', this.container);
        this.inputText = DomOperations.createElem('input', this.form);
        this.inputText.type = 'text';
        this.button = DomOperations.createElem('button', this.form);
        this.button.innerText = 'Submit';
        this.shadow.appendChild(this.container);
    }
}

let house;

class AddHouse extends AddSmthing {
    constructor() {
        super();
        this.h2.innerText = 'Create House';
        this.inputText.placeholder = 'Enter house address...';
        this.inputText.name = 'house-address';
        this.form.onsubmit = function(e) {
            e.preventDefault();
            let data = new FormData(this);
            let address = data.get('house-address');
            if (!!address) {
                house = new House(address);
                this.reset();
                DomOperations.deleteElem('add-house-pop');
                DomOperations.createElem('room-list');
            }
        }
    }
}


class AddRoom extends AddSmthing {
    constructor() {
        super();
        this.h2.innerText = 'Create Room';
        this.inputText.placeholder = 'Enter room title...';
        this.inputText.name = 'room-title';
        this.form.onsubmit = function(e) {
            e.preventDefault();
            let data = new FormData(this);
            let roomTitle = data.get('room-title');
            if (!!roomTitle) {
                house.addRoom(new Room(roomTitle));
                this.reset();
                let thisElem = document.querySelector('room-list').shadow;
                thisElem.querySelectorAll('add-room-pop').forEach(x=>x.remove());
                thisElem.querySelector('div').appendChild(DomOperations.createElem('room-elem', thisElem));
                // thisElem.querySelector('add-room-pop').remove();
            }
        }
    }
}


class RoomAddElem extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: 'open'
        });
        this.container = DomOperations.createElem('div');
        this.plus = DomOperations.createElem('a', this.container);
        this.plus.innerText = '+';
        this.plus.href = '';
        this.plus.title = "Add new Room";
        let style = DomOperations.createElem('style', this.container);
        style.innerText = `
            div {
                display: inline-block;
                width: 100px;
                height: 100px;
                border: 1px solid black;
            }
            
            div>a {
                text-decoration: none;
                line-height: 100px;
                display: block;
                height: 100%;
                font-size: 100px;
                text-align: center;
            }`

        this.plus.onclick = function(e) {
            e.preventDefault()
            document.querySelector('room-list').shadow.appendChild(document.createElement('add-room-pop'));
        }
        this.shadow.appendChild(this.container);
    }
}

class RoomList extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: 'open'
        });
        this.container = DomOperations.createElem('div');
        this.h3 = DomOperations.createElem('h3', this.container);
        this.h3.innerText = `Rooms in the house by the address: ${house.address}`;
        this.h3.style.width = '100%';
        // this.roomsDiv = DomOperations.createElem('div', this.container);
        this.roomElem = DomOperations.createElem('room-add-elem', this.container);
        let style = DomOperations.createElem('style', this.container);
        
        style.innerText = `
            div {
                display: flex;
                flex-wrap: wrap;
        }`
        this.shadow.appendChild(this.container);
    }
}

class RoomElem extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: 'open'
        });
        this.container = DomOperations.createElem('div');
        this.h4 = DomOperations.createElem('h4', this.container);
        this.h4.innerText = house.rooms.pop().title;
        let style = DomOperations.createElem('style', this.container);
        style.innerText = `
            div {
                display: inline-block;
                width: 100px;
                height: 100px;
                border: 1px solid black;
            }`
        this.shadow.appendChild(this.container);
    }
}


customElements.define('add-house-pop', AddHouse);
customElements.define('add-room-pop', AddRoom);
customElements.define('room-add-elem', RoomAddElem);
customElements.define('room-list', RoomList);
customElements.define('room-elem', RoomElem);


DomOperations.createElem('add-house-pop');