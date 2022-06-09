import React from 'react';

function ModalFadeShow(props) {
  const { status } = props;
  if (status === false) {
    return null;
  }
  return <div className="fade modal-backdrop show" />;
}

export default ModalFadeShow;
