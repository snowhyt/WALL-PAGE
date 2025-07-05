import React from 'react'
import Image from "next/image";

export function ProfileCard() {
  return (
   
    <div className="space-y-4">
      <div className="relative w-48 h-48"> {/* You control the size here */}
  <Image
    src="/steve.jpg"
    alt="Greg"
    fill
    priority
    className="rounded-lg object-cover"
  />
</div>
      <div className="p-4 bg-white shadow rounded-lg">
        <h1 className="font-bold text-3xl">Oliver Glorioso</h1>
        <div className="mt-4 p-3 border rounded-lg bg-gray-50">
          <p><strong>Networks</strong><br/>Stanford Alum</p>
          <p><strong>Current City</strong><br/>Palo Alto, CA</p>
        </div>
      </div>
    </div>
  )
}
