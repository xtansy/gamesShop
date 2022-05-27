import { Header, BurgerMenu } from './components';
import { Home, Cart } from './Pages';
import {
    Routes,
    Route,
    Link
} from "react-router-dom";

function App() {
    return (
        <div className="wrapper">
        <BurgerMenu/>
        <Header/>
        <div className="content">
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/cart' element={<Cart />}/>
            </Routes>
        </div>
    </div>
    );
}

export default App;
