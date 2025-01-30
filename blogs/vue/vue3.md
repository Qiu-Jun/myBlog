---
title: Vue3基础
date: 2022-9-21
sidebar: true
categories:
    - Vue
tags:
    - 前端
    - Vue
    - Vue3
publish: true
---

## Vue3生命周期
在`setup`中使用的`hook`名称和原来生命周期的对应关系
+ beforeCreate -> setup
+ created -> setup
+ beforeMount -> onBeforeMount
+ mounted -> onMounted
+ beforeUpdate -> onBeforeUpdate
+ updated -> onUpdated
+ beforeUnmount -> onBeforeUnmount
+ unmounted -> onUnmounted
+ errorCaptured -> onErrorCaptured
+ renderTracked -> onRenderTracked
+ renderTriggered -> onRenderTriggered

## Composition API
### ref
+ 作用: 定义一个响应式的数据
+ 语法: const a = ref(initValue)
    - 建一个包含响应式数据的引用对象（reference对象，简称ref对象）
    - JS中操作数据: a.value
    - 模板中读取数据: 不需要.value，直接：<div>{{xxx}}</div>

+ 备注：
    - 接收的数据可以是：基本类型、也可以是对象类型
    - 基本类型的数据：响应式依靠的是类上的`getter`与`setter`完成的
    - 对象类型的数据：内部'求助'了Vue3.0中的一个新函数——reactive函数
```html
<template>
    <div>{{ name }}</div>
</template>

<script setup>
import { ref } from 'vue'
let name = ref('')
name.value = 'June'
</script>
```
+ ref源码分析

调用ref会返回一个`RefImpl`的实例对象，`RefImpl`类中有`getter`和`setter`可以检测到数据的变化
```javascript
function ref(value) {
    return createRef(value, false);
}

function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
        return rawValue;
    }
    return new RefImpl(rawValue, shallow);
}

class RefImpl {
    constructor(value, _shallow) {
        this._shallow = _shallow;
        this.dep = undefined;
        this.__v_isRef = true;
        this._rawValue = _shallow ? value : toRaw(value);
        this._value = _shallow ? value : convert(value);
    }
    get value() {
        trackRefValue(this);
        return this._value;
    }
    set value(newVal) {
        newVal = this._shallow ? newVal : toRaw(newVal);
        if (hasChanged(newVal, this._rawValue)) {
            this._rawValue = newVal;
            this._value = this._shallow ? newVal : convert(newVal);
            triggerRefValue(this, newVal);
        }
    }
}
```

### reactive
+ 作用: 定义一个引用类型的响应式数据
+ 语法: const p = reactive(源对象)接收一个对象（或数组），返回一个代理对象（Proxy的实例对象，简称proxy对象）
+ reactive定义的响应式数据是'深层次的'
+ 内部基于`ES6`的`Proxy`实现，通过代理对象操作源对象内部数据进行操作
```html
<template>
    <div>
        <h1>{{ person.name }}</h1>
        <h1>{{ person.age }}</h1>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
const person = reactive({
    name: 'June',
    age: 18
})

person.name = 'Qiu-Jun'
</script>
```

### reactive对比ref
+ 从定义数据角度对比
    - `ref`用来定义：基本类型数据
    - `reactive`用来定义：对象（或数组）类型数据
    - 备注：`ref`也可以用来定义对象（或数组）类型数据, 它内部会自动通过`reactive`转为代理对象
+ 从原理角度对比
    - `ref`通过类中的的`getter`与`setter`来实现响应式（数据劫持）。
    - `reactive`通过使用`Proxy`来实现响应式（数据劫持）, 并通过`Reflect`操作源对象内部的数据
+ 从使用角度对比
    - `ref`定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要.value。
    - `reactive`定义的数据：操作数据与读取数据：均不需要.value

### 计算属性与监视
#### computed
```javascript
// 计算属性 —— 简写
let fullName = computed(()=>{
    return person.name + '-' + person.age
})
// 计算属性 —— 完整
let fullName = computed({
    get(){
        return person.name + '-' + person.age
    },
    set(value){
        const nameArr = value.split('-')
        person.name = nameArr[0]
        person.age = nameArr[1]
    }
})
```

