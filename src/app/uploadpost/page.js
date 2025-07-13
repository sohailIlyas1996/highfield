"use client";
import React, { useState } from "react";
import { storage, rtdb } from "../../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref as dbRef, push, set } from "firebase/database";

export default function SimpleImageUpload() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image || !title.trim()) {
      alert("Please select an image and enter a title");
      return;
    }
    setUploading(true);
    try {
      // Upload image to Firebase Storage
      const imgRef = storageRef(storage, `uploads/${Date.now()}_${image.name}`);
      await uploadBytes(imgRef, image);
      const url = await getDownloadURL(imgRef);
      setImageUrl(url);

      // Save post data to Realtime Database
      const postData = {
        title: title.trim(),
        description: description.trim(),
        imageUrl: url,
        createdAt: new Date().toISOString(),
      };

      // Add document to "posts" node in Realtime Database
      const postsRef = dbRef(rtdb, "posts");
      const newPostRef = push(postsRef);
      await set(newPostRef, postData);
      console.log("Post saved with ID: ", newPostRef.key);

      alert("Post uploaded successfully!");

      // Reset form
      setImage(null);
      setTitle("");
      setDescription("");
      setImageUrl("");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed: " + err.message);
    }
    setUploading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-blue-100 py-10 px-2">
      <div className="w-full max-w-lg bg-white/90 rounded-3xl shadow-2xl p-8 border border-blue-100 relative animate-fade-in">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-6 tracking-tight drop-shadow text-center">
          Upload Post
        </h2>

        {/* Title Input */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-blue-800 font-semibold mb-2"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-blue-800 font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter post description (optional)"
            rows="3"
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-blue-800 font-semibold mb-2"
          >
            Image *
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={uploading || !image || !title.trim()}
          className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-yellow-300 font-bold px-8 py-3 rounded-xl shadow-lg hover:from-blue-900 hover:to-blue-700 hover:text-yellow-200 transition-all duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed text-lg tracking-wide"
        >
          {uploading ? "Uploading..." : "Upload Post"}
        </button>

        {imageUrl && (
          <div className="mt-6 text-center">
            <p className="text-blue-800 font-semibold mb-2">
              Uploaded Image URL:
            </p>
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-blue-600 underline"
            >
              {imageUrl}
            </a>
            <div className="mt-4 flex justify-center">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="rounded-xl border border-blue-200 shadow-md max-h-48 object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
