import React from 'react/addons';
import Modal from '../lib/Modal.jsx';

describe('Modal', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <Modal/>
    );
  });

  it('should render', function() {
    expect(component.getDOMNode().className).toEqual('modal');
  });
});
