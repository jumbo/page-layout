import * as React from "react";
import { useLayoutEffect } from "react";
import { setupOffsets, panelOffsets } from "./resize-control/local-data";
import { DragHandleVertical, ResizeHorizontal } from "./resize-control";
import { motion } from "framer-motion";
import { styled, globalCss } from "@stitches/react";
import { blue, gray } from "@radix-ui/colors";

const globalStyle = globalCss({
  "html, *": {
    boxSizing: "border-box"
  },
  body: {
    backgroundColor: gray.gray3,
    color: "#fff",
    fontFamily: "sans-serif"
  }
});

const LEFT_COL_WIDTH = 200;
const RIGHT_COL_WIDTH = 280;
const BOTTOM_ROW_HEIGHT = 48;

const GridLayout = styled("div", {
  display: "grid",
  position: "absolute",
  left: 0,
  top: 0,
  width: "100vw",
  height: "100vh",
  minWidth: "auto",
  minHeight: "auto",
  gridTemplateAreas: '"header header header" "sideLeft main sideRight"',
  gridTemplateColumns: `calc(${LEFT_COL_WIDTH}px + var(--sideLeft-offset)) minmax(10%, 1fr) calc(${RIGHT_COL_WIDTH}px - var(--sideRight-offset))`,
  gridTemplateRows: "48px minmax(0, 1fr)",
  color: gray.gray12
});

const Header = styled("div", {
  gridArea: "header",
  background: gray.gray6,
  borderBottom: `1px solid ${gray.gray8}`
});

const SideLeft = styled(motion.div, {
  position: "relative",
  gridArea: "sideLeft",
  background: gray.gray6
});

const Main = styled("div", {
  gridArea: "main",
  display: "flex",
  flexDirection: "column",
  background: gray.gray3
});

const Console = styled("div", {
  position: "relative",
  background: gray.gray6,
  height: `calc(${BOTTOM_ROW_HEIGHT}px - var(--console-offset))`,
  borderTop: `1px solid ${gray.gray8}`
});

const SideRight = styled(motion.div, {
  position: "relative",
  gridArea: "sideRight",
  background: gray.gray6
});

const SideContent = styled("div", {
  position: "absolute",
  inset: 0,
  background: blue.blue3,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

export default function ProjectView() {
  const [sideLeftHidden, setSideLeftHidden] = React.useState(false);
  const [sideRightHidden, setSideRightHidden] = React.useState(false);
  const toggleSideLeft = () => {
    setSideLeftHidden(!sideLeftHidden);
  };
  const toggleSideRight = () => {
    setSideRightHidden(!sideRightHidden);
  };
  globalStyle();
  useLayoutEffect(() => {
    setupOffsets();
  }, []);

  return (
    <GridLayout>
      <Header>
        <div>Header</div>
      </Header>
      <SideLeft animate={{ x: sideLeftHidden ? "-100%" : 0 }}>
        <SideContent>Content</SideContent>
        <ResizeHorizontal
          align="left"
          width={LEFT_COL_WIDTH}
          left={60}
          right={100}
          offset="sideLeft"
          onColapsed={toggleSideLeft}
        />
      </SideLeft>
      <Main>
        <div style={{ flex: 1 }}>main</div>
        {/* <Console>
          <DragHandleVertical
            align="bottom"
            height={BOTTOM_ROW_HEIGHT}
            top={100}
            bottom={0}
            offset="console"
          />
          <div>console</div>
        </Console> */}
      </Main>
      <SideRight animate={{ x: sideRightHidden ? "100%" : 0 }}>
        <ResizeHorizontal
          align="right"
          width={RIGHT_COL_WIDTH}
          left={100}
          right={100}
          offset="sideRight"
          onColapsed={toggleSideRight}
        />
        <SideContent>SideRight</SideContent>
      </SideRight>
    </GridLayout>
  );
}
