const btnUpload = document.querySelector(".fs-action.upload");
const btnNewFolder = document.querySelector(".fs-action.create");

const dlgUpload = document.querySelector(".dialog.upload");
const dlgNewFolder = document.querySelector(".dialog.create");
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

if (closeDialog != undefined) {
  if (closeDialog.parent === dlgUpload || closeDialog.parent === dlgNewFolder) {
    closeDialog.parent.close();
  }
}
