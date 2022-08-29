import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setModalStatusAndType } from '../../slices/modalsSlice.js';
import ModalAddChannel from './ModalAddChannel';
import ModalDeleteChannel from './ModalDeleteChannel';
import ModalRenameChannel from './ModalRenameChannel';

const modals = {
  add: ModalAddChannel,
  rename: ModalRenameChannel,
  delete: ModalDeleteChannel,
};

function ModalsManager(props) {
  const { modalType, channelId, status } = props;
  const dispatch = useDispatch();
  const hideModal = () => dispatch(setModalStatusAndType({ isOpen: false, type: null }));
  const Component = modals[modalType];
  return (
    <Modal
      centered
      show={status}
      onHide={hideModal}
      animation={false}
    >
      {Component && <Component channelId={channelId} />}
    </Modal>
  );
}

export default ModalsManager;
