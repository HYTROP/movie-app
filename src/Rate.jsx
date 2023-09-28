import React from "react";
import { Rate } from "antd";
import "./Rated.css";

export default function Rated() {
  // const {currentValue} = this.state;
  return (
    <div style={{ display: "block", width: "50", height: "10", padding: 10 }}>
      <Rate
        // onChange={(value) => {}}
        className="rated-stars"
        allowHalf
        count={10}
        defaultValue={3.5}
        style={{ maxWidth: "20" }}
      />
    </div>
  );
}
