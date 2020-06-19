import React from 'react';
//import modalstyle from '../../styles/modal.module.scss';

function Modal (props) {

    const modal = {
        width:"100%",
        height: "100%",
        backgroundColor: "rgba(22, 22, 22, 0.45)",
        zIndex: "2",
        top:"0",
        left:"0",
        right:"0",
        bottom:"0",
        position: "absolute",
    }
    
    const hidden ={
        display:"none"
    }

    const innerdiv = {
            padding: "8px",
            backgroundColor: "rgb(245,245,245)",
            width: "auto",
            borderRadius: "6px",
            boxShadow: "2px 2px 11px -3px rgba(0,0,0,0.75)",
            textAlign: "center",
            position: "fixed",
            left: "50%",
            top: "35%",
            transform: "translateX(-25vw) translateY(-20vh)",
    }

    return (
        <div onClick={() => {props.setModalVisible(false)}} style={props.modalVisible ? modal :hidden}>
                <div style={innerdiv}>{props.child}</div>
        </div>
    )

}

export default Modal;