// components/client-side-custom-editor.js
"use client"; // Required only in App Router.

import dynamic from "next/dynamic";
import { CustomEditorProps } from "./custom-editor";

const ClientSideCustomEditor = dynamic<CustomEditorProps>(
  () => import("./custom-editor"),
  {
    ssr: false,
  }
);

export default ClientSideCustomEditor;
