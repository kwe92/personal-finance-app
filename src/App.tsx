import "./app/theme/css/App.css";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import LoginView from "./features/auth/login/ui/login_view";
import SignUpView from "./features/auth/signUp/ui/sign_up_view";
import Transitions from "./app/theme/transitions";
import OverviewView from "./features/overview/overview_view";
import TransactionsView from "./features/transactions/transactions_view";
import SideNavBar from "./features/home/components/side_nav_bar";
import AuthImage from "./features/auth/shared/components/auth_image";

function App() {
  const location = useLocation();

  const [showSideNavBar, setShowSideNavBar] = useState(false);

  console.log(`location path name: ${location.pathname}`);

  useEffect(() => {
    if (location.pathname.includes("home")) {
      setShowSideNavBar(true);
    }
  });

  return (
    <div className="App">
      {!showSideNavBar && <AuthImage />}

      {showSideNavBar && <SideNavBar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              false // TODO: should useContext and some sort of AuthProvider to track is logged in state
                ? Transitions.fade(<OverviewView />)
                : Transitions.fade(<Navigate to="/auth/login" />)
            }
          />

          <Route
            path="/auth/*"
            element={Transitions.fade(<Navigate to={"/auth/login"} />)}
          />

          <Route path="/auth/login" element={Transitions.fade(<LoginView />)} />

          <Route
            path="/auth/signUp"
            element={Transitions.fade(<SignUpView />)}
          />

          {/* TODO: change path name to home  */}
          <Route
            path="/home/*"
            element={Transitions.fade(<Navigate to={"/home/Overview"} />)}
          />
          <Route
            path="/home/Overview"
            element={Transitions.fade(<OverviewView />)}
          />
          <Route
            path="/home/Transactions"
            element={Transitions.fade(<TransactionsView />)}
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

export { Transitions };
