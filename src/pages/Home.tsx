import * as React from 'react';
import '../../assets/scss/store.scss'
import {BOOKS} from '../config/constants'
import { INavigationConfig, NavigationConfig } from '../utils/navigation_config';
import { withRouter } from 'react-router';
import { utility } from '../utils';
import { connect } from 'react-redux';
import { IAppStore } from '../reducers';
import { Action, Dispatch } from 'redux';
import { app_actions } from '../actions/app_actions';

interface BookCartProps {
	Dispatch?: Dispatch<Action>;
	history?: any;
	cartData?: any;
	selectedBook?:any;
}
class Home extends React.Component<BookCartProps, any> {
	private navConfig: INavigationConfig = NavigationConfig;
	constructor(props){
		super(props)
		this.state={
			booksList:BOOKS			
		}
	 }

	 componentDidMount=()=>{
		this.props.Dispatch(app_actions.selectedBook({}));
		 console.log(this.state.booksList)
	 }
	 
	 gotoDetailsView=(book)=>{
		 console.log(book)
		this.props.Dispatch(app_actions.selectedBook(book));
		this.props.history.push(this.navConfig.Details)
	 }


	render() {
    	return (
    		<div>
			
<div className="popular center-main-block clearfix">
	<div className="top-block">
	<h1>Popular Books</h1>
	</div>

	<div className='books-block'>
		{
			this.state.booksList && this.state.booksList.length > 0 && (
				this.state.booksList.map((book,index)=>{
					return(
						<div key={index} className="book-list-item">
						<img src={book.thumbnailUrl} alt="" />
						<div className="book-list-content">
						<div className="book-list-content-tall">
							<h2>{book.title}</h2>
							<p>{book.shortDescription}</p>
						</div>
						  <div className="price-tag">
							  <span className="price">$ {book.price}</span>
							  <span className="basket" >
								  <button className='buy-btn' onClick={()=>{this.gotoDetailsView(book)}}>VIEW</button>

					  </span>
						</div>
					</div>
				</div>
					)
				})
			)
		}
  	

	</div>
	</div>
			</div>
    	);
    }
}





function mapStateToProps(store: IAppStore): { cartData: any, selectedBook:any } {
	return {
		cartData: store.App.cartData,
		selectedBook:store.App.selectedBook
	};
}
export default connect(mapStateToProps, utility.mapDispatchToProps)(withRouter(Home));