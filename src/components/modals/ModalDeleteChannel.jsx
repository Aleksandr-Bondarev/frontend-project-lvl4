import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { SocketContext } from '../../context/SocketContextProvider.jsx';
import { setModalDeleteChannelStatus } from '../../slices/modalsSlice.js';
import { acknowlodgeDeleteChannel } from '../../acknowledgeCallbacks.js';

function ModalDeleteChannel(props) {
  const { status } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const idOfDeletingChannel = useSelector((state) => state.modals.deleteChannel.channelId);

  return (
    <Modal centered show={status} onHide={() => dispatch(setModalDeleteChannelStatus(false))}>
      <Modal.Header>
        <Modal.Title>{t('labels.toDeleteChannel')}</Modal.Title>
        <Button
          aria-label="Close"
          className="btn btn-close"
          onClick={() => {
            dispatch(setModalDeleteChannelStatus(false));
          }}
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('labels.areYouSure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2 btn btn-secondary"
            onClick={() => {
              dispatch(setModalDeleteChannelStatus(false));
            }}
          >
            {t('labels.toCancel')}
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => {
              socket.emit('removeChannel', { id: idOfDeletingChannel }, acknowlodgeDeleteChannel);
            }}
          >
            {t('labels.toDelete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDeleteChannel;
