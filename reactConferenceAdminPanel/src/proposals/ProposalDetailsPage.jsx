import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getTalk } from "./service";

import Loading from "../Loading";
import NotFound from "../NotFound";
import Page from "../Page";
import ProposalDetails from "./ProposalDetails";

import "./ProposalDetailsPage.css";

export const ProposalDetailsPage = ({ talkId }) => {
    const [isNotFound, setIsNotFound] = useState(false)
    const [talk, setTalk] = useState()

    useEffect(() => {
        getTalk(talkId).then(talk =>{
            console.log(talk);
            setTalk(talk);
            setIsNotFound(false);
        }).catch(() => setIsNotFound(true))
    }, [])

    if (isNotFound) {
        return <NotFound/>;
    }

    return (
        <Page
            className="ProposalDetailsPage"
            title={!talk ? "…" : talk.title}
        >
            <div className="ProposalDetailsPage__content">
                <div>
                    <Link
                        className="ProposalDetailsPage__back"
                        to="/proposals"
                    >
                        back to Call for Papers
                    </Link>
                </div>
                {talk?<span></span>:<Loading/>}
                <ProposalDetails talk={!talk? {}:talk}/>
            </div>
        </Page>
    );
}

export default ProposalDetailsPage;