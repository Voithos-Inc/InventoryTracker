import {ImageUploadData} from "@/components/ImagePickerBox";

const API_ROUTE = "/github"

export async function addImage(file: ImageUploadData) {
  const arrayBuffer = await file.blob.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

  await fetch(API_ROUTE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: file.name,
      data: base64,
    }),
  });
}