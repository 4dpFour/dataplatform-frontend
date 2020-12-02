import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

export default function (ComposedComponent) {
    class Authenticate extends React.Component {

        componentDidMount() {
            if (!this.props.loggedIn) {
                this.props.history.push("/");
            }
        }

        componentDidUpdate(nextProps) {
            if (!nextProps.loggedIn) {
                this.props.history.push("/");
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props}></ComposedComponent>
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            loggedIn: state.auth.loggedIn
        }
    }

    return withRouter(connect(mapStateToProps, null)(Authenticate));
}