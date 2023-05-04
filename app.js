// Scalable screen
const parent = document.querySelector(".parent");
const body = document.querySelector("body");
let factor;
function scalable() {
  factor = body.clientWidth / 1100;
  parent.style.transform = `scale(${factor > 1 ? 1 : factor})`;
}
window.addEventListener("resize", scalable);
window.addEventListener("load", scalable);

class Wrestler {
  constructor(name, strength, health) {
    this.name = name;
    this.strength = strength;
    this.health = health;
    this.elements = new UIElements(this.name);
  }
}
class UIElements {
  constructor(name) {
    this.attackBtn = document.querySelector(`.${name}-attack`);
    this.rehealthBtn = document.querySelector(`.${name}-rehealth`);
    this.progress = document.querySelector(`.${name}-health`);
    this.paragraph = document.querySelector(`.${name}-p`);
  }
}

Wrestler.prototype.attack = function (opponent) {
  if (opponent.health > 0) {
    opponent.health -= this.strength;
    opponent.elements.progress.querySelector(
      "span"
    ).style.width = `${opponent.health}%`;
  } else {
    opponent.elements.attackBtn.style.display = "none";
    opponent.elements.rehealthBtn.style.display = "none";
    opponent.elements.paragraph.style.display = "block";
  }
};

let Brock = new Wrestler("Brock", 20, 100);
let Goldberg = new Wrestler("Goldberg", 20, 100);
// console.log(Brock.elements.progress.querySelector("span"));
// console.log(Goldberg.elements.progress.querySelector("span"));
console.log(Goldberg);
console.log(Brock);
// console.log("after attack", Goldberg);

Goldberg.elements.attackBtn.addEventListener("click", () => {
  Goldberg.attack(Brock);
});
Brock.elements.attackBtn.addEventListener("click", () => {
  Brock.attack(Goldberg);
});
