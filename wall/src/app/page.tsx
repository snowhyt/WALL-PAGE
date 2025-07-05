"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProfileCard } from "@/components/ProfileCard";
import { PostCard } from "@/components/PostCard";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import "@/app/globals.css"


type Post = {
  id?: string;
  author: string;
  content: string;
  image_url: string | null;
};

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check DB connection
  useEffect(() => {
    const checkConnection = async () => {
      const { error } = await supabase.from("posts").select("id").limit(1);
      if (error) {
        console.error("❌ Supabase connection failed:", error.message);
      } else {
        console.log("✅ Supabase connection is working.");
      }
    };

    checkConnection();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("inserted_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error.message);
    } else {
      setPosts(data || []);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePost = async () => {
    if (!text.trim() && !imageFile) {
      alert("Please write something or select an image to post.");
      return;
    }
    setLoading(true);
    

    try {
      let image_url: string | null = null;

    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(fileName, imageFile, {
            upsert: true,
          });

      if (uploadError) {
          throw new Error(`Image upload failed: ${uploadError.message}`);
      }

      const { data } = supabase.storage
        .from("post-images")
        .getPublicUrl(fileName);

      image_url = data?.publicUrl;
    }

    const { error: insertError } = await supabase.from("posts").insert({
      author: "Oliver Glorioso",
      content: text,
      image_url: image_url,
    });

    if (insertError) {
      throw new Error(`Failed to create post: ${insertError.message}`);
      }

      setText("");
      setImageFile(null);
      setImagePreview(null);
      fetchPosts();
    } catch (error: any) {
      console.error("Error posting:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex container mx-auto py-6 gap-6">
        <aside className="w-1/4">
          <ProfileCard />
        </aside>
        <main className="flex-1 space-y-6">
          <div className="flex flex-col gap-4 border-2 border-dashed border-gray-400 rounded-lg p-4">
            <textarea
              className="border rounded-lg p-3"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                width={300}
                height={200}
                className="rounded-lg"
              />
            )}
            <button
              onClick={handlePost}
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-bold hover:bg-blue-800"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>

          {posts.map((p) => (
            <PostCard
              key={p.id}
              author={p.author}
              content={p.content}
              image_url={p.image_url}
            />
          ))}
        </main>
      </div>
    </>
  );
}
