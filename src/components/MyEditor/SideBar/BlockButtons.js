import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { readFile } from "../helper";
import { actions, selectors } from "data";

export default function BlockButtons({ isOpen }) {
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  const userId = useSelector(selectors.user.getUserId);

  const buttons = [
    {
      title: "dash",
      image: process.env.PUBLIC_URL + "/icons/editor/block/dash.svg",
      onClick: () =>
        dispatch(
          actions.editorState.addAtomicBlock({
            entityType: "dash"
          })
        )
    },
    {
      title: "code",
      image: process.env.PUBLIC_URL + "/icons/editor/block/code.svg",
      onClick: () =>
        dispatch(
          actions.editorState.toggleBlock({
            blockType: "code-block"
          })
        )
    },
    {
      title: "photo",
      image: process.env.PUBLIC_URL + "/icons/editor/block/photo.svg",
      onClick: () => fileInput.current.click()
    },
    {
      title: "search",
      image: process.env.PUBLIC_URL + "/icons/editor/block/search.svg",
      onClick: () => {
        dispatch(
          actions.editorState.addAtomicBlock({
            entityType: "unsplash"
          })
        );
        dispatch(actions.editorState.toggleEditorReadOnly(true));
      }
    },
    {
      title: "video",
      image: process.env.PUBLIC_URL + "/icons/editor/block/video.svg",
      onClick: () =>
        dispatch(
          actions.editorState.addAtomicBlock({
            entityType: "youtube"
          })
        )
    }
  ];

  const fileSelectHandler = e => {
    const files = e.target.files;
    const selectedFile = files[0];
    const onLoadHandler = selectedFile =>
      dispatch(actions.editorState.addImage({ selectedFile, userId }));
    onLoadHandler(selectedFile);
    // readFile({ files, onLoadHandler });
    e.target.value = "";
  };

  return (
    <ButtonsContainer isOpen={isOpen}>
      {buttons.map((button, i) => (
        <Button
          isOpen={isOpen}
          i={i}
          key={button.image}
          onMouseDown={button.onClick}
        >
          <Image src={button.image} alt={button.image} />
          {button.title === "photo" && (
            <input
              style={{ display: "none" }}
              type="file"
              onChange={fileSelectHandler}
              ref={fileInput}
            />
          )}
        </Button>
      ))}
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  width: ${({ isOpen }) => (isOpen ? "230px" : "0px")};
`;

const Button = styled.div`
z-index:${({ isOpen }) => (isOpen ? 0 : -1)};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid black;
  margin-left: 10px;
  background-color: white;
  cursor: pointer;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)}
  transform: ${({ isOpen, i }) =>
    isOpen ? "translateX(0);" : `translateX(-${46 * (i + 1)}px);`}
  transition: transform .3s cubic-bezier(.5,-0.5,.5,1.5), opacity .3s ease-in;
`;

const Image = styled.img`
  width: 20px;
`;
