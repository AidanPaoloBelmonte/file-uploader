const ctxMenu = document.querySelector(".tplt-ctx-menu");
const fsEntries = document.querySelectorAll(".fs-entry");

const frag = ctxMenu.content.querySelector("div");

function openContextMenu(e, baseElement) {
  frag.style.top = `${e.clientY}px`;
  frag.style.left = `${e.clientX}px`;

  document.body.appendChild(frag);
  lastContextMenuParent = baseElement;

  e.preventDefault();
}

document.body.addEventListener("click", (e) => {
  const instance = document.body.querySelector(".ctx-menu");
  if (instance) {
    document.body.removeChild(instance);
  }
});

document.body.addEventListener("contextmenu", (e) => {
  const instance = document.body.querySelector(".ctx-menu");
  if (
    instance &&
    !e.target.classList.contains("fs-entry") &&
    !e.target.parentElement.classList.contains("fs-entry")
  ) {
    document.body.removeChild(instance);
  }
});

fsEntries.forEach((entry) => {
  entry.addEventListener("contextmenu", (e) => openContextMenu(e, entry));
});
