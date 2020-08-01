import * as React from "react";
import { utility } from "../utils";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Dispatch, Action } from "redux";
import { IAppStore } from "../reducers";
import '../../assets/scss/loader'
const loaderLogo = require('./../../assets/images/loader.gif').default
interface ILoaderProps {
    Dispath: Dispatch<Action>,
    history: any,
    loaderCounter: number
}
interface ILoaderState {

}
class Loader extends React.Component<ILoaderProps, ILoaderState>{
    constructor(props: any) {
        super(props)
        console.log(this.props.loaderCounter ,'---loader ---')
    }
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <div >
                    {this.props.loaderCounter >= 1 &&
                        <div className="loader">
                            <img src={loaderLogo}></img>
                        </div>}
                </div>
            </React.Fragment>
        )
    }
}
function mapStateToProps(state: IAppStore): { loaderCounter: number } {
    return {
        loaderCounter: state.App.ActiveHTTPRequests
    }
}
export default connect(mapStateToProps, utility.mapDispatchToProps)(withRouter(Loader));
