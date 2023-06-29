---
title: Javascript继承
date: '2022-02-03 20:10:00'
sidebar: true
categories:
    - 前端
tags:
    - Javascript
publish: false
---

## 原型链继承
> 将父类的实例作为子类的原型
+ 优点
    - 父类方法可服用
+ 缺点
    - 父类的所有属性会被所有子类共享，更改一个子类的**引用**属性，其他子类也会受影响
    - 子类实例不能给父类构造函数传参
```javascript
function Parent() {
    this.name = 'June';
    this.user = {
        age: 18,
        job: 'web'
    };
}

Parent.prototype.getData = function() {
    console.log(this.name);
    console.log(this.user);
}

function Child() {}
Child.prototype = new Parent();

const c1 = new Child();
c1.user.sex = 'boy';
c1.getData(); // June  { age: 18,job: 'web', sex: 'boy; }

const c2 = new Child();
c2.getData(); // June  { age: 18,job: 'web', sex: 'boy; }
c2.name = 'JuneQiu';
c2.getData(); // JuneQiu  { age: 18,job: 'web', sex: 'boy; }
c1.getData(); // June  { age: 18,job: 'web', sex: 'boy; }
```
## 借用构造函数继承
> 在子类构造函数中调用父类构造函数，可以在子类构造函数中使用<font color="#e54d42">call()</font>和<font color="#e54d42">apply()</font>方法。通过使用<font color="#e54d42">call()</font>或<font color="#e54d42">apply()</font>方法，Parent构造函数在为Child的实例创建的新对象的上下文执行了，就相当于新的Child实例对象上运行了Parent()函数中的所有初始化代码，结果就是每个实例都有自己的_data属性。
+ 优点
    - 可以在子类构造函数中向父类传参数
    - 父类的引用属性不会被共享
+ 缺点
    - 子类不能访问父类原型上定义的方法（即不能访问Parent.prototype上定义的方法），因此所有方法属性都写在构造函数中，每次创建实例都会初始化
```javascript
function Parent() {
    this._data = {
        name: 'June',
        age: 18
    }
}

function Child() {
    Parent.call(this);
}

const c1 = new Child();
c1._data.gf = 'zy';
console.log(c1._data); // {name: 'June', age: 18, gf: 'zy'}

const c2 = new Child();
console.log(c2._data); // {name: 'June', age: 18}

// 传递参数
function P1(name) {
    this._data = {
        name
    }
}
function C1(name) {
    P1.call(this, name);
}
const c3 = new C1("June");
console.log(c3._data.name); // "June"

const c4 = new C1("zy");
console.log(c4._data.name); // "zy"
```
## 组合继承
> 组合继承综合了<font color="#e54d42">原型链继承</font>和<font color="#e54d42">借用构造函数继承</font>，将两者的优点结合了起来<br />就是使用原型链继承原型上的属性和方法，而通过构造函数继承实例属性，这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性
+ 优点
    - 父类的方法可以复用
    - 可以在Child构造函数中向Parent构造函数中传参
    - 父类构造函数中的引用属性不会被共享
```javascript
function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'yellow'];
}
Parent.prototype.sayName = function() {
    console.log(this.name);
}
function Child(name, age) {
    // 继承父类属性
    Parent.call(this, name);
    this.age = age;
}
// 继承父类方法
Child.prototype = new Parent();
Child.prototype.sayAge = function() {
    console.log(this.age);
}
const c1 = new Child('June', 18);
c1.colors.push('prink');
console.log(c1.colors); // ['red', 'blue', 'yellow', 'prink']
c1.sayAge(); // 18
c1.sayName(); // June

const c2 = new Child('zy', 18);
console.log(c2.colors); // ['red', 'blue', 'yellow']
c2.sayAge(); // 18
c2.sayName(); // zy
```
## 原型式继承
> 对参数对象的一种浅复制
+ 优点
    - 父类方法可复用
+ 缺点
    - 父类的引用会被所有子类所共享
    - 子类实例不能向父类传参
```javascript
function objectCopy(obj) {
    function Fun() {};
    Fun.prototype = obj;
    return new Fun()
}

const person = {
    name: "June",
    age: 18,
    friends: ["jack", "tom", "rose"],
    sayName:function() {
        console.log(this.name);
    }
}

const p1 = objectCopy(person);
p1.name = "wxb";
p1.friends.push("lily");
p1.sayName(); // wxb

const p2 = objectCopy(person);
p2.name = "gsr";
p2.friends.push("kobe");
p2.sayName(); // "gsr"

console.log(person.friends); // ["jack", "tom", "rose", "lily", "kobe"]
```
## 寄生继承
> 使用原型式继承对一个目标对象进行浅复制，增强这个浅复制的能力
```javascript
function objectCopy(obj) {
    function Fun() {};
    Fun.prototype = obj;
    return new Fun();
}

function createAnother(original) {
    const clone = objectCopy(original);
    clone.getName = function () {
        console.log(this.name);
    };
    return clone;
}

const person = {
    name: "yhd",
    friends: ["rose", "tom", "jack"]
}

const p1 = createAnother(person);
p1.friends.push("lily");
console.log(p1.friends); // ['rose', 'tom', 'jack', 'lily']
p1.getName(); // yhd

const p2 = createAnother(person);
console.log(p2.friends); // ["rose", "tom", "jack", "lily"]
```
## 寄生组合继承
> 寄生式组合继承可以算是引用类型继承的最佳模式
+ 优点
    - 只调用一次父类构造函数
    - Child可以向Parent传参
    - 父类方法可以复用
    - 父类的引用属性不会被共享
```javascript
/**
 * Parent构造函数定义了name，接着又在他的原型上添加了个getName()方法。
 * Child构造函数内部调用了Parent构造函数，同时传入了name参数，同时Child.prototype也被赋值为Parent实例，然后又在他的原型上添加了个sayAge()方法。
 * 这样就可以创建 p1，p2两个实例，让这两个实例都有自己的属性, 同时还共享了父类的getName方法
 */
function clone(child, parent) {
    const prototype = Object(parent.prototype);
    prototype.constructor = child; // 增强对象
    child.prototype = prototype; // 赋值对象
}

function Parent(name) {
    this.name = name;
}
Parent.prototype.getName = function () {
    return this.name;
};

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}
clone(Child, Parent);
Child.prototype.getAge = function () {
    return this.age;
};

const p = new Child('june', 18);
console.log(p.getName());
console.log(p.getAge());

```

<font size="1">[原文](https://juejin.cn/post/6914216540468576263)</font>