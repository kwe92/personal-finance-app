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
    {children}
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
      <Route
        path="/"
        element={Transitions.fade(<Navigate to="/auth/login" replace />)}
      />

      <Route
        path="/auth/login"
        element={Transitions.fade(renderAuthLayout(<LoginView />))}
      />

      <Route
        path="/auth/signUp"
        element={Transitions.fade(renderAuthLayout(<SignUpView />))}
      />

      <Route
        path="/welcome"
        element={Transitions.fade(renderAuthLayout(<WelcomeView />))}
      />

      <Route
        path="/home"
        element={Transitions.fade(
          renderProtectedAppLayout(<Navigate to="/home/Overview" replace />),
        )}
      />

      <Route
        path="/home/Overview"
        element={Transitions.fade(renderProtectedAppLayout(<OverviewView />))}
      />
      <Route
        path="/home/backend-health-test"
        element={Transitions.fade(
          renderProtectedAppLayout(<BackendHealthTestView />),
        )}
      />
      <Route
        path="/home/Transactions"
        element={Transitions.fade(
          renderProtectedAppLayout(<TransactionsView />),
        )}
      />
      <Route
        path="/home/Budgets"
        element={Transitions.fade(
          renderProtectedAppLayout(
            <BudgetViewProvider>
              <BudgetView />
            </BudgetViewProvider>,
          ),
        )}
      />
      <Route
        path="/home/Pots"
        element={Transitions.fade(
          renderProtectedAppLayout(
            <PotViewProvider>
              <PotsView />
            </PotViewProvider>,
          ),
        )}
      />
      <Route
        path="/home/Recurring Bills"
        element={Transitions.fade(
          renderProtectedAppLayout(
            <RecurringBillsViewProvider>
              <RecurringBillsView />
            </RecurringBillsViewProvider>,
          ),
        )}
      />
    </Routes>
  );
};

export default App;
