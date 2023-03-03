import React from "react";
import {
	Icon,
	TypoDisplay,
	DialogButton,
	TypoBody,
	Dialog,
  } from "@element/react-components";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useHistory } from "react-router-dom";

export default function DialogBoxEmission(props) {
	const history = useHistory()
	const handleToClose = () => {
		props.setOpenModal(false);
	};

	const handleToChange = () => {
		props.setConfirm(true);
		props.setOpenModal(false);
	};
	const CreateNew = () => {
		props.setOpenModal(false);
		window.location.reload();
	}
	const FeasibilityList = () => {
		props.setOpenModal(false);
		 history.push("/DraftEmission");
	}
	const successDialogMsg = (data) => {
		return (
			<><div style={{ display: "flex" }}>
				<Icon icon="check_circle_outline" style={{ color: "green" }} />
				<TypoDisplay level={6}>Success</TypoDisplay>
			</div><div style={{ marginTop: "4%" }}>
					<TypoBody>{props.apiResponseMessage}</TypoBody>
				</div><div style={{ marginTop: "4%", textAlignLast: "right" }}>
					<DialogButton
						onClick={handleToClose}
						color="primary"
						variant="outlined"
					>
						Ok
					</DialogButton>
				</div></>
		
		)
	}

	const failureDailogMsg = (data) => {
		return (
			<>
			<div style={{ display: "flex" }}>
			  <Icon icon="cancel" style={{ color: "red" }} />
			  <TypoDisplay level={6}>Failure</TypoDisplay>
			</div>
			<div style={{ marginTop: "4%" }}>
			  <TypoBody>{props.apiResponseMessage}</TypoBody>
			</div>
			<div style={{ marginTop: "4%", textAlignLast: "right" }}>
			  {props.flowType === "SOC Quantification" ? (
				<>
				  <DialogButton
					onClick={FeasibilityList}
					color="primary"
					variant="outlined"
				  >
					Project List
				  </DialogButton>
				  <DialogButton
					onClick={CreateNew}
					color="primary"
					variant="outlined"
				  >
					Create New
				  </DialogButton>
				</>
			  ) : (
				<DialogButton
				  onClick={handleToClose}
				  color="primary"
				  variant="outlined"
				>
				  Ok
				</DialogButton>
			  )}
			</div>
		  </>
		)
	}

	return (
		<div>
			{props.status && (
        <Dialog open={props.openModal} onClose={handleToClose} maxWidth="lg">
          {props.status?.statusCode === 201
            ? successDialogMsg(props.status)
            : failureDailogMsg(props.status)}
        </Dialog>
      )}
			 {props.alert && (
        <Dialog open={props.openModal} onClose={handleToClose}>
          <div style={{ display: "flex" }}>
            <TypoDisplay level={6}>Alert</TypoDisplay>
          </div>
          <div style={{ marginTop: "4%" }}>
            <TypoBody>{props.alertMsg}</TypoBody>
          </div>
          <div style={{ marginTop: "4%", textAlignLast: "right" }}>
            <DialogButton
              onClick={handleToClose}
              color="primary"
              variant="outlined"
            >
              Ok
            </DialogButton>
          </div>
        </Dialog>
      )}
			 {props.confirmationAlert && (
        <Dialog open={props.openModal} onClose={handleToClose}>
          {" "}
          <div style={{ display: "flex" }}>
            <TypoDisplay level={6}>Alert</TypoDisplay>
          </div>
          <div style={{ marginTop: "4%" }}>
            <TypoBody>{props.confirmationAlertMsg}</TypoBody>
          </div>
          <div style={{ marginTop: "4%", textAlignLast: "right" }}>
            <DialogButton
              onClick={handleToClose}
              color="primary"
              variant="outlined"
            >
              Cancel
            </DialogButton>
            <DialogButton
              onClick={handleToChange}
              color="primary"
              variant="outlined"
            >
              Change
            </DialogButton>
          </div>
        </Dialog>
      )}
		</div>
	);
}
