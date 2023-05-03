// Scalable screen
const parent = document.querySelector(".parent");
const body = document.querySelector("body");
let factor;
function scalable() {
  factor = body.clientWidth / 1100;
  parent.style.transform = `scale(${factor > 1 ? 1 : factor})`;
}
window.addEventListener("resize",scalable)
window.addEventListener("load",scalable)
