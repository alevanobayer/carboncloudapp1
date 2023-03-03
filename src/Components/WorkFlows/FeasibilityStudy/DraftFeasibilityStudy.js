import { useState, useEffect,useCallback } from "react";
import { MenuItem, Select,} from "@mui/material";
import {
  Table,
  TableTopBar,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  IconButton,Elevation,TypoBody
} from "@element/react-components";
import { useHistory } from "react-router-dom";
import { GET_REQUEST } from "../../Utilities/RestEndPoint";

export default function DraftFeasibilityStudy() {
  const history = useHistory();
  const [feasibilityMonitoringData, setFeasibilityMonitoringData] = useState(
    []
  );
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectData, setSelectData] = useState("");

  const handleChange = (e) => setSearchTerm(e.target.value);
  const handleDropdownChange = (event) => {
    setSelectData(event.target.value);
  };
  const handleOnItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  }, []);
  const flowType = "Feasibility Study";
  const redirectFunction = async (projectId, farmerId, farmId) => {
    let editData = await GET_REQUEST(
      `details/${projectId}/${farmerId}/${farmId}`
    );

    if (editData) {
      history.push({
        pathname: "/feasibilityStudyStepper",
        state: { editdetail: editData },
      });
    }
  };
  const handleRedirectPage = () => {
    history.push("/feasibilityStudyStepper");
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const sorting = (type) => {
    if (sortingOrder === "asc") {
      const sorted = [...feasibilityMonitoringData].sort((a, b) => {
        if (a[type] > b[type]) {
          return 1;
        } else {
          return -1;
        }
      });
      setFeasibilityMonitoringData(sorted);
      setSortingOrder("dsc");
    }
    if (sortingOrder === "dsc") {
      const sorted = [...feasibilityMonitoringData].sort((a, b) => {
        if (a[type] < b[type]) {
          return 1;
        } else {
          return -1;
        }
      });
      setFeasibilityMonitoringData(sorted);
      setSortingOrder("asc");
    }
  };

  useEffect(() => {
    async function fetchData() {
      let feasibilityMonitoring = await GET_REQUEST(
        `feasibilityStudyAndSocQuantificationProjects-view/${flowType}`
      );
      setFeasibilityMonitoringData(feasibilityMonitoring);

      setSearchResults(feasibilityMonitoring);
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (searchTerm.length > 0) {
      if (selectData === "farmerId") {
        const results = searchResults.filter((o) =>
          o.farmerId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFeasibilityMonitoringData(results);
      } else if (selectData === "projectName") {
        const results = searchResults.filter((o) =>
          o?.projectName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFeasibilityMonitoringData(results);
      }
      else if (selectData === "projectId") {
        const results = searchResults.filter((o) =>
          o.projectId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFeasibilityMonitoringData(results);
      } else if (selectData === "farmId") {
        const results = searchResults.filter((o) =>
          o.farmId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFeasibilityMonitoringData(results);
      } else if (selectData === "createdBy") {
        const results = searchResults.filter((o) =>
          o.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFeasibilityMonitoringData(results);
      }
    } else {
      setFeasibilityMonitoringData(searchResults);
    }
  }, [searchTerm]);
  return (
    <><Elevation elevation="2">
      <div
        style={{ zIndex: "1", left: "0", backgroundColor: "#F5F5F5", marginTop: "70px", height: "50px", position: "fixed", border: "1px solid #F5F5F5", width: "100%", }}
      >
        <TypoBody
          level={1}
          style={{
            fontSize: "14px",
            width: "100%",
            height: "30px",
            position: "relative",
            top: "32%",
            marginLeft: "2%",
            left: 0,
          }}
        > <span>
            <a onClick={() => history.push("/home")}>Home</a> {">"} Feasibility Study {">"}Feasibility Project List          </span>
        </TypoBody>
      </div>
    </Elevation><div className="trackingContent">
        <Table
          trailingContent={<Pagination
            controlled
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalItems={feasibilityMonitoringData.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={handleOnItemsPerPageChange}
            itemsPerPageOptions={[5, 10, 25, 50, 100]} />}
          leadingContent={<TableTopBar
            title="Feasibility Study Project List"
            actions={<>
              <input
                type="text"
                disabled={selectData === ""}
                value={searchTerm}
                placeholder="Search..."
                onChange={handleChange} />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectData}
                displayEmpty
                renderValue={selectData !== ""
                  ? undefined
                  : () => <div>Select Filter</div>}
                onChange={handleDropdownChange}
                style={{
                  height: "32px",
                  width: "126px",
                }}
              >
                <MenuItem value="projectName">Project Name</MenuItem>
                <MenuItem value="projectId">Project ID</MenuItem>
                <MenuItem value="farmerId">Farmer ID</MenuItem>

                <MenuItem value="farmId">Farm ID</MenuItem>
                <MenuItem value="createdBy">CreatedBy</MenuItem>
              </Select>
              <Button
                variant="outlined"
                label="New Study"
                style={{
                  marginLeft: "4px",
                  borderRadius: "4px",
                  color: "#0464C4",
                }}
                onClick={handleRedirectPage} />
            </>} />}
        >
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Project Name
                {sortingOrder === "asc" ? (
                  <IconButton
                    icon="arrow_downward"
                    onClick={() => sorting("projectName")} />
                ) : (
                  <IconButton
                    icon="arrow_upward"
                    onClick={() => sorting("projectName")} />
                )}
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Project ID
                {sortingOrder === "asc" ? (
                  <IconButton
                    icon="arrow_downward"
                    onClick={() => sorting("projectId")} />
                ) : (
                  <IconButton
                    icon="arrow_upward"
                    onClick={() => sorting("projectId")} />
                )}
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Farmer ID
                {sortingOrder === "asc" ? (
                  <IconButton
                    icon="arrow_downward"
                    onClick={() => sorting("farmerId")} />
                ) : (
                  <IconButton
                    icon="arrow_upward"
                    onClick={() => sorting("farmerId")} />
                )}
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Farm ID
                {sortingOrder === "asc" ? (
                  <IconButton
                    icon="arrow_downward"
                    onClick={() => sorting("farmId")} />
                ) : (
                  <IconButton
                    icon="arrow_upward"
                    onClick={() => sorting("farmId")} />
                )}
              </TableHeaderCell>

              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Created By
              </TableHeaderCell>
              <TableHeaderCell
                className="wordWrapTableCell"
                style={{ fontSize: "14px", backgroundColor: "#F5F5F5" }}
              >
                Status
                {sortingOrder === "asc" ? (
                  <IconButton
                    icon="arrow_downward"
                    style={{ backgroundColor: "#F5F5F5" }}
                    onClick={() => sorting("s")} />
                ) : (
                  <IconButton
                    icon="arrow_upward"
                    style={{ backgroundColor: "#F5F5F5" }}
                    onClick={() => sorting("projectId")} />
                )}
              </TableHeaderCell>
              <TableHeaderCell
                align="center"
                style={{ backgroundColor: "#F5F5F5" }}
              >
                Edit
              </TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {feasibilityMonitoringData.length > 0 &&
              feasibilityMonitoringData
                .slice(itemsPerPage * (currentPage - 1), itemsPerPage * (currentPage - 1) + itemsPerPage)
                .map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >                  <TableCell
                    component="th"
                    scope="row"
                    className="wordWrapTableCell"

                  >
                      {item.projectName}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className="wordWrapTableCell"

                    >
                      {item.projectId}
                    </TableCell>
                    <TableCell className="wordWrapTableCell">
                      {item.farmerId}
                    </TableCell>
                    <TableCell className="wordWrapTableCell">
                      {item.farmId}
                    </TableCell>
                    <TableCell className="wordWrapTableCell">
                      {item.createdBy}
                    </TableCell>
                    <TableCell className="wordWrapTableCell">
                      {item.status}
                    </TableCell>
                    <TableCell className="wordWrapTableCell">
                      <Button
                        variant="outlined"
                        //  disabled={true}
                        label="edit"
                        onClick={() => {
                          redirectFunction(
                            item.projectId,
                            item.farmerId,
                            item.farmId
                          );
                        } } />
                    </TableCell>
                  </TableRow>
                ))}

            {feasibilityMonitoringData.length === 0 && (
              <TableRow>
                <TableCell>No data found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div></>
  );
}
