//! Get Default Font Size

const getDefaultFontSize = () => {
  const element = document.createElement("div");
  element.style.width = "1rem";
  element.style.display = "none";
  document.body.append(element);

  const widthMatch = window
    .getComputedStyle(element)
    .getPropertyValue("width")
    .match(/\d+/);

  element.remove();

  if (!widthMatch || widthMatch.length < 1) {
    return null;
  }

  const result = Number(widthMatch[0]);
  return !isNaN(result) ? result : null;
};

//! Open/Close Mobile Navigation

const menuButton = document.querySelector(".btn--menu");
const header = document.querySelector(".header");
const html = document.querySelector("html");

menuButton.addEventListener("click", () => {
  header.classList.toggle("open");
  html.classList.toggle("no-scroll");
});

//! Smooth Scroll when clicking on Links

const navLinks = document.querySelectorAll("a:link");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (href !== "#" && href.startsWith("#")) {
      const section = document.querySelector(href);
      section.scrollIntoView({ behavior: "smooth" });
      html.classList.remove("no-scroll");
      header.classList.remove("open");
    }
  });
});

//! Sticky Navigation Bar

const heroSection = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];

    if (!entry.isIntersecting) {
      header.classList.add("sticky");
      heroSection.classList.add("margin-top-bg");
    } else if (entry.isIntersecting) {
      header.classList.remove("sticky");
      heroSection.classList.remove("margin-top-bg");
    }
  },
  {
    threshold: 0,
    root: null,
    rootMargin: `-${getDefaultFontSize() * 8}px`,
  }
);

observer.observe(heroSection);
