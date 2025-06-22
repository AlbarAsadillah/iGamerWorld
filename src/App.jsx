import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './theme.css'; // Mengimpor file CSS
import './typography.css';
import './styles/GlobalPoppins.css'; // Import global Poppins font CSS
import './styles/AntDesignPoppins.css'; // Import Ant Design Poppins override CSS
import './styles/BootstrapPoppins.css'; // Import Bootstrap Poppins override CSS
import './styles/CustomerPages.css'; // Import customer pages styling

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/Customer/HomePage';
import Catalog from './pages/Customer/Catalog';
import ProductDetail from './pages/Customer/ProductDetail';
import Login from './pages/Customer/Auth/Login';
import Register from './pages/Customer/Auth/Register';
import ForgotPassword from './pages/Customer/Auth/ForgotPassword';
import CreateNewPassword from './pages/Customer/Auth/CreateNewPassword';
import Pengaduan from './pages/Customer/Pengaduan';
import Cart from './pages/Customer/Cart';
import History from './pages/Customer/History';
import Wishlist from './pages/Customer/Wishlist';
import Account from './pages/Customer/Account';
import CustomPC from './pages/Customer/CustomPC';
import Feedback from './pages/Customer/Feedback';
import Complaint from './pages/Customer/Complaint';
import Address from './pages/Customer/Address';
import Checkout from './pages/Customer/Checkout';
import CheckoutCustom from './pages/Customer/Component/CheckoutCustom';
import Payment from './pages/Customer/Payment';
import PaymentCustom from './pages/Customer/Component/PaymentCustom';

import AdminProduct from './pages/Admin/AdminProduct';
import AdminViewProduct from './pages/Admin/AdminViewProduct';
import AddNewProduct from './pages/Admin/AddNewproduct';
import EditProduct from './pages/Admin/EditProduct';
import AdminOrder from './pages/Admin/AdminOrder';
import AdminViewOrder from './pages/Admin/AdminViewOrder';
import AdminEditOrder from './pages/Admin/AdminEditOrder';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import OrderDetail from './pages/Customer/OrderDetail';
import AdminFeedback from './pages/Admin/AdminFeedback';
import AdminComplaint from './pages/Admin/AdminComplaint';
import AdminAccount from './pages/Admin/AdminAccount';
// import AdminAccess from './pages/Admin/AdminAccess';                 // Import AdminAccess

import ComponentsCPU from './pages/Customer/Component/ComponentsCPU';
import Summary from './pages/Customer/Summary';
import ReviewProduct from './pages/Customer/ReviewProduct';
import AdminCustomPC from './pages/Admin/AdminCustomPc';
import AdminViewCustom from './pages/Admin/AdminViewCustom';
import AdminEditCustom from './pages/Admin/AdminEditCustom';

