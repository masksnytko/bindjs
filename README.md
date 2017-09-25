# Пример биндинга объекта с шаблонов дом в js

class User {
    constructor(data) {
        Object.assign(this, data);
    }
}

let user = new User({
    balance: 0
});

let vueUser = new Bind(user, "<div><a balance0></a></div>");
document.body.appendChild(vueUser.el);
