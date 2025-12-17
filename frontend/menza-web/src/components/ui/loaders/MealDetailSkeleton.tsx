import React from 'react';
import Skeleton from './Skeleton';
import BackButton from "../../BackButton.tsx";

const MealDetailSkeleton: React.FC = () => {
    return (
        <div className="w-full mb-6">
            <BackButton />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
                    <div className="lg:col-span-2 flex flex-col items-center">
                        <Skeleton className="w-full aspect-video rounded-xl" />

                        <div className="flex w-full items-center py-4 justify-around mt-2">
                            <div className="flex flex-col items-center gap-2">
                                <Skeleton className="w-8 h-8 rounded-full" />
                                <Skeleton className="w-6 h-4" />
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Skeleton className="w-8 h-8 rounded-full" />
                                <Skeleton className="w-6 h-4" />
                            </div>
                        </div>

                        <Skeleton className="h-8 w-32 mt-6 mb-3 self-start lg:self-center" />
                        <Skeleton className="w-full h-[180px] rounded-lg max-w-[480px]" />
                    </div>

                    <div className="lg:col-span-3 flex flex-col space-y-4">
                        <Skeleton className="h-10 w-3/4 sm:w-1/2" />
                        <Skeleton className="h-px w-full sm:w-96 my-2" />

                        <div className="space-y-2 mb-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-11/12" />
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>

                        <div className="w-full flex justify-end py-4">
                            <Skeleton className="w-40 h-12 rounded-md" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                            <div>
                                <Skeleton className="h-7 w-24 mb-4" />
                                <div className="pl-4 space-y-2">
                                    {[...Array(4)].map((_, i) => (
                                        <Skeleton key={i} className="h-4 w-32" />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Skeleton className="h-7 w-48 mb-4" />
                                <div className="pl-4 space-y-2">
                                    {[...Array(4)].map((_, i) => (
                                        <Skeleton key={i} className="h-4 w-28" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetailSkeleton;