import React from "react";
import { useMsal } from "@azure/msal-react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/esm/Dropdown";
import Button from "react-bootstrap/Button";

/**
 * Renders a sign-out button
 */
export const SignOutButton = (props) => {
    const { instance } = useMsal();

    const handleLogout = (logoutType) => {
       if (logoutType === "redirect") {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            });
        }
    }

    
    return (
       <>
        <div>
            <span style={{marginRight: "10px", fontWeight: "bold"}} >Welcome {props.accounts[0].name}</span>
            <Button variant="secondary" className="ml-auto" onClick={() => handleLogout("redirect")}>Sign Out</Button>
        </div>
       </>
    )
}