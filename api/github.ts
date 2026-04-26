export const config = { runtime: 'edge' };

const owner = 'Voithos-Inc';
const repo = 'InventoryTracker';
const branch = 'main';
const basePath = 'assets/images/items/';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const { name, data } = await req.json();
  if (!name || !data) {
    return Response.json({ error: 'Invalid data passed for uploading image.' }, { status: 400 });
  }

  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${basePath}${name}`;
    const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

    // check if file exists to get its sha (required for updates)
    let sha: string | undefined;
    const existing = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      }
    });
    if (existing.ok) {
      const json = await existing.json() as any;
      sha = json.sha;
    }

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add ${name}`,
        content: data,
        branch,
        ...(sha ? { sha } : {}),
      }),
    });

    if (!res.ok) {
      const err = await res.json() as any;
      return Response.json({ error: err.message }, { status: res.status });
    }

    return Response.json({ data });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}