import SuperAdminDashboard from './pages/Admin-Super/SuperAdminDashboard';
import SuperAdminProduct from './pages/Admin-Super/SuperAdminProduct';
import SuperAdminViewProduct from './pages/Admin-Super/SuperAdminViewProduct';
import SuperAdminOrder from './pages/Admin-Super/SuperAdminOrder';
import SuperAdminViewOrder from './pages/Admin-Super/SuperAdminViewOrder';
import SuperAdminCustomPC from './pages/Admin-Super/SuperAdminCustom';
import SuperAdminViewCustom from './pages/Admin-Super/SuperAdminViewCustom';
import SuperAdminFeedback from './pages/Admin-Super/SuperAdminFeedback';
import SuperAdminComplaint from './pages/Admin-Super/SuperAdminComplaint';
import SuperAdminAccount from './pages/Admin-Super/SuperAdminAccount';
import SuperAdminForgotPassword from './pages/Admin-Super/SuperAdminForgotPassword';
import SuperAdminCreateNewPassword from './pages/Admin-Super/SuperAdminCreateNewPassword';
import AdminAccess from './pages/Admin-Super/SuperAdminAccess'; // Import SuperAdminAccess
import SuperAdminWebSettings from './pages/Admin-Super/SuperAdminWebSettings'; // Import SuperAdminWebSettings
import AdminProductReview from './pages/Admin/AdminProductReview';
import SuperAdminProductReview from './pages/Admin-Super/SuperAdminProductReview';

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
      <WishlistProvider>
        <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<><NavigationBar setSearchQuery={setSearchQuery} /><HomePage /><Footer /></>} />
        <Route path="/catalog" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Catalog searchQuery={searchQuery} /><Footer /></>} />
        <Route path="/product/:id" element={<><NavigationBar setSearchQuery={setSearchQuery} /><ProductDetail /><Footer /></>} />
        <Route path="/login" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Login /><Footer /></>} />
        <Route path="/register" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Register /><Footer /></>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-new-password" element={<CreateNewPassword />} />
        <Route path="/reset-password/:token" element={<CreateNewPassword />} />
        <Route path="/pengaduan" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Pengaduan /><Footer /></>} />
        <Route path="/complaint" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Complaint /><Footer /></>} />
        <Route path="/cart" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Cart /><Footer /></>} />
        <Route path="/history" element={<><NavigationBar setSearchQuery={setSearchQuery} /><History /><Footer /></>} />
        <Route path="/wishlist" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Wishlist /><Footer /></>} />
        <Route path="/account" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Account /><Footer /></>} />
        <Route path="/custom" element={<><NavigationBar setSearchQuery={setSearchQuery} /><CustomPC /><Footer /></>} />
        <Route path="/feedback" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Feedback /><Footer /></>} />
        <Route path="/address-book" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Address /><Footer /></>} />

        <Route path="/checkout" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Checkout /><Footer /></>} />
        <Route path="/checkoutcustom" element={<><NavigationBar setSearchQuery={setSearchQuery} /><CheckoutCustom /><Footer /></>} />
        <Route path="/payment" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Payment /><Footer /></>} />
        <Route path="/paymentcustom" element={<><NavigationBar setSearchQuery={setSearchQuery} /><PaymentCustom /><Footer /></>} />

        <Route path="/order-detail" element={<><NavigationBar setSearchQuery={setSearchQuery} /><OrderDetail /><Footer /></>} />
        <Route path="/components/cpu" element={<><NavigationBar setSearchQuery={setSearchQuery} /><ComponentsCPU /><Footer /></>} />
        <Route path="/summary" element={<><NavigationBar setSearchQuery={setSearchQuery} /><Summary /><Footer /></>} />
        <Route path="/review-product" element={<><NavigationBar setSearchQuery={setSearchQuery} /><ReviewProduct /><Footer /></>} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/superadmin-forgot-password" element={<SuperAdminForgotPassword />} />
        <Route path="/superadmin-create-new-password" element={<SuperAdminCreateNewPassword />} />
        <Route path="/superadmin-reset-password/:token" element={<SuperAdminCreateNewPassword />} />
        {role === 'admin' && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-product" element={<AdminProduct />} />
            <Route path="/admin-view-product/:id" element={<AdminViewProduct />} />
            <Route path="/admin-add-product" element={<AddNewProduct />} />
            <Route path="/admin-edit-product/:id" element={<EditProduct />} />
            <Route path="/admin-orders" element={<AdminOrder />} />
            <Route path="/adminvieworder/:orderId" element={<AdminViewOrder />} />
            <Route path="/admineditorder/:orderId" element={<AdminEditOrder />} />
            <Route path="/admin-feedback" element={<AdminFeedback />} />
            <Route path="/admin-complaint" element={<AdminComplaint />} />
            <Route path="/admin-account" element={<AdminAccount />} />
            <Route path="/admin-custom-pc" element={<AdminCustomPC />} />
            <Route path="/adminviewcustom/:orderId" element={<AdminViewCustom />} />
            <Route path="/admineditcustom/:orderId" element={<AdminEditCustom />} />
            <Route path="/admin-product-review/:productId" element={<AdminProductReview />} />
          </>
        )}

        {/* Super Admin Routes */}
        {role === 'superadmin' && (
          <>
            <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
            <Route path="/superadmin-product" element={<SuperAdminProduct />} />
            <Route path="/superadmin-view-product/:id" element={<SuperAdminViewProduct />} />
            <Route path="/superadmin-orders" element={<SuperAdminOrder />} />
            <Route path="/superadminvieworder/:orderId" element={<SuperAdminViewOrder />} />
            <Route path="/superadmin-custom-pc" element={<SuperAdminCustomPC />} />
            <Route path="/superadminviewcustom/:orderId" element={<SuperAdminViewCustom />} />
            <Route path="/superadmin-feedback" element={<SuperAdminFeedback />} />
            <Route path="/superadmin-complaint" element={<SuperAdminComplaint />} />
            <Route path="/superadmin-account" element={<SuperAdminAccount />} />
            <Route path="/superadmin-admin" element={<AdminAccess />} />
            <Route path="/superadmin-web-settings" element={<SuperAdminWebSettings />} />
            <Route path="/superadmin-product-review/:productId" element={<SuperAdminProductReview />} />
          </>
        )}
        </Routes>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
