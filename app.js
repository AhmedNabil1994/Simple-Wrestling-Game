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

// Sounds tags
const winSound = document.getElementById("win");
const attackSound = document.getElementById("attack");
const rehealthSound = document.getElementById("rehealth");

// Create objects
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

let loseAlert = function (obj) {
  if (obj.health > 0 && obj.health <= 10) {
    obj.elements.progress.style.boxShadow = "1px 3px 10px red";
  } else {
    obj.elements.progress.style.boxShadow = "none";
  }
};

Wrestler.prototype.attack = function (opponent) {
  if (opponent.health > 0 && opponent.health > this.strength) {
    opponent.health -= this.strength;
    opponent.elements.currentHealth.innerHTML = opponent.health;
    opponent.elements.progress.querySelector(
      "span"
    ).style.width = `${opponent.health}%`;
    attackSound.play();
    attackSound.currentTime = 0;
    opponent.elements.progress.querySelector(
      "span"
    ).style.width = `${opponent.health}%`;
  } else {
    opponent.health = 0;
    opponent.elements.currentHealth.innerHTML = "0";
    opponent.elements.progress.querySelector("span").style.width = `${0}%`;
    winSound.play();
    opponent.elements.attackBtn.style.display = "none";
    opponent.elements.rehealthBtn.style.display = "none";
    opponent.elements.loseParagraph.style.display = "block";
    this.elements.attackBtn.style.display = "none";
    this.elements.rehealthBtn.style.display = "none";
    this.elements.winParagraph.style.display = "block";
  }
  loseAlert(opponent);
};

Wrestler.prototype.rehealth = function () {
  if (this.health < 100) {
    this.health += 5;
    rehealthSound.play();
    rehealthSound.currentTime = 0;
    this.elements.progress.querySelector(
      "span"
    ).style.width = `${this.health}%`;
  } else {
    this.health = 100;
    this.elements.progress.querySelector("span").style.width = `${100}%`;
  }
  loseAlert(this);
};

Wrestler.prototype.reset = function () {
  this.health = 100;
  this.elements.currentHealth.innerHTML = "100";
  this.elements.attackBtn.style.display = "inline-block";
  this.elements.rehealthBtn.style.display = "inline-block";
  this.elements.loseParagraph.style.display = "none";
  this.elements.winParagraph.style.display = "none";
  this.elements.progress.querySelector("span").style.width = `${100}%`;
  this.elements.progress.style.boxShadow = "none";
};

let Brock = new Wrestler("Brock", 10, 100);
let Goldberg = new Wrestler("Goldberg", 10, 100);
Goldberg.elements.attackBtn.addEventListener("click", () => {
  Goldberg.attack(Brock);
});

Brock.elements.attackBtn.addEventListener("click", () => {
  Brock.attack(Goldberg);
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
  winSound.currentTime = 0;
});
