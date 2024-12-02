import "./app/theme/css/App.css";
import React from "react";
import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import LoginView from "./features/auth/login/ui/login_view";
import SignUpView from "./features/auth/signUp/ui/sign_up_view";
import Transitions from "./app/theme/transitions";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={Transitions.fade(<LoginView />)} />
          <Route path="/signUp" element={Transitions.fade(<SignUpView />)} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

export { Transitions };
