export const DISMISS_MODAL = "DISMISS_MODAL";
export const SHOW_MODAL = "SHOW_MODAL";

export function dismissModal() {
  return {
    "type": DISMISS_MODAL
  };
}

export function showModal(title, body, btnPrimary, btnPrimaryAction, btnClose, btnCloseAction, id) {
  return {
    "type": SHOW_MODAL,
    title,
    body,
    btnPrimary,
    btnPrimaryAction,
    btnClose,
    btnCloseAction,
    id
  };
}
