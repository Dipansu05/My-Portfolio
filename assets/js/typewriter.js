function Typewriter(el, options) {
  this.el = el;
  this.strings = options.strings || [];
  this.typeSpeed = options.typeSpeed || 100;
  this.eraseSpeed = options.eraseSpeed || 50;
  this.pauseAfterType = options.pauseAfterType || 1200;
  this.pauseAfterErase = options.pauseAfterErase || 300;
  this.loop = options.loop !== false;

  this.strIndex = 0;
  this.charIndex = 0;
  this.isDeleting = false;

  this.cursor = document.createElement('span');
  this.cursor.className = 'typed-cursor';
  this.cursor.textContent = '|';
  this.el.after(this.cursor);

  this.tick = this.tick.bind(this);
  this.tick();
}

Typewriter.prototype.tick = function () {
  var current = this.strings[this.strIndex];

  if (this.isDeleting) {
    this.charIndex--;
  } else {
    this.charIndex++;
  }

  this.el.textContent = current.substring(0, this.charIndex);

  var delay = this.isDeleting ? this.eraseSpeed : this.typeSpeed;

  if (!this.isDeleting && this.charIndex === current.length) {
    delay = this.pauseAfterType;
    this.isDeleting = true;
  } else if (this.isDeleting && this.charIndex === 0) {
    this.isDeleting = false;
    this.strIndex = (this.strIndex + 1) % this.strings.length;
    delay = this.pauseAfterErase;

    if (!this.loop && this.strIndex === 0) {
      return;
    }
  }

  setTimeout(this.tick, delay);
};

document.addEventListener('DOMContentLoaded', function () {
  // "I AM A [DEVELOPER, LEARNER, ENGINEER]"
  var introTarget = document.querySelector('.typed-intro');
  if (introTarget) {
    new Typewriter(introTarget, {
      strings: ["a Developer.", "a Learner.", "an Engineer."],
      typeSpeed: 100,
      eraseSpeed: 50,
      pauseAfterType: 1200,
      pauseAfterErase: 300,
      loop: true
    });
  }

  // "One must imagine Sisyphus happy."
  var sisyphusTarget = document.querySelector('.typed-sisyphus');
  if (sisyphusTarget) {
    new Typewriter(sisyphusTarget, {
      strings: ["one must imagine sisyphus happy."],
      typeSpeed: 60,
      eraseSpeed: 30,
      pauseAfterType: 2500,
      pauseAfterErase: 500,
      loop: true
    });
  }
});
