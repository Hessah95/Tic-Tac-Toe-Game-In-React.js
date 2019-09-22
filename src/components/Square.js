import React from "react";
import { S } from "xmlchars/xml/1.0/ed5";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
