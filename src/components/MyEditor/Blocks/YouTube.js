import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form } from "formik";

import { actions, selectors } from "data";
import MyUrlInput from "components/Input/MyUrlInput";

export default function YouTube() {
  const dispatch = useDispatch();

  const editorState = useSelector(selectors.editorState.getEditorState);
  const toggleReadOnly = bool => {
    dispatch(actions.editorState.toggleEditorReadOnly(bool));
  };

  const submitHandler = values => {
    dispatch(
      actions.editorState.replaceEntityData({ data: values.url, editorState })
    );
    toggleReadOnly(false);
  };

  const initialValues = {
    url: ""
  };
  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      <Form>
        <MyUrlInput
          name="url"
          onFocus={toggleReadOnly.bind(this, true)}
          onBlur={toggleReadOnly.bind(this, false)}
          placeholder="YouTube 링크를 붙여넣고 ENTER 키를 눌러주세요."
        />
      </Form>
    </Formik>
  );
}
