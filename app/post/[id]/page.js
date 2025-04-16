// ❌ REMOVE THIS LINE
// "use client"

// import FirstSec from '@/components/FirstSec'
// import ThirdSec from '@/components/ThirdSec'
// import MobFirstSec from '@/components/MobFirstSec'
import ProtectedRoute from '@/components/ProtectedRoute'
// import SearchOverlay from '@/components/SearchOverlay'
// import Link from 'next/link'
// import Image from 'next/image'
import PostViewClient from './PostViewClient' // 👉 We'll create this

const getPostById = async (id) => {
  const res = await fetch(`https://twitterclonebackend-nqms.onrender.com/tweetfetch/posts/${id}`, {
    cache: 'no-store',
  })
  console.log("Fetching:", res);
  if (!res.ok) {
    console.log("Status Code:", res.status); // ✅ Add this
    throw new Error("Failed to fetch post")
  }
  return res.json()
}

const PostPage = async ({ params }) => {
  const post = await getPostById(params.id);

  return (
    <ProtectedRoute>
      <PostViewClient post={post} />
    </ProtectedRoute>
  );
}

export default PostPage;
