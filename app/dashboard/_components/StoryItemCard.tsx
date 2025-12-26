import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { getImageFromIndexedDB } from '@/functions/indexedDb';


function StoryItemCard({ story }: any) {
  const [coverImage, setCoverImage] = useState(story.coverimage?.startsWith('local-') ? null : story.coverimage);

  useEffect(() => {
    const loadLocalImage = async () => {
      if (story.coverimage && story.coverimage.startsWith('local-')) {
        const localData = await getImageFromIndexedDB(story.coverimage);
        if (localData) {
          setCoverImage(localData);
        }
      }
    };
    loadLocalImage();
  }, [story.coverimage]);

  return (
    <Link href={"/view-story/" + story.storyId}>
      <div
        className="w-full h-[300px] hover:scale-105 transition-all cursor-pointer col-span-12 sm:col-span-5 rounded-lg overflow-hidden relative group"
      >
        {coverImage && !coverImage.startsWith('local-') ? <Image
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src={coverImage}
          width={500}
          height={500}
        /> : <div className="w-full h-full bg-gray-200 animate-pulse"></div>}
        <div className="absolute bg-white/30 bottom-0 left-0 right-0 z-10 flex justify-between items-center p-4 border-t border-zinc-100/50">
          <div>
            <p className="text-black font-semibold">
              {story.output.story_title}
            </p>
          </div>
          <button className="text-sm px-4 py-2 bg-primary text-white rounded-full hover:opacity-90 transition-opacity">
            Read Book
          </button>
        </div>
      </div>
    </Link>
  );
}

export default StoryItemCard