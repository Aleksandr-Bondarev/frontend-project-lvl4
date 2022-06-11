/* eslint jsx-a11y/label-has-associated-control: [0] */

import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { setModalAddChannelStatus, setModalOpenStatus } from '../../slices/modalsSlice.js';
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
      dispatch(setModalOpenStatus(false));
      actions.resetForm();
    },
  });

  if (status === false) {
    return null;
  }
  return (
    <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">Добавить канал</div>
            <button
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
              onClick={() => {
                dispatch(setModalAddChannelStatus(false));
                dispatch(setModalOpenStatus(false));
              }}
            />
          </div>
          <div className="modal-body">
            <form className="" onSubmit={formik.handleSubmit}>
              <div>
                <input name="name" id="name" className="mb-2 form-control" value={formik.values.newChannelName} onChange={formik.handleChange} />
                <label className="visually-hidden" htmlFor="name">Имя канала</label>
                <div className="invalid-feedback" />
                <div className="d-flex justify-content-end">
                  <button type="button" className="me-2 btn btn-secondary">Отменить</button>
                  <button type="submit" className="btn btn-primary">Отправить</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAddChannel;
