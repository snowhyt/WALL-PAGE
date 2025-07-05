import { Card } from "@/components/ui/card";

interface PostCardProps{
author: string;
content: string;
image_url: string;
}


export function PostCard({ author, content, image_url }:PostCardProps) {
  return (
    <div >
    <Card className="p-4">
      <h2 className="font-bold">{author}</h2>
      <p className="mt-2">{content}</p>
      <hr className="my-4"/>
    </Card>
    </div>
  );
}