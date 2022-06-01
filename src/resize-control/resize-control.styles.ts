import { styled } from "@stitches/react";
import { motion } from "framer-motion";

// ResizeButton
export const ResizeButton = styled(motion.button, {
  width: 24,
  height: 24,
  padding: 0,
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: 32,
  left: 0,
  backgroundColor: "var(--ds-surface-overlay,#FFFFFF)",
  border: 0,
  borderRadius: "50%",
  boxShadow: "0 0 0 1px rgb(9 30 66 / 8%), 0 2px 4px 1px rgb(9 30 66 / 8%)",
  color: "var(--ds-text-subtle,#6B778C)",
  cursor: "pointer",
  opacity: `var(--ds--resize-button--opacity,0)`,
  outline: 0,
  transformOrigin: "50% 50%",
  transition:
    "background-color 100ms linear, color 100ms linear, opacity 350ms cubic-bezier(0.2,0,0,1)",
  "&:hover": {
    backgroundColor: "var(--ds-background-selected-bold,#4C9AFF)",
    color: "var(--ds-text-inverse,#FFFFFF)",
    opacity: 1
  },
  "&:active, &:focus": {
    backgroundColor: "var(--ds-background-selected-bold-hovered,#2684FF)",
    color: "var(--ds-text-inverse,#FFFFFF)",
    opacity: 1
  },
  "& > div": {
    position: "absolute",
    top: -8,
    right: -12,
    bottom: -8,
    left: -8
  },
  variants: {
    align: {
      left: {
        transform: "translateX(-50%) rotate(180deg)"
      },
      right: {
        transform: "translateX(50%)"
      }
    },
    isSidebarCollapsed: {
      false: {},
      true: {}
    }
  },
  compoundVariants: [
    {
      align: "left",
      isSidebarCollapsed: true,
      css: {
        transform: "translateX(calc(-50% + 14px))",
        opacity: 1
      }
    },
    {
      align: "right",
      isSidebarCollapsed: true,
      css: {
        transform: "translateX(calc(50% - 14px)) rotate(180deg)",
        opacity: 1
      }
    }
  ],
  defaultVariants: {
    isSidebarCollapsed: false
  }
});

// shadow
const colorStops = `
    rgba(0, 0, 0, 0.2) 0px,
    rgba(0, 0, 0, 0.2) 1px,
    rgba(0, 0, 0, 0.1) 1px,
    rgba(0, 0, 0, 0) 100%
  `;
const transitionDuration = "0.22s";

export const Shadow = styled("div", {
  width: 3,
  position: "absolute",
  opacity: 0.5,
  pointerEvents: "none",
  transitionDuration: transitionDuration,
  transitionProperty: "left, opacity, width",
  transitionTimingFunction: "easeOut",
  variants: {
    align: {
      left: {
        inset: "0 auto 0 -3px",
        background: `var(--colors-border, ${`linear-gradient(to left, ${colorStops})`})`
      },
      right: {
        inset: "0 -3px 0 auto",
        background: `var(--colors-border, ${`linear-gradient(to right, ${colorStops})`})`
      }
    },
    isResizing: {
      true: {
        width: 6,
        inset: "0 auto 0 -6px",
        opacity: 0.8
      }
    }
  },
  compoundVariants: [
    {
      align: "right",
      isResizing: true,
      css: {
        inset: "0 -6px 0 auto"
      }
    }
  ],
  defaultVariants: {
    align: "left",
    isResizing: false
  }
});

export const ResizeControlH = styled(motion.div, {
  position: "absolute",
  top: 0,
  bottom: 0,
  outline: "none",
  zIndex: 99,
  [`&:hover ${ResizeButton}`]: {
    opacity: 1
  }
});

// GrabArea
const varLineColor = "--ds-line";
export const GrabArea = styled(motion.button, {
  width: 24,
  height: "100%",
  padding: 0,
  backgroundColor: "transparent",
  border: 0,
  cursor: "ew-resize",
  "&::-moz-focus-inner": {
    border: 0
  },
  "&:focus": {
    outline: 0
  },
  "&:enabled": {
    "&:hover": {
      [varLineColor]: `var(--ds-border-selected, #4c9aff)`
    },
    "&:active, &:focus": {
      [varLineColor]: `var(--ds-border-selected, #4c9aff)`
    }
  },
  "& > span": {
    display: "block",
    position: "absolute",
    width: 2,
    inset: "0 auto 0 0",
    backgroundColor: `var(${varLineColor})`,
    transition: "background-color 200ms"
  },
  variants: {
    align: {
      left: {
        "& > span": {
          inset: "0 auto 0 0"
        }
      },
      right: {
        "& > span": {
          inset: "0 0 0 auto"
        }
      }
    },
    isSidebarCollapsed: {
      true: {
        padding: 0,
        backgroundColor: "transparent",
        border: 0
      }
    }
  },
  defaultVariants: {
    align: "left",
    isSidebarCollapsed: false
  }
});
