// document.onkeydown = function () {
//   var e = window.event || arguments[0]
//   if (e.keyCode == 123) {
//     alert('F12被禁用')
//     return false
//   }
// }
// document.oncontextmenu = function (e) {
//   alert('右键被禁用')
//   return false
// }
document.onkeydown = function (e) {
  if ((e.ctrlKey) && (e.keyCode == 83)) { // ctrl+s
    alert('ctrl+s被禁用')
    return false
  }
}
