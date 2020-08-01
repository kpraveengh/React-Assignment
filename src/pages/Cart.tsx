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
}
class Cart extends React.Component<BookCartProps, any> {
	private navConfig: INavigationConfig = NavigationConfig;
	constructor(props){
		super(props)
		this.state={
            booksList:BOOKS,
            itemTotal:0,
            taxAmount:0,
            totalBill:0,
            shippingCharges:50,
            cartData:[]
        }
        let cartItems=this.props.cartData
        if(cartItems && cartItems.length <=0){
            this.props.history.push(this.navConfig.Store)
        }
	 }

	 componentDidMount=()=>{
         
        this.props.Dispatch(app_actions.selectedBook({}));
        this.getPaymentInfo();
     }
     

     goToCart=()=>{
         this.props.history.push(this.navConfig.Checkout)
     }
     getPaymentInfo=()=>{
         let cartItems=this.props.cartData
        if (cartItems && cartItems.length > 0) {
			let subTotal = 0.00;
			cartItems.forEach((cartItem) => {
				subTotal +=  parseFloat(cartItem.price)
            });
            let taxAmount=subTotal*(18/100);
            let totalBill=taxAmount+subTotal+this.state.shippingCharges
			this.setState({ itemTotal: subTotal,taxAmount:taxAmount,totalBill:totalBill })
		}
     }
     removeBook=(book)=>{
        let cartItems=this.props.cartData
        let findItemIndex = cartItems.findIndex(item => item.bookId === book.bookId)
        cartItems.splice(findItemIndex, 1);
        this.props.Dispatch(app_actions.cartData(cartItems));
     }
	render() {
    	return (
    		<div>
			
<div className="popular center-main-block clearfix">
	<div className="top-block">
	<h1>{'CART ITEMS'}</h1>
	</div>
    <div className='cart-books-block'>
    <div className='cart-books-block w-50 address-form'>
     
    <form action="#">
    <h3>Shipping Address</h3>
            <div className="area-name input-container">
                <label >Area or Colony Name</label>
                <input type="text" name="area-name" id="area-name"  placeholder="Area Name" />
            </div>
            <div className="city-name input-container">
                <label >City  Name</label>
                <input type="text" name="city-name" id="city-name"  placeholder="City Name" />
            </div>
            <div className="landmark-name input-container">
                <label >Landmark</label>
                <input type="text" name="landmark-name" id="landmark-name"  placeholder="Landmark" />
            </div>
            <button className='buy-btn'>Save Address</button>
							

        </form>
        </div>
<div className=' w-50'>

		{
			this.props.cartData && this.props.cartData.length > 0 && (
				this.props.cartData.map((book,index)=>{
					return(
						<div key={index} className="book-list-item w-100">
						<img src={book.thumbnailUrl} alt="" />
						<div className="book-list-content">
						<div className="book-list-content-tall">
							<h2>{book.title}</h2>
							<p>{book.shortDescription}</p>
						</div>
						  <div className="price-tag">
							  <span className="price">$ {book.price}</span>
							  <span className="basket" >
                              <button className='buy-btn' onClick={()=>{this.removeBook(book)}}>Remove Book</button>
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
    <div className='payment-block'>
          <h2>Payment Info</h2>
    <p><span>Items Price    : </span><span> {this.state.itemTotal}</span> </p>
    <p><span>Tax    :</span><span> {this.state.taxAmount}</span>  </p>
    <p><span>Shipping Charges    : </span><span>{this.state.shippingCharges}</span>  </p>
    <hr />
    <p><span>Total Bill       : </span><span>{this.state.totalBill}</span> </p>

      </div>
	</div>

			</div>
    	);
    }
}





function mapStateToProps(store: IAppStore): { cartData: any } {
	return {
		cartData: store.App.cartData
	};
}
export default connect(mapStateToProps, utility.mapDispatchToProps)(withRouter(Cart));