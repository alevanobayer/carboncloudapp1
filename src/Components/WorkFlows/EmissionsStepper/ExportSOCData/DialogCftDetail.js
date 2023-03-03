import { useState, useCallback } from "react";
import "../../FeasibilityStudy/FeasibilityStudy.css";
import {
  Table,
  TableTopBar,
  Textfield,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Icon,
  Dialog,
  TypoDisplay,
  Modal,
  DialogButton,
  TypoBody,
} from "@element/react-components";
import axios from "axios";
import { GET_REQUEST } from "../../../../Components/Utilities/RestEndPoint";


export default function DialogCftDetail(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [download, setDownload] = useState(false);
  let token=window.localStorage.getItem('jwt');
  const [isEditing, setIsEditing] = useState(false);

  
  const handleOnItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  }, []);
  const getDateFormat = (dateValue) => {
    var dateObj = new Date(dateValue);

    var year = dateObj.getUTCFullYear();
    return year;
  };
  let cftProject = props?.projectID;
  
  
    const cftDetails = (cftId) => {
    async function fetchData() {
      let cftJson = await GET_REQUEST(
        `getCoolFormToolJsonRequest/${cftProject}/${cftId}`
      );

      props?.setJson(cftJson);
      props?.setIsCft(cftId);
    }
    props?.setOpenModalCft(true);
    fetchData();
  };


  const cftDownload = async (cftId) => {
    const response = await axios.get(
      `https://backend-carboncloud.emea-dev.int.bayer.com/api/exportCFTInputFieldsResults/${cftProject}/${cftId}`,
      {
        responseType: "blob", // this is important!
        headers: {  'Authorization': `Bearer ${token}` },
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data])); // you can mention a type if you wish
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", ` ${cftProject}${" "}${cftId} CFT Result.xlsx`); //this is the name with which the file will be downloaded
    link.click();
    // no need to append link as child to body.
    setTimeout(() => window.URL.revokeObjectURL(url), 0); // this is important too, otherwise we will be unnecessarily spiking memory!
    setDownload(false);
    if(download){
      cftDownload();
    }
  }; 
  return (
    <div className="trackingContent">
      <Table
        trailingContent={
          <Pagination
            controlled
            itemsPerPageOptions={[5, 10, 25, 100]}
            totalItems={props.cftDetailData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={handleOnItemsPerPageChange}
          />
        }
      >
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell
              className="wordWrapTableCell"
              style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
            >
              CFT ID
            </TableHeaderCell>
            <TableHeaderCell
              className="wordWrapTableCell"
              style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
            >
              Farmer ID
            </TableHeaderCell>
            <TableHeaderCell
              className="wordWrapTableCell"
              style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
            >
              Farm Identifier{" "}
            </TableHeaderCell>
            <TableHeaderCell
              className="wordWrapTableCell"
              style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
            >
              Country{" "}
            </TableHeaderCell>
            <TableHeaderCell
              className="wordWrapTableCell"
              style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
            >
              Year
            </TableHeaderCell>
            <TableHeaderCell
              className="wordWrapTableCell"
              style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
            >
              Field CFT Status
            </TableHeaderCell>
            <TableHeaderCell
              className="wordWrapTableCell"
              style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
            >
              Description
            </TableHeaderCell>
            <TableHeaderCell
                  className="wordWrapTableCellView"
                  style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
                >
                  CFT Results
                </TableHeaderCell>
            <TableHeaderCell
              className="wordWrapTableCellView"
              style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
            >
              View
            </TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        {props.cftDetailData.length === 0 && (
          <TableCell align="center">No data Found</TableCell>
        )}
        <TableBody>
          {props.cftDetailData.length > 0 &&
            props.cftDetailData
              .slice(
                itemsPerPage * (currentPage - 1),
                itemsPerPage * (currentPage - 1) + itemsPerPage
              )
              .map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      className="wordWrapTableCell"

                    >
                      {item.cftId}
                    </TableCell>
                    <TableCell
                      className="wordWrapTableCell"

                    >
                      {item.farmerId}
                    </TableCell>
                    <TableCell
                      className="wordWrapTableCell"

                    >
                      {item.farmIdentifier}
                    </TableCell>
                    <TableCell
                      className="wordWrapTableCell"

                    >
                      {item.country}
                    </TableCell>
                    <TableCell
                      className="wordWrapTableCell"

                    >
                      {item.reportYear}
                    </TableCell>
                    <TableCell
                      className="wordWrapTableCell"

                    >
                      {item.cftStatus}
                    </TableCell>
                    <TableCell
                      className="wordWrapTableCell"

                    >
                      {item.errorMesg}
                    </TableCell>
                    <TableCell  className="wordWrapTableCellView">
                      <Icon
                          icon="download"
                          className={item.cftStatus==="Accepted"?"downloadIcon":"downloadIconDisable"}
                          onClick={(item.cftStatus==="Accepted")?() => cftDownload(item.cftId):(e) => e.preventDefault() } />
                      </TableCell>
                    <TableCell className="wordWrapTableCellView">
                      <Icon
                        icon="remove_red_eye"
                        className={item.cftStatus==="Failed"?"downloadIconDisable":"ViewIcon"}
                        onClick={(item.cftStatus==="Failed")?(e) => e.preventDefault():() => cftDetails(item.cftId) } />
                       
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
      
       
     
    </div>
  );
}
