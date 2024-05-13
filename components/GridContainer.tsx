import clsx from 'clsx';
import React from 'react';
import { FC } from 'react';

interface GridContainerProps {
    children: React.ReactNode;
    className?: string;
}

const GridContainer: FC<GridContainerProps> = ({ children, className }) => {
    return (
        <div
            className={clsx(
                'bg-gray-800 relative w-[49%] rounded-lg flex flex-col items-center aspect-video justify-center',
                className
            )}
        >
            {children}
        </div>
    );
};

export default GridContainer;