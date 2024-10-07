import React from "react";
import { Card } from "react-bootstrap";
import { Handle, Position } from "react-flow-renderer";
import ReactCountryFlag from "react-country-flag";

const PaymentInitializationNode = ({ data }: any) => {
  const nodeStyle = {
    border: "1px solid",
    padding: "10px",
    backgroundColor: data.amount > 100 ? "lightcoral" : "lightgreen", // Conditional styling based on amount
  };

  return (
    <div style={nodeStyle}>
      <Card>
        <Card.Body>
          <strong>
            <ReactCountryFlag
              countryCode={data.flag}
              svg
              style={{
                width: "50px",
                height: "50px",
              }}
            />{" "}
            &nbsp; Payment Initialization
          </strong>
          <div>Amount: ${data.amount}</div>
        </Card.Body>
      </Card>
      <Handle type="source" position={Position.Bottom}  style={{
          background: '#555',
          width: '12px', 
          height: '12px', 
          borderRadius: '50%', 
          left: '50%', 
          marginLeft: '-6px',
        }} />
      <Handle type="target" position={Position.Top}  style={{
          background: '#555',
          width: '12px', 
          height: '12px', 
          borderRadius: '50%', 
          left: '50%', 
          marginLeft: '-6px', 
        }} />
    </div>
  );
};

export default PaymentInitializationNode;
