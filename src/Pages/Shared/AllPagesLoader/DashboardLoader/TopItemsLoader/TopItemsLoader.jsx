import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TopItemsLoader = () => {
    return (
        <div>
            <SkeletonTheme baseColor="#55608059" highlightColor="#47A2D8">
                <div>
                <Skeleton
                            circle
                            height="100%"
                            containerClassName="avatar-skeleton"
                        />
                        <Skeleton width={70} />
                </div>
                <p>
                <Skeleton />
                <Skeleton count={3} />
                </p>
            </SkeletonTheme>
        </div>
    )
}

export default TopItemsLoader