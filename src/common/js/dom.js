export function addClass(dom, className) {
  if (dom.className.indexOf(className) > -1) {
    return -1
  }
  let classes = dom.className.split(' ')
  classes.push(className)
  dom.className = classes.join(' ')
}

export function removeClass(dom, className) {
  if (dom.className.indexOf(className) === -1) {
    return -1
  }
  let classes = dom.className.split(' ')
  classes.splice(classes.indexOf(className), -1)
  dom.className = classes.join(' ')
}