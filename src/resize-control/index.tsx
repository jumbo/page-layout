import * as React from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { LayoutOffset } from "./types";
import { panelOffsets, setPanelOffset } from "./local-data";
import {
  ResizeControlH,
  Shadow,
  GrabArea,
  ResizeButton
} from "./resize-control.styles";
import { ChevronRightIcon } from "@radix-ui/react-icons";

interface ResizeProps {
  offset: LayoutOffset;
}

interface ResizeHorizontalProps extends ResizeProps {
  width: number;
  left: number;
  right: number;
  align: "left" | "right";
  enabled?: boolean;
  collapsed?: boolean;
}

export function ResizeHorizontal({
  width,
  left,
  right,
  align,
  offset,
  enabled = true,
  collapsed = false
}: ResizeHorizontalProps) {
  const rMotionX = useMotionValue(0);
  const [distance, setDistance] = React.useState(panelOffsets[offset]);
  const [isResizing, setIsResizing] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

  const toggleSideBar = () => {
    if (isResizing) {
      return;
    }
    setIsCollapsed(!isCollapsed);
  };

  React.useEffect(() => {
    setDistance(panelOffsets[offset]);
  }, [offset]);

  React.useEffect(() => {
    return rMotionX.onChange((v) => setPanelOffset(offset, distance + v));
  }, [distance, offset, rMotionX]);

  // When at full width, double tap to return to normal
  // When at normal width, double tap to reach max
  function togglePosition() {
    const y = rMotionX.get();

    if (align === "left" && y + distance === 0) {
      animate(rMotionX, right + -distance, {
        type: "spring",
        stiffness: 200,
        damping: 20
      });
    } else if (align === "right" && y + distance === 0) {
      animate(rMotionX, -(left + distance), {
        type: "spring",
        stiffness: 200,
        damping: 20
      });
    } else {
      animate(rMotionX, -distance, {
        type: "spring",
        stiffness: 200,
        damping: 20
      });
    }
  }

  const onDragStart = () => {
    setIsResizing(true);
  };

  const onDragEnd = () => {
    setIsResizing(false);
  };

  return (
    <ResizeControlH
      style={{
        x: rMotionX,
        [align]: align === "left" ? width + distance : width + -distance,
        cursor: enabled ? "ew-resize" : "default"
      }}
      drag={enabled ? "x" : false}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      dragConstraints={{
        left: -left - distance,
        right: right - distance
      }}
      dragElastic={0.2}
      onDoubleClick={enabled ? togglePosition : undefined}
    >
      <Shadow isResizing={isResizing} align={align} />
      <GrabArea align={align} isSidebarCollapsed={isCollapsed}>
        <span />
      </GrabArea>
      <ResizeButton
        aria-expanded={!isCollapsed}
        type="button"
        isSidebarCollapsed={isCollapsed}
        onMouseDown={(event) => event.preventDefault()}
        onClick={toggleSideBar}
      >
        <ChevronRightIcon />
        <div></div>
      </ResizeButton>
    </ResizeControlH>
  );
}

interface DragHandleVerticalProps extends ResizeProps {
  height: number;
  top: number;
  bottom: number;
  align: "top" | "bottom";
  enabled?: boolean;
}

export function DragHandleVertical({
  height,
  top,
  bottom,
  align,
  offset,
  enabled = true
}: DragHandleVerticalProps) {
  const [distance, setDistance] = React.useState(panelOffsets[offset]);

  React.useEffect(() => {
    setDistance(panelOffsets[offset]);
  }, [offset]);

  const rMotionY = useMotionValue(0);

  React.useEffect(() => {
    return rMotionY.onChange((v) => setPanelOffset(offset, distance + v));
  }, [distance, offset, rMotionY]);

  // When at full height, double tap to return to normal
  // When at normal height, double tap to reach max
  function togglePosition() {
    const y = rMotionY.get();

    if (align === "top" && y + distance === 0) {
      animate(rMotionY, bottom - distance, {
        type: "spring",
        stiffness: 200,
        damping: 20
      });
    } else if (align === "bottom" && y + distance === 0) {
      animate(rMotionY, -(top + distance), {
        type: "spring",
        stiffness: 200,
        damping: 20
      });
    } else {
      animate(rMotionY, -distance, {
        type: "spring",
        stiffness: 200,
        damping: 20
      });
    }
  }

  return (
    <motion.div
      style={{
        y: rMotionY,
        position: "absolute",
        left: 0,
        [align]:
          align === "top" ? height + distance - 4 : height - distance - 4,
        opacity: 0,
        backgroundColor: "rgba(200,200,200,1)",
        width: "100%",
        height: 6,
        cursor: "ns-resize"
      }}
      drag={enabled ? "y" : false}
      whileHover={{
        opacity: enabled ? 0.6 : 0
      }}
      whileDrag={{
        opacity: 1
      }}
      dragConstraints={{
        top: -top - distance,
        bottom: bottom - distance
      }}
      dragElastic={0.1}
      onDoubleClick={enabled ? togglePosition : undefined}
    />
  );
}

interface DragHandleHorizontalRelativeProps extends ResizeProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export function DragHandleHorizontalRelative({
  containerRef,
  offset
}: DragHandleHorizontalRelativeProps) {
  const rMotionX = useMotionValue(0);
  const [distance, setDistance] = React.useState(panelOffsets[offset]);

  React.useEffect(() => {
    setDistance(panelOffsets[offset]);
  }, [offset]);

  React.useEffect(() => {
    return rMotionX.onChange((v) => setPanelOffset(offset, distance + v));
  }, [distance, offset, rMotionX]);

  // When at full width, double tap to return to normal
  // When at normal width, double tap to reach max
  function togglePosition() {
    animate(rMotionX, -distance, {
      type: "spring",
      stiffness: 200,
      damping: 20
    });
  }

  return (
    <motion.div
      style={{
        x: rMotionX,
        left: `calc(50% + ${distance - 4}px)`,
        position: "absolute",
        opacity: 0,
        height: "100%",
        backgroundColor: "rgba(200,200,200,1)",
        width: 6,
        cursor: "ew-resize"
      }}
      drag="x"
      dragConstraints={containerRef}
      dragElastic={0}
      onDoubleClick={togglePosition}
    />
  );
}
