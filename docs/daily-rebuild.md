# The daily rebuild

The citation counts on the Research page come from INSPIRE-HEP when the site
is built, so they change only when Vercel rebuilds the site. To keep them
current without a push, the GitHub Actions workflow
`.github/workflows/refresh-citations.yml` asks Vercel to rebuild the site every
day at 08:30 UTC (2 p.m. in India), after INSPIRE-HEP's daily update. It does
so through a Vercel Deploy Hook, a private URL that starts a build when it
receives a request. This note describes how the hook was set up and how to set
it up again.

## Setting it up

The workflow file must already be on GitHub, in the `master` branch.

### 1. Create the Deploy Hook in Vercel

1. Open <https://vercel.com/dashboard> and select the **nextjs-site** project.
2. Go to **Settings**, then **Git**, and scroll to **Deploy Hooks**.
3. Enter a name, such as `refresh-citations`, and the branch `master`, then
   click **Create Hook**.
4. Copy the URL that appears. It looks like
   `https://api.vercel.com/v1/integrations/deploy/prj_.../...`.

The URL should be kept private, since anyone who has it can start a build of
the site.

### 2. Store the URL as a GitHub secret

Either run, in the repository folder,

```sh
gh secret set VERCEL_DEPLOY_HOOK --repo subhodeeps/nextjs-site
```

and paste the URL when asked, or use the website:

1. Open
   <https://github.com/subhodeeps/nextjs-site/settings/secrets/actions>.
2. Click **New repository secret**.
3. Enter `VERCEL_DEPLOY_HOOK` as the name and the URL as the secret, then click
   **Add secret**.

### 3. Test it

Run the workflow by hand, either with

```sh
gh workflow run refresh-citations.yml --repo subhodeeps/nextjs-site
```

or from <https://github.com/subhodeeps/nextjs-site/actions>, by opening
**Refresh citation counts** and clicking **Run workflow** on `master`.

Within a minute the run should finish with a green tick, and a new deployment,
started by the Deploy Hook, should appear in the **Deployments** tab of the
Vercel project. From then on the workflow runs by itself every day.

## When something goes wrong

- **The run says that the `VERCEL_DEPLOY_HOOK` secret is not set.** The secret
  is missing or misspelled; repeat step 2.
- **The run fails at the request to Vercel.** The hook was probably deleted in
  Vercel. Create a new hook and replace the secret with its URL.
- **The URL has leaked.** Delete the hook in Vercel, create a new one, and
  replace the secret.
- **The daily runs have stopped.** GitHub pauses scheduled workflows in
  repositories without commits for 60 days. Re-enable the workflow from the
  Actions tab, where GitHub shows a notice.
- **A run starts late.** GitHub may start scheduled runs up to an hour late
  when it is busy; such delays need no action.
- **The counts did not change after a rebuild.** Responses from INSPIRE-HEP
  are reused for up to 12 hours (`revalidate` in
  `src/app/research/_lib/inspire.ts`), so a build less than 12 hours after the
  previous one shows the same counts.
