import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });
const owner = 'Voithos-Inc';
const repo = 'InventoryTracker';
const branch = 'main';
const basePath = 'assets/images/items/';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const { name, data } = await req.json();
  if (!name || !data) {
    return Response.json({ error: 'Invalid data passed for uploading image.' }, { status: 400 });
  }

  try {
    await octokit.rest.repos.createOrUpdateFileContents({
      owner, repo,
      path: basePath + name,
      message: `Add ${name}`,
      content: data,
      branch,
    });
    return Response.json({ data });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
