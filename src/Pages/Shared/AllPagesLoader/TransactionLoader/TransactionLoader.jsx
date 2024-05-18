import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TransactionLoader = () => {
    return (
        <SkeletonTheme baseColor="#b6bdd136" highlightColor="#19b4ef4d">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full bg-white p-2 shadow rounded-lg">
            <div className="">
                <div className="df">
                <Skeleton width={100} height={10} />
                <Skeleton width={130} height={10} />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
            <Skeleton width={90} height={10} />
            </div>
            <div className="flex flex-col justify-center">
            <Skeleton width={120} height={10} />
            </div>
            <div className="flex flex-col justify-center">
            <Skeleton width={100} height={10} />
            </div>
            <div className="flex flex-col justify-center">
            <Skeleton width={90} height={10} />
            </div>
            <div className="flex flex-col justify-center">
            <Skeleton width={60} height={10} />
            </div>
        </div>
        </SkeletonTheme >
    )
}

export default TransactionLoader