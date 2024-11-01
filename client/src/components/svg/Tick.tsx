import { SVGProps } from 'react';
import { twMerge } from 'tailwind-merge';

const Tick = ({ className }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="48.370384mm"
      height="37.914574mm"
      viewBox="0 0 48.370384 37.914574"
      version="1.1"
      id="svg5"
      className={twMerge('w-4 h-4 top-1 left-1', className)}>
      <defs
        id="defs2" />
      <g
        id="layer1"
        transform="translate(-44.349374,-118.79557)">
        <path
          style={{ strokeWidth: 0.264583 }}
          d="m 51.941748,131.16933 8.785781,10.82826 24.976241,-23.20202 7.015988,7.16747 -33.092162,30.7471 -15.278223,-18.14019 z"
          id="path236" />
      </g>
    </svg>
  );
};

export default Tick;