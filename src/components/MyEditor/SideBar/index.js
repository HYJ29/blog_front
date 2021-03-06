import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DraftOffsetKey from "draft-js/lib/DraftOffsetKey";

import BlockButtons from "./BlockButtons";
import EmojiSideButton from "./SideEmoji";
import { useSidebarPosition, useSideBarIsOpen } from "../hooks";

const plus = process.env.PUBLIC_URL + "/icons/editor/block/plus.svg";

export default function SideBarComp({ children, readOnly }) {
  const [isOpen, toggleSidbarIsOpen] = useSideBarIsOpen(false);
  const sidebarPosition = useSidebarPosition();

  return (
    <>
      <SideBarContainer style={sidebarPosition}>
        <SideBar onMouseDown={toggleSidbarIsOpen}>
          <img src={plus} alt="plus" />
        </SideBar>
        <BlockButtons isOpen={isOpen} />
      </SideBarContainer>
      {readOnly ? null : <EmojiSideButton position={sidebarPosition} />}
    </>
  );
}

const SideBarContainer = styled.div`
  display: flex;
  position: absolute;
`;

const SideBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid black;
  cursor: pointer;
`;
