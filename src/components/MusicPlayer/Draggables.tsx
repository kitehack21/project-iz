import React, { useRef } from 'react';
import clamp from 'lodash-es/clamp';
import swap from 'lodash-move';
import { useDrag } from 'react-use-gesture';
import { useSprings, animated, interpolate } from 'react-spring';
import './springs.css';

// Returns fitting styles for dragged/idle items
const fn = (
  order: Array<number>,
  down?: boolean,
  originalIndex?: number,
  curIndex?: number,
  y?: number,
) => (index: number) =>
  down && index === originalIndex
    ? {
        y: curIndex! * 100 + y!,
        scale: 1.1,
        zIndex: '1',
        shadow: 15,
        immediate: (n: string) => n === 'y' || n === 'zIndex',
      }
    : {
        y: order.indexOf(index) * 100,
        scale: 1,
        zIndex: '0',
        shadow: 1,
        immediate: false,
      };

// @ts-ignore
const Draggables = ({ items }): JSX => {
  const order = useRef(items.map((_: any, index: number): number => index)); // Store indicies as a local ref, this represents the item order
  // @ts-ignore
  const [springs, setSprings] = useSprings(items.length, fn(order.current)); // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  // @ts-ignore
  const bind = useDrag(({ args: [originalIndex], down, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * 100 + y) / 100),
      0,
      items.length - 1,
    );
    const newOrder = swap(order.current, curIndex, curRow);
    setSprings(fn(newOrder, down, originalIndex, curIndex, y)); // Feed springs new style data, they'll animate the view without causing a single render
    if (!down) order.current = newOrder;
  });
  return (
    <div className="content" style={{ height: items.length * 100 }}>
      {springs.map(
        (
          {
            zIndex,
            shadow,
            y,
            scale,
          }: { zIndex: number; shadow: any; y: number; scale: number },
          i: number,
        ) => (
          <animated.div
            {...bind(i)}
            key="card"
            style={{
              zIndex,
              boxShadow: shadow.interpolate(
                (s: any) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`,
              ),
              transform: interpolate(
                [y, scale],
                // eslint-disable-next-line no-shadow
                (y, s) => `translate3d(0,${y}px,0) scale(${s})`,
              ),
            }}
          >
            {items[i]}
          </animated.div>
        ),
      )}
    </div>
  );
};

export default Draggables;
