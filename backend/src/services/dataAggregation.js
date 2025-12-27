import { getUserRepos, getRepoCommits, getCommitDetails, getRepoLanguages } from './githubApi.js';

/**
 * Aggregate all GitHub data for wrapped generation
 * This is the core logic that processes commit data
 */
export const aggregateUserData = async (username, year) => {
  console.log(`Aggregating data for ${username} in ${year}...`);
  
  // Fetch all repositories
  const repos = await getUserRepos(username);
  
  if (repos.length === 0) {
    return null;
  }

  // Aggregate commit data across all repositories
  const commitData = {
    daily: {}, // { YYYY-MM-DD: count }
    hourly: {}, // { hour: count } (0-23)
    weekday: {}, // { 0-6: count } (Sunday = 0)
    byRepo: {}, // { repoName: count }
    languages: {} // { language: bytes }
  };

  let totalCommits = 0;
  const allCommitDates = [];
  const repoCommitCounts = {};

  // Fetch commits from each repository
  for (const repo of repos) {
    const commits = await getRepoCommits(username, repo.name, year);
    
    if (commits.length === 0) continue;

    repoCommitCounts[repo.name] = commits.length;
    
    // Process each commit
    for (const commit of commits) {
      // Get commit timestamp
      const commitDate = new Date(commit.commit.author.date);
      
      // Daily aggregation
      const dateStr = commitDate.toISOString().split('T')[0];
      commitData.daily[dateStr] = (commitData.daily[dateStr] || 0) + 1;
      
      // Hourly aggregation
      const hour = commitDate.getUTCHours();
      commitData.hourly[hour] = (commitData.hourly[hour] || 0) + 1;
      
      // Weekday aggregation
      const weekday = commitDate.getUTCDay();
      commitData.weekday[weekday] = (commitData.weekday[weekday] || 0) + 1;
      
      // Repo aggregation
      commitData.byRepo[repo.name] = (commitData.byRepo[repo.name] || 0) + 1;
      
      totalCommits++;
      allCommitDates.push(commitDate);
    }

    // Get languages for this repo
    const languages = await getRepoLanguages(username, repo.name);
    for (const [lang, bytes] of Object.entries(languages)) {
      commitData.languages[lang] = (commitData.languages[lang] || 0) + bytes;
    }
  }

  if (totalCommits === 0) {
    return null;
  }

  // Calculate derived metrics
  const metrics = {
    totalCommits,
    activeDays: Object.keys(commitData.daily).length,
    biggestDay: calculateBiggestDay(commitData.daily),
    mostActiveHour: calculateMostActiveHour(commitData.hourly),
    mostActiveWeekday: calculateMostActiveWeekday(commitData.weekday),
    topLanguages: getTopLanguages(commitData.languages),
    topRepository: getTopRepository(repoCommitCounts),
    longestInactivePeriod: calculateLongestInactiveStreak(commitData.daily),
    personality: classifyPersonality(commitData, totalCommits),
    dayDistribution: commitData.daily,
    hourDistribution: commitData.hourly,
    weekdayDistribution: commitData.weekday,
    repositoryDistribution: commitData.byRepo
  };

  return metrics;
};

/**
 * Find the day with the most commits
 */
function calculateBiggestDay(dailyData) {
  let maxDay = null;
  let maxCount = 0;

  for (const [date, count] of Object.entries(dailyData)) {
    if (count > maxCount) {
      maxCount = count;
      maxDay = date;
    }
  }

  return {
    date: maxDay,
    count: maxCount
  };
}

/**
 * Find the hour with most commits
 */
function calculateMostActiveHour(hourlyData) {
  let maxHour = 0;
  let maxCount = 0;

  for (let hour = 0; hour < 24; hour++) {
    const count = hourlyData[hour] || 0;
    if (count > maxCount) {
      maxCount = count;
      maxHour = hour;
    }
  }

  const timeOfDay = getTimeOfDay(maxHour);
  return { hour: maxHour, timeOfDay, commits: maxCount };
}

/**
 * Determine time of day category
 */
function getTimeOfDay(hour) {
  if (hour >= 6 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 18) return 'Afternoon';
  if (hour >= 18 && hour < 24) return 'Evening';
  return 'Night';
}

/**
 * Find the most active weekday
 */
