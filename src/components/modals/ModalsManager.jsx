import React from "react";
import ModalAddChannel from "./ModalAddChannel";
import ModalDeleteChannel from "./ModalDeleteChannel";
import ModalRenameChannel from "./ModalRenameChannel";

function ModalsManager(props) {
    const { statuses } = props;
    for (const [key, value] of Object.entries(statuses)) {
        if (value !== true) continue;
        if (key.includes('add')) return <ModalAddChannel status={value} />;
        if (key.includes('rename')) return <ModalRenameChannel status={value}/>;
        if (key.includes('delete')) return <ModalDeleteChannel status={value}/>;
    }
    return (
        <React.Fragment />
    )
};

export default ModalsManager;