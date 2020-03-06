import React from "react";

import { MyEditor } from "components";
import { EditorLayout } from "layout";

export default function PostWriteComp() {
  return (
    <EditorLayout logo controller>
      <MyEditor />
    </EditorLayout>
  );
}
