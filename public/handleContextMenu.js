const fsEntries = document.querySelectorAll(".fs-entry");

function prepareContextMenu(type = 0, id = 0) {
  frag.querySelector(".del-type").value = type;
  frag.querySelector(".del-entry").value = id;

  if (dlgMoveEntry) {
    dlgMoveEntry.querySelector(".del-type").value = type;
    dlgMoveEntry.querySelector(".del-entry").value = id;
  }
}

function openContextMenu(e, baseElement) {
  frag.style.top = `${e.clientY}px`;
  frag.style.left = `${e.clientX}px`;

  document.body.appendChild(frag);
  lastContextMenuParent = baseElement;
  let type = 0;
  if (baseElement.classList.contains("file")) {
    type = 1;
  } else if (baseElement.classList.contains("folder")) {
    type = 2;
  }

  console.log(type, baseElement.dataset?.id);
  prepareContextMenu(type, baseElement.dataset?.id);

  e.preventDefault();
}

document.body.addEventListener("click", (e) => {
  const instance = document.body.querySelector(".ctx-menu");
  if (instance && !e.target.classList.contains("ctx-action")) {
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
