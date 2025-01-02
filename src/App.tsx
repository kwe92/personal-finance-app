import "./app/theme/css/App.css";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import LoginView from "./features/auth/login/login_view";
import SignUpView from "./features/auth/signUp/sign_up_view";
import Transitions from "./app/theme/transitions";
import OverviewView from "./features/overview/overview_view";
import TransactionsView from "./features/transactions/transactions_view";
import SideNavBar from "./features/shared/components/side_nav_bar";
import AuthImage from "./features/auth/shared/components/auth_image";
import AuthAppBar from "./features/shared/components/auth_app_bar";
import BottomNavBar from "./features/shared/components/bottom_nav_bar";
import { MultiContextProvider } from "./features/shared/context/multi_context_provider";
import { BudgetView } from "./features/budget/budget_view";
import { TransactionViewProvider } from "./features/transactions/context/transaction_view_context";
import { BudgetViewProvider } from "./features/budget/context/budget_view_context";

function App() {
  const location = useLocation();

  const [showNavBar, setShowNavBar] = useState(false);

  console.log(`location path name: ${location.pathname}`);

  useEffect(() => {
    // show navigation menu when route includes home in the path name
    if (location.pathname.includes("home")) {
      setShowNavBar(true);
    }
  });

  return (
    <div className="app">
      {/* if showNavBar is false then the user should only be within the authentication part of the app */}
      {!showNavBar && (
        <>
          <AuthImage /> <AuthAppBar />
        </>
      )}

      {/* if showNavBar is true then the user should be logged in*/}
      {showNavBar && (
        <>
          <SideNavBar />
          <BottomNavBar />
        </>
      )}

      <AnimatePresence mode="wait">
        <MultiContextProvider>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                false // TODO: should useContext and some sort of AuthProvider to track the users login state
                  ? Transitions.fade(<OverviewView />)
                  : Transitions.fade(<Navigate to="/auth/login" />)
              }
            />

            <Route
              path="/auth/*"
              element={Transitions.fade(<Navigate to={"/auth/login"} />)}
            />

            <Route
              path="/auth/login"
              element={Transitions.fade(<LoginView />)}
            />

            <Route
              path="/auth/signUp"
              element={Transitions.fade(<SignUpView />)}
            />

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
              element={
                <TransactionViewProvider>
                  {Transitions.fade(<TransactionsView />)}
                </TransactionViewProvider>
              }
            />
            <Route
              path="/home/Budgets"
              element={
                <BudgetViewProvider>
                  {Transitions.fade(<BudgetView />)}
                </BudgetViewProvider>
              }
            />
          </Routes>
        </MultiContextProvider>
      </AnimatePresence>
    </div>
  );
}

export default App;
