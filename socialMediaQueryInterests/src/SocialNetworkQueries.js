/*
To implement the findPotentialInterests method in the SocialNetworkQueries class, we need to follow the requirements and constraints provided. Here's how we can structure our implementation:

    Fetch the Current User Data: Use the provided fetchCurrentUser function to get the user data.
    Handle Errors and Caching: Manage errors by caching the user data, using the last successful fetch if available, or returning an empty array if not.
    Filter Friends' Ratings: Gather and filter the ratings of the user's friends, excluding books already rated by the user.
    Compute Potential Interests: Calculate the average score of each book rated by friends and filter out those below the minimal score.
    Sort the Results: Sort the books by their average score in descending order and alphabetically by title for books with the same score.

    Fetching User Data:
        We attempt to fetch the current user data using the provided fetchCurrentUser function.
        If the fetch fails and we have cached data, we use the cached data. If there's no cached data, we return an empty array.

    Filtering and Gathering Ratings:
        We filter out books that the user has already rated.
        For each friend, we store the highest rating for each book (if a book is rated multiple times by a friend, we consider the highest score).

    Computing and Filtering Potential Interests:
        We calculate the average score for each book rated by the user's friends.
        We filter out books that have an average score below the minimal score.

    Sorting and Returning Results:
        We sort the books by their average score in descending order.
        If two books have the same average score, we sort them alphabetically by title.

This implementation should cover all the requirements and handle various edge cases as described in the problem statement.
*/
class SocialNetworkQueries {
    constructor(input) {
        this.fetchCurrentUser = input.fetchCurrentUser;
        this.cachedUser = null;
    }

    async findPotentialInterests(minimalScore = 0.5) {
        let currentUser = null;
        try {
            currentUser = await this.fetchCurrentUser();
            this.cachedUser = currentUser;
        } catch {
            if (this.cachedUser) {
                currentUser = this.cachedUser;
            } else {
                return [];
            }
        }

        if (!currentUser || !currentUser.friends || !currentUser.ratings) {
            return [];
        }

        const userRatedTitles = new Set(currentUser.ratings.map(r => r.title));

        const bookScores = {};

        for (const friend of currentUser.friends) {
            if (!friend.ratings) continue;
            const seenRatings = {};

            for (const rating of friend.ratings) {
                if (!seenRatings[rating.title] || seenRatings[rating.title] < rating.score) {
                    seenRatings[rating.title] = rating.score;
                }
            }

            for (const [title, score] of Object.entries(seenRatings)) {
                if (!userRatedTitles.has(title)) {
                    if (!bookScores[title]) {
                        bookScores[title] = { totalScore: 0, count: 0 };
                    }
                    bookScores[title].totalScore += score;
                    bookScores[title].count += 1;
                }
            }
        }

        const potentialInterests = Object.entries(bookScores)
            .map(([title, { totalScore, count }]) => ({ title, averageScore: totalScore / count }))
            .filter(({ averageScore }) => averageScore >= minimalScore)
            .sort((a, b) => b.averageScore - a.averageScore || a.title.localeCompare(b.title, "en", { sensitivity: "base" }))
            .map(({ title }) => title);

        return potentialInterests;
    }
}

export { SocialNetworkQueries };
