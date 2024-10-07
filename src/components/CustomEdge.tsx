import React from 'react';
import { getBezierPath, EdgeProps } from 'react-flow-renderer';
import { FaTrash } from 'react-icons/fa'; 

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  onDelete,
}: EdgeProps & { onDelete: (id: string) => void }) => {
  const [path] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  return (
    <>
      <path id={id} className="react-flow__edge-path" d={path} />
      <foreignObject width={30} height={30} x={midX - 15} y={midY - 15}>
        <div
          onClick={() => onDelete(id)} 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: '#fff',
            borderRadius: '50%',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
            width: '30px',
            height: '30px',
          }}
        >
          <FaTrash style={{ color: 'red' }} />
        </div>
      </foreignObject>
    </>
  );
};

export default CustomEdge;
