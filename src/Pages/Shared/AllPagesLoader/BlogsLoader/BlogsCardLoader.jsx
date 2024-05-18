import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const BlogCardLoader = () => {
    return (
        <SkeletonTheme baseColor="#b6bdd136" highlightColor="#19b4ef4d">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full bg-white p-2 shadow rounded-lg">
                <div className="">
                    <div className="flex items-center  gap-2">
                        <div className="mt-3 ml-4 mr-8">
                        <Skeleton width={18} height={18} />

                        </div>
                        <div className="">
                        <Skeleton width={60} height={60} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                <Skeleton width={120} height={10} />
                </div>
                <div className="flex flex-col items-start mt-2">
                <Skeleton width={160} height={7} />
                <Skeleton width={110} height={7} />
                </div>
                <div className="flex items-center">
                <Skeleton width={100} height={10} />
                </div>
                <div className="flex items-center justify-around">
                <Skeleton width={20} height={20} />
                <Skeleton width={30} height={20} />
                <Skeleton width={40} height={20} />
                </div>
            </div>
        </SkeletonTheme >
    )
}

export default BlogCardLoader;