import React, { Fragment } from "react";
import Backdrop from "../Backdrop";
import "./Loader.css";

function Loader(props: {show: boolean}) {
  return (
    <Fragment>
      <Backdrop show={props.show} />
      <div
        className="loader"
        style={{
          display: props.show ? "fixed" : "hidden",
          opacity: props.show ? "1" : "0"
        }}
      />
    </Fragment>
  );
}

export default Loader;
