import React from "react";
import ModalAddChannel from "./ModalAddChannel";
import ModalDeleteChannel from "./ModalDeleteChannel";
import ModalRenameChannel from "./ModalRenameChannel";

const modals = {
    add: () => <ModalAddChannel status={true} />,
    rename: (channelId) => <ModalRenameChannel status={true} channelId={channelId} />,
    delete: (channelId) => <ModalDeleteChannel status={true} channelId={channelId} />,
};

function ModalsManager(props) {
    const { modalType, channelId } = props;
    if (modals[modalType]) {
       return modals[modalType](channelId);
    }
    return (
        <React.Fragment />
    )
};

export default ModalsManager;