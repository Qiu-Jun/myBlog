---
title: Vue常用自定义指令
date: '2023-05-13 23:11:00'
sidebar: true
categories:
    - Vue
tags:
    - Vue
publish: true
---

## debounce
```typescript
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
    __handleClick__: () => void;
}
const debounce: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        if (typeof binding.value !== "function") {
            throw "callback must be a function";
        }
        const wait = binding.arg ? ~~binding.arg : 500;
        let timer: NodeJS.Timeout | null = null;
        el.__handleClick__ = function () {
            if (timer) {
                clearInterval(timer);
            }
            timer = setTimeout(() => {
                binding.value();
            }, wait);
        };
        el.addEventListener("click", el.__handleClick__);
    },
    beforeUnmount(el: ElType) {
        el.removeEventListener("click", el.__handleClick__);
    }
};

export default debounce;
```

## throttle
```typescript
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
    __handleClick__: () => void;
    disabled: boolean;
}
const throttle: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        if (typeof binding.value !== "function") {
        throw "callback must be a function";
        }
        const wait = binding.arg ? ~~binding.arg : 1000;
        let timer: NodeJS.Timeout | null = null;
        el.__handleClick__ = function () {
            if (timer) {
                clearTimeout(timer);
            }
            if (!el.disabled) {
                el.disabled = true;
                binding.value();
                timer = setTimeout(() => {
                el.disabled = false;
                }, wait);
            }
        };
        el.addEventListener("click", el.__handleClick__);
    },
    beforeUnmount(el: ElType) {
        el.removeEventListener("click", el.__handleClick__);
    }
};

export default throttle;
```

<!-- ## copy
```typescript
import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";
interface ElType extends HTMLElement {
    copyData: string | number;
}
const copy: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        el.copyData = binding.value;
        el.addEventListener("click", handleClick);
    },
    updated(el: ElType, binding: DirectiveBinding) {
        el.copyData = binding.value;
    },
    beforeUnmount(el: ElType) {
        el.removeEventListener("click", handleClick);
    }
};

function handleClick(this: any) {
    const value = this.copyData.toLocaleString();
    if (!value) return;
    navigator.clipboard.writeText(value).then(() =>
        ElMessage({
            type: "success",
            message: "复制成功"
        })
    );
}

export default copy;
``` -->