import React, { Component } from "react";
import { connect } from "react-redux";
import { showModal } from "./Actions";

/**
 * This is the modal trigger. It can be placed anywhere as a trigger to open a modal window.
 * It can contain any markup.
 *
 * props
 * - tag (string) : The wrapper tag. div by default
 * - title (string || translation key) : The title of the modal
 * - body (string || JSX || Component || translation key) : The content of the modal
 * - btnPrimary (string) optional : The text of the main button
 * - btnPrimaryAction (function) optional : The action to be called when primary button is clicked
 * - btnClose (string) optional : The dismiss button's text
 * - btnCloseAction (function) optional : The action to be called when the modal is closed
 * - id (string) optional : The unique ID of the modal
 *
 */
class Trigger extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { show, tag, title, body, btnPrimary, btnPrimaryAction, btnClose, btnCloseAction, id, children, ...rest } = this.props;

    const CustomTag = (typeof tag !== 'undefined') ? tag : 'div';

    return (
      <CustomTag {...rest} onClick={() => show(title, body, btnPrimary, btnPrimaryAction, btnClose, btnCloseAction, id)}>
        {children}
      </CustomTag>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  "show": (title, body, btnPrimary, btnPrimaryAction, btnClose, btnCloseAction, id) => {
    document.body.classList.add('modal-open');
    dispatch(showModal(title, body, btnPrimary, btnPrimaryAction, btnClose, btnCloseAction, id));
  }
});

export default connect(null, mapDispatchToProps)(Trigger);
