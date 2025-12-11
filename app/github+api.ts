import {Octokit} from "octokit";

const GH_PAT = process.env.GITHUB_PERSONAL_ACCESS_TOKEN!

const owner = 'Voithos-Inc';
const repo = 'InventoryTracker';
const branch = 'main';
const basePath = 'assets/images/items/';

const octokit = new Octokit({
  auth: GH_PAT
});

export async function POST(request: Request) {
  const { name, data } = await request.json();

  if (!name || !data) {
    return Response.json({ error: 'Invalid data passed for uploading image.' }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(data, "base64");

    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: basePath + name,
      message: `Add ${name}`,
      content: buffer.toString("base64"),
      branch,
    });

    return Response.json({ data });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
