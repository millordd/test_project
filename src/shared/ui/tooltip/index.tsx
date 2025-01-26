import 'react-tooltip/dist/react-tooltip.css';

import { useId } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { ITooltipProps } from './types';

export const Tooltip = ({ children, title, place = 'bottom' }: ITooltipProps) => {
  const id = useId();
  return (
    <>
      <div data-tooltip-id={id}>{children}</div>
      {Boolean(title) && (
        <ReactTooltip
          id={id}
          place={place}
          className="z-[9999] whitespace-normal rounded-lg bg-[#00020F] p-3 lowercase first-letter:uppercase"
        >
          <h1 className="text-white">{title}</h1>
        </ReactTooltip>
      )}
    </>
  );
};
