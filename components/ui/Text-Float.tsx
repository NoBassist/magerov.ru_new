import React, {
  useMemo,
  useRef,
  ReactNode,
  RefObject,
} from "react";
import {
  motion,
  useAnimation,
  useInView,
  Variants,
  HTMLMotionProps,
} from "motion/react";

// Type‑guard that narrows any ReactNode to an <svg> element with concrete props.
function isSVGElement(
  node: ReactNode
): node is React.ReactElement<React.SVGProps<SVGSVGElement>, "svg"> {
  return React.isValidElement(node) && node.type === "svg";
}

interface ScrollFloatProps
  extends Omit<HTMLMotionProps<"h2">, "ref" | "children"> {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  stagger?: number;
  idleDelay?: number; // pause (s) before idle starts
}

export const TextFloat: React.FC<ScrollFloatProps> = ({
  children,
  containerClassName = "",
  textClassName = "",
  animationDuration = 0.8,
  stagger = 0.04,
  idleDelay = 1,
  ...rest
}) => {
  /* ---------- refs & intersection ---------- */
  const rootRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(rootRef, { margin: "0px 0px -15% 0px", once: true });

  /* ---------- animation controller ---------- */
  const controls = useAnimation();

  React.useEffect(() => {
    if (!inView) return;

    (async () => {
      await controls.start("visible");
      setTimeout(() => {
        void controls.start("idle");
      }, idleDelay * 1000);
    })();
  }, [inView, controls, idleDelay]);

  /* ---------- variants ---------- */
  const parentVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger },
    },
    idle: {
      transition: {
        staggerChildren: stagger,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  const charVariants: Variants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
      opacity: 1,
      y: "0%",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
        mass: 0.9,
      },
    },
    idle: {
      y: [0, -10, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        type: "tween",
        repeatDelay: 3
      },
    },
  };

  /* ---------- render splitted text or SVG ---------- */
  const renderedContent = useMemo(() => {
    // Text case ------------------------------------------------------------
    if (typeof children === "string") {
      return children.split("").map((char, idx) => (
        <motion.span
          key={idx}
          variants={charVariants}
          className="inline-block will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ));
    }

    // SVG case -------------------------------------------------------------
    if (isSVGElement(children)) {
      const svgElement = children;

      // Strip DOM Animation event handlers that conflict with Framer‑motion's
      const {
        children: _ignoredChildren,
        onAnimationStart: _oaStart,
        onAnimationEnd: _oaEnd,
        ...svgPropsWithoutConflicts
      } = svgElement.props as React.SVGProps<SVGSVGElement>;

      // Wrap each <path> in motion.path with the same variants
      const paths = React.Children.toArray(svgElement.props.children).map(
        (child, idx) => {
          if (React.isValidElement(child) && child.type === "path") {
            return (
              <motion.path
                {...(child.props as any)}
                key={`path-${idx}`}
                variants={charVariants}
              />
            );
          }
          // Non‑path children stay as‑is
          return child;
        }
      );

      // Return a motion.svg with stagger on its children
      return (
        <motion.svg
          {...(svgPropsWithoutConflicts as any)}
          key="animated-svg"
          initial="hidden"
          animate={controls}
          variants={parentVariants}
          className={
            "inline-block will-change-transform " +
            (svgElement.props.className || "")
          }
        >
          {paths}
        </motion.svg>
      );
    }

    // Fallback (e.g., React fragments)
    return children;
  }, [children, charVariants, controls, stagger]);

  return (
    <motion.h2
      ref={rootRef}
      className={`my-5 overflow-visible ${containerClassName}`}
      {...rest}
    >
      <motion.span
        variants={parentVariants}
        className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`}
        initial="hidden"
        animate={controls}
      >
        {renderedContent}
      </motion.span>
    </motion.h2>
  );
};