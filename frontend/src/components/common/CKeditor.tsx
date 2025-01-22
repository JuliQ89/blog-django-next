import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface MyEditorProps {
  value: string;
  onChange: (data: string) => void;
}

const CKeditor: React.FC<MyEditorProps> = ({ value, onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      onReady={(editor) => {
        editor.setData(value); // Setzt den initialen Wert
      }}
      onChange={(_, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      config={{
        licenseKey:
          "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Mzg0NTQzOTksImp0aSI6IjUyNDY4N2ZmLWRmMWItNGY0OC05ZTQ1LTMwYmVhYjIyY2Y0MiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImIxOTZjYjYyIn0.HxtpdtatjZBrB5ghXvfGqUfawWzrh8G64tbItR6kHDDSmcJ9F6LL_brGCHZ9AtJdBXDXBTIirifRvZPet9A2bQ",
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "underline", // Unterstrichen
          "strikethrough", // Durchgestrichen
          "subscript", // Tiefgestellt
          "superscript", // Hochgestellt
          "|",
          "link",
          "imageUpload", // Bild hochladen
          "mediaEmbed", // Video einbetten
          "blockQuote",
          "code", // Code-Block
          "codeBlock", // Mehrzeiliger Code-Block
          "|",
          "bulletedList",
          "numberedList",
          "todoList", // To-Do-Liste
          "|",
          "alignment", // Text-Ausrichtung (Links, Mitte, Rechts, Blocksatz)
          "indent", // Einzug vergrößern
          "outdent", // Einzug verkleinern
          "|",
          "insertTable", // Tabelle einfügen
          "tableColumn", // Spalten bearbeiten
          "tableRow", // Reihen bearbeiten
          "mergeTableCells", // Zellen verbinden
          "|",
          "undo",
          "redo",
          "|",
          "fontSize", // Schriftgröße
          "fontFamily", // Schriftart
          "highlight", // Hervorhebung
          "removeFormat", // Formatierung entfernen
        ],
      }}
    />
  );
};

export default CKeditor;
