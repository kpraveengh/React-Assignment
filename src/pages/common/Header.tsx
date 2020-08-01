import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Action, Dispatch } from 'redux';
import { utility } from "../../utils/index";
import { IAppStore } from '../../reducers/index';
import "../../../assets/scss/header.scss"
import { NavigationConfig, INavigationConfig } from '../../utils/navigation_config';


interface ILoginProps {
	Dispatch?: Dispatch<Action>;
	history?: any;
	cartData?:any;

  }

class Header extends React.Component<ILoginProps, any> {
	private navConfig: INavigationConfig = NavigationConfig
	constructor(props) {
	    super(props);
	    this.state = {
			cartLength:this.props.cartData && this.props.cartData.length > 0 ? this.props.cartData.length:0
		  };
	}

	goToPage=()=>{
console.log(this.navConfig)
	}

	render() {
    	return (
			<React.Fragment>
			<div className="nav">
			<input type="checkbox" id="nav-check" />
			<div className="nav-header">
			  <div className="nav-title">
				e-BookStore
			  </div>
			</div>
			<div className="nav-btn">
			  <label>
				<span></span>
				<span></span>
				<span></span>
			  </label>
			</div>
			
			<div className="nav-links">
			  <a href="/" >Home | </a>
			  <a href="" >My Orders | </a>
		<a href="/cart" >Cart <span className='cart-items-length'>{this.state.cartLength}</span></a>
			</div>
		  </div>
		  </React.Fragment>
		);
	}
}

function mapStateToProps(store: IAppStore): {cartData:any } {
	return {
		cartData: store.App.cartData
	};
  }
  export default connect(mapStateToProps, utility.mapDispatchToProps)(withRouter(Header));