import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { SocketContext } from '../../context/SocketContextProvider.jsx';
import { setModalStatusAndType } from '../../slices/modalsSlice.js';
import { AcknowledgeContext } from '../../context/AcknowledgeContext.jsx';

function ModalDeleteChannel(props) {
  const { channelId } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { removeChannel } = useContext(SocketContext);
  const { acknowlodgeDeleteChannel } = useContext(AcknowledgeContext);
  const closeModal = () => dispatch(setModalStatusAndType({ isOpen: false, type: null }));
  const handleClickOnRemove = () => removeChannel(channelId, acknowlodgeDeleteChannel);

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('labels.toDeleteChannel')}</Modal.Title>
        <Button
          aria-label="Close"
          className="btn btn-close"
          onClick={closeModal}
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('labels.areYouSure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2 btn btn-secondary"
            onClick={closeModal}
          >
            {t('labels.toCancel')}
          </Button>
          <Button
            className="btn btn-danger"
            onClick={handleClickOnRemove}
          >
            {t('labels.toDelete')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
}

export default ModalDeleteChannel;
