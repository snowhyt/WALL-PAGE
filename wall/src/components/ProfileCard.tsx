import React from 'react'
import Image from "next/image";

export function ProfileCard() {
  return (
   
    <div className="space-y-4">
      <div>
        <Image
          src="/steve.jpg"
          alt="Greg"
          width={192}
          height={192}
          priority
          className="rounded-lg object-cover"
        />
      </div>
      <div className="p-4 bg-white shadow rounded-lg">
        <h1 className="font-bold text-3xl">Oliver Glorioso</h1>
        <div className="mt-4 p-3 border rounded-lg bg-gray-50">
          <p><strong>Github</strong><br/>@snowhyt</p>
          <p><strong>Current City</strong><br/>Quezon, Philippines</p>
        </div>
      </div>
    </div>
  )
}
