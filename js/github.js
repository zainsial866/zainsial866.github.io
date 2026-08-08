/*
  Fetches your public repos live from the GitHub API and merges
  each one with any curated override in data.js. Repos with no
  override still appear automatically — using GitHub's own
  description and primary language as a fallback.

  Results are cached in localStorage for 30 minutes to avoid
  hitting GitHub's unauthenticated rate limit (60 requests/hour
  per IP) on repeat visits. If a fresh fetch fails (rate limited
  or offline), we fall back to whatever cache we have, however old.
*/
const GH_CACHE_KEY = "portfolio_gh_projects_cache";
const GH_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

function getCachedProjects() {
  try {
    const raw = localStorage.getItem(GH_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function setCachedProjects(data) {
  try {
    localStorage.setItem(GH_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
  } catch (e) { /* storage unavailable — ignore */ }
}

function mergeProjectData(repos) {
  return repos
    .filter(r => !r.fork)
    .filter(r => !SITE_DATA.excludedRepos.includes(r.name))
    .map(r => {
      const override = SITE_DATA.projectOverrides[r.name] || {};
      return {
        name: override.niceName || r.name,
        dir: `~/${r.name}`,
        description: override.description || r.description || "No description yet — check the repo for details.",
        tags: override.tags || [r.language].filter(Boolean),
        stars: r.stargazers_count,
        updated: r.updated_at,
        url: r.html_url
      };
    })
    .sort((a, b) => new Date(b.updated) - new Date(a.updated));
}

async function fetchProjects() {
  const cached = getCachedProjects();
  const cacheIsFresh = cached && (Date.now() - cached.timestamp < GH_CACHE_TTL_MS);
  if (cacheIsFresh) return cached.data;

  try {
    const res = await fetch(`https://api.github.com/users/${SITE_DATA.githubUser}/repos?per_page=100&sort=updated`);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const isRateLimited = res.status === 403 && /rate limit/i.test(body.message || "");
      throw new Error(isRateLimited ? "RATE_LIMITED" : `GitHub API responded ${res.status}`);
    }
    const repos = await res.json();
    const merged = mergeProjectData(repos);
    setCachedProjects(merged);
    return merged;
  } catch (e) {
    // Fetch failed (rate limit, offline, etc.) — fall back to any cache we have, even if stale
    if (cached) return cached.data;
    throw e;
  }
}
