"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import SearchBar from './Search'
const ThirdSec = () => {
    const [randomTweet, setRandomTweet] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true);
        try {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trends/trendingtweets/`)
                .then((res) => res.json())
                .then((data) => setRandomTweet(data));
        }
        catch (error) {
            console.log("In Fetching Randomtweet error occured ", error);
        }
        finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className='hidden md:flex xl:hidden lg:flex'>

            <div className="third bg-black lg:w-[350px] md:fixed  md:w-[100vw] xl:right-0 lg:right-[6rem] max-h-[1000px]   h-[100%] inline-flex justify-center   overflow-y-auto scrollbar-hide  ">
                <div className="m-4 overflow-y-auto scrollbar-hide overflow-hidden flex justify-center flex-col">
                    <div className=" fixed top-0 w-full bg-black  mt-3 h-12  mb-3 ">
                        <div className=' flex flex-row bg-black w-[300px] rounded-full border-[0.5px] border-white/20  items-center mb-3  outline-none'>
                            {/* <span className="material-symbols-outlined p-3">
                                search
                            </span> */}
                            <SearchBar />
                        </div>
                    </div>
                    <div className='mt-[36rem]'>
                        <div className="bg-black border border-white/30 w-[300px] h-32 rounded-2xl p-3 space-y-2">
                            <div className="font-bold">Subscribe to Premium</div>
                            <div className="text-xs">Subscribe to unlock new features and if eligible, receives a share of ads
                                revenue.</div>
                            <div
                                className="bg-sky-500 rounded-2xl text-white my-2 p-1 w-28 flex justify-center items-center font-bold">
                                Subscribe</div>
                        </div>
                        {loading ? (<div className="flex justify-center items-center h-20">
                            <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
                        </div>) : (<div className="bg-black border border-white/30 w-[300px] h-fit space-y-4 mt-3 p-4 rounded-2xl">
                            <div className="font-semibold">What's Happening</div>
                            {randomTweet.map((item) => (
                                <div key={item._id} className="flex flex-row items-center justify-between ">
                                    <div className="flex flex-col items-start">
                                        <div className="text-xs text-white/25">{item.category}</div>
                                        <div className="text-sm font-bold">{item.title}</div>
                                        <div className="text-xs text-white/25">{item.posts} posts</div>
                                    </div>

                                    {item.image ? <div className=" rounded-3xl"><img src="/human1.jpg" alt=""
                                        className="w-10 h-10 object-cover rounded" /></div> : <div className="fill-gray-600 ml-10">···</div>}
                                </div>
                            ))

                            }
                            <div className="text-sky-500 font-semibold text-sm space-y-3">Show more</div>
                            {/* <div className="flex flex-row  items-center justify-between">
                                <div className="">
                                    <div className="text-xs text-white/30 ">Trending in India</div>
                                    <div className="text-sm font-bold">#AgainstDharaviProject</div>
                                    <div className="text-xs text-white/30">1,873 posts</div>
                                </div>
                                
                            </div>
                            <div className="flex flex-row  items-center justify-between">
                                <div className="">
                                    <div className="text-xs text-white/30">Trending in India</div>
                                    <div className="text-sm font-bold">#CBNKilledNTR</div>
                                    <div className="text-xs text-white/30">2,873 posts</div>
                                </div>
                                <div className="fill-gray-600 ml-20">···</div>
                            </div>
                            <div className="flex flex-row  items-center justify-between">
                                <div className="">
                                    <div className="text-xs text-white/30">Politics · Trending</div>
                                    <div className="text-sm font-bold">Patna</div>
                                    <div className="text-xs text-white/30">3,573 posts</div>
                                </div>
                                <div className="fill-gray-600 ml-10">···</div>
                            </div> */}

                        </div>)}
                        <div className="bg-black border border-white/30 w-[300px] h-fit p-3 mt-3 rounded-2xl space-y-4">
                            <div className="font-bold text-sm">Who to Follow</div>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center gap-2">
                                    <div className=""><img src="/human2.jpg" alt=""
                                        className="w-9 h-9 object-cover rounded" /></div>
                                    <div className="flex flex-col">
                                        <div className="text-xs">Visit Maldives</div>
                                        <div className="text-xs">@visitmaldives</div>
                                    </div>
                                </div>
                                <div
                                    className="text-sm bg-white text-black p-2 rounded-2xl my-2 w-24 flex justify-center items-center font-bold ">
                                    Follow </div>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center gap-2">
                                    <div className=""><img src="/human3.jpg" alt="" className="w-9 h-9 object-cover rounded" />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex flex-row">
                                            <div className="text-xs">GoBackLondon</div>
                                            <svg viewBox="0 0 22 22" aria-label="Verified account" role="img"
                                                className="w-4 fill-blue-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-1cvl2hr r-f9ja8p r-og9te1 r-3t4u6i"
                                                data-testid="icon-verified">
                                                <g>
                                                    <path
                                                        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z">
                                                    </path>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="text-xs">@gobacklondon</div>
                                    </div>
                                </div>
                                <div
                                    className="text-sm bg-white text-black p-2 rounded-2xl my-2 w-24 flex justify-center items-center font-bold ">
                                    Follow </div>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center gap-2">
                                    <div className=""><img src="/human4.jpg" alt="" className="w-9 h-9 object-cover rounded" /></div>
                                    <div className="flex flex-col">
                                        <div className="flex flex-row">
                                            <div className="text-xs">Richa Singh</div>
                                            <svg viewBox="0 0 22 22" aria-label="Verified account" role="img"
                                                className="w-4 fill-blue-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-1cvl2hr r-f9ja8p r-og9te1 r-3t4u6i"
                                                data-testid="icon-verified">
                                                <g>
                                                    <path
                                                        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z">
                                                    </path>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="text-xs">@richahere234</div>
                                    </div>
                                </div>
                                <div
                                    className="text-sm bg-white text-black p-2 rounded-3xl my-2 w-24 flex justify-center items-center font-bold ">
                                    Follow </div>
                            </div>
                            <div className="text-sky-500 font-semibold text-sm space-y-3">Show more</div>
                        </div>
                        <div className="bg-black border border-white/30 w-[300px] h-fit p-3 mt-3 rounded-2xl space-y-4">
                            <div className="font-bold text-sm">Who to Follow</div>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center gap-2">
                                    <div className=""><img src="/human5.jpg" alt=""
                                        className="w-9 h-9 object-cover rounded" /></div>
                                    <div className="flex flex-col">
                                        <div className="text-xs">Visit Maldives</div>
                                        <div className="text-xs">@visitmaldives</div>
                                    </div>
                                </div>
                                <div
                                    className="text-sm bg-white text-black p-2 rounded-2xl my-2 w-24 flex justify-center items-center font-bold ">
                                    Follow </div>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center gap-2">
                                    <div className=""><img src="/human6.jpg" alt="" className="w-9 h-9 object-cover rounded" />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex flex-row">
                                            <div className="text-xs">GoBackLondon</div>
                                            <svg viewBox="0 0 22 22" aria-label="Verified account" role="img"
                                                className="w-4 fill-blue-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-1cvl2hr r-f9ja8p r-og9te1 r-3t4u6i"
                                                data-testid="icon-verified">
                                                <g>
                                                    <path
                                                        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z">
                                                    </path>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="text-xs">@gobacklondon</div>
                                    </div>
                                </div>
                                <div
                                    className="text-sm bg-white text-black p-2 rounded-2xl my-2 w-24 flex justify-center items-center font-bold ">
                                    Follow </div>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center gap-2">
                                    <div className=""><img src="/human1.jpg" alt="" className="w-9 h-9 object-cover rounded" /></div>
                                    <div className="flex flex-col">
                                        <div className="flex flex-row">
                                            <div className="text-xs">Richa Singh</div>
                                            <svg viewBox="0 0 22 22" aria-label="Verified account" role="img"
                                                className="w-4 fill-blue-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-1cvl2hr r-f9ja8p r-og9te1 r-3t4u6i"
                                                data-testid="icon-verified">
                                                <g>
                                                    <path
                                                        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z">
                                                    </path>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="text-xs">@richahere234</div>
                                    </div>
                                </div>
                                <div
                                    className="text-sm bg-white text-black p-2 rounded-3xl my-2 w-24 flex justify-center items-center font-bold ">
                                    Follow </div>
                            </div>
                            <div className="text-sky-500 font-semibold text-sm space-y-3">Show more</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThirdSec
