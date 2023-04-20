import { Button, ButtonProps, styled, Theme } from "@mui/material";
import React from "react";

interface CustomButtonProps extends ButtonProps{
    backgroundColor: string;
    buttonColor: string;
    buttonText: string;
    heroBtn?: boolean;
    guideBtn?: boolean;
    getStartedBtn?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = (props : CustomButtonProps) => {
    const { backgroundColor, buttonColor, buttonText, heroBtn, guideBtn, getStartedBtn } = props;
    const CustomButtonStyle = styled(Button)(({ theme }: { theme: Theme }) => ({
        backgroundColor: backgroundColor,
        color: buttonColor,
        fontWeight: "700",
        fontSize: "14px",
        cursor: "pointer",
        padding: "0.5rem 1.25rem",
        borderRadius: "7px",
        textTransform: "none",
        display: "block",
        border: "2px solid transparent",
        "&:hover": {
            backgroundColor: buttonColor,
            color: backgroundColor,
            borderColor: backgroundColor,
        },
        [theme.breakpoints.down("md")]: {
            margin: (heroBtn || getStartedBtn) && theme.spacing(0, "auto", 3, "auto"),
            width: (heroBtn || getStartedBtn) && "90%"
        },
        [theme.breakpoints.down("sm")]: {
            marginTop: guideBtn && theme.spacing(3),
            width: guideBtn && "90%"
        },
    }));
    return <CustomButtonStyle onClick={props.onClick}>{buttonText}</CustomButtonStyle>;
}

export default CustomButton;
