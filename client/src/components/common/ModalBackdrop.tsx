import React from 'react'

function ModalBackdrop(props: any) {
    return props.show ? (
        <div className="backdrop" onClick={props.onClick} />
    ) : null
}

export default ModalBackdrop
