import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import { ToastProvider } from './components/Toast';
import { ThemeProvider, ThemeToggle } from './components/DarkMode';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import { CompareProvider, CompareBar } from './components/CompareBar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SearchPage from './pages/SearchPage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';
import DealsPage from './pages/DealsPage';
import ComparePage from './pages/ComparePage';
import WishlistPage from './pages/WishlistPage';
import AccountPage from './pages/AccountPage';
import NotFoundPage from './pages/NotFoundPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import GiftCardPage from './pages/GiftCardPage';
import TrackingPage from './pages/TrackingPage';
import SubscribeSavePage from './pages/SubscribeSavePage';
import SellPage from './pages/SellPage';
import RewardsPage from './pages/RewardsPage';
import ReferralPage from './pages/ReferralPage';

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <BackToTop />
      <ThemeToggle />
      <KeyboardShortcuts />
      <CompareBar />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CompareProvider>
          <ToastProvider>
          <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
            <Routes>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<Layout />}>
                {/* Core Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/orders" element={<OrdersPage />} />

                {/* Feature Pages */}
                <Route path="/deals" element={<DealsPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/tracking" element={<TrackingPage />} />
                <Route path="/subscribe-save" element={<SubscribeSavePage />} />

                {/* Info Pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/gift-cards" element={<GiftCardPage />} />
                <Route path="/sell" element={<SellPage />} />
                <Route path="/rewards" element={<RewardsPage />} />
                <Route path="/refer" element={<ReferralPage />} />

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </div>
          </ToastProvider>
        </CompareProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
