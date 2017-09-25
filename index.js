class Bind {
    constructor(data, template) {
        
        if (typeof data !== 'object') {
            throw new Error('data param not support');
        }

        let el = document.createElement('div');

        if (typeof template === 'string') {
            el.innerHTML = template;    
        } else if (template instanceof Element) {
            el.appendChild(template);
        } else {
            throw new Error('template param not support');
        }

        this.el = el.children[0];

        let bind = (el, data, _data) => {
            for (var i = 0, j; i < el.children.length; i++) {
                let node = el.children[i];

                for (j = 0; j < node.attributes.length; j++) {
                    let atr = node.attributes[j];
                    let {name, value} = atr;
                    
                    if (data[value]) {
                        if (typeof data[value] === 'function') {
                            node[name] = data[value].bind(data);
                        } else if (value !== '') {
                            
                            if (data[value] !== undefined) {
                                _data[name] = data[value];
                                node.setAttribute(name, data[value]);    
                            }

                            Object.defineProperty(data, value, {
                                get: () => _data[value],
                                set: v => {
                                    _data[value] = v;
                                    node.setAttribute(name, data[value]);
                                }
                            });
                        }
                    } else {

                        if (data[name] !== undefined) {
                            _data[name] = data[name];
                            node.innerHTML = data[name];    
                        }

                        this[name] = node;

                        Object.defineProperty(data, name, {
                            get: () => _data[name],
                            set: v => {
                                _data[name] = v
                                node.innerHTML = v;
                            }
                        });
                    }
    
                    if (el.children.length) {
                        bind(node, data, _data);
                    }
                }
            }
        };

        bind(el, data, new Object);
    }
}

class User {
    constructor(data) {
        Object.assign(this, data);
    }
    logbalance() {
        console.log(this.balance1);
    }
    mousemove(v) {
        console.log(v);
    }
    onchangeName(name) {
        this.name = name.target.value;
    }
}

let user = new User({
    balance0: 0,
    balance1: 0,
    name: 'Jktu',
    role: 'admin',
    class_input: 'any',
    input: 'input',
    photo: 'https://pp.userapi.com/c639821/v639821682/364a2/ZEM3JN4e9M0.jpg'
});

let vueUser = new Bind(user,
`<div onclick=logbalance>
    <a balance0></a>
    <a href=photo balance1></a>
    <div name></div>
    <div items></div>
    <div onmousemove=mousemove role></div>
    <input class=class_input value=input>
</div>`);

document.body.appendChild(vueUser.el);