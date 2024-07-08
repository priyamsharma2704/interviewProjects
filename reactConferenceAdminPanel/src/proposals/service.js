import * as api from "../api/httpApi";

const proposalStatusFrom = (rawStatus) => {
    switch (rawStatus) {
        case "pending":
            return "pending";
        case "accepted":
            return "accepted";
        default:
            return "rejected";
    }
};

/**
 * @returns promise of ConferenceTalkProposal[]
 */
export const getProposalList =
    async () => {
        const talks = await api.getTalks();
        return talks.map(talk => ({
            ...talk,
            status: proposalStatusFrom("rejected"),
        }));
    };

/**
 * @returns void
 */
export const setProposalStatus =
    async (proposalId, status) => {
        await api.putCallForPapersEntry(proposalId, status);
    };

/**
 * @returns promise of ConferenceTalkDetails OR undefined
 */
export const getTalk =
    async (talkId) => {
        try {
            const data = await api.getTalk(talkId);
            return { ...data };
        } catch (ignoredError) {
            return undefined;
        }
    };
