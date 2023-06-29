---
title: Vue3大屏适配方法——scale方案
date: '2023-01-17 18:00:00'
sidebar: true
categories:
    - Vue
tags:
    - Vue
    - Vue3
publish: true
---

### scale方案的大屏实现
#### 完整代码
```vue
<template>
    <div
        class="screen-box"
        :style="{  ...boxStyle }" 
    >
        <div
            class="screen-wrapper"
            ref="screenWrapper"
            :style="{  ...wrapperStyle }"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import { debounce } from 'lodash-es'

const props = defineProps({
    width: {
        type: [String, Number],
        default: 1920
    },
    height: {
        type: [String, Number],
        default: 1080
    },
    fullScreen: {
        type: Boolean,
        default: false
    },
    autoScale: {
        type: [Object, Boolean],
        default: true
    },
    delay: {
        type: Number,
        default: 500
    },
    boxStyle: {
        type: Object,
        default: () => ({})
    },
    wrapperStyle: {
        type: Object,
        default: () => ({})
    }
})

const state = reactive({
    width: 0,
    height: 0,
    originalWidth: 0,
    originalHeight: 0,
    observer: null
})
const screenWrapper = ref(null)

const initSize = () => {
    return new Promise(resolve => {
        nextTick(() => {
            // region 获取大屏真实尺寸
            if (props.width && props.height) {
                state.width = props.width
                state.height = props.height
            } else {
                state.width = screenWrapper.value?.clientWidth
                state.height = screenWrapper.value?.clientHeight
            }
            // region 获取画布尺寸
            if (!state.originalHeight || !state.originalWidth) {
                state.originalWidth = window.screen.width
                state.originalHeight = window.screen.height
            }
            resolve()
        })
    })
}

/**
 * 更新大屏容器宽高
 */
const updateSize = () => {
    if(!screenWrapper.value) return
    if(state.width && state.height) {
        screenWrapper.value.style.width = `${state.width}px`
        screenWrapper.value.style.height = `${state.height}px`
    } else {
        screenWrapper.value.style.width = `${state.originalWidth}px`
        screenWrapper.value.style.height = `${state.originalHeight}px`
    }
}

const autoScale = scale => {
    if (!props.autoScale || !screenWrapper.value) return
    const domWidth = screenWrapper.value.clientWidth
    const domHeight = screenWrapper.value.clientHeight
    const currentWidth = document.body.clientWidth
    const currentHeight = document.body.clientHeight
    screenWrapper.value.style.transform = `scale(${scale},${scale})`
    let mx = Math.max((currentWidth - domWidth * scale) / 2, 0)
    let my = Math.max((currentHeight - domHeight * scale) / 2, 0)
    if (typeof props.autoScale === 'object') {
        !props.autoScale.x && (mx = 0)
        !props.autoScale.y && (my = 0)
    }
    screenWrapper.value.style.margin = `${my}px ${mx}px`
}

const updateScale = () => {
    // 获取真实视口尺寸
    const currentWidth = document.body.clientWidth
    const currentHeight = document.body.clientHeight
    // 获取大屏最终的宽高
    const realWidth = state.width || state.originalWidth
    const realHeight = state.height || state.originalHeight
    // 计算缩放比例
    const widthScale = currentWidth / +realWidth
    const heightScale = currentHeight / +realHeight
    // 若要铺满全屏，则按照各自比例缩放
    if (props.fullScreen) {
        screenWrapper.value.style.transform = `scale(${widthScale},${heightScale})`
        return false
    }
    // 按照宽高最小比例进行缩放
    const scale = Math.min(widthScale, heightScale)
    autoScale(scale)
}
const onResize = debounce(async () => {
      await initSize()
      updateSize()
      updateScale()
}, props.delay)

const initMutationObserver = () => {
    const observer = (state.observer = new MutationObserver(() => {
        onResize()
    }))
    observer.observe(screenWrapper.value, {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true
    })
}

onMounted(() => {
    nextTick(async () => {
        await initSize()
        updateSize()
        updateScale()
        window.addEventListener('resize', onResize)
        initMutationObserver()
    })
})
onUnmounted(() => {
    window.removeEventListener('resize', onResize)
    state.observer?.disconnect()
})
</script>

<style lang="less" scoped>
.screen-box {
    width: 100vw;
    height: 100vh;
    background-size: 100% 100%;
    background: transparent;
    overflow: hidden;
    .screen-wrapper {
        position: relative;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4; 0; 0.2; 1);
        transition-duration: 500ms;
        transform-origin: left top;
        z-index: 100;
        overflow: hidden;
    }
}
</style>
```

### 常见的三种大屏适配方案
| 适配方案 | 实现方式 | 优点 | 缺点 |
| ---- | ---- | ---- |---- |
| vm vh |  按照设计稿的尺寸，将`px`按比例计算转为`vw`和`vh` | 1.可以动态计算图表的宽高，字体等，灵活性较高<br />2.当屏幕比例跟ui稿不一致时，不会出现两边留白情况 | 每个图表都需要单独做字体、间距、位移的适配，比较麻烦 |
| scale | 通过`scale`属性，根据屏幕大小，对图表进行整体的等比缩放 | 1.代码量少，适配简单<br />2.一次处理后不需要在各个图表中再去单独适配 | 1.因为是根据 ui 稿等比缩放，当大屏跟 ui 稿的比例不一样时，会出现周边留白情况<br />2.当缩放比例过大时候，字体会有一点点模糊，就一点点<br />3.当缩放比例过大时候，事件热区会偏移。<br />4.如果使用地图的可能会出现坐标偏移 |
| rem + vm vh | 1.获得`rem`的基准值<br />2.动态的计算`html根元素的font-size`<br />3.图表中通过`vm vh`动态计算字体、间距、位移等 | 布局的自适应代码量少，适配简单 | 1.因为是根据 ui 稿等比缩放，当大屏跟 ui 稿的比例不一样时，会出现周边留白情况<br />2.图表需要单个做字体、间距、位移的适配 |

