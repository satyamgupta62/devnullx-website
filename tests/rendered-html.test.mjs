import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the DevNullX public product story and social metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>DevNullX — Edge safety, fleet operations, relay logistics<\/title>/i,
  );
  assert.match(html, /A safer fleet becomes a/);
  assert.match(html, /smarter network\./);
  assert.match(html, /property="og:image"/);
  assert.match(html, /http:\/\/localhost(?::\d+)?\/og\.png/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps release metadata and removes disposable preview scaffolding", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<NetworkAtlas \/>/);
  assert.match(page, /<OperationalStack \/>/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /new URL\("\/og\.png", origin\)/);
  assert.match(packageJson, /"test:rendered"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|drizzle/i);

  await assert.doesNotReject(
    access(new URL("../public/og.png", import.meta.url)),
  );
  const previewFiles = await readdir(
    new URL("../app/_sites-preview", import.meta.url),
  ).catch(() => []);
  assert.deepEqual(previewFiles, []);
});
