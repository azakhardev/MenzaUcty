import React from 'react';
import Skeleton from './Skeleton';
import BackButton from "../../BackButton.tsx";

const MenuPageSkeleton: React.FC = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] w-full flex flex-col bg-[var(--color-background)]">
            <BackButton />

            <div className="flex-1 flex flex-col pb-10">

                <div className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row items-start justify-center gap-12 px-4">


                    <div className="w-full md:w-[350px] shrink-0 flex justify-center xl:justify-start">
                        <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <Skeleton className="h-8 w-1/2 mb-6" /> {/* Měsíc/Rok */}
                            <div className="grid grid-cols-7 gap-2">
                                {[...Array(35)].map((_, i) => (
                                    <Skeleton key={i} className="aspect-square rounded-full w-full" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 items-center xl:flex-row xl:justify-between xl:items-start flex-1 w-full">

                        <div className="w-full flex-1 min-w-0 max-w-3xl mx-auto xl:mx-0">
                            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">

                                <div className="space-y-3">
                                    <Skeleton className="h-16 w-full rounded-xl" />
                                </div>
                                <div className="space-y-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="flex gap-4 p-3 border border-gray-50 rounded-2xl">
                                            <div className="flex-1 py-2 space-y-3">
                                                <Skeleton className="h-6 w-3/4" />
                                                <Skeleton className="h-4 w-1/2" />
                                            </div>
                                            <div className="flex flex-col justify-end p-2">
                                                <Skeleton className="h-8 w-20 rounded-lg" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 ">
                                    <Skeleton className="h-16 w-full rounded-xl" />
                                </div>

                                <div className="space-y-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="flex gap-4 p-3 border border-gray-50 rounded-2xl">
                                            <div className="flex-1 py-2 space-y-3">
                                                <Skeleton className="h-6 w-3/4" />
                                                <Skeleton className="h-4 w-1/2" />
                                            </div>
                                            <div className="flex flex-col justify-end p-2">
                                                <Skeleton className="h-8 w-20 rounded-lg" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-[300px] shrink-0 flex justify-center xl:justify-end">
                            <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <Skeleton className="h-8 w-3/4 mb-6" />
                                <div className="space-y-4">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Skeleton className="size-10 rounded-lg shrink-0" />
                                            <div className="flex-1 space-y-2">
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-3 w-1/2" />
                                            </div>
                                        </div>
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

export default MenuPageSkeleton;