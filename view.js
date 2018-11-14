'use strict';

const mount = document.body.appendChild(document.createElement `div`);

let form = mount.appendChild(document.createElement `form`);
form.method = 'POST';

let houseAddressInput = form.appendChild(document.createElement `input`);
houseAddressInput.type = 'text';
houseAddressInput.name = 'address';

let houseBtn = form.appendChild(document.createElement `input`);
houseBtn.type = 'submit';
houseBtn.value = 'Let\'s start';

let house;

houseBtn.onsubmit = function(event) {
    event.preventDefault();
    let data = new FormData(form);
    fetch('http://localhost:3000/house', {
        method: 'POST',
        body: JSON.stringify({
            address: data.get('address'),
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(res => console.log(res));
    // form.onsubmit = null;
    // form.remove();
};

let roomControlTemplate = document.querySelector('#rooms');
let clone = document.importNode(roomControlTemplate.content, true);
let h2 = clone.querySelector('h2');
h2.innerHTML = 'Room control';
let input = clone.querySelector('input');
let roomAddButton = clone.querySelector('button');
roomAddButton.onclick = function() {
    let inputValue = input.value;
    fetch('http://localhost:3000/rooms', {
        method: 'POST',
        body: JSON.stringify({
            title: inputValue
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => {
        if (res.ok) {
            console.log(res);
        } else {
            throw Error(`Request rejected with status ${res.status}`);
        }
    })
    .catch(err=>console.log(err));
}
roomControlTemplate.parentNode.appendChild(clone);