const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!card.classList.contains("active")) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
    cards.forEach((i) => {
      if (i !== card) {
        i.classList.remove("active");
      }
    });
  });
});
