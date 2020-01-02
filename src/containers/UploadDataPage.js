import Upload from "../components/Upload"
import FileTable from "../components/FileTable"
import React from "react";

export default function UploadDataPage(props) {
  return (
    <div>
      <div>
        <Upload {...props} />
      </div>
      <div className="filetable">
        <FileTable {...props} />
      </div>

    </div>
  );
}
