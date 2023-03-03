import React from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';

const LoadingIcon = () => {
  return (
    <div className="loading">
        <div className="LoadingMask">
            <div
            style={{ textAlign: "center", display: "flex", justifyContent: "center" }}
            >
            <CircularProgress size={24} style={{ marginRight: "15px" }} />
            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: "bold", fontSize: "1rem" }}>
                Loading...
            </Typography>
            </div>
        </div>
    </div>
  );
};

export default LoadingIcon; 