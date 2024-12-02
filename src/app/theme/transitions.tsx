import { AnimationProps, motion } from "framer-motion";

type TransitionOptions = {
  exitOpacity?: number;
  initialOpacity?: number;
  animateOpacity?: number;
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
        transition={
          transitionOptions?.transition ?? { duration: 0.5, ease: "easeInt" }
        }
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

export default Transitions;
