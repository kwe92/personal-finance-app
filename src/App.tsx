import "./app/theme/css/App.css";
import React from "react";
import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import LoginView from "./features/auth/login/ui/login_view";
import SignUpView from "./features/auth/signUp/ui/sign_up_view";
import Transitions from "./app/theme/transitions";
import HomeView from "./features/home/home_view";
import OverviewView from "./features/overview/overview_view";
import TransactionsView from "./features/transactions/transactions_view";
import SideNavBar from "./features/home/components/side_nav_bar";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {/* <SideNavBar /> */}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* <Route path="/" element={Transitions.fade(<LoginView />)} />
          <Route path="/signUp" element={Transitions.fade(<SignUpView />)} /> */}

          {/* TODO: change path name to home  */}
          <Route path="/" element={Transitions.fade(<HomeView />)} />
          <Route
            path="/Overview"
            element={Transitions.fade(<OverviewView />)}
          />
          <Route
            path="/Transactions"
            element={Transitions.fade(<TransactionsView />)}
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

export { Transitions };
