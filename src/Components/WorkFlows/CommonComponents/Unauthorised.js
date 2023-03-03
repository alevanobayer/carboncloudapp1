
import * as React from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Unauthorised() {
  return (
<div  style={{display:"block",textAlign:"center",marginTop:"11%"}}>
<div >
<LockOutlinedIcon style={{fontSize:"35px"}}/>
     <span style={{fontSize:"28px",top: "8px",
    position: "relative"}}> Access Denied </span>
    
    </div>
    <div style={{marginTop:"2%"}}>Currently, you don't have the permission to access this website.<br />
    Kindly talk to your administrator</div>
    </div>
  );
}
