import { SocialNetworkQueries } from "../src/SocialNetworkQueries";

describe('SocialNetworkQueries', () => {
  describe("example from README", () => {

    it("should find potential interests", async () => {
      // given
      const user = {
        id: "mrouk3",
        ratings: [
          {
            title: "Moby Dick",
            score: 0.6
          },
          {
            title: "Crime and Punishment",
            score: 0.8
          }
        ],
        friends: [{
          id: "YazL",
          ratings: [
            {
              title: "Crime and Punishment",
              score: 0.8
            },
            {
              title: "Brave New World",
              score: 0.4
            }
          ],
        }, {
          id: "queen9",
          ratings: [
            {
              title: "Pride and Prejudice",
              score: 0.8
            },
            {
              title: "Crime and Punishment",
              score: 0.5
            }
          ],
        }, {
          id: "joyJoy",
          ratings: [
            {
              title: "Moby Dick",
              score: 0.2
            },
            {
              title: "Pride and Prejudice",
              score: 1
            }
          ],
        }, {
          id: "0sin5k1",
          ratings: [
            {
              title: "Pride and Prejudice",
              score: 0.8
            },
            {
              title: "Brave New World",
              score: 0.2
            }
          ],
        }, {
          id: "mariP",
          ratings: [
            {
              title: "Moby Dick",
              score: 0.8
            },
            {
              title: "Frankenstein",
              score: 0.8
            },
            {
              title: "Crime and Punishment",
              score: 0.4
            }
          ]
        }],
      };

      // when
      const potentialInterests = await new SocialNetworkQueries({
        fetchCurrentUser: () => Promise.resolve(user),
      }).findPotentialInterests(0.5);

      // then
      expect(potentialInterests).toEqual([
        "Pride and Prejudice",
        "Frankenstein",
      ]);
    });

  });
});
