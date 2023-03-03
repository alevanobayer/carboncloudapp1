import React, { useCallback, useState, useMemo, useEffect } from "react";
import AWS from "aws-sdk";
import {
  FileUpload,
  Button,
  Group,
  Typography,
  Modal, IconButton, Icon
} from "@element/react-components";
import DialogBox from "../Utilities/DialogBox";
import "../WorkFlows/FeasibilityStudy/FeasibilityStudyStepper/FarmerConsent/farmerConsent.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ALBUM_BUCKET_NAME = "carbon-cloud-emea-document-store-dev";
const BUCKET_REGION = "eu-central-1";
const IDENTITY_POOL_ID = "eu-central-1:bba1755f-4355-4176-a72a-3ee235faf9a1";

const UploadFile = (props) => {
  const [selectedFile, setSelectedFile] = useState();
  const [fileUploadedStatus, setFileUploadedStatus] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalSuccess, setModalSucces] = useState(false);


  AWS.config.update({
    region: BUCKET_REGION,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IDENTITY_POOL_ID,
    }),
  });

  let s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: ALBUM_BUCKET_NAME },
  });
  // const handleFileInput = useCallback((val) => {
  //   setSelectedFile(val[0].name);
  //   console.log(val[0].name);
  // }, []);
  const handleFileInput = (e) => {
    console.log(e)
    setSelectedFile(e[0]);
  };

  const uploadFile = async (file) => {
    console.log(file)
    setFileUploadedStatus(false);
    props.setUploadedFileName("");
    setModalSucces(true);
    setOpenModal(false);
    console.log(file);
    if (file === undefined) {
      setOpenModal(true);
      return false;
    } else if (file === null) {
      setOpenModal(true);
      return false;
    }
    const timeStamp = Date.now().toString();

    let fileName = timeStamp + "_" + file.name;
    console.log(fileName);
    let folderPath = encodeURIComponent(props.folderName) + "/";

    let photoKey = folderPath + fileName;
    console.log(fileName)
    // Use S3 ManagedUpload class as it supports multipart uploads
    let upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: ALBUM_BUCKET_NAME,
        Key: photoKey,
        Body: file,
      },
    });

    AWS.config.logger = console;
    let promise = upload.promise();

    promise.then(
      function (data) {
        props.setFileUploadResponse(data);
        props.setUploadedFileName(file.name);
        setFileUploadedStatus(true);
        props.setFileUploadedStatusParent &&
          props.setFileUploadedStatusParent(true);
        props.updateFields &&
          props.updateFields(file.name, props.farmIndex, props.fieldIndex);
      },
      function (err) {
        return console.log("Error: ", err.message);
      }
    );
  };
  useEffect(() => {
    if (props.fileUploadedStatusParent !== fileUploadedStatus) {
      setSelectedFile(null);
      setFileUploadedStatus(props.fileUploadedStatusParent);
    }
  }, [props.fileUploadedStatusParent]);

  const { uploadBox = "uploadInputBox", uploadButton = "uploadInputButton" } =
    props;
  return (
    <>

      <Group direction="horizontal" >
        {/* {" "}<input
            type="file"
            className="form-control"
            id={props.folderName}
            name="upload"
            onChange={handleFileInput}
            disabled={props?.fileName && props?.fileName !== ""}
            accept={props.type === "pdf" ? ".pdf" : ".xls,.xlsx"}
          /> */}
        <FileUpload
          disabled={props?.fileName && props?.fileName !== ""}
          label="Browse File"
          accept={props.type === "pdf" ? ".pdf" : ".xls,.xlsx"}

          onChange={handleFileInput}
        />
        <Button
          label="Upload File"
          disabled={props?.fileName && props?.fileName !== ""}
          themeColor='primary'
          variant={"filled"}

          onClick={() => uploadFile(selectedFile)}
        />
      </Group>

      {/* {props.type === "pdf" ? (
        <span
          style={{
            color: "red",
            fontSize: "11.5px",
            position: "relative",
            top: "-10%",
          }}
        >
          {" "}
          <InfoOutlinedIcon /> Please make sure that you are uploading correct
          file.It cannot be replaced later.
        </span>
      ) : (
        ""
      )} */}
      {fileUploadedStatus && modalSuccess && (<Modal
        modalSize="dialog"
        open={modalSuccess}
        title="Success"
        dismissiveButton={<Button variant="filled">Ok</Button>}
      >
        <Typography tag="div" type="body1" style={{ textAlign: "left" }}>
          File Uploaded Successfully
        </Typography>

      </Modal>)}
      {/* {fileUploadedStatus && (
        <div className={`col-sm-12 uploadStatus ${props.folderName}`}>
          <p style={{ color: "red", marginLeft: "-16%",  }}>
            File Uploaded Successfully
          </p>
        </div>
      )} */}
      {openModal && (
        <DialogBox
          openModal={openModal}
          setOpenModal={setOpenModal}
          alert="true"
          alertMsg="Please choose a file to upload."
        />
      )}
    </>
  );
};

export default UploadFile;
