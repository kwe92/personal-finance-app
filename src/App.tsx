import "./app/theme/css/App.css";
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
import { OverviewProvider } from "./features/overview/context/overview_context";

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        <MultiContextProvider>
          <RoutesContainer location={location} />
        </MultiContextProvider>
      </AnimatePresence>
    </div>
  );
}

const AuthLayout = ({ children }: { children: JSX.Element }) => (
  <>
    <AuthImage />
    <AuthAppBar />
    {children}
  </>
);

const AppLayout = ({ children }: { children: JSX.Element }) => (
  <>
    <SideNavBar />
    <BottomNavBar />
    {Transitions.fade(children)}
  </>
);

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isPlaidLinked } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!isPlaidLinked) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

const renderAuthLayout = (element: JSX.Element) => (
  <AuthLayout>{element}</AuthLayout>
);

const renderProtectedAppLayout = (element: JSX.Element) => (
  <ProtectedRoute>
    <AppLayout>{element}</AppLayout>
  </ProtectedRoute>
);

const RoutesContainer = ({
  location,
}: {
  location: ReturnType<typeof useLocation>;
}) => {
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      <Route
        path="/auth/login"
        element={renderAuthLayout(<LoginView />)}
        // element={renderAuthLayout(<BackendHealthTestView />)}
      />

      <Route path="/auth/signUp" element={renderAuthLayout(<SignUpView />)} />

      <Route path="/welcome" element={renderAuthLayout(<WelcomeView />)} />

      <Route
        path="/home"
        element={renderProtectedAppLayout(
          <Navigate to="/home/Overview" replace />,
        )}
      />

      <Route
        path="/home/Overview"
        element={renderProtectedAppLayout(
          <OverviewProvider>
            <OverviewView />
          </OverviewProvider>,
        )}
      />
      <Route
        path="/home/backend-health-test"
        element={renderProtectedAppLayout(<BackendHealthTestView />)}
      />
      <Route
        path="/home/Transactions"
        element={renderProtectedAppLayout(<TransactionsView />)}
      />
      <Route
        path="/home/Budgets"
        element={renderProtectedAppLayout(
          <BudgetViewProvider>
            <BudgetView />
          </BudgetViewProvider>,
        )}
      />
      <Route
        path="/home/Pots"
        element={renderProtectedAppLayout(
          <PotViewProvider>
            <PotsView />
          </PotViewProvider>,
        )}
      />
      <Route
        path="/home/Recurring Bills"
        element={renderProtectedAppLayout(
          <RecurringBillsViewProvider>
            <RecurringBillsView />
          </RecurringBillsViewProvider>,
        )}
      />
    </Routes>
  );
};

export default App;
