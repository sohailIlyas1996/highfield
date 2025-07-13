"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { rtdb } from "../../firebase";
import { ref, get } from "firebase/database";

function PostPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsRef = ref(rtdb, "posts");
        const snapshot = await get(postsRef);

        if (snapshot.exists()) {
          const postsData = snapshot.val();
          const postsArray = Object.keys(postsData).map((key) => ({
            id: key,
            ...postsData[key],
          }));
          setPosts(postsArray);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <main className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-blue-700 relative overflow-x-hidden">
        <div className="text-white text-2xl">Loading posts...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-blue-700 relative overflow-x-hidden">
        <div className="text-red-400 text-xl">{error}</div>
      </main>
    );
  }

  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-blue-700 relative overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-[120vw] h-[120vw] bg-blue-400/10 rounded-full blur-3xl absolute -top-1/3 -left-1/3 animate-pulse" />
        <div className="w-[80vw] h-[80vw] bg-pink-400/10 rounded-full blur-2xl absolute -bottom-1/4 -right-1/4 animate-pulse" />
      </div>
      <div className="relative z-10 w-full max-w-7xl px-4 py-12 flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center mb-6 drop-shadow-lg tracking-tight animate-fade-in">
          Posts Portfolio
        </h1>
        <p className="text-center text-xl md:text-2xl text-slate-200 mb-14 max-w-3xl mx-auto animate-fade-in delay-100">
          Explore the latest posts and projects. Each post showcases creativity
          and innovation.
        </p>

        {posts.length === 0 ? (
          <div className="text-center text-white text-xl animate-fade-in delay-200">
            <p>No posts found. Upload your first post!</p>
            <a
              href="/uploadpost"
              className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Upload Post
            </a>
          </div>
        ) : (
          <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in delay-200">
            {posts.map((post, idx) => (
              <article
                key={post.id}
                className="group bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-blue-400/40 hover:scale-[1.03] transition-all duration-300 overflow-hidden flex flex-col border border-slate-200 hover:border-blue-400 relative"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors cursor-pointer drop-shadow-sm">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-sm mb-4">
                    {new Date(post.createdAt).toLocaleDateString()} &bull;
                    Posted
                  </p>
                  <p className="text-slate-700 text-lg flex-1 mb-6">
                    {post.description || "No description provided"}
                  </p>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </main>
  );
}

export default PostPage;
