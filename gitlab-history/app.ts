// index.ts
const GITLAB_URL = process.env.GITLAB_URL!;
const TOKEN = process.env.GITLAB_TOKEN!;
const USERNAME = process.env.GITLAB_USERNAME || "khush.shah";

async function getProjects() {
  const res = await fetch(`${GITLAB_URL}/api/v4/users/${USERNAME}/projects`, {
    headers: {
      "PRIVATE-TOKEN": TOKEN,
    },
  });
  return await res.json();
}

async function getCommits(projectId: number) {
  const res = await fetch(
    `${GITLAB_URL}/api/v4/projects/${projectId}/repository/commits?per_page=100`,
    {
      headers: {
        "PRIVATE-TOKEN": TOKEN,
      },
    }
  );
  return await res.json();
}

async function getMergeRequests(projectId: number) {
  const res = await fetch(
    `${GITLAB_URL}/api/v4/projects/${projectId}/merge_requests?state=merged&per_page=100`,
    {
      headers: {
        "PRIVATE-TOKEN": TOKEN,
      },
    }
  );
  return await res.json();
}

async function getContributionStats() {
  const projects = await getProjects();
  let totalCommits = 0;
  let totalMRs = 0;
  let totalLinesChanged = 0;
  let totalHours = 0;

  for (const project of projects) {
    const commits = await getCommits(project.id);
    const mrs = await getMergeRequests(project.id);

    totalCommits += commits.length;
    totalMRs += mrs.length;
    totalHours += commits.length * 0.83; // ≈5 min per commit

    for (const commit of commits.slice(0, 5)) {
      const diff = await fetch(
        `${GITLAB_URL}/api/v4/projects/${project.id}/repository/commits/${commit.id}/diff`,
        {
          headers: {
            "PRIVATE-TOKEN": TOKEN,
          },
        }
      );
      const diffData = await diff.json();
      totalLinesChanged += diffData.length;
    }
  }

  console.log({
    totalProjects: projects.length,
    totalCommits,
    totalMRs,
    totalLinesChanged,
    estimatedHours: totalHours.toFixed(2),
  });
}

getContributionStats().catch(console.error);