function calculateMostActiveWeekday(weekdayData) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let maxDay = 0;
  let maxCount = 0;

  for (let day = 0; day < 7; day++) {
    const count = weekdayData[day] || 0;
    if (count > maxCount) {
      maxCount = count;
      maxDay = day;
    }
  }

  return { day: maxDay, name: weekdays[maxDay], commits: maxCount };
}

/**
 * Get top programming languages
 */
function getTopLanguages(languageData) {
  const sorted = Object.entries(languageData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang, bytes]) => ({ language: lang, bytes }));

  return sorted;
}

/**
 * Get repository with most commits
 */
function getTopRepository(repoData) {
  let topRepo = null;
  let maxCount = 0;

  for (const [repo, count] of Object.entries(repoData)) {
    if (count > maxCount) {
      maxCount = count;
      topRepo = repo;
    }
  }

  return { name: topRepo, commits: maxCount };
}

/**
 * Calculate longest inactive period (days without commits)
 */
function calculateLongestInactiveStreak(dailyData) {
  const dates = Object.keys(dailyData).sort();
  
  if (dates.length === 0) return 0;

  let longestStreak = 0;
  let currentStreak = 0;
  let prevDate = null;

  for (const dateStr of dates) {
    const date = new Date(dateStr);
    
    if (prevDate) {
      const diffTime = Math.abs(date - prevDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 1) {
        currentStreak = diffDays - 1;
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      }
    }
    
    prevDate = date;
  }

  // Check inactive days at the end of year
  const lastDate = new Date(dates[dates.length - 1]);
  const yearEnd = new Date(`${lastDate.getFullYear()}-12-31`);
  const endStreak = Math.ceil((yearEnd - lastDate) / (1000 * 60 * 60 * 24));
  
  if (endStreak > longestStreak) {
    longestStreak = endStreak;
  }

  return longestStreak;
}

/**
 * Classify user personality based on coding habits
 */
function classifyPersonality(commitData, totalCommits) {
  let personality = '';
  let score = 0;

  // Night Owl Score
  const nightHours = [20, 21, 22, 23, 0, 1, 2, 3, 4, 5];
  const nightCommits = nightHours.reduce((sum, h) => sum + (commitData.hourly[h] || 0), 0);
  const nightRatio = nightCommits / totalCommits;

  if (nightRatio > 0.3) {
    personality = 'Night Owl';
  }

  // Weekend Warrior Score
  const weekendCommits = (commitData.weekday[0] || 0) + (commitData.weekday[6] || 0);
  const weekendRatio = weekendCommits / totalCommits;

  if (weekendRatio > 0.35) {
    personality = 'Weekend Warrior';
  }

  // One-Repo Loyalist
  const topRepoCommits = Math.max(...Object.values(commitData.byRepo || {}));
  const topRepoRatio = topRepoCommits / totalCommits;

  if (topRepoRatio > 0.6) {
    personality = 'One-Repo Loyalist';
  }

  // Consistent Contributor
  if (!personality) {
    const activeDays = Object.keys(commitData.daily).length;
    const dayRatio = activeDays / 365;
    
    if (dayRatio > 0.5) {
      personality = 'Consistent Contributor';
    } else {
      personality = 'Dedicated Debugger';
    }
  }

  return personality;
}

/**
 * Calculate year-over-year comparison
 */
export const calculateYearComparison = async (username, year) => {
  const currentYear = await aggregateUserData(username, year);
  const previousYear = await aggregateUserData(username, year - 1);

  if (!currentYear) {
    return null;
  }

  const comparison = {
    currentYear: year,
    previousYear: year - 1,
    currentData: currentYear,
    previousData: previousYear,
    change: {
      commits: previousYear ? currentYear.totalCommits - previousYear.totalCommits : 0,
      commitsPercent: previousYear ? 
        Math.round(((currentYear.totalCommits - previousYear.totalCommits) / previousYear.totalCommits) * 100) : 
        0,
      activeDays: previousYear ? currentYear.activeDays - previousYear.activeDays : 0,
      activeDaysPercent: previousYear ?
        Math.round(((currentYear.activeDays - previousYear.activeDays) / previousYear.activeDays) * 100) :
        0
    }
  };

  return comparison;
};
