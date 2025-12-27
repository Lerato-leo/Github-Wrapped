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
 * Uses search API to find commits by date
 */
export const getRepoCommits = async (owner, repo, year) => {
  try {
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    
    const response = await api.get('/search/commits', {
      params: {
        q: `repo:${owner}/${repo} author:${owner} committer-date:${startDate}..${endDate}`,
        per_page: 100,
        sort: 'committer-date',
        order: 'asc'
      }
    });

    return response.data.items || [];
  } catch (error) {
    // If search API fails, return empty array
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
