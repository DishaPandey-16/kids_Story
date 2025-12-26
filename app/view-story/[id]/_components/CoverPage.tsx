import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getImageFromIndexedDB } from '@/functions/indexedDb';

function CoverPage({ imageUrl }: any) {
  const [imageSrc, setImageSrc] = useState(imageUrl);

  useEffect(() => {
    const loadLocalImage = async () => {
      if (imageUrl && imageUrl.startsWith('local-')) {
        const localData = await getImageFromIndexedDB(imageUrl);
        if (localData) {
          setImageSrc(localData);
        }
      }
    };
    loadLocalImage();
  }, [imageUrl]);

  return (
    <div>
      {imageSrc && !imageSrc.startsWith('local-') && <Image src={imageSrc} className='w-full h-full object-fill' alt="cover image" width={500} height={500} />}
    </div>
  )
}

export default CoverPage