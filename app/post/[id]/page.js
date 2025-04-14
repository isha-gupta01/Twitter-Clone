// app/post/[id]/page.js
import React from 'react'

const getPostById = async (id) => {
  const res = await fetch(`https://twitterclonebackend-nqms.onrender.com/tweetfetch/posts/${id}`, {
    cache: 'no-store', // Prevents stale data
  })
  if (!res.ok) {
    throw new Error("Failed to fetch post")
  }
  return res.json()
}

const PostPage = async ({ params }) => {
  const post = await getPostById(params.id)

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-2">@{post.username}</h1>
      <p className="text-gray-700">{post.content}</p>
    </div>
  )
}

// app/post/[id]/page.js
// export async function generateMetadata({ params }) {
  //   const post = await getPostById(params.id)
  
  //   return {
  //     title: `Post by @${post.username}`,
  //     description: post.content,
  //     openGraph: {
  //       title: `Post by @${post.username}`,
  //       description: post.content,
  //       url: `https://yourdomain.com/post/${params.id}`,
  //       type: "article",
  //       images: [
  //         {
  //           url: post.profileImage || "https://twitterclonebackend-nqms.onrender.com/default-thumbnail.png",
  //           width: 600,
  //           height: 400,
  //         },
  //       ],
  //     },
  //   }
  // }
  

export default PostPage
