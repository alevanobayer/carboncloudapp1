import * as React from 'react';
import {
  TypoBody,FooterBottom, FooterBottomContent, FooterIcon
} from "@element/react-components";

export default function Footer() {
  return (
    <FooterBottom
    themeColor="primary"
    style={{backgroundColor:"#0464c4",color:"white"}}
    links={
        <>
            <FooterBottomContent>Help</FooterBottomContent>
            <FooterBottomContent>FAQs</FooterBottomContent>
            <FooterBottomContent>Home</FooterBottomContent>
        </>
    }
    copyrightContent={
        <FooterBottomContent style={{marginLeft:"-34%"}}>
            &copy; Bayer Carbon Cloud | All rights reserved
        </FooterBottomContent>
    }
    footerIcons={
        <>
            {/* <FooterIcon icon='settings' />
            <FooterIcon icon='settings' />
            <FooterIcon icon='settings' />
            <FooterIcon icon='settings' />
            <FooterIcon icon='settings' /> */}
        </>
    }
/>
  );
}