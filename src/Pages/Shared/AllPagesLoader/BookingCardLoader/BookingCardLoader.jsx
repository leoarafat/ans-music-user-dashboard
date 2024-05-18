import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const BookingCardLoader = () => {
    return (
        <SkeletonTheme baseColor="#b6bdd136" highlightColor="#19b4ef4d">
           <div className="p-2 grid grid-cols-2 md:grid-cols-5 gap-3 bg-[#ffffffe0] shadow-md rounded-md">
            <div className='user-info flex  gap-2'>
                <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                    <Skeleton
                        circle 
                        // height="60%"
                        height={50}
                        width={50}
                        containerClassName="avatar-skeleton"
                    />
                    </div>
                </div>
                <div className="flex flex-col flex-wrap  mt-1">
                <Skeleton width={70} height={10} />
                <Skeleton width={120} height={10} />
                </div>
            </div>
            <div className="flex flex-col justify-center">
            <Skeleton width={70} height={10} />
            <Skeleton width={120} height={10} />

            </div>
            <div className="flex flex-col justify-center">
            <Skeleton width={60} height={10} />
            <Skeleton width={120} height={10} />

            </div>
            <div className="flex flex-col justify-center gap-1">
            <Skeleton width={100} height={10} />
            <Skeleton width={100} height={10} />
            </div>
            <div className="flex flex-col justify-center items-center">
            <Skeleton width={40} height={10} />
            <Skeleton width={70} height={20} />
            </div>
        </div>
        </SkeletonTheme>
    )
}

export default BookingCardLoader