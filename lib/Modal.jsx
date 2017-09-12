import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { default as T } from "react-component-translate";
import { dismissModal } from "./Actions";

/**
 * This is the modal window. It is placed at the end of the App component and should be only instantiated once.
 * Its content is handled in the Reducer and set via the showModal action
 *
 * props
 * - show (boolean) : The modal should be visible or not
 * - title (string || translation key) : The title of the modal
 * - body (string || JSX || Component || translation key) : The content of the modal
 * - btnPrimary (string) optional : The text of the main button
 * - btnPrimaryAction (function) optional : The action to be called when primary button is clicked
 * - btnClose (string) optional : The dismiss button's text
 * - btnCloseAction (function) optional : The action to be called when the modal is closed
 * - id (string) optional : The unique ID of the modal
 *
 */
class Modal extends Component {

  closeModal() {
    const { btnCloseAction, dismissModal, dispatch } = this.props;

    // Execute custom close action if defined as a function
    if (typeof btnCloseAction === "function") {
      btnCloseAction(dispatch);
    }

    // Always close the modal window after
    dismissModal();
  }

  runPrimaryAction() {
    const { btnPrimaryAction, dismissModal, dispatch } = this.props;

    // Execute custom primary action if defined as a function
    if (typeof btnPrimaryAction === "function") {
      btnPrimaryAction(dispatch);
    }

    // Always close the modal window after
    dismissModal();
  }

  getModalBody() {
    const { body } = this.props;

    // If body is a function it's a JSX component.
    if (typeof body === "function") {
      const Content = body;
      return <Content />
    }

    // Otherwise, put it in a div with translation
    return <T tag="div" className="modal-body">{ body }</T>;
  }

  getPrimaryButton() {
    const { btnPrimary } = this.props;

    if (typeof btnPrimary === "undefined") return null;

    return <T tag="button" type="button" className="btn btn-primary" onClick={ () => this.runPrimaryAction() }>{ btnPrimary }</T>;
  }

  getSecondaryButton() {
    const { btnClose } = this.props;

    if (typeof btnClose === "undefined") return null;

    return <T tag="button" type="button" className="btn btn-secondary" onClick={ () => this.closeModal() }>{ btnClose }</T>;
  }

  render() {
    const { show, title, id } = this.props;
    const cls = classNames("modal", "fade", { "show": show });

    return (
      <div className={ cls } id={ id }>
        <div className="modal-backdrop" onClick={ () => this.closeModal() }></div>

        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <T tag="h5" className="modal-title">{title}</T>
              <button type="button" className="close" aria-label="Close" onClick={ () => this.closeModal() }>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              { this.getModalBody() }
            </div>

            <div className="modal-footer">
              { this.getSecondaryButton() }
              { this.getPrimaryButton() }
            </div>
          </div>
        </div>

      </div>
    );
  }

}

const mapStateToProps = (state, props) => {
  const store = (typeof props.store === "undefined") ? state.modal : props.store;
  return {
    "show": store.show,
    "title": store.title,
    "body": store.body,
    "btnPrimary": store.btnPrimary,
    "btnPrimaryAction": store.btnPrimaryAction,
    "btnClose": store.btnClose,
    "btnCloseAction": store.btnCloseAction,
    "id": store.id
  }
};

const mapDispatchToProps = dispatch => ({
  "dismissModal": () => {
    document.body.classList.remove('modal-open');
    dispatch(dismissModal());
  },

  "dispatch": dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
