import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useHistory } from "react-router-dom";

export default function SurveyDialog(props) {
	const history = useHistory()
	const handleToClose = () => {
		props.setOpenModalSurvey(false);
	};

	const handleToChange = () => {	
		 props.setOpenModalSurvey(false);
	};
 
  const FeasibilityList=()=>{
	props.setOpenModalSurvey(false);
	
  }
	
	return (
		<div> 
				<Dialog open={props.openModalSurvey} onClose={handleToClose} maxWidth='lg' minWidth='lg'>
					<div>
						<DialogTitle style={{textAlign:'center'}}>
							<span>Confirmation </span>
						</DialogTitle>
						<DialogContent>
							<DialogContentText>
								<span>Once Submitted,this survey can not be edited.Please Confirm</span>
							</DialogContentText>
						</DialogContent>
					</div>
					<DialogActions>
						<Button
							onClick={handleToClose}
							color="primary"
							variant="outlined">
							Cancel
						</Button>
						<Button
							onClick={handleToChange}
							color="primary"
							id="Final"
							variant="outlined">
							Confirm
						</Button>
					</DialogActions>
				</Dialog>
			
		</div>
	);
}
