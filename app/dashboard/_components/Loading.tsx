import React from "react";
import Image from "next/image";

function Loading({ isLoading }: any) {
  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
            <Image
              src="/search-book.gif"
              alt="loading"
              width={300}
              height={200}
              className="w-[200px] h-[200px]"
            />
            <h1 className="text-center font-extralight text-primary text-2xl">
              Loading...
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Loading;
