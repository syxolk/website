window.addEventListener("DOMContentLoaded", function () {
  /*
   * This code synchronizes the animation of the orbits with the current time.
   * It calculates the delay based on the current seconds and applies it to each orbit's animation.
   * This ensures that the animation starts at the correct point in time.
   */
  const orbits = document.querySelectorAll(".circle");
  const now = new Date();
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000; // Include milliseconds for smoother animation
  const delay = -seconds + "s";
  orbits.forEach((orbit) => {
    orbit.style.animationDelay = delay;
  });
});
