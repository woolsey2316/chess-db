import { SVGProps } from 'react';
import { twMerge } from 'tailwind-merge';

const Threat = ({ className }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 14.299946 14.643635"
      version="1.1"
      id="svg21"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('w-5 h-5', className)}>
      <defs
        id="defs18" />
      <g
        id="layer1"
        style={{ display: 'inline' }}
        transform="translate(-59.629857,-62.493326)">
        <circle
          style={{ strokeWidth: 0.0706165, strokeDasharray: 'none' }}
          id="path250"
          cx="66.768829"
          cy="69.838806"
          r="3.7353024" />
        <circle
          style={{ fillOpacity: 0, strokeWidth: '1.02867' }}
          id="path252"
          cx="66.803551"
          cy="69.771126"
          r="5.278089" />
        <rect
          style={{ fillOpacity: 0, strokeWidth: '1.02252', strokeDasharray: 'none', strokeOpacity: 1 }}
          id="rect1020"
          width="0.12803841"
          height="13.621114"
          x="66.787216"
          y="63.004585" />
        <rect
          style={{ fillOpacity: 0, strokeWidth: '1.00663', strokeDasharray: 'none', strokeOpacity: 1 }}
          id="rect1024"
          width="13.29332"
          height="0.19538529"
          x="60.133175"
          y="69.60183" />
      </g>
    </svg>
  );
};

export default Threat;