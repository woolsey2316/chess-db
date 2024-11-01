import { SVGProps } from 'react';
import { twMerge } from 'tailwind-merge';

const ChevronDown = ({ className }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
    width="114.0628mm"
    height="71.93663mm"
    viewBox="0 0 114.0628 71.93663"
    version="1.1"
    id="svg5"
    className={twMerge('w-5 h-5', className)}
    >
    <defs
      id="defs2" />
      <g
        id="layer1"
        transform="translate(7.4096453,-61.573343)">
      <path
        style={{ fill: '#000000', fillOpacity: 6.64206e-05, stroke: '#000000', strokeWidth: 15.153, strokeLinecap: 'round', strokeLinejoin:'round', strokeDasharray: 'none', strokeOpacity:1, paintOrder: 'normal' }}
        d="M 0.16685429,69.149844 49.702722,125.93387 99.076659,69.152219"
        id="path236" />
  </g>
</svg>
  );
};

export default ChevronDown;