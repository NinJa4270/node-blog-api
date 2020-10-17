// 树形转data数据
const toList = data => {
  let tree = []
  data.forEach(item => {
    tree.push(Object.assign({}, item))
    if (item.children && item.children.length > 0) {
      const children = treeTodata(item.children)
      if (children) {
        tree = tree.concat(children)
      }
    }
  })
  return tree
}
// data转树形
const toTree = data => {
  let tree = []
  data.forEach(item => {
    if (item.pid === 0) {
      tree.push(item)
    } else {
      let index = data.findIndex(item1 => item1.id === item.pid)
      if (index !== -1) {
        data[index].children = data[index].children || []
        data[index].children.push(item)
      }
    }
  })
  tree = data.filter(item => item.pid === 0)
  return tree
}
const toFormat = data => JSON.parse(JSON.stringify(data))

module.exports = {
  toList,
  toTree,
  toFormat,
}
