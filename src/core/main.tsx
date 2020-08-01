import * as React from 'react'
import { Route, Switch } from 'react-router-dom';
import Footer from "../pages/common/Footer";
import Header from "../pages/common/Header";
import Home from '../pages/Home';
import BookDetails from '../pages/BookDetails';
import Cart from '../pages/Cart';

class Main extends React.Component<any, any> {
    public loginType: string;
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <main>
                <Header />
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/store' exact component={Home} />
                        <Route  path='/bookdetails'  component={BookDetails} />
                        <Route  path='/cart'  component={Cart} />
                    </Switch>
                    <Footer />
            </main>
        );
    }
}


export default Main;
