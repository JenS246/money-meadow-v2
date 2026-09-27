export function initializeDiscoveries(scene, note) {
  const discoveries = [...scene.querySelectorAll(".discovery")];
  let noteTimer = 0;

  const reveal = (element) => {
    element.classList.add("is-found");
    note.textContent = element.dataset.label;
    note.classList.add("is-visible");
    window.clearTimeout(noteTimer);
    noteTimer = window.setTimeout(() => note.classList.remove("is-visible"), 4200);
  };

  discoveries.forEach((element) => {
    element.addEventListener("click", () => reveal(element));
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        reveal(element);
      }
    });
  });

  return () => window.clearTimeout(noteTimer);
}

