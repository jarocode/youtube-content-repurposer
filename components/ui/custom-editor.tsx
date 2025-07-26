// components/custom-editor.tsx
"use client";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  // Markdown,
} from "ckeditor5";
import { FormatPainter } from "ckeditor5-premium-features";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

export interface CustomEditorProps {
  data: string;
  onChange: (html: string) => void;
}

const CustomEditor: React.FC<CustomEditorProps> = ({ data, onChange }) => (
  <CKEditor
    editor={ClassicEditor}
    data={data}
    config={{
      licenseKey: process.env.NEXT_PUBLIC_CK_EDITOR_LICENSE_KEY,
      plugins: [Essentials, Paragraph, Bold, Italic, FormatPainter],
      toolbar: [
        "undo",
        "redo",
        "|",
        "bold",
        "italic",
        "|",
        "formatPainter",
        // "markdown",
      ],
    }}
    onChange={(_, editor) => {
      onChange(editor.getData());
    }}
  />
);

export default CustomEditor;
