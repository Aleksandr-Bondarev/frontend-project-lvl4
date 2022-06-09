/* eslint jsx-a11y/label-has-associated-control: [0] */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { setModalAddChannelStatus, setModalOpenStatus } from '../../slices/modalsSlice.js';
import { addNewChannel, setActiveChannelId, setActiveChannelName } from '../../slices/channelsSlice.js';

function ModalAddChannel(props) {
  const { status } = props;
  const dispatch = useDispatch();
  const channelsInChat = useSelector((state) => state.channels.channels);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({ name }, actions) => {
      const newCHannelId = channelsInChat.length + 1;
      const newChannelName = name;
      dispatch(addNewChannel({
        id: newCHannelId,
        name: newChannelName,
        removable: true,
      }));
      dispatch(setModalAddChannelStatus(false));
      dispatch(setModalOpenStatus(false));
      dispatch(setActiveChannelId(newCHannelId));
      dispatch(setActiveChannelName(name));
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
