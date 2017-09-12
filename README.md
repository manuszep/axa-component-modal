# React Components - Modal

This is a modal component for React applications

## Add the reducer
```js
import { combineReducers } from "redux";
import { modalReducer } from "react-component-modal";

const AppReducer = combineReducers({
  "modal": modalReducer,
  ...
});

export default AppReducer;
```

## Place the modal at the end of the root component
```js
import React, {Component} from "react";
import Modal from "react-component-modal";

class App extends Component {
  render() {
    return (
      
      ...
      
      <Modal />
    );
  }
}
```

## Add a modal trigger
```js
import React, {Component} from "react";
import { Trigger } from "react-component-modal";

import MyModalContent from "./MyModalContent.jsx";

class MyComponent extends Component {
  render() {
    return (
      
      // Create a button that opens a modal window
      <Trigger 
               tag="button"
               title="My modal title"
               body={ MyModalContent }
               btnPrimary="Validate"
               btnPrimaryAction={() => console.log("Clicked Validate")}
               btnClose="Cancel"
               btnCloseAction={() => console.log("clicked Cancel")}
               id="MyModal"
               
               className="btn"
               >
        Open that modal !
      </Trigger>
      
    );
  }
}
```

## Open or close the modal with API
```js
import { showModal, dismissModal } from "react-component-modal";

import MyModalContent from "./MyModalContent.jsx";

// Open the modal
showModal(
  "My modal title", 
  MyModalContent, 
  "Validate", 
  (dispatch) => console.log("Clicked Validate"), // Note dispatch is available
  "Cancel", 
  (dispatch) => console.log("clicked Cancel"), // Note dispatch is available
  "MyModal");

// Close the modal
dismissModal();
```

## Complete modal example and usage
```js
import React, { Component } from "react";
import { connect } from "react-redux";
import { showModal } from "react-component-modal";
import { myCustomDispatchAction } from "./actions.js";

const modalTitle = "This is the title of MyModal";
const primaryLabel = "Main button";
const primaryAction = (dispatch) => {
  dispatch(myCustomDispatchAction(true));
};
const secondaryLabel = "Secondary button";
const secondaryAction = (dispatch) => {
  dispatch(myCustomDispatchAction(false));
};

// 1. Create the modal content as a component
class MyModal extends Component {
  changeRandomFieldValue() {
    this.props.changeField("FIELD_RANDOM", "New value");
  }
  
  render() {
    return (
      <div>
        // Modal content can contain any markup
        <p>This is the modal content.</p>
        // Properties can be passed or it can be connected to the state
        <p>Random field value is : { FIELD_RANDOM }</p>
        // Logic can be added as in any other component
        <p><a href="#" onClick={ () => this.changeRandomFieldValue() }>Change field value</a></p>
      </div>  
    );
  }
}

const mapStateToProps = state => ({
  "FIELD_RANDOM": state.form.app.values.FIELD_RANDOM
});

const mapDispatchToProps = dispatch => ({
  "changeField": (field, value) => {
    dispatch(changeField(field, value));
  }
});

// Connect modal content component to redux
const ConnectedMyModal = connect(mapStateToProps, mapDispatchToProps)(MyModal);

const showMyModal = showModal(modalTitle, MyModal, primaryLabel, primaryAction, secondaryLabel, secondaryAction);

class MyModalTrigger extends Component {
  render() {
      return (
        <Trigger
          title={ modalTitle }
          body={ MyModal }
          btnPrimary={ primaryLabel }
          btnPrimaryAction={ primaryAction }
          btnSecondary={ secondaryLabel }
          btnSecondaryAction={ secondaryAction }
          className="custom-trigger-class"
        >
          Open MyModal
        </Trigger>
      );
    }
}

export default MyModalTrigger; // Import this to include the trigger
export { showMyModal }; // Import this to dispatch the showModal action


// How to use showMyModal :

import showMyModal from "MyModal.jsx";

function handleFormValidation(cb, fields) {
  return (dispatch, getState) => {
    ...
    dispatch(showMyModal);
    ...
  };
}

```
