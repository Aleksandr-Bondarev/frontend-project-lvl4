import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setModalStatusAndType } from '../../slices/modalsSlice.js';
import ModalAddChannel from './ModalAddChannel';
import ModalDeleteChannel from './ModalDeleteChannel';
import ModalRenameChannel from './ModalRenameChannel';

const modals = {
  add: () => <ModalAddChannel />,
  rename: (channelId) => (<ModalRenameChannel channelId={channelId} />),
  delete: (channelId) => (<ModalDeleteChannel channelId={channelId} />),
};

function ModalsManager(props) {
  const { modalType, channelId, status } = props;
  const dispatch = useDispatch();
  return (
    <Modal
      centered
      show={status}
      onHide={() => dispatch(setModalStatusAndType({ isOpen: false, type: null }))}
      animation={false}
    >
      {status && modals[modalType](channelId)}
    </Modal>
  );
}

export default ModalsManager;
