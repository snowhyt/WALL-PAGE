import { Card } from "@/components/ui/card";
import Image from "next/image"
interface PostCardProps{
author: string;
content: string;
image_url: string;
}


export function PostCard({ author, content, image_url }:PostCardProps) {
  return (
    <div >
    <Card className="p-4">
       {image_url && (
        <div className="relative h-80 mb-4">
          <Image
            src={image_url}
            alt={`Post by ${author}`}
            fill
            className="rounded-md object-cover"
          />
        </div>
      )}
      <h2 className="font-bold">{author}</h2>
      <p className="mt-2">{content}</p>
      <hr className="my-4"/>
    </Card>
    </div>
  );
}