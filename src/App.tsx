import "./app/theme/css/App.css";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import LoginView from "./features/auth/login/login_view";
import SignUpView from "./features/auth/signUp/sign_up_view";
import WelcomeView from "./features/auth/welcome/welcome_view";
import Transitions from "./app/theme/transitions";
import OverviewView from "./features/overview/overview_view";
import TransactionsView from "./features/transactions/transactions_view";
import SideNavBar from "./features/shared/components/side_nav_bar";
import AuthImage from "./features/auth/shared/components/auth_image";
import AuthAppBar from "./features/shared/components/auth_app_bar";
import BottomNavBar from "./features/shared/components/bottom_nav_bar";
import { MultiContextProvider } from "./features/shared/context/multi_context_provider";
import { useAuth } from "./features/auth/context/auth_context";
import { BudgetView } from "./features/budget/budget_view";
import { BudgetViewProvider } from "./features/budget/context/budget_view_context";
import { PotsView } from "./features/pots/pots_view";
import { PotViewProvider } from "./features/pots/context/pot_view_context";
import { RecurringBillsView } from "./features/recurringBills/recurring_bills_view";
import { RecurringBillsViewProvider } from "./features/recurringBills/context/recurring_bills_context";
import BackendHealthTestView from "./features/shared/components/backend_health_test_view";

function App() {
  const location = useLocation();

  const [showNavBar, setShowNavBar] = useState(false);

  console.log(`location path name: ${location.pathname}`);

  useEffect(() => {
    // show navigation menu when route includes home in the path name
    if (location.pathname.includes("home")) {
      setShowNavBar(true);
    } else {
      // if the user signs out then set to false
      if (showNavBar) {
        setShowNavBar(false);
      }
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
          <RoutesContainer location={location} />
        </MultiContextProvider>
      </AnimatePresence>
    </div>
  );
}

const RoutesContainer = ({
  location,
}: {
  location: ReturnType<typeof useLocation>;
}) => {
  const { user, isPlaidLinked } = useAuth();

  const requirePlaid = (element: JSX.Element) =>
    user && isPlaidLinked ? (
      element
    ) : (
      <Navigate to={user ? "/welcome" : "/auth/login"} />
    );

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={Transitions.fade(<Navigate to="/auth/login" />)}
      />

      <Route
        path="/auth/*"
        element={Transitions.fade(<Navigate to={"/auth/login"} />)}
      />

      <Route path="/auth/login" element={Transitions.fade(<LoginView />)} />

      <Route path="/auth/signUp" element={Transitions.fade(<SignUpView />)} />

      <Route path="/welcome" element={Transitions.fade(<WelcomeView />)} />

      <Route
        path="/home/*"
        element={
          isPlaidLinked
            ? Transitions.fade(<Navigate to={"/home/Overview"} />)
            : Transitions.fade(<Navigate to={"/welcome"} />)
        }
      />

      <Route
        path="/home/Overview"
        element={requirePlaid(Transitions.fade(<OverviewView />))}
      />
      <Route
        path="/home/backend-health-test"
        element={requirePlaid(Transitions.fade(<BackendHealthTestView />))}
      />
      <Route
        path="/home/Transactions"
        element={requirePlaid(Transitions.fade(<TransactionsView />))}
      />
      <Route
        path="/home/Budgets"
        element={requirePlaid(
          <BudgetViewProvider>
            {Transitions.fade(<BudgetView />)}
          </BudgetViewProvider>,
        )}
      />
      <Route
        path="/home/Pots"
        element={requirePlaid(
          <PotViewProvider>{Transitions.fade(<PotsView />)}</PotViewProvider>,
        )}
      />
      <Route
        path="/home/Recurring Bills"
        element={requirePlaid(
          <RecurringBillsViewProvider>
            {Transitions.fade(<RecurringBillsView />)}
          </RecurringBillsViewProvider>,
        )}
      />
    </Routes>
  );
};

export default App;
