import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import "react-social-icons/meetup";
import { FaXTwitter } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import { FaLink, FaWhatsapp } from 'react-icons/fa';

function LastPage() {
  const router = useRouter();
  const pathname = usePathname();
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`;
  const title = "Check out this story I just read on Story-Yetu";
  const [showShare, setShowShare] = useState(false);
  const notify = (message: string) => toast.success(message);
  const copy = async () => {
    console.log("Copying to clipboard");
    await navigator.clipboard.writeText(shareUrl);
    notify("Link copied to clipboard");
  }


  return (
    <div className="bg-primary p-10 h-full flex justify-center items-center flex-col gap-3">
      <h2 className="text-center text-2xl text-white">The End...</h2>
      <p className="text-center text-white text-xs">By wabunifu labs</p>
      <div className="flex flex-col w-full md:w-[50%] gap-4">
        <button
          className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
          onClick={() => router.push("/explore")}
        >
          See Other stories
        </button>
        <button
          className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
          onClick={() => router.push("/create-story")}
        >
          Create New Story
        </button>
        <button
          onClick={() => setShowShare(!showShare)}
          className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Share Story
        </button>
      </div>

      {showShare && (
        <div className="grid  grid-cols-3 md:grid-cols-4 gap-5 ">
          <a
            target="_blank"
            href={`https://x.com/intent/post?text=${title}&url=${shareUrl}`}
          >
            <FaXTwitter className="text-gray-900" size={32} />
          </a>
          <a target="_blank" href={`whatsapp://send?text=${title} ${shareUrl}`}>
            <FaWhatsapp className="text-green-400" size={32} />
          </a>
          <button onClick={() => copy()} className='cursor-pointer z-[999]'>
            <FaLink className="text-gray-400" size={32} />
          </button>
        </div>
      )}
    </div>
  );
}

export default LastPage