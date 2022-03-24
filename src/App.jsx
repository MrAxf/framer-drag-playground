import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Connector } from './Connector';

export default function App() {
  const [shadowPoint, setShadowPoint] = useState({ x: 200, y: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();

  return (
    <>
      <motion.svg className="svg">
        <Connector
          initialX1={150}
          initialY1={150}
          initialX2={50}
          initialY2={250}
        />
        <Connector
          initialX1={150}
          initialY1={350}
          initialX2={250}
          initialY2={450}
        />
        <Connector
          initialX1={350}
          initialY1={350}
          initialX2={450}
          initialY2={250}
        />
        <Connector
          initialX1={350}
          initialY1={150}
          initialX2={250}
          initialY2={50}
        />
      </motion.svg>
      {isDragging && (
        <div
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            background: '#00000044',
            top: shadowPoint.y,
            left: shadowPoint.x,
            outline: 'solid 5px #00000044',
          }}
        ></div>
      )}

      <motion.div
        initial={{
          x: 200,
          y: 200,
        }}
        animate={controls}
        drag
        onDragStart={() => {
          setIsDragging(true);
        }}
        onDrag={(_, info) => {
          const point = {
            x: Math.round((info.point.x - 50) / 100) * 100,
            y: Math.round((info.point.y - 50) / 100) * 100,
          };
          if (!(shadowPoint.x === point.x && shadowPoint.y === point.y)) {
            setShadowPoint(point);
          }
        }}
        onDragEnd={(_, info) => {
          const point = {
            x: Math.round((info.point.x - 50) / 100) * 100,
            y: Math.round((info.point.y - 50) / 100) * 100,
          };
          setIsDragging(false);
          controls.start(point);
        }}
        dragMomentum={false}
        dragElastic={0.2}
        style={{
          position: 'absolute',
          width: 100,
          height: 100,
          background: 'red',
        }}
      ></motion.div>
    </>
  );
}
