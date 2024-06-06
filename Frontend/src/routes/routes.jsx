import { Navigate, createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/customer/Home/HomePage';
import CustomerLayout from '../layouts/customer/CustomerLayout';
import ErrorPage from '../command/ErrorPage';
import Login from '../command/Login/Login';
import Register from '../command/Register/Register';
import AdminLayout from '../layouts/admin/AdminLayout';
// import Product from '../components/AdminContent/Product/Product';
import ProductDetails from '../pages/customer/Product/ProductDetailsPage';
import ProductComments from '../pages/customer/Product/ProductCommentsPage';
import CategoryPage from '../pages/customer/Category/CategoryPage';
import PromotionPage from '../pages/customer/Promotion/PromotionPage';
import ContactPage from '../pages/customer/Contact/ContactPage';
import AddressDetails from '../command/Register/AddressDetails';
import HomePageAdmin from '../pages/admin/Home/HomePageAdmin';
// import DashboardAdmin from '../components/AdminContent/Dashboard/Dashboard';
import UserProfilePage from '../pages/customer/UserProfile/UserProfilePage'
import CartPage from '../pages/customer/Cart/CartPage';
import WishlistPage from '../pages/customer/Wishlist/WishlistPage';
import CheckoutPage from '../pages/customer/Checkout/CheckoutPage';
import OrderHistoryPage from '../pages/customer/Order/OrderHistoryPage';
import OrderDetailPage from '../pages/customer/Order/OrderDetailPage';
import PaymentModal from '../components/Payment/PaymentModal';
// import Order from '../components/AdminContent/Order/Order';
import BuyNowPage from '../pages/customer/Checkout/BuyNowPage';
import { useAuth } from '../contexts/AuthContext';

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const AdminRoute = ({ element }) => {
  const { authToken, userRole } = useAuth();

  if (authToken != null && userRole !== 'Admin') {
    return <Navigate to="/" />;
  }
  return element;
};

const route = createBrowserRouter([
  {
    // Route untuk halaman awal aplikasi (customer)
    path: '/',
    element: <CustomerLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "detail-produk/:id", element: <ProductDetails /> },
      { path: "ulasan/:id/", element: <ProductComments /> },
      { path: "kategori", element: <CategoryPage /> },
      { path: "kategori/:id", element: <CategoryPage /> },
      { path: "promo", element: <PromotionPage /> },
      { path: "kontak", element: <ContactPage /> },
      { path: "detail-alamat", element: <AddressDetails /> },
      { path: "profil", element: <UserProfilePage /> },
      { path: "keranjang", element: <CartPage /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: `beli-sekarang/:id`, element: <BuyNowPage /> },
      { path: "histori-pesanan", element: <OrderHistoryPage /> },
      { path: "histori-pesanan/:id", element: <OrderDetailPage /> },
      { path: "pembayaran", element: <PaymentModal /> },
    ]
  },
  {
    // Route untuk halaman admin
    path: '/admin',
    element: <AdminRoute element={<AdminLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePageAdmin /> },
      { path: 'admin', element: <HomePageAdmin /> },
      // { path: 'dashboard', element: <DashboardAdmin /> },
      // { path: 'produk', element: <Product /> },
      // { path: 'pesanan', element: <Order /> }
    ]
  },
  // Route untuk halaman login dan register
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> }
]);

export default route;