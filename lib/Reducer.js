import update from "immutability-helper";
import { DISMISS_MODAL, SHOW_MODAL } from "./Actions.js";

const defaultState = {
  "show": false,
  "title": null,
  "body": null,
  "btnPrimary": null,
  "btnPrimaryAction": null,
  "btnClose": null,
  "btnCloseAction": null,
  "id": null
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case DISMISS_MODAL: {
      return update(state, {
        /* eslint-disable */
        "show": {$set: false}
        /* eslint-enable */
      });
    }

    case SHOW_MODAL: {
      return update(state, {
        /* eslint-disable */
        "show": {$set: true},
        "title": {$set: action.title},
        "body": {$set: action.body},
        "btnPrimary": {$set: action.btnPrimary},
        "btnPrimaryAction": {$set: action.btnPrimaryAction},
        "btnClose": {$set: action.btnClose},
        "btnCloseAction": {$set: action.btnCloseAction},
        "id": {$set: action.id}
        /* eslint-enable */
      });
    }

    default: {
      return state;
    }
  }
}
