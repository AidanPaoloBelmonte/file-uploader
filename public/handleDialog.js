const btnUpload = document.querySelector(".fs-action.upload");
const btnNewFolder = document.querySelector(".fs-action.create");

const ctxMenu = document.querySelector(".tplt-ctx-menu");
const frag = ctxMenu?.content?.querySelector("div");
const btnMoveEntry = frag?.querySelector(".btn.move");

const dlgUpload = document.querySelector(".dialog.upload");
const dlgNewFolder = document.querySelector(".dialog.create");
const dlgMoveEntry = document.querySelector(".dialog.move");

const closeDialog = document.querySelector(".close-dialog");

if (btnUpload != undefined && dlgUpload != undefined) {
  btnUpload.addEventListener("click", (e) => {
    dlgUpload.showModal();
  });
}

if (btnNewFolder != undefined && dlgNewFolder != undefined) {
  btnNewFolder.addEventListener("click", (e) => {
    dlgNewFolder.showModal();
  });
}

if (btnMoveEntry != undefined && dlgMoveEntry != undefined) {
  btnMoveEntry.addEventListener("click", (e) => {
    dlgMoveEntry.showModal();
  });

  dlgMoveEntry.addEventListener("close", (e) => {
    dlgMoveEntry.querySelector(".del-type").value = 0;
    dlgMoveEntry.querySelector(".del-entry").value = 0;

    dlgMoveEntry.querySelector("select").value = 0;
  });
}

if (closeDialog != undefined) {
  if (closeDialog.parent === dlgUpload || closeDialog.parent === dlgNewFolder) {
    closeDialog.parent.close();
  }
}
