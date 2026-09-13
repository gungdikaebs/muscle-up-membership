const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const revealElements = Array.from(
  document.querySelectorAll<HTMLElement>("[data-reveal]"),
);

if (!prefersReducedMotion && revealElements.length > 0) {
  document.documentElement.classList.add("motion-ready");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -15%",
        threshold: 0.1,
      },
    );

    for (const element of revealElements) observer.observe(element);
  } else {
    for (const element of revealElements) element.classList.add("is-visible");
  }
}

const hero = document.querySelector<HTMLElement>("#home");
const heroBackground = document.querySelector<HTMLElement>(
  "[data-hero-background]",
);

if (
  !prefersReducedMotion &&
  window.matchMedia("(min-width: 768px)").matches &&
  hero &&
  heroBackground
) {
  let parallaxFrame: number | null = null;

  const updateHeroParallax = () => {
    const progress = Math.min(window.scrollY / hero.offsetHeight, 1);
    const offset = progress * window.innerHeight * 0.04;

    heroBackground.style.setProperty("--hero-parallax-y", `${offset}px`);
    parallaxFrame = null;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (parallaxFrame !== null) return;
      parallaxFrame = window.requestAnimationFrame(updateHeroParallax);
    },
    { passive: true },
  );
}
