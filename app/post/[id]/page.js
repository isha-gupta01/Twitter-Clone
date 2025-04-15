// app/post/[id]/page.js
"use client"
import React from 'react'
import FirstSec from '@/components/FirstSec'
// import SecondSec from '@/components/SecondSec'
import ThirdSec from '@/components/ThirdSec'
import MobFirstSec from '@/components/MobFirstSec'
// import MobThirdSec from '@/components/MobThirdSec'
import ProtectedRoute from '@/components/ProtectedRoute'
import Link from 'next/link'

// import PostCard from '@/components/PostCard'

const getPostById = async (id) => {
  const res = await fetch(`https://twitterclonebackend-nqms.onrender.com/tweetfetch/posts/${id}`, {
    cache: 'no-store', // Prevents stale post
  })
  if (!res.ok) {
    throw new Error("Failed to fetch post")
  }
  return res.json()
}

const PostPage = async ({ params }) => {
  const post = await getPostById(params.id);

  return (
    <div>
      <ProtectedRoute>
        <div className='black text-white'>
          <div className="flex md:container mx-auto">
            <div className='hidden md:flex'> 
              <FirstSec />
            </div>
            <div className='md:hidden block'>
              <MobFirstSec />
            </div>
            <div className="w-px bg-gray-400 hidden md:flex opacity-30 sticky left-[5.7rem] z-50"></div>

            <div className="section-mid-part3  w-full h-auto">
              <div key={post._id} className="flex md:mr-10 lg:mr-0 flex-col relative gap-5">
                <div className='flex m-3 md:ml-10 ml-5 lg:ml-6 items-center '>
                  <Link href={`/userProfile/${post.user_id}`} ><Image className="w-10 h-10 rounded-full cursor-pointer" src={post.profileImage} width={100} height={100} alt="Profile Pic" /></Link>
                  <div className='ml-5 flex flex-col'>
                    <div className='flex flex-row items-center justify-between'>
                      <div className="flex flex-row items-center">
                        <Link href={`/userProfile/${post.user_id}`}><h3 className="font-bold text-sm cursor-pointer"> {post.Name} </h3></Link>
                        <svg viewBox="0 0 22 22" aria-label="Verified account" role="img"
                          className="w-4 fill-blue-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-1cvl2hr r-f9ja8p r-og9te1 r-3t4u6i"
                          data-testid="icon-verified">
                          <g>
                            <path
                              d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z">
                            </path>
                          </g>
                        </svg>
                        <Link href={`/userProfile/${post.user_id}`}><span className="text-gray-400 text-xs cursor-pointer" > {post.username}  </span></Link>
                        <div className="text-gray-500"><span className='text-xl font-bold '> · </span>{post.tweetTime}</div>
                        <svg viewBox="0 0 24 24" aria-hidden="true"
                          className="w-5 absolute md:hidden right-4  fill-gray-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
                          <g>
                            <path
                              d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z">
                            </path>
                          </g>
                        </svg>
                      </div>
                      <div className='hidden md:flex '>
                        <svg viewBox="0 0 24 24" aria-hidden="true"
                          className="w-5   md:absolute md:right-2 fill-gray-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
                          <g>
                            <path
                              d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z">
                            </path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className="text-xs">{post.content}</div>
                  </div>
                </div>

                <div className="h-auto ml-8 md:ml-0 justify-center items-center md:justify-between  flex flex-col">
                  {post.image && /\.(jpg|jpeg|png|gif|webp)$/i.test(post.image) ? (
                    <Image
                      src={post.image}
                      alt="Tweet Image"
                      width={200}
                      height={200}
                      className="w-[90%] md:w-[60%] h-[20rem] rounded-3xl mt-2"
                    />
                  ) : post.image && /\.(mp4|webm|ogg)$/i.test(post.image) ? (
                    <video
                      src={post.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-[90%] md:w-[80%] h-[20rem] rounded-3xl mt-2"
                    />
                  ) : null}

                  <ul className="flex flex-row gap-5 md:gap-7 mt-4">
                    {/* Actions like comment, retweet, like */}
                  </ul>
                </div>
                <hr className="opacity-25 w-full" />
              </div>
            </div>

            <div className="w-px bg-gray-400 opacity-25"></div>
            <ThirdSec />
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
};


// app/post/[id]/page.js
// export async function generateMetapost({ params }) {
//     const post = await getPostById(params.id)

//     return {
//       title: `Post by @${post.username}`,
//       description: post.content,
//       openGraph: {
//         title: `Post by @${post.username}`,
//         description: post.content,
//         url: `https://yourdomain.com/post/${params.id}`,
//         type: "article",
//         images: [
//           {
//             url: post.profileImage || "https://twitterclonebackend-nqms.onrender.com/default-thumbnail.png",
//             width: 600,
//             height: 400,
//           },
//         ],
//       },
//     }
//   }


export default PostPage
