import React, { useEffect, useState } from "react";

import { getProposalList, setProposalStatus } from "./service";

import Loading from "../Loading";
import Page from "../Page";
import ProposalList from "./ProposalList";

export const ProposalListPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [proposals, setProposals] = useState([])

    useEffect(() => {
        getProposalList().then(proposals => {
            setProposals(proposals);
        });
    }, []);

    const updateProposalStatus = (id, status) => {
        setProposals((previousProposals) => {
            return previousProposals.map(proposal =>
                proposal.id === id ? { ...proposal, status } : proposal,
            );
        });
        setProposalStatus(id, status);
    };

    return (
        <Page title="Call for Papers">
            <Loading/>
            <ProposalList
                proposals={proposals}
                onProposalStatusUpdate={() => {}}
            />
        </Page>
    );
}

export default ProposalListPage;
