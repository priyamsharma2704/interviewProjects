import React from "react";
import classNames from "classnames";

import "./ProposalRow.css";

const withoutEventDefault = (callback) =>
    event => {
        event.preventDefault();
        callback();
    };

const ProposalRow = ({ proposal, onStatusUpdate }) => 
{ 
    const { id, title, status, category, speaker } = proposal;
    const statusClasses = {
        "accepted": "ProposalRow--accepted",
        "rejected": "ProposalRow--rejected",
        "to be decided": "ProposalRow--neutral"
    }
    
    const statusClass = statusClasses[status] || "ProposalRow--unknown";
 
    return (
        <div data-testid={`proposal-id-${id}`} className={classNames("ProposalRow", statusClass)}>
            <div className="ProposalsRow__status_indicator"/>
            <div className="ProposalsRow__title">
                {title}
            </div>
            <div className="ProposalsRow__speaker">{speaker}</div>
            <div className="ProposalsRow__speaker"/>
            <div className="ProposalsRow__category">
                category: {category}
            </div>
            <div className="ProposalsRow__status">
                status: {status}
            </div>
            <button className="ProposalsRow__accept_button"
                onClick={withoutEventDefault(() => onStatusUpdate(id, "accepted"))}
            >
                Accept
            </button>
            <button
                className="ProposalsRow__reject_button"
                onClick={withoutEventDefault(() => onStatusUpdate(id, "rejected"))}
            >
                Reject
            </button>
        </div>
    );
};

export default ProposalRow;
