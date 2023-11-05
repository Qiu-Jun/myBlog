---
title: ElementPlus-ElTable树形拖曳
date: 2023-08-26 13:00:00
sidebar: true
categories:
    - Vue
    - Vue3
    - Element
tags:
    - Vue
    - Element
publish: true
---

## 初始化
```html
<template>
    <el-table
      id="searchStats"
      :data="tableData.list"
      :expand-row-keys="tableData.tableExpand"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
        <el-table-column type="" width="55" align="center">
            <template #default="{ row }">
                <span v-if="row.type !== 0 && row.type !== 2">
                    <el-icon class="move cursor-pointer"><Rank /></el-icon>
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="标签">
            <template #default="scope">
                <span>{{ scope.row.name }}</span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import Sortable from 'sortablejs'

const sortableEl = ref<InstanceType<Sortable> | null>(null)
let activeRows: any = null
const initSortable = () => {
    const wrapperRow = document.querySelector('#searchStats .el-table__body-wrapper tbody')
    sortableEl.value = Sortable.create(wrapperRow, {
        animation: 500,
        handle: '.move',
        onStart: function () {
            activeRows = treeToList(tableData.list)
        },
        onEnd: function ({ newIndex, oldIndex }) {
            const oldData = activeRows[oldIndex]
            const newData = activeRows[newIndex]
            if (newData.type === 0 || newData.type === 2) {
                tableData.list = []
                initTree(id)
                ElMessage.warning('价格排序不允许被修改')
                return false
            } else if (oldData.parentId !== newData.parentId) {
                tableData.list = []
                initTree(id)
                ElMessage.warning('不允许跨层级')
                return false
            } else {
                const level = oldData.level
                const currRow = activeRows.splice(oldIndex, 1)[0]
                activeRows.splice(newIndex, 0, currRow)
                const sortIds = activeRows.filter((i) => i.level === level).map((i) => i.id)
                sortIds.length &&
                    updateTagSort(sortIds.join(',')).then(() => {
                        tableData.list = []
                        initTree(id) // 请求更新
                        tableData.tableExpand = oldData.expandKeys
                        activeRows = null
                    })
            }
        }
    })
}

const onClose = () => {
    sortableEl.value?.destroy()
    // ...
}

function listToTree(data) {
  const obj = {}
  let level = 0
  data.forEach((item) => {
    item.level = level
    item.expandKeys = [String(item.id)]
    obj[item.id] = item
  })
  const parentList: ITag[] = []
  data.forEach((item) => {
    const parent = obj[item.parentId]
    if (parent) {
      // 当前项有父节点
      item.level = parent.level + 1
      item.expandKeys = [...parent.expandKeys, String(item.id)]
      parent.children = parent.children || []
      parent.children.push(item)
    } else {
      // * 当前项没有父节点
      parentList.push(item)
    }
  })
  return parentList
}

function treeToList(treeData, childKey = 'children') {
  const arr: any = []
  const expanded = (data) => {
    if (data && data.length > 0) {
      data
        .filter((d) => d)
        .forEach((e) => {
          arr.push(e)
          expanded(e[childKey] || [])
        })
    }
  }
  expanded(treeData)
  return arr
}
</script>
```