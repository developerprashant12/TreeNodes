import React from 'react';
import { ResizableBox } from 'react-resizable';
import { Card, Button } from 'react-bootstrap';
import { Handle, Position } from 'react-flow-renderer';
import { FaGooglePay, FaApplePay } from 'react-icons/fa'; 
import { SiStripe } from 'react-icons/si'; 
import { MdPhone } from 'react-icons/md'; 
import { SiAmazon } from 'react-icons/si'; 

const providerIcons: { [key: string]: JSX.Element } = {
  "Google Pay": <FaGooglePay />,
  "Apple Pay": <FaApplePay />,
  "Stripe": <SiStripe />,
  "Phone Pay": <MdPhone />,
  "Amazon Pay": <SiAmazon />,
};

const PaymentProviderNode = ({ id, data }: any) => (
  <ResizableBox
    width={300}
    height={100}
    minConstraints={[150, 50]}
    maxConstraints={[300, 200]}
    style={{ margin: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
  >
    <Card className="text-center" style={{ width: '100%', height: '100%' }}>
      <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '36px', marginRight: '12px' }}>
          {providerIcons[data.label]} 
        </div>
        <Card.Title style={{ flexGrow: 1 }}>{data.label}</Card.Title>
        <Button
          variant="danger"
          size="sm"
          onClick={() => data.onDelete(id)}
          style={{
            borderRadius: '50%',
            padding: '0.25rem 0.5rem',
          }}
        >
          X
        </Button>
      </Card.Body>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: '#555',
          width: '15px', 
          height: '15px', 
          borderRadius: '50%', 
          left: '50%', 
          marginLeft: '-6px', 
        }}
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: '#555',
          width: '15px', 
          height: '15px', 
          borderRadius: '50%', 
          left: '50%', 
          marginLeft: '-6px', 
        }}
      />
    </Card>
  </ResizableBox>
);

export default PaymentProviderNode;
