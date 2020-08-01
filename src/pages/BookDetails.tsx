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
    cartData: any;
    selectedBook:any;
}
class BookDetails extends React.Component<BookCartProps, any> {
	private navConfig: INavigationConfig = NavigationConfig;
	constructor(props){
		super(props)
		this.state={
            booksList:BOOKS,
            selectedBook:this.props.selectedBook
        }
        if(!this.props.selectedBook.bookId){
            this.props.history.push(this.navConfig.Store)
        }
        console.log(this.props.selectedBook,'------------')
	 }

	 componentDidMount=()=>{
 

   
     }
     
	 addToCart=(book)=>{
		 let cartData=this.props.cartData && this.props.cartData.length >0 ?this.props.cartData:[]
		let isExist= cartData.find((cartBook)=>{
			 return cartBook.bookId ===book.bookId
		 })
		 if(!isExist){
			cartData.push(book)
			this.props.Dispatch(app_actions.cartData(cartData));
		 }else{
             alert('Hey, this item already added in cart')
         }
	
	 }
	 checkItemExistinCart=(book)=>{
		let cartData=this.props.cartData && this.props.cartData.length >0 ?this.props.cartData:[]
			 cartData.find((cartBook)=>{
			 return cartBook.bookId ===book.bookId
		 })
     }
     goToCart=()=>{
         this.props.history.push(this.navConfig.Checkout)
     }

	render() {
    	return (
    		<div>
			
<div className="popular center-main-block clearfix">
    {this.props.selectedBook && this.props.selectedBook.title && (
	<div className="top-block">
	<h1>{this.props.selectedBook.title}</h1>
	</div>
    )}

	<div className='books-block'>
		{
			this.props.selectedBook  && this.props.selectedBook.bookId&& (
                
						<div className="book-list-item">
						<img src={this.props.selectedBook.thumbnailUrl} alt="" />
						<div className="book-list-content">
						<div className="book-list-content-all">
							<h2>{this.props.selectedBook.title}</h2>

            <p> Author(s)      : {this.props.selectedBook.authors.toString()}</p>
                                <p> Published date : {this.props.selectedBook.publishedDate.$date}</p>
                                <p> Category       : {this.props.selectedBook.categories.toString()}</p>
							<p>{this.props.selectedBook.longDescription}</p>
						</div>
						  <div className="price-tag">
							  <span className="price">$ {this.props.selectedBook.price}</span>
							  <span className="basket" >
                              <button className='buy-btn' onClick={()=>{this.addToCart(this.props.selectedBook)}}>Add To Cart</button>
							

					  </span>
						</div>
					</div>
				</div>
					)
				
			
		}
  	

	</div>
	</div>
			</div>
    	);
    }
}





function mapStateToProps(store: IAppStore): { cartData: any,selectedBook:any } {
	return {
		cartData: store.App.cartData,
		selectedBook: store.App.selectedBook,
	};
}
export default connect(mapStateToProps, utility.mapDispatchToProps)(withRouter(BookDetails));