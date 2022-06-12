import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { SocketContext } from '../../context/SocketContextProvider.jsx';
import { setModalRenameChannelStatus } from '../../slices/modalsSlice.js';

function ModalRenameChannel(props) {
  const { status } = props;
  const nameOfRenamingChannel = useSelector((state) => state.modals.renameChannel.previousName);
  const idOfRenamingChannel = useSelector((state) => state.modals.renameChannel.channelId);
  const channelsInChat = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const submitEventHandler = (e, name) => {
    e.preventDefault();
    const sameNameChannel = channelsInChat.filter((channel) => channel.name === name);
    if (sameNameChannel.length !== 0) {
      const formControlNode = e.target.childNodes[0];
      const invalidFeedbackContainer = e.target.childNodes[1];
      invalidFeedbackContainer.textContent = 'Должно быть уникальным';
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
      console.log(sameNameChannel);
      if (sameNameChannel.length !== 0) return;
      await socket.emit('renameChannel', { id: idOfRenamingChannel, name: newName });
    },
  });

  return (
    <Modal centered show={status} onHide={() => dispatch(setModalRenameChannelStatus(false))}>
      <Modal.Header>
        <Modal.Title>Переименовать канал</Modal.Title>
        <Button
          aria-label="Close"
          className="btn btn-close"
          onClick={() => {
            dispatch(setModalRenameChannelStatus(false));
          }}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => {
          submitEventHandler(e, formik.values.newName);
          formik.handleSubmit();
        }}
        >
          <Form.Control id="newName" value={formik.values.newName} onChange={formik.handleChange} />
          <div className="invalid-feedback" />
          <div className="d-flex justify-content-end">
            <Button
              className="me-2 btn btn-secondary"
              onClick={() => {
                dispatch(setModalRenameChannelStatus(false));
              }}
            >
              Отменить
            </Button>
            <button type="submit" className="btn btn-primary">Отправить</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalRenameChannel;
