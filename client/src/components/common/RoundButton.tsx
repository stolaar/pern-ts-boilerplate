import React from 'react'


// TODO: MOVE TO CSS FILE
const style = {
    button: {
    border: "none",
    padding: '10px',
    background: "#b28eab",
    color: "#ffffff",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    fontFamily: "Quicksand-Regular, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
    },
    text: {
        fontSize: "28px",
        lineHeight: "20px"
    }
}

function RoundButton({text = '', onClick}: { text?: string, onClick: any }) {
    return <button style={style.button} onClick={onClick}>
        <span style={style.text}>{text}</span>
    </button>
}

export default RoundButton
