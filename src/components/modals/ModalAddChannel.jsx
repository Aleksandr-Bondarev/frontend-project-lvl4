/* eslint jsx-a11y/label-has-associated-control: [0] */

import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { setModalAddChannelStatus } from '../../slices/modalsSlice.js';
import { SocketContext } from '../../context/SocketContextProvider.jsx';
import { acknowledgeChannelCreating } from '../../acknowledgeCallbacks.js';

function ModalAddChannel(props) {
  const { status } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const channelsInChat = useSelector((state) => state.channels.channels);
  filter.add(filter.getDictionary('ru'));

  const checkUniqueNameOnSubmit = (e, name) => {
    const sameNameChannel = channelsInChat.filter((channel) => channel.name === name);
    if (sameNameChannel.length !== 0) {
      const formControlNode = e.target.childNodes[0];
      const invalidFeedbackContainer = e.target.childNodes[2];
      invalidFeedbackContainer.textContent = t('errors.shouldBeUnique');
      formControlNode.classList.add('is-invalid');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async ({ name }, actions) => {
      const newChannelName = name;
      const sameNameChannel = channelsInChat.filter((channel) => channel.name === name);
      if (sameNameChannel.length !== 0) return;
      await socket.emit('newChannel', { name: filter.clean(newChannelName) }, acknowledgeChannelCreating);
      dispatch(setModalAddChannelStatus(false));
      actions.resetForm();
      toast.success(t('toasts.channelCreated'));
    },
  });

  return (
    <Modal
      centered
      show={status}
      onHide={() => dispatch(setModalAddChannelStatus(false))}
      animation={false}
    >
      <Modal.Header>
        <Modal.Title>{t('labels.toAddChannel')}</Modal.Title>
        <button
          type="button"
          aria-label="Close"
          data-bs-dismiss="modal"
          className="btn btn-close"
          onClick={() => {
            dispatch(setModalAddChannelStatus(false));
          }}
        />
      </Modal.Header>
      <Modal.Body className="">
        <Form onSubmit={(e) => {
          e.preventDefault();
          checkUniqueNameOnSubmit(e, formik.values.name);
          formik.handleSubmit();
        }}
        >
          <Form.Control autoFocus name="name" id="name" className="mb-2 form-control" value={formik.values.newChannelName} onChange={formik.handleChange} />
          <label className="visually-hidden" htmlFor="name">?????? ????????????</label>
          <div className="invalid-feedback" />
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="me-2 btn btn-secondary"
              onClick={() => {
                dispatch(setModalAddChannelStatus(false));
              }}
            >
              {t('labels.toCancel')}
            </button>
            <button type="submit" className="btn btn-primary">{t('labels.toSend')}</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalAddChannel;
