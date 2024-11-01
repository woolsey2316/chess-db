import { SVGProps } from 'react';
import { twMerge } from 'tailwind-merge';

const Cross = ({ className }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="42.165443mm"
      height="43.804443mm"
      viewBox="0 0 42.165443 43.804443"
      version="1.1"
      id="svg5"
      className={twMerge('w-3 h-3 top-[6px] left-[6px]', className)}>
      <defs
        id="defs2" />
      <g
        id="layer1"
        transform="translate(-87.49795,-90.322965)">
        <path
          style={{ strokeWidth: 0.264583 }}
          d="m 87.739973,98.190953 14.273227,13.595637 -14.515252,14.9239 6.753294,7.39766 14.588078,-16.07967 13.92155,16.09893 6.90252,-7.24127 -14.02942,-14.99479 13.85277,-14.029586 -7.5122,-7.538799 -13.13341,14.430275 -14.290736,-14.218158 z"
          id="path589" />
      </g>
    </svg>
  );
};

export default Cross;