#### watch
```javascript
// 情况一：监视ref定义的响应式数据
watch(sum, (newValue, oldValue) => {
	console.log('sum变化了', newValue, oldValue)
}, { immediate: true })
// 监视ref对象1
watch(person.value, (newValue, oldValue) => {
	console.log('person变化了',newValue, oldValue)
})
// 监视ref对象2
watch(person, (newValue, oldValue) => {
	console.log('person变化了', newValue, oldValue)
}, { deep: true }) 

//情况二：监视多个ref定义的响应式数据
watch([ sum, msg ],(newValue, oldValue) => {
	console.log('sum或msg变化了', newValue, oldValue)
}) 

// 情况三：监视reactive定义的响应式数据
// 若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue
// 若watch监视的是reactive定义的响应式数据，则强制开启了深度监视
watch(person, (newValue, oldValue) => {
	console.log('person变化了', newValue, oldValue)
},{ immediate: true, deep: false }) //此处的deep配置不再奏效

//情况四：监视reactive定义的响应式数据中的某个属性
watch(() => person.job, (newValue, oldValue) => {
	console.log('person的job变化了', newValue, oldValue)
},{ immediate: true, deep: true }) 

//情况五：监视reactive定义的响应式数据中的某些属性
watch([() => person.job, () => person.name], (newValue, oldValue) => {
	console.log('person的job变化了', newValue, oldValue)
},{ immediate: true, deep: true })

//特殊情况
watch(() => person.job,(newValue, oldValue)=>{
    console.log('person的job变化了', newValue, oldValue)
},{ deep:true }) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
```

#### watchEffect
+ watch的套路是：既要指明监视的属性，也要指明监视的回调
+ watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性
+ watchEffect类似computed
    - computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值
    - watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

### toRef
+ 作用：创建一个`ref`对象，其`value`值指向另一个对象中的某个属性
+ 语法：`const name = toRef(person, 'name')`
+ 应用: 要将响应式对象中的某个属性单独提供给外部使用时
+ 扩展：`toRefs`与`toRef`功能一致，但可以批量创建多个`ref`对象，语法：`toRefs(person)`
```html
<template>
    <h4>{{ person }}</h4>
	<h2>姓名：{{name}}</h2>
	<h2>年龄：{{age}}</h2>
	<h2>薪资：{{job.j1.salary}}K</h2>
</template>
<script>
import { defineComponent, ref, reactive, toRef, toRefs } from 'vue'
export default defineComponent({
    setup() {
        const person = reactive({
            name: '张三',
            age: 18,
            job:{
                j1: {
                    salary: 20
                }
            }
        })
        // const name1 = person.name
        // console.log('%%%',name1)

        // const name2 = toRef(person, 'name')
        // console.log('####',name2)

        const x = toRefs(person)
        console.log('******',x)
        return {
            person,
            // name:toRef(person,'name'),
            // age:toRef(person,'age'),
            // salary:toRef(person.job.j1,'salary'),
            ...toRefs(person)
        }
    }
})
</script>
```

### shallowReactive与shallowRef
+ shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
+ shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。
+ 什么时候使用?
    - 如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
    - 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

### readonly与shallowReadonly
+ readonly: 让一个响应式数据变为只读的（深只读）
+ shallowReadonly：让一个响应式数据变为只读的（浅只读）
+ 应用场景: 不希望数据被修改时

### toRaw与markRaw
+ toRaw
    - 作用：将一个由reactive生成的响应式对象转为普通对象。
    - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新
+ markRaw
    - 作用：标记一个对象，使其永远不会再成为响应式对象
    - 应用场景:
        + 有些值不应被设置为响应式的，例如复杂的第三方类库等
        + 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能

### provide与inject
+ 作用：实现祖与后代组件间通信
+ 使用：父组件有一个`provide`选项来提供数据，后代组件有一个`inject`选项来开始使用这些数据

###  响应式数据的判断
+ isRef: 检查一个值是否为一个`ref`对象
+ isReactive: 检查一个对象是否是由`reactive`创建的响应式代理
+ isReadonly: 检查一个对象是否是由`readonly`创建的只读代理
+ isProxy: 检查一个对象是否是由`reactive`或者`readonly`方法创建的代理

## 新组件
### Fragment
+ 在Vue2中: 组件必须有一个根标签
+ 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
+ 好处: 减少标签层级, 减小内存占用

### Teleport
什么是Teleport？—— Teleport 是一种能够将我们的`组件html`结构移动到指定位置的技术
```html
<template>
    <teleport to="body">
        <div v-if="isShow" class="mask">
            <div class="dialog">
                <h3>我是一个弹窗</h3>
                <button @click="isShow = false">关闭弹窗</button>
            </div>
        </div>
    </teleport>
</template>
```

### Suspense
等待异步组件时渲染一些额外内容，让应用有更好的用户体验
+ 使用步骤：
    - 异步引入组件
    - 使用Suspense包裹组件，并配置好default与 fallback
        + default：就是组件要显示的内容
        + fallback：就是组件没加载完全的组件
```html
<template>
    <div class="app">
		<h3>我是App组件</h3>
		<Suspense>
			<template v-slot:default>
				<Child/>
			</template>
			<template v-slot:fallback>
				<h3>加载中.....</h3>
			</template>
		</Suspense>
	</div>
</template>
<script>
import {defineAsyncComponent} from 'vue'
const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
</script>
```