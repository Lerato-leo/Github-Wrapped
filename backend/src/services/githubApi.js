import axios from 'axios';

const API_URL = process.env.GITHUB_API_URL || 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Create axios instance with GitHub API configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
  }
});

/**
 * Fetch GitHub user information
 */
export const getUser = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

/**
 * Fetch all public repositories for a user with pagination
 */
export const getUserRepos = async (username) => {
  let repos = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await api.get(`/users/${username}/repos`, {
      params: {
        type: 'owner',
        per_page: 100,
        page,
        sort: 'updated'
      }
    });

    repos = repos.concat(response.data);
    hasMore = response.data.length === 100;
    page++;
  }

  return repos;
};

/**
 * Get all commits for a specific repository in a year
 * Fetches commits with pagination, no token required
 */
export const getRepoCommits = async (owner, repo, year) => {
  try {
    let commits = [];
    let page = 1;
    let hasMore = true;
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);
    endDate.setHours(23, 59, 59, 999);

    // Fetch commits with pagination
    while (hasMore) {
      const response = await api.get(`/repos/${owner}/${repo}/commits`, {
        params: {
          per_page: 100,
          page,
          sha: 'HEAD'
        }
      });

      if (response.data.length === 0) {
        hasMore = false;
        continue;
      }

      // Filter commits by year
      const yearCommits = response.data.filter(commit => {
        const commitDate = new Date(commit.commit.author.date);
        return commitDate >= startDate && commitDate <= endDate;
      });

      commits = commits.concat(yearCommits);

      // Stop if we've passed the year
      const oldestCommitDate = new Date(response.data[response.data.length - 1].commit.author.date);
      if (oldestCommitDate < startDate) {
        hasMore = false;
      } else {
        page++;
      }
    }

    return commits;
  } catch (error) {
    // If API fails, return empty array
    console.log(`Could not fetch commits for ${owner}/${repo}`);
    return [];
  }
};

/**
 * Get commit details including timestamp
 */
export const getCommitDetails = async (owner, repo, sha) => {
  try {
    const response = await api.get(`/repos/${owner}/${repo}/commits/${sha}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

/**
 * Get repository languages
 */
export const getRepoLanguages = async (owner, repo) => {
  try {
    const response = await api.get(`/repos/${owner}/${repo}/languages`);
    return response.data;
  } catch (error) {
    return {};
  }
};
