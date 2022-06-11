/* eslint jsx-a11y/label-has-associated-control: [0] */

import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form } from 'react-bootstrap';
import { setModalAddChannelStatus } from '../../slices/modalsSlice.js';
import { SocketContext } from '../../context/SocketContextProvider.jsx';
import { acknowledgeChannelCreating } from '../../acknowledgeCallbacks.js';

function ModalAddChannel(props) {
  const { status } = props;
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async ({ name }, actions) => {
      const newChannelName = name;
      await socket.emit('newChannel', { name: newChannelName }, acknowledgeChannelCreating);
      dispatch(setModalAddChannelStatus(false));
      actions.resetForm();
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
        <Modal.Title>Добавить канал</Modal.Title>
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
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control autoFocus name="name" id="name" className="mb-2 form-control" value={formik.values.newChannelName} onChange={formik.handleChange} />
          <label className="visually-hidden" htmlFor="name">Имя канала</label>
          <div className="invalid-feedback" />
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="me-2 btn btn-secondary"
              onClick={() => {
                dispatch(setModalAddChannelStatus(false));
              }}
            >
              Отменить
            </button>
            <button type="submit" className="btn btn-primary">Отправить</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalAddChannel;
