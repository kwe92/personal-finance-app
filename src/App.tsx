import "./app/theme/css/App.css";
import React from "react";
import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence, AnimationProps, motion } from "framer-motion";
import LoginView from "./features/auth/login/ui/login_view";
import SignUpView from "./features/auth/signUp/ui/sign_up_view";

//!! TODO: move TransitionOptions and Transitions class
type TransitionOptions = {
  exitOpacity?: number;
  initialOpacity?: number;
  animateOpacity: number;
  transition?: AnimationProps;
};

class Transitions {
  static fade(
    children: React.ReactNode,
    transitionOptions?: TransitionOptions
  ): JSX.Element {
    return (
      <motion.div
        exit={{
          opacity: transitionOptions?.exitOpacity ?? 0,
        }}
        initial={{ opacity: transitionOptions?.initialOpacity ?? 0 }}
        animate={{ opacity: transitionOptions?.animateOpacity ?? 1 }}
        transition={transitionOptions?.transition ?? { duration: 0.5 }}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        {children}
      </motion.div>
    );
  }
}

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
