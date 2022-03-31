import React from "react";
import { BtnPrimary, BtnSecodary, BtnWaring } from "./style";
export function PrimaryBtn(props) {
  return (
    <BtnPrimary {...props} className="font-size">
      {props.children}
    </BtnPrimary>
  );
}

export function SecondaryBtn(props) {
  return (
    <BtnSecodary {...props} className="font-size">
      {props.children}
    </BtnSecodary>
  );
}

export function WaringBtn(props) {
  return (
    <BtnWaring {...props} className="font-size">
      {props.children}
    </BtnWaring>
  );
}
