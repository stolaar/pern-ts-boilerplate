import React, {Fragment, useEffect, useRef} from "react";
import ModalBackdrop from "../ModalBackdrop";
import './Modal.css'
import classnames from 'classnames'

function Modal({show, close, className, ...props}: {show: boolean; close: any, className?: string, [k: string]: any}) {
    const modalRef = useRef<any>()

    useEffect(() => {
        const onKeyPressed = (e: any) => {
            e.code === 'Escape' && close()
        }
        document.addEventListener('keydown', onKeyPressed, false)
        return () => {
            document.removeEventListener('keydown', onKeyPressed, false)
        }
    }, [close])

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.scrollIntoView()
        }
    }, [modalRef])

    return <Fragment>
        <ModalBackdrop show={show} onClick={close} />
        <div
            ref={modalRef}
            style={{
                transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: show ? '1' : '0'
            }}
            className={classnames('custom-modal', {
                [className || '']: className
            })}
        >
            {props.children}
        </div>
    </Fragment>
}

export default Modal
