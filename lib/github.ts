import {ImageUploadData} from "@/components/ImagePickerBox";

const API_ROUTE = "/github"

export async function addImage(file: ImageUploadData) {
  const arrayBuffer = await file.blob.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);

  await fetch(API_ROUTE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: file.name,
      data: base64,
    }),
  });
}