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

const winSound = document.getElementById("win");
const attackSound = document.getElementById("attack");
const rehealthSound = document.getElementById("rehealth");
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
    this.loseParagraph = document.querySelector(`.${name}-lost`);
    this.winParagraph = document.querySelector(`.${name}-won`);
    this.currentHealth = document.querySelector(`.${name}-current-health`);
  }
}

Wrestler.prototype.attack = function (opponent) {
  if (opponent.health > 0) {
    attackSound.play();
    opponent.health -= this.strength;
    opponent.elements.progress.querySelector(
      "span"
    ).style.width = `${opponent.health}%`;
  } else {
    opponent.elements.currentHealth.innerHTML = "0";
    winSound.play();
    opponent.elements.attackBtn.style.display = "none";
    opponent.elements.rehealthBtn.style.display = "none";
    opponent.elements.loseParagraph.style.display = "block";
    this.elements.attackBtn.style.display = "none";
    this.elements.rehealthBtn.style.display = "none";
    this.elements.winParagraph.style.display = "block";
  }
};

Wrestler.prototype.rehealth = function () {
  if (this.health < 100) {
    rehealthSound.play()
    this.health += 5;
    this.elements.progress.querySelector(
      "span"
    ).style.width = `${this.health}%`;
  } else {
    this.health = 100;
    this.elements.progress.querySelector("span").style.width = `${100}%`;
  }
};

Wrestler.prototype.reset = function () {
  this.health = 100;
  this.elements.currentHealth.innerHTML = "100";
  this.elements.attackBtn.style.display = "inline-block";
  this.elements.rehealthBtn.style.display = "inline-block";
  this.elements.loseParagraph.style.display = "none";
  this.elements.winParagraph.style.display = "none";
  this.elements.progress.querySelector("span").style.width = `${100}%`;
};

let Brock = new Wrestler("Brock", 10, 100);
let Goldberg = new Wrestler("Goldberg", 10, 100);
console.log(Goldberg);
console.log(Brock);

Goldberg.elements.attackBtn.addEventListener("click", () => {
  Goldberg.attack(Brock);
  Brock.elements.currentHealth.innerHTML = Brock.health;
});

Brock.elements.attackBtn.addEventListener("click", () => {
  Brock.attack(Goldberg);
  Goldberg.elements.currentHealth.innerHTML = Goldberg.health;
});

Goldberg.elements.rehealthBtn.addEventListener("click", () => {
  Goldberg.rehealth();
  Goldberg.elements.currentHealth.innerHTML = Goldberg.health;
});

Brock.elements.rehealthBtn.addEventListener("click", () => {
  Brock.rehealth();
  Brock.elements.currentHealth.innerHTML = Brock.health;
});

document.querySelector(".reset").addEventListener("click", () => {
  Brock.reset();
  Goldberg.reset();
  winSound.pause();
});
