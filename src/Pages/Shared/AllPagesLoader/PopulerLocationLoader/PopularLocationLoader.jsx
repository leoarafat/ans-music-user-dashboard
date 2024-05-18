import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PopularLocationLoader = () => {
    return (
        <SkeletonTheme baseColor="#b6bdd136" highlightColor="#19b4ef4d">
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full bg-white p-2 shadow rounded-lg">
            <div className="grid grid-cols-2">
                <div className="flex items-center ml-4">
                <Skeleton width={15} height={15} />
                </div>
                <div className="w-12 h-12">
                <Skeleton width={50} height={50} />
                </div>
            </div>
            <div className="flex items-center">
            <Skeleton width={100} height={10} />
            </div>
            <div className="flex items-center">
            <Skeleton width={100} height={10} />
            </div>
            <div className="flex items-center">
            <Skeleton width={150} height={10} />
            </div>
            <div className="flex items-center">
                {/* <Link to={`/manage-property/${id}`}><h5 className='text-gray-600 text-sm font-semibold hover:text-blue-500 transition'>Visit</h5></Link> */}
            </div>
            <div className="flex items-center justify-around">
            <Skeleton width={20} height={18} />
            <Skeleton width={20} height={18} />
            <Skeleton width={50} height={10} />
            <Skeleton width={35} height={18} />

            </div>
        </div>
        </SkeletonTheme >
    )
}

export default PopularLocationLoader;