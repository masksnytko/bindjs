function bind(node, data, _data) {
    for (var i = 0; i < node.attributes.length; i++) {
        let atr = node.attributes[i];
        let {name, value} = atr;
        
        if (data.hasOwnProperty(value)) {
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
            if (data.hasOwnProperty(name)) {
                _data[name] = data[name];
                node.textContent = data[name];
                Object.defineProperty(data, name, {
                    get: () => _data[name],
                    set: v => {
                        _data[name] = v
                        node.textContent = v;
                    }
                });
            }
            if (value === '') {
                data.el[name] = node;
            }
        }
    }

    for (i = 0; i < node.children.length; i++) {
        bind(node.children[i], data, _data);
    }
};

function Bind (data, template) {

    if (typeof data !== 'object' && typeof data !== 'function') {
        throw new Error('data param not support');
    }

    let el;
    if (typeof template === 'string') {
        el = document.createElement('div');
        el.innerHTML = template;
        el = el.children[0];
    } else if (template instanceof Element) {
        el = template;
    } else {
        throw new Error('template param not support');
    }

    data.el = new Object;
    bind(el, data, new Object);
}

module.exports = Bind;
