import React, {CSSProperties} from "react";

const style: CSSProperties = {
  width: "100%",
  height: "100%",
  position: 'fixed',
  zIndex: 500,
  left: 0,
  top: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};

const Backdrop = (props: {onClick?: () => {}, show?: boolean;}) =>
  props.show ? <div style={{...style}} onClick={props.onClick} /> : null;

export default Backdrop;
