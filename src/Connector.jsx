import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BEIZER_WEIGHT = 0.675;

export function Connector({ initialX1, initialY1, initialX2, initialY2 }) {
  const [point1, setPoint1] = useState({ x: initialX1, y: initialY1 });
  const [point2, setPoint2] = useState({ x: initialX2, y: initialY2 });

  const calculateLinePath = () => {
    const dx = Math.abs(point1.x - point2.x) * BEIZER_WEIGHT;

    let x2, x3;

    if (point1.x > point2.x) {
      x2 = point1.x - dx;
      x3 = point2.x + dx;
    } else {
      x3 = point2.x - dx;
      x2 = point1.x + dx;
    }

    return `M${point2.x} ${point2.y} C ${x2} ${point2.y} ${x3} ${point1.y} ${point1.x} ${point1.y}`;
  };

  const hadleCircleDrag = ({ dragPoint, currPoint, setPoint }) => {
    if (!(currPoint.x === dragPoint.x && currPoint.y === dragPoint.y)) {
      setPoint({ x: dragPoint.x, y: dragPoint.y });
    }
  };

  return (
    <g>
      <path className="path" d={calculateLinePath()}></path>
      <motion.circle
        drag
        dragMomentum={false}
        onDrag={(_, info) =>
          hadleCircleDrag({
            dragPoint: info.point,
            currPoint: point1,
            setPoint: setPoint1,
          })
        }
        initial={{
          x: point1.x,
          y: point1.y,
        }}
        r="10"
        className="circle"
      ></motion.circle>
      <motion.circle
        drag
        dragMomentum={false}
        onDrag={(_, info) =>
          hadleCircleDrag({
            dragPoint: info.point,
            currPoint: point2,
            setPoint: setPoint2,
          })
        }
        initial={{
          x: point2.x,
          y: point2.y,
        }}
        r="10"
        className="circle"
      ></motion.circle>
    </g>
  );
}
