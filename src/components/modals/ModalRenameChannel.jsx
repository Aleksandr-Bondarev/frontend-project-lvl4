/* eslint jsx-a11y/label-has-associated-control: [0] */

import React, { useContext, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import filter from 'leo-profanity';
import { SocketContext } from '../../context/SocketContextProvider.jsx';
import { setModalStatusAndType, setModalRenameChannelStatus } from '../../slices/modalsSlice.js';
import { acknowlodgeRenameChannel } from '../../acknowledgeCallbacks.js';

function ModalRenameChannel(props) {
  const { status, channelId } = props;
  const { t } = useTranslation();
  const innerRef = useRef();
  const nameOfRenamingChannel = useSelector((state) => state.channels.channels.find((channel) => channel.id === channelId)).name;
  // const idOfRenamingChannel = useSelector((state) => state.channels.activeChannelId);
  const channelsInChat = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const { renameChannel } = useContext(SocketContext);
  filter.add(filter.getDictionary('ru'));

  useEffect(() => innerRef.current && innerRef.current.focus());

  const checkUniqueNameOnSubmit = (e, name) => {
    e.preventDefault();
    const sameNameChannel = channelsInChat.filter((channel) => channel.name === name);
    if (sameNameChannel.length !== 0) {
      const formControlNode = e.target.childNodes[0];
      const invalidFeedbackContainer = e.target.childNodes[1];
      invalidFeedbackContainer.textContent = t('errors.shouldBeUnique');
      formControlNode.classList.add('is-invalid');
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      newName: nameOfRenamingChannel || '',
    },
    onSubmit: async ({ newName }) => {
      const sameNameChannel = channelsInChat.filter((channel) => channel.name === newName);
      if (sameNameChannel.length !== 0) return;
      await renameChannel(channelId, filter.clean(newName), acknowlodgeRenameChannel);
    },
  });

  return (
    <Modal centered show={status} onHide={() => dispatch(setModalRenameChannelStatus({
      isOpen: false,
      type: null,
    }))}>
      <Modal.Header>
        <Modal.Title>{t('labels.toRenameChannel')}</Modal.Title>
        <Button
          aria-label="Close"
          className="btn btn-close"
          onClick={() => {
            dispatch(setModalRenameChannelStatus({
              isOpen: false,
              type: null,
            }));
          }}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => {
          checkUniqueNameOnSubmit(e, formik.values.newName);
          formik.handleSubmit();
        }}
        >
          <Form.Control autoFocus ref={innerRef} id="newName" className="mb-2 form-control" value={formik.values.newName} onChange={formik.handleChange} />
          <label className="visually-hidden" htmlFor="newName">Имя канала</label>
          <div className="invalid-feedback" />
          <div className="d-flex justify-content-end">
            <Button
              className="me-2 btn btn-secondary"
              onClick={() => {
                dispatch(setModalRenameChannelStatus({
                  isOpen: false,
                  type: null,
                }));
              }}
            >
              {t('labels.toCancel')}
            </Button>
            <Button type="submit" className="btn btn-primary">{t('labels.toSend')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalRenameChannel;
