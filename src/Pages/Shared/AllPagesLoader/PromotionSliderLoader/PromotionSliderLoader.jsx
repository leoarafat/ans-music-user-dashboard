import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PromotionSliderLoader = () => {
    return (
        <SkeletonTheme baseColor="#b6bdd136" highlightColor="#19b4ef4d">
            <div className="form w-full flex bg-white  shadow-md rounded-md p-5">
                <div className="md:w-1/4 w-full  mt-2">
                <Skeleton width="90%" height="90%" />
                </div>
                <div className="w-full md:w-3/4 p-2 relative">
                    <div className="w-full flex gap-4 items-center">
                        <div className="w-full md:w-3/4">
                            <div className="form-control w-full">
                                <label className="label p-0">
                                <Skeleton width={70} height={10} />
                                </label>
                                <Skeleton width="100%" height={30} />
                            </div>
                            <div className="grid grid-cols-2 gap-2 w-full">
                                <div className="form-control">
                                <label className="label p-0">
                                <Skeleton width={70} height={10} />
                                </label>
                                <Skeleton width="100%" height={30} />
                                </div>
                                <div className="form-control">
                                <label className="label p-0">
                                <Skeleton width={70} height={10} />
                                </label>
                                <Skeleton width="100%" height={30} />
                                </div>
                            </div>
                        </div>
                        <div className="w-1/4 md:px-4 flex flex-col gap-2 mt-2 items-center justify-center">
                            <div className="flex w-full items-center justify-between">
                            <Skeleton width={50} height={20} />
                            <Skeleton width={50} height={20} />
                            </div>
                            <Skeleton width={100} height={20} />
                            <Skeleton width={100} height={20} />
                        </div>
                    </div>
                </div>
            </div>
        </SkeletonTheme >
    )
}

export default PromotionSliderLoader