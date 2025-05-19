import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Customer/HomePage';
import Catalog from './pages/Customer/Catalog';
import ProductDetail from './pages/Customer/ProductDetail';
import Login from './pages/Customer/Auth/Login';
import Register from './pages/Customer/Auth/Register';
import Cart from './pages/Customer/Cart';
import History from './pages/Customer/History';
import Wishlist from './pages/Customer/Wishlist';
import Account from './pages/Customer/Account';
import CustomPC from './pages/Customer/CustomPC';
import Feedback from './pages/Customer/Feedback';
import Address from './pages/Customer/Address';
import Checkout from './pages/Customer/Checkout';
import Payment from './pages/Customer/Payment';
import AdminProduct from './pages/Admin/AdminProduct';
import AdminViewProduct from './pages/Admin/AdminViewProduct';
import AddNewProduct from './pages/Admin/AddNewproduct';
import EditProduct from './pages/Admin/EditProduct';
import AdminOrder from './pages/Admin/AdminOrder';
import AdminViewOrder from './pages/Admin/AdminViewOrder';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [role, setRole] = useState(localStorage.getItem('role'));

    useEffect(() => {
        if (!role) {
            setRole(null);
        }
    }, [role]);

    return (
        <CartProvider>
            <Routes>
                {/* Customer Routes */}
                <Route path="/" element={<><NavigationBar setSearchQuery={setSearchQuery} /><HomePage /><Footer /></>} />
                <Route path="/catalog" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Catalog searchQuery={searchQuery} /><Footer /></>} />
                <Route path="/product/:id" element={<><NavigationBar setSearchQuery={setSearchQuery} /><ProductDetail /><Footer /></>} />
                <Route path="/login" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Login /><Footer /></>} />
                <Route path="/register" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Register /><Footer /></>} />
                <Route path="/cart" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Cart /><Footer /></>} />
                <Route path="/history" element={<><NavigationBar setSearchQuery={setSearchQuery} /><History /><Footer /></>} />
                <Route path="/wishlist" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Wishlist /><Footer /></>} />
                <Route path="/account" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Account /><Footer /></>} />
                <Route path="/custom" element={<><NavigationBar setSearchQuery={setSearchQuery} /><CustomPC /><Footer /></>} />
                <Route path="/feedback" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Feedback /><Footer /></>} />
                <Route path="/address-book" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Address /><Footer /></>} />
                <Route path="/checkout" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Checkout /><Footer /></>} />
                <Route path="/payment" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Payment /><Footer /></>} />

                {/* Admin Routes */}
                <Route path="/admin-login" element={<AdminLogin />} />
                {role === 'admin' && <Route path="/admin-dashboard" element={<AdminDashboard />} />}
                {role === 'admin' && <Route path="/admin-product" element={<AdminProduct />} />}
                {role === 'admin' && <Route path="/admin-view-product/:id" element={<AdminViewProduct />} />}
                {role === 'admin' && <Route path="/admin-add-product" element={<AddNewProduct />} />}
                {role === 'admin' && <Route path="/admin-edit-product/:id" element={<EditProduct />} />}
                {role === 'admin' && <Route path="/admin-orders" element={<AdminOrder />} />}
                {role === 'admin' && <Route path="/adminvieworder/:orderId" element={<AdminViewOrder />} />}
            </Routes>
        </CartProvider>
    );
};

export default App;