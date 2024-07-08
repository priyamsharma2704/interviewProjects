import { SocialNetworkQueries } from "../src/SocialNetworkQueries";

const anyError = () => Error("any error");

const resolved = (value) => Promise.resolve(value);

const rejected = (error) => Promise.reject(error);

const includeAllMinimalScore = () => 0;

const aLittleBitAbove = (minimalScore) => minimalScore + 0.01;

const aLittleBitBelow = (minimalScore) => minimalScore - 0.01;

const anyMinimalScore = 0.5;

describe("SocialNetworkQueries", () => {

    let friendsQueries;
    let fetchCurrentUser;

    beforeEach(() => {
        let mockedUserPromise;
        fetchCurrentUser = () => mockedUserPromise;
        fetchCurrentUser.willReturn = (userPromise) => {
            mockedUserPromise = userPromise;
        };
        friendsQueries = new SocialNetworkQueries({ fetchCurrentUser });
    });

    describe("potential book interests", () => {

        it("should find no potential interests if current user has no friends", async () => {
            // given
            const user = {
                ratings: [],
                friends: [],
            };
            fetchCurrentUser.willReturn(resolved(user));

            // when
            const potentialInterests = await friendsQueries.findPotentialInterests(includeAllMinimalScore());

            // then
            expect(potentialInterests).toBeDefined();
            expect(potentialInterests.length).toEqual(0);
        });

        it("should find no potential interests if user's friends rate no books", async () => {
            // given
            const user = {
                ratings: [],
                friends: [{
                    id: "friend1",
                    ratings: [],
                }],
            };
            fetchCurrentUser.willReturn(resolved(user));

            // when
            const potentialInterests = await friendsQueries.findPotentialInterests(includeAllMinimalScore());

            // then
            expect(potentialInterests).toBeDefined();
            expect(potentialInterests.length).toEqual(0);
        });

        it("potential interests should include books rated by friends", async () => {
            // given
            const user = {
                ratings: [],
                friends: [{
                    id: "friend1",
                    ratings: [{
                      title: "Gone with the Wind",
                      score: 0.8
                    }],
                }, {
                    id: "friend2",
                    ratings: [{
                      title: "One Hundred Years of Solitude",
                      score: 0.6
                    }],
                }],
            };
            fetchCurrentUser.willReturn(resolved(user));

            // when
            const potentialInterests = await friendsQueries.findPotentialInterests(includeAllMinimalScore());

            // then
            expect(potentialInterests).toBeDefined();
            expect(potentialInterests.length).toEqual(2);
            expect(potentialInterests).toContain("Gone with the Wind");
            expect(potentialInterests).toContain("One Hundred Years of Solitude");
        });

        it("potential interests should include only books rated by friends above a minimal score", async () => {
            // given
            const user = {
                ratings: [],
                friends: [{
                    id: "friend1",
                    ratings: [
                      {
                        title: "A Tale of Two Cities",
                        score: 0.9
                      },
                    ]
                }, {
                    id: "friend2",
                    ratings: [
                      {
                        title: "A Tale of Two Cities",
                        score: 0.6
                      },
                      {
                        title: "Harry Potter and the Prisoner of Azkaban",
                        score: 0.5
                      }
                    ]
                }, {
                    id: "friend3",
                    ratings: [
                      {
                        title: "A Tale of Two Cities",
                        score: 0.8
                      },
                      {
                        title: "Harry Potter and the Prisoner of Azkaban",
                        score: 0.6
                      },
                      {
                        title: "The Lord of the Rings",
                        score: 0.8
                      },
                    ]
                }],
            };
            fetchCurrentUser.willReturn(resolved(user));

            // when
            const potentialInterests = await friendsQueries.findPotentialInterests(aLittleBitAbove(2 / 3));

            // then
            expect(potentialInterests).toBeDefined();
            expect(potentialInterests.length).toEqual(2);
            expect(potentialInterests).toContain("A Tale of Two Cities");
            expect(potentialInterests).not.toContain("Harry Potter and the Prisoner of Azkaban");
            expect(potentialInterests).toContain("The Lord of the Rings");
        });

        it("potential interests should not include books already rated by user", async () => {
            // given
            const user = {
                ratings: [{
                    title: "Harry Potter and the Prisoner of Azkaban",
                    score: 0.8
                }],
                friends: [{
                    id: "friend1",
                    ratings: [{
                      title: "A Tale of Two Cities",
                      score: 0.8
                    }],
                }, {
                    id: "friend2",
                    ratings: [{
                      title: "Harry Potter and the Prisoner of Azkaban",
                      score: 0.6
                    }],
                }],
            };
            fetchCurrentUser.willReturn(resolved(user));

            // when
            const potentialInterests = await friendsQueries.findPotentialInterests(includeAllMinimalScore());

            // then
            expect(potentialInterests).toBeDefined();
            expect(potentialInterests.length).toEqual(1);
            expect(potentialInterests).toContain("A Tale of Two Cities");
            expect(potentialInterests).not.toContain("Harry Potter and the Prisoner of Azkaban");
        });

        it("potential interests should be ordered by popularity among friends (score)", async () => {
            // given
            const user = {
                ratings: [],
                friends: [{
                    id: "friend1",
                    ratings: [
                      {
                        title: "A-Like Title",
                        score: 0.9
                      },
                      {
                        title: "B-Like Title",
                        score: 0.6
                      },
                      {
                        title: "C-Like Title",
                        score: 0.8
                      },
                    ],
                }, {
                    id: "friend2",
                    ratings: [
                      {
                        title: "A-Like Title",
                        score: 0.8
                      },
                      {
                        title: "B-Like Title",
                        score: 0.6
                      },
                    ],
                }, {
                    id: "friend3",
                    ratings: [
                      {
                        title: "B-Like Title",
                        score: 0.8
                      },
                    ],
                }],
            };
            fetchCurrentUser.willReturn(resolved(user));

            // when
            const potentialInterests = await friendsQueries.findPotentialInterests(includeAllMinimalScore());

            // then
            expect(potentialInterests).toBeDefined();
            expect(potentialInterests).toEqual([
              "A-Like Title",
              "C-Like Title",
              "B-Like Title",
            ]);
        });

        it("potential interests of same popularity (score) should be ordered by title", async () => {
            // given
            const user = {
                ratings: [],
                friends: [{
                    id: "friend1",
                    ratings: [
                      {
                        title: "The Lord of the Rings",
                        score: 0.8
                      },
                      {
                        title: "Gone with the Wind",
                        score: 0.6
                      },
                      {
                        title: "One Hundred Years of Solitude",
                        score: 0.4
                      },
                    ],
                }, {
                    id: "friend2",
                    ratings: [
                      {
                        title: "One Hundred Years of Solitude",
                        score: 0.8
                      },
                      {
                        title: "Gone with the Wind",
                        score: 0.6
                      },
                      {
                        title: "The Lord of the Rings",
                        score: 0.4
                      },
                    ],
                }],
            };
            fetchCurrentUser.willReturn(resolved(user));

            // when
            const potentialInterests = await friendsQueries.findPotentialInterests(includeAllMinimalScore());

            // then
            expect(potentialInterests).toBeDefined();
            expect(potentialInterests).toEqual([
                "One Hundred Years of Solitude",
                "The Lord of the Rings",
                "Gone with the Wind",
            ]);
        });

    });

    describe("fetch failure", () => {

        it("should return no matches if user fetch failed", async () => {
            // given
            fetchCurrentUser.willReturn(rejected(anyError()));

            // when
            const potentialInterests = await friendsQueries.findPotentialInterests(anyMinimalScore);

            // then
            expect(potentialInterests).toEqual([]);
        });

        it("if possible should use previously fetched user if current user fetch failed (changed minimal score)", async () => {
            // given
            const user = {
                ratings: [],
                friends: [{
                    id: "friend1",
                    ratings: [
                      {
                        title: "More Popular Book",
                        score: 0.8
                      },
                      {
                        title: "Less Popular Book",
                        score: 1 / 3
                      },
                    ],
                }, {
                    id: "friend2",
                    ratings: [{
                      title: "More Popular Book",
                      score: 0.8
                    }],
                }, {
                    id: "friend3",
                    ratings: [],
                }],
            };
            fetchCurrentUser.willReturn(resolved(user));
            await friendsQueries.findPotentialInterests(anyMinimalScore);

            // when
            fetchCurrentUser.willReturn(rejected(anyError()));
            const potentialInterests1 = await friendsQueries.findPotentialInterests(aLittleBitAbove(1 / 3));

            // then
            expect(potentialInterests1).toEqual(["More Popular Book"]);

            // and when
            fetchCurrentUser.willReturn(rejected(anyError()));
            const potentialInterests2 = await friendsQueries.findPotentialInterests(aLittleBitBelow(1 / 3));

            // then
            expect(potentialInterests2).toEqual(["More Popular Book", "Less Popular Book"]);
        });
    });

    describe("invalid data", () => {

        it("should find no potential interests if current user has no 'friends' field", async () => {
            // given
            const user = {
                ratings: [],
                // no 'friends' field
            };
            fetchCurrentUser.willReturn(resolved(user));

            // when
            const potentialInterests = await friendsQueries.findPotentialInterests(includeAllMinimalScore());

            // then
            expect(potentialInterests).toEqual([]);
        });

        it("should not fail if some friend has no 'ratings' field", async () => {
            // given
            const user = {
                ratings: ["Book2"],
                friends: [{
                    id: "friendWithRatings",
                    ratings: [{
                      title: "Book1",
                      score: 0.8
                    }],
                }, {
                    id: "friendWithoutRatings",
                    // no 'ratings' field
                }],
            };
            fetchCurrentUser.willReturn(resolved(user));

            // when
            const potentialInterests = await friendsQueries.findPotentialInterests(includeAllMinimalScore());

            // then
            expect(potentialInterests).toEqual(["Book1"]);
        });

        it("should filter out duplicated books of same friend", async () => {
            // given
            const user = {
                ratings: [],
                friends: [{
                    id: "friend1",
                    ratings: [
                      {
                        title: "BookScoredAboveMinimal",
                        score: 0.8
                      },
                      {
                        title: "BookScoredAboveMinimal",
                        score: 0.6
                      },
                      {
                        title: "BookScoredAboveMinimal",
                        score: 0.4
                      },
                    ],
                }, {
                    id: "friend2",
                    ratings: [
                      {
                        title: "BookScoredAboveMinimal",
                        score: 0.6
                      }
                    ],
                }],
            };
            fetchCurrentUser.willReturn(resolved(user));

            // when
            const potentialInterests = await friendsQueries.findPotentialInterests(aLittleBitAbove(1 / 2));

            // then
            expect(potentialInterests).toEqual(["BookScoredAboveMinimal"]);
        });
    });

});