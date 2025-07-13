"use client";
import React from "react";

import Image from "next/image";

const dummyPosts = [
  {
    id: 1,
    title: "Global Markets Rally as Economic Outlook Improves",
    summary:
      "Stock markets around the world surged today as new data suggested a stronger-than-expected economic recovery.",
    image: "/globe.svg",
    date: "2024-06-10",
    author: "Jane Smith",
  },
  {
    id: 2,
    title: "Breakthrough in Renewable Energy Technology",
    summary:
      "Scientists have announced a major breakthrough in solar panel efficiency, promising cheaper and cleaner energy.",
    image: "/window.svg",
    date: "2024-06-09",
    author: "John Doe",
  },
  {
    id: 3,
    title: "Local Community Rallies for Charity Event",
    summary:
      "Hundreds gathered in the city center to raise funds for local charities, with live music and food stalls.",
    image: "/car.jpg",
    date: "2024-06-08",
    author: "Emily Johnson",
  },
  {
    id: 4,
    title: "Local Community Rallies for Charity Event",
    summary:
      "Hundreds gathered in the city center to raise funds for local charities, with live music and food stalls.",
    image: "/car.jpg",
  },
  {
    id: 5,
    title: "Local Community Rallies for Charity Event",
    summary:
      "Hundreds gathered in the city center to raise funds for local charities, with live music and food stalls.",
    image: "/car.jpg",
  },
  {
    id: 6,
    title: "Local Community Rallies for Charity Event",
    summary:
      "Hundreds gathered in the city center to raise funds for local charities, with live music and food stalls.",
    image: "/car.jpg",
  },
];

function PostPage() {
  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-blue-700 relative overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-[120vw] h-[120vw] bg-blue-400/10 rounded-full blur-3xl absolute -top-1/3 -left-1/3 animate-pulse" />
        <div className="w-[80vw] h-[80vw] bg-pink-400/10 rounded-full blur-2xl absolute -bottom-1/4 -right-1/4 animate-pulse" />
      </div>
      <div className="relative z-10 w-full max-w-7xl px-4 py-12 flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center mb-6 drop-shadow-lg tracking-tight animate-fade-in">
          Admin Portfolio
        </h1>
        <p className="text-center text-xl md:text-2xl text-slate-200 mb-14 max-w-3xl mx-auto animate-fade-in delay-100">
          Explore the latest projects and posts curated by our admin. Each
          project highlights innovation, creativity, and professionalism.
        </p>
        <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in delay-200">
          {dummyPosts.map((post, idx) => (
            <article
              key={post.id}
              className="group bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-blue-400/40 hover:scale-[1.03] transition-all duration-300 overflow-hidden flex flex-col border border-slate-200 hover:border-blue-400 relative"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={post.image}
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
                  {post.date} &bull; By {post.author}
                </p>
                <p className="text-slate-700 text-lg flex-1 mb-6">
                  {post.summary}
                </p>
              </div>
            </article>
          ))}
        </section>
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
