---
title: 前端实现活体人脸检测
date: '2022-10-04 12:56:00'
sidebar: true
categories:
    - 前端
tags:
    - 人脸检测
    - Tensorflow
publish: true
---

[本文为学习记录，更多请看原文](https://juejin.cn/post/7145732134630588447)

## 前言
在网页中使用活体人脸检测大部分都是前端录制一段视频，让后端调用第三方接口去判断，今天我们就用纯前端方式来实现这个功能

## 技术栈
+ Vite
+ Vue3

## 创建人脸模型
引入tensorflow训练好的`人脸特征点检测`模型，预测`486`个3D人脸特征点，推断出人脸的近似面部几何图形
<!-- <img src="/imgs/web/tensorflow/createFaceModel.awebp" width="50%" /> -->
```javascript
async createDetector(){
    const model = FaceLandmarksDetector.SupportedModels.MediaPipeFaceMesh
    const detectorConfig = {
        maxFaces: 1, // 检测到的最大面部数量,
        refineLandmarks: true, //可以完善眼睛和嘴唇周围的地标坐标，并在虹膜周围输出其他地标
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh'
    }
    detector = await FaceLandmarksDetector.createDetector(model, detectorConfig)
}
```

## 人脸识别
<!-- ![](/imgs/web/tensorflow/faceAuth.awebp) -->
```javascript
// 预测
const renderPrediction = async () => {
    const video = videoRef.value
    const canvas = canvasRef.value
    const ctx = canvas.getContext('2d')
    if(detector && state.isCameraOpen) {
        try {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const Faces = await detector.estimateFaces(video, {
                flipHorizontal: state.flipHorizontal //镜像
            })
            state.ModelLoading = false
            if(Faces.length > 0) {
                state.faceNullFrequency = 0
                drawResults(Faces, ctx)
            } else {
                state.faceNullFrequency ++
                //连续5帧没有检测到人脸提示
                if (state.faceNullFrequency > 5) {
                    Toast('没有检测到人脸')
                }
            }
        } catch (error) {
            createDetector()
            state.ModelLoading = false
            // Toast(`预测-${error}`)
            console.log(error)
            return
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
        state.rafId = window.requestAnimationFrame(renderPrediction)
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        state.rafId = window.requestAnimationFrame(renderPrediction)
    }
}
```

## 特征检测
> 人脸特征提取就是针对人脸的某些特征进行判断（以下的动作判断仅供参考，实际情况下需要多个特征点来判断某个动作）

<!-- ![](/imgs/web/tensorflow/openMouth.awebp) -->
### 张嘴
> 取2帧`[10,152]`占`[0,17]`的比例,判断递增，取第一帧和最后最后一帧的距离，根据阈值判断张嘴

```javascript
const isOpenMouth = (face, ctx) => {
    const featureIndex1 = [0, 17]
    const featureLocation1 = []

    const featureIndex2 = [10, 152]
    const featureLocation2 = []
    face.keypoints.forEach((element, index) => {
        if (featureIndex1.includes(index)) {
            featureLocation1.push([element.x, element.y])
        }
        if (featureIndex2.includes(index)) {
            featureLocation2.push([element.x, element.y])
        }
    })
     // 10,152占0,17的比例
    const proportion = GetPercent(
        getDistance(featureLocation1[0][0], featureLocation1[0][1], featureLocation1[1][0], featureLocation1[1][1]), 
        getDistance(featureLocation2[0][0], featureLocation2[0][1], featureLocation2[1][0], featureLocation2[1][1])
    )
    state.isOpenMouthArr.push(proportion)

    // 计算第二帧动态变化
    if (state.isOpenMouthArr.length > 2) {
        state.isOpenMouthArr.shift()
        if (Increment(state.isOpenMouthArr)) {
            const first = state.isOpenMouthArr[0]
            const last = state.isOpenMouthArr[state.isOpenMouthArr.length - 1]
            const diff = GetPercent(first - last, first + last)
            if (diff <= -5) {
                // this.log(`【动作】张嘴`, `info`);
                triggerAction(0)
            }
        }
    }
}
```
### 眨眼
> 根据左眼`[159, 144]`右眼`[385, 374]`的距离，判断连续4帧小于阈值，即可判断眨眼了

<!-- ![](/imgs/web/tensorflow/isWink.awebp) -->
```javascript
//眨眼
const isWink = (face, ctx) => {
    const leftEye = [159, 144]
    const leftEyeLocation = []
    const rightEye = [385, 374]
    const rightEyeLocation = []
    face.keypoints.forEach((element, index) => {
        if (leftEye.includes(index)) {
          leftEyeLocation.push([element.x, element.y])
        }
        if (rightEye.includes(index)) {
          rightEyeLocation.push([element.x, element.y])
        }
    })
    let leftProportion = getDistance(
        leftEyeLocation[0][0],
        leftEyeLocation[0][1],
        leftEyeLocation[1][0],
        leftEyeLocation[1][1]
    )
    let rightProportion = getDistance(
        rightEyeLocation[0][0],
        rightEyeLocation[0][1],
        rightEyeLocation[1][0],
        rightEyeLocation[1][1]
    )
    if (leftProportion <= 5 || rightProportion <= 5) {
        state.isWinkArr.push([leftProportion, rightProportion])
        //连续4帧一次
        if (state.isWinkArr.length >= 4) {
            // this.log(`【动作】眨眼`, `info`);
            triggerAction(1);
            state.isWinkArr = []
        }
    } else {
        state.isWinkArr = []
    }
}
```
### 左右摇头
> 根据左脸`[195, 93]`右脸`[195, 323]`的相差距离，取4帧数据，根据距离和正负数，来判断向左转和向右转

<!-- ![](/imgs/web/tensorflow/isShakingHisHead.awebp) -->
```javascript
const isShakingHisHead = (face, ctx) => {
    const leftFace = [195, 93]
    const leftFaceLocation = []
    const rightFace = [195, 323]
    const rightFaceLocation = []
    face.keypoints.forEach((element, index) => {
        if (leftFace.includes(index)) {
            leftFaceLocation.push([element.x, element.y])
        }
        if (rightFace.includes(index)) {
            if (rightFaceLocation.length === 0) {
                ctx.moveTo(element.x, element.y)
            } else {
                ctx.lineTo(element.x, element.y)
            }
            rightFaceLocation.push([element.x, element.y])
        }
    })
    let leftProportion = getDistance(
        leftFaceLocation[0][0],
        leftFaceLocation[0][1],
        leftFaceLocation[1][0],
        leftFaceLocation[1][1]
    )
    let rightProportion = getDistance(
        rightFaceLocation[0][0],
        rightFaceLocation[0][1],
        rightFaceLocation[1][0],
        rightFaceLocation[1][1]
    )
    const diff = GetPercent(leftProportion - rightProportion, leftProportion + rightProportion);
    state.isShakingHisHeadArr.push(diff); //左 -40 右 40
    //计算4帧的动态变化
    if (state.isShakingHisHeadArr.length > 4) {
        state.isShakingHisHeadArr.shift();
        const isL = state.isShakingHisHeadArr.every(e => e >= -60)
        const isR = state.isShakingHisHeadArr.every(e => e <= 60)
        if (isL) {
            // this.log(`【动作】向左转`, `info`);
            triggerAction(2)
        }
        if (isR) {
            // this.log(`【动作】向右转`, `info`);
            triggerAction(3)
        }
    }
}
```





