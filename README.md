# Пример биндинга объекта с шаблоном дом

Какая-то реализация класса

```js
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
```

Создаем объект
```js
let user = new User({
    balance0: 0,
    balance1: 0,
    name: 'Jktu',
    role: 'admin',
    class_input: 'any',
    input: 'input',
    photo: 'https://pp.userapi.com/c639821/v639821682/364a2/ZEM3JN4e9M0.jpg'
});
```

Биндим его с вью, все его свойста и методы привяжутся к элементам дома
```js
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
```
