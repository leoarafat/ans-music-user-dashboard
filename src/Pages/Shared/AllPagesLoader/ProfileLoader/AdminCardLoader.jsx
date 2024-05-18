import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AdminCardLoader = () => {
    return (
        <SkeletonTheme baseColor="#b6bdd136" highlightColor="#19b4ef4d">
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 w-full bg-white p-2 shadow rounded-lg">
            <div className="lg:col-span-4">
                <div className="flex items-center gap-2 lg:gap-4">
                    <div className="w-12 h-12">
                    <Skeleton
                        circle 
                        // height="60%"
                        height="100%"
                        width="100%"
                        containerClassName="avatar-skeleton"
                    />
                    </div>
                    <div className="">
                    <Skeleton width={70} height={10} />
                    <Skeleton width={100} height={10} />
                    </div>
                </div>
            </div>
            <div className="lg:col-span-4 lg:mt-2">
                <div className="grid grid-cols-3 w-full">
                    <div className="flex items-center">
                    <Skeleton width={80} height={10} />
                    </div>
                    <div className="flex items-center">
                    <Skeleton width={50} height={10} />
                    </div>
                    <div className="flex items-center gap-5">
                    <Skeleton width={20} height={15} />
                    <Skeleton width={30} height={20} />

                    </div>
                </div>
            </div>
        </div>
        </SkeletonTheme >
    )
}

export default AdminCardLoader