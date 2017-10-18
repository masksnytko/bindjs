# Пример простого биндинга объекта с шаблоном дом

Какая-то реализация класса

```js
const bind = require('bind');

class User {
    constructor(data) {
        Object.assign(this, data);
    }
    logBalance() {
        console.log(this.balance1);
    }
    mouseMove(v) {
        console.log(v);
    }
}
```

Создаем объект
```js
let user = new User({
    balance0: 0,
    balance1: 0,
    name: 'Jktu',
    role: 'admin',
    class_input: 'any',
    photo: 'https://pp.userapi.com/c639821/v639821682/364a2/ZEM3JN4e9M0.jpg'
});
```

Биндим его с вью, все его свойста и методы привяжутся к элементам дома
```js
bind(user,
`<div onclick=logBalance>
    <a balance0></a>
    <a href=photo balance1></a>
    <div name></div>
    <div items></div>
    <div onmousemove=mouseMove role></div>
    <input class=class_input>
</div>`);

//или
//bind(user, document.getElementById('<ид>'));

//добавим в дом
document.body.appendChild(bind.el);
```
В "user" установятся геттеры сеттеры при изменении которых, произойдет изменение дом

```js
user.balance = 100;
user.name = 'Петя';
```
