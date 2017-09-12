# AXA React Components - Modal

This is a modal component for React applications

## Add the reducer
```js
import { combineReducers } from "redux";
import { modalReducer } from "axa-component-modal";

const AppReducer = combineReducers({
  "modal": modalReducer,
  ...
});

export default AppReducer;
```

## Place the modal at the end of the root component
```js
import React, {Component} from "react";
import Modal from "axa-component-modal";

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
import { Trigger } from "axa-component-modal";

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
import { showModal, dismissModal } from "axa-component-modal";

import MyModalContent from "./MyModalContent.jsx";

// Open the modal
showModal(
  "My modal title", 
  MyModalContent, 
  "Validate", 
  () => console.log("Clicked Validate"), 
  "Cancel", 
  () => console.log("clicked Cancel"), 
  "MyModal");

// Close the modal
dismissModal();
```
