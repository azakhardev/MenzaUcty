import React from 'react';
import Skeleton from './Skeleton';

const HistoryLoader: React.FC = () => {
    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 px-[20%]">
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6 gap-4">
                <Skeleton className="w-24 h-10" />
                <div className="flex gap-2 w-full sm:w-auto overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="w-20 h-8" />
                    ))}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                    <Skeleton className="w-1/2 h-8 mb-6" />
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex gap-4 items-center border-b pb-4">
                                <Skeleton className="size-16 flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="w-1/3 h-5" />
                                    <Skeleton className="w-1/4 h-4" />
                                </div>
                                <Skeleton className="w-16 h-6" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit">
                    <Skeleton className="w-3/4 h-7 mb-6" />
                    <div className="space-y-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex justify-between">
                                <Skeleton className="w-1/3 h-5" />
                                <Skeleton className="w-1/4 h-5" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryLoader;