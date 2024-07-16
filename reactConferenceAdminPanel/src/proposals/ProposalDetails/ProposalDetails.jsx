import React from "react";

import DetailsSection from "../DetailsSection";

import "./ProposalDetails.css";

const ProposalDetails = ({ talk }) => {
    const {speaker, description, category} = talk;
    console.log(speaker);
    return (
        <div data-testid="proposal-details" className="ProposalDetails">
            <DetailsSection
                className="ProposalDetails__speaker"
                name={speaker}
            >
            </DetailsSection>

            <DetailsSection
                className="ProposalDetails__category"
                name={category}
            >
            </DetailsSection>
            
            <DetailsSection
                className="ProposalDetails__description"
                name={description}
            >
            </DetailsSection>
        </div>
    );
};

export default ProposalDetails;
