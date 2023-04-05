import { Button, Typography } from "@mui/material";

import "./Login.css";

interface Props {
	title?: string;
	subtitle?: string;
	stateText?: string;
	returnButtonLabel?: string;
	returnButtonAction?: () => void;
}

const DialogHeader = (props: Props) => {
	const {
		title,
		subtitle,
		stateText = "Redaguojama",
		returnButtonLabel = "Atšaukti",
		returnButtonAction,
	} = props;
	return (
		<>
			{title && (
				<div className="dialog-header-text">
					<Typography variant="body1">
						{title}
					</Typography>
					{subtitle && (
						<Typography variant="body2">
							{subtitle}
						</Typography>
					)}
				</div>
			)}
			<div className={"dialog-header-buttonOrState"}>
				{returnButtonAction === undefined ? (
					<Typography variant="h6">
						{stateText}
					</Typography>
				) : (
					<Button
						onClick={() => returnButtonAction()}
						style={{
							backgroundColor: "#EEEEEE",
						}}
					>
						<Typography
							variant="h6"
							style={{
								paddingLeft: "4px",
							}}
						>
							{returnButtonLabel}
						</Typography>
					</Button>
				)}
			</div>
		</>
	);
};

export default DialogHeader;