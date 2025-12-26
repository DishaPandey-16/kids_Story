import { storage } from "@/config/firebaseConfig";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { url } = data;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const response = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);

    if (!buffer) {
      return NextResponse.json({ error: "Failed to convert image" }, { status: 500 });
    }

    const base64Image = "data:image/png;base64," + buffer.toString('base64');

    try {
      const FileName = '/ai-story/' + Date.now() + '.png';
      const ImageRef = ref(storage, FileName);

      const metadata = {
        contentType: 'image/png',
      };

      await uploadBytes(ImageRef, buffer, metadata);
      const downloadUrl = await getDownloadURL(ImageRef);
      console.log(downloadUrl);

      return NextResponse.json({ imageUrl: downloadUrl });
    } catch (firebaseError) {
      console.error("Firebase upload failed, returning base64:", firebaseError);
      return NextResponse.json({ imageUrl: base64Image });
    }
  } catch (error: any) {
    console.error("Error in save-image route:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

