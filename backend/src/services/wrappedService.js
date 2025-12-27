import { getUser } from './githubApi.js';
import { aggregateUserData, calculateYearComparison } from './dataAggregation.js';

/**
 * Main service to generate complete wrapped data
 */
export const getWrapped = async (username, year) => {
  // Fetch user info
  const user = await getUser(username);

  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  // Aggregate data for the selected year
  const yearData = await aggregateUserData(username, year);

  if (!yearData) {
    const error = new Error(`No public commit data found for ${username} in ${year}`);
    error.status = 404;
    throw error;
  }

  // Get year comparison
  const yearComparison = await calculateYearComparison(username, year);

  // Build the complete wrapped response
  const wrapped = {
    user: {
      username: user.login,
      name: user.name || user.login,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url
    },
    year,
    generatedAt: new Date().toISOString(),
    dataSource: 'Generated from public GitHub data',
    
    // Slide data in order
    slides: {
      intro: {
        type: 'intro',
        username: user.login,
        year
      },
      
      totalCommits: {
        type: 'totalCommits',
        count: yearData.totalCommits,
        text: `You made ${yearData.totalCommits} commits this year`
      },
      
      biggestDay: {
        type: 'biggestDay',
        date: yearData.biggestDay.date,
        count: yearData.biggestDay.count,
        text: `Your biggest coding day was ${formatDate(yearData.biggestDay.date)} with ${yearData.biggestDay.count} commits`
      },
      
      codingTimeHabit: {
        type: 'codingTimeHabit',
        timeOfDay: yearData.mostActiveHour.timeOfDay,
        hour: yearData.mostActiveHour.hour,
        text: `You code most during the ${yearData.mostActiveHour.timeOfDay.toLowerCase()}`
      },
      
      mostActiveDay: {
        type: 'mostActiveDay',
        weekday: yearData.mostActiveWeekday.name,
        dayNumber: yearData.mostActiveWeekday.day,
        count: yearData.mostActiveWeekday.commits,
        text: `${yearData.mostActiveWeekday.name} was your most active day`
      },
      
      topLanguages: {
        type: 'topLanguages',
        languages: yearData.topLanguages.map(lang => ({
          name: lang.language,
          bytes: lang.bytes
        }))
      },
      
      topRepository: {
        type: 'topRepository',
        repository: yearData.topRepository.name,
        commits: yearData.topRepository.commits,
        text: `${yearData.topRepository.name} was your top repo with ${yearData.topRepository.commits} commits`
      },
      
      personality: {
        type: 'personality',
        label: yearData.personality,
        text: `You're a ${yearData.personality}`
      },
      
      longestInactive: {
        type: 'longestInactive',
        days: yearData.longestInactivePeriod,
        text: `Your longest inactive streak was ${yearData.longestInactivePeriod} days`
      },
      
      yearSummary: {
        type: 'yearSummary',
        totalCommits: yearData.totalCommits,
        topLanguage: yearData.topLanguages[0]?.language || 'Unknown',
        topRepository: yearData.topRepository.name,
        personality: yearData.personality
      },
      
      yearComparison: yearComparison ? {
        type: 'yearComparison',
        previousYear: year - 1,
        currentYear: year,
        commitChange: yearComparison.change.commits,
        commitChangePercent: yearComparison.change.commitsPercent,
        activeDaysChange: yearComparison.change.activeDays,
        activeDaysChangePercent: yearComparison.change.activeDaysPercent,
        trend: yearComparison.change.commits > 0 ? 'up' : 'down'
      } : null,
      
      shareCard: {
        type: 'shareCard',
        username: user.login,
        year,
        totalCommits: yearData.totalCommits,
        personality: yearData.personality,
        topLanguage: yearData.topLanguages[0]?.language || 'Unknown'
      }
    },

    // Raw metrics for reference
    metrics: yearData,
    
    // Comparison data
    comparison: yearComparison
  };

  return wrapped;
};

/**
 * Helper to format date
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
