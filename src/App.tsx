import { FC, lazy, useContext } from "react";

import { Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";

import { CartContext, UserContext } from "@/context";
import { PrivateRoute } from "@/components/auth";
import { Navbar } from "@/components";
import { Box } from "@chakra-ui/react";

// Lazy load components
const AdminNavbar = lazy(() => import("@/components/admin/Navbar"));
const LoggedUserRedirect = lazy(
  () => import("@/components/auth/LoggedUserRedirect")
);
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const LoggedUserNavbar = lazy(() => import("@/components/ui/LoggedUserNavbar"));
const ModNavbar = lazy(() => import("@/components/ui/ModNavbar"));
const Footer = lazy(() => import("@/components/Footer"));

// Public routes
const Home = lazy(() => import("@/pages/home/Home"));
const Products = lazy(() => import("@/pages/products/Products"));
const Product = lazy(() => import("@/pages/products/Product"));
const Cart = lazy(() => import("@/pages/cart/Cart"));
const Contact = lazy(() => import("@/pages/contact/Contact"));
const PrivacyPolicy = lazy(() => import("@/pages/privacyPolicy/PrivacyPolicy"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Checkout = lazy(() => import("@/pages/checkout/Checkout"));

// Normal user routes
const UserProfile = lazy(() => import("@/pages/user/UserProfile"));
const UserInformation = lazy(() => import("@/pages/user/UserInformation"));
const Security = lazy(() => import("@/pages/user/security/Security"));
const Addresses = lazy(() => import("@/pages/user/address/Addresses"));

// Admin routes
const AddProduct = lazy(() => import("@/pages/admin/addProduct/AddProduct"));
const Dashboard = lazy(() => import("@/pages/admin/dashboard/Dashboard"));
const AdminProducts = lazy(() => import("@/pages/admin/products/Products"));
const Users = lazy(() => import("@/pages/admin/users/Users"));
const Backups = lazy(() => import("@/pages/admin/backups/Backups"));
const Comentarios = lazy(() => import("@/pages/admin/comentarios/page"));

const NavbarRenderer: FC = (): JSX.Element => {
  const { user, userRole } = useContext(UserContext);

  if (user) {
    if (userRole === "admin") return <AdminNavbar isUser={user} />;
    if (userRole === "user") return <LoggedUserNavbar />;
    if (userRole === "moderator") return <ModNavbar />;
  }

  return <Navbar />;
};

export const App: FC = (): JSX.Element => {
  const { cart } = useContext(CartContext);

  const { pathname } = useLocation();

  return (
    <>
      <NavbarRenderer />
      <Box id="router">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={cart.length < 1 ? <Navigate to="/cart" /> : <Checkout />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/login" element={<LoggedUserRedirect />} />
          <Route path="/signup" element={<LoggedUserRedirect />} />

          <Route
            path="/user/profile"
            element={
              <PrivateRoute allowedRoles="user">
                <Outlet />
              </PrivateRoute>
            }
          >
            <Route
              path=":uid"
              element={
                <PrivateRoute allowedRoles="user">
                  <UserProfile />
                  <Outlet />
                </PrivateRoute>
              }
            />
            <Route path=":uid/information" element={<UserInformation />} />
            <Route path=":uid/security" element={<Security />} />
            <Route path=":uid/purchases" element={<UserInformation />} />
            <Route path=":uid/payments" element={<UserInformation />} />
            <Route path=":uid/addresses" element={<Addresses />} />
          </Route>

          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles="admin">
                <Outlet />
              </PrivateRoute>
            }
          >
            <Route
              path="backups"
              element={
                <PrivateRoute allowedRoles="admin">
                  <Backups />
                </PrivateRoute>
              }
            />
            <Route
              path="comentarios"
              element={
                <PrivateRoute allowedRoles="admin">
                  <Comentarios />
                </PrivateRoute>
              }
            />
            <Route
              path="add"
              element={
                <PrivateRoute allowedRoles="admin">
                  <AddProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <PrivateRoute allowedRoles="admin">
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="products"
              element={
                <PrivateRoute allowedRoles="admin">
                  <AdminProducts />
                </PrivateRoute>
              }
            />
            <Route
              path="products/:id"
              element={
                <PrivateRoute allowedRoles="admin">
                  <AdminProducts />
                </PrivateRoute>
              }
            />
            <Route
              path="user"
              element={
                <PrivateRoute allowedRoles="admin">
                  <Users />
                </PrivateRoute>
              }
            />

            <Route path="/admin/" element={<NotFound />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      {pathname !== "/checkout" && <WhatsAppButton />}
      {pathname !== "/login" &&
        pathname !== "/signup" &&
        pathname !== "/checkout" && <Footer />}
    </>
  );
};
