import clsx from 'clsx';
import { FC } from 'react';

import { ISkeletonProps } from './type';

export const Skeleton: FC<ISkeletonProps> = ({
  width = 'w-full',
  height = 'h-4',
  borderRadius = 'rounded-md',
  className,
  count = 1,
}) =>
  Array.from({ length: count }).map((_, idx) => {
    const uniqueKey = `${width}-${height}-${borderRadius}-${idx}`;
    return (
      <div
        key={uniqueKey}
        className={clsx(
          'animate-pulse bg-gray-300 dark:bg-dark-mode-card-hover mt-5',
          width,
          height,
          borderRadius,
          className
        )}
      />
    );
  });
