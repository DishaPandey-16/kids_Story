'use client'
import React from 'react'

function StorySubjectInput({ userSelection }: any) {
  return (
    <div>
      <label className="text-primary md:text-2xl text-xl font-semibold lg:text-4xl">
        1. What is your story about?
      </label>
      <textarea
        placeholder="Write the subject of your story here"
        className="w-full h-[200px] md:text-xl lg:text-2xl md:p-4 p-2 mt-3 max-w-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        onChange={(e) =>
          userSelection({
            fieldValue: e.target.value,
            fieldName: "storySubject",
          })
        }
      />
    </div>
  );
}

export default StorySubjectInput