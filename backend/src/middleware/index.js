/**
 * Validate GitHub username format
 */
export const validateUsername = (req, res, next) => {
  const { username } = req.params;
  
  // GitHub username rules: alphanumeric, hyphens, max 39 chars
  const usernameRegex = /^[a-zA-Z0-9-]{1,39}$/;
  
  if (!username || !usernameRegex.test(username)) {
    return res.status(400).json({
      error: 'Invalid GitHub username format'
    });
  }
  
  next();
};

/**
 * Error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  // GitHub API errors
  if (err.response?.status === 404) {
    return res.status(404).json({
      error: 'GitHub user not found'
    });
  }
  
  if (err.response?.status === 403) {
    return res.status(429).json({
      error: 'GitHub API rate limit exceeded. Please add a GITHUB_TOKEN to backend/.env for higher limits (5000 requests/hour instead of 60).'
    });
  }
  
  if (err.response?.status === 422) {
    return res.status(400).json({
      error: 'Invalid GitHub username'
    });
  }
  
  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
};
