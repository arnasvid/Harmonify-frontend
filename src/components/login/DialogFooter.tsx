import { Button } from "@mui/material";
import "./Login.css";

interface Props {
	cancelButtonLabel?: string;
	cancelButtonAction?: () => void;
	confirmButtonLabel?: string;
	confirmButtonAction: () => void;
	confirmButtonType?: "submit" | "button" | "reset";
	isConfirmDisabled?: boolean;
	buttonsProportion?: "1to1" | "1to3";
}

const DialogFooter = (props: Props) => {
	const {
		cancelButtonLabel = "Atšaukti",
		cancelButtonAction,
		confirmButtonLabel = "Išsaugoti",
		confirmButtonAction,
		confirmButtonType = "submit",
		isConfirmDisabled = false,
		buttonsProportion = "1to1",
	} = props;
	return (
		<div
			style={{
				display: "flex",
				flex: 1,
				gap: "10px",
			}}
		>
			{cancelButtonAction && (
				<div
					style={{
						display: "flex",
						flex: 1,
					}}
				>
					<Button fullWidth onClick={cancelButtonAction}>
						{cancelButtonLabel}
					</Button>
				</div>
			)}
			<div
				style={{
					display: "flex",
					flex: buttonsProportion === "1to1" ? 1 : 3,
				}}
			>
				<Button
					fullWidth
					color={"primary"}
					variant={"contained"}
					type={confirmButtonType}
					disabled={isConfirmDisabled}
					onClick={() => confirmButtonAction()}
				>
					{confirmButtonLabel}
				</Button>
			</div>
		</div>
	);
};

export default DialogFooter;