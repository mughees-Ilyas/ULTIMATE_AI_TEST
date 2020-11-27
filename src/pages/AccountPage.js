import React from "react";
import { Heading } from "../styled/Heading";
import {connect} from "react-redux";
import { Page } from "../styled/Page";


function AccountPage({dispatch}) {


            return (
            <div>
                <Page>
                    <Heading>Accounts Settings</Heading>
                </Page>
            </div>
        );
}

const mapStateToProps = (state, ownProps) => {
    return {...ownProps}
};

export default connect(mapStateToProps)(AccountPage);