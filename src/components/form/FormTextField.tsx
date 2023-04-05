import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import {
	Box,
	Button,
	InputAdornment,
	OutlinedTextFieldProps,
	TextField,
	Tooltip,
	Typography,
	TypographyProps,
} from "@mui/material";
import { FieldHookConfig, useField } from "formik";

import "./FormComponents.css";

export interface FormTextFieldProps extends OutlinedTextFieldProps {
	title?: string;
	titleInfoIconLabel?: string;
	titleButtonLabel?: string;
	titleButtonAction?: () => void;
	hideInput?: boolean;
	showInstead?: JSX.Element;
	description?: string;
	titleprops?: TypographyProps;
	descriptionprops?: TypographyProps;
	errorprops?: TypographyProps;
	tooltip?: string;
	startIcon?: JSX.Element;
	endIcon?: JSX.Element;
	enableEnterSubmit?: boolean;
	enterSubmitAction?: () => void;
}

function FormTextField(props: FormTextFieldProps & FieldHookConfig<string>) {
	const {
		startIcon,
		endIcon,
		title,
		titleInfoIconLabel,
		titleButtonLabel,
		titleButtonAction,
		hideInput = false,
		showInstead,
		tooltip,
		description,
		enableEnterSubmit,
		enterSubmitAction,
		...other
	} = props;
	const [field, meta] = useField(props);
	return (
		<div className="textfield-container">
			{title && (
				<div className="textfield-title-container">
					<div
						style={{
							display:
								titleInfoIconLabel || titleButtonAction ? "flex" : undefined,
							flex: titleInfoIconLabel || titleButtonAction ? 1 : undefined,
							flexGrow: titleInfoIconLabel || titleButtonAction ? 1 : undefined,
						}}
					>
						<Typography
							variant="h5"
							{...other.titleprops}
						>
							{title}
						</Typography>
					</div>
					{titleButtonAction && (
						<div>
							<Button
								onClick={titleButtonAction}
								variant={"contained"}
								style={{
									textTransform: "none",
								}}
							>
								{titleButtonLabel}
							</Button>
						</div>
					)}
					{tooltip && (
						<Tooltip title={tooltip}>
							<HelpRoundedIcon className="textfield-tooltip" />
						</Tooltip>
					)}
				</div>
			)}
			{!hideInput ? (
				<TextField
					fullWidth
					error={meta.touched && Boolean(meta.error)}
					InputProps={getInputProps(startIcon, endIcon)}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							if (enterSubmitAction && enableEnterSubmit) {
								enterSubmitAction();
							}
						}
					}}
					{...field}
					{...other}
				/>
			) : (
				<div className={"textField-showInstead"}>{showInstead}</div>
			)}
			{meta.touched && Boolean(meta.error) && (
				<Box className="textfield-error-container">
					<ErrorRoundedIcon className="textfield-error-icon" />

					<Typography
						variant="subtitle2"
						align="left"
						{...other.errorprops}
					>
						{meta.error}
					</Typography>
				</Box>
			)}
			{description && (
				<Typography
					variant="subtitle2"
					align="left"
					{...other.descriptionprops}
				>
					{description}
				</Typography>
			)}
		</div>
	);
}

FormTextField.defaultProps = {
	variant: "outlined",
};

export default FormTextField;

const getInputAdornment = (position: "end" | "start", Icon?: JSX.Element) => {
	return Icon === undefined ? undefined : (
		<InputAdornment position={position}>{Icon}</InputAdornment>
	);
};

const getInputProps = (startIcon?: JSX.Element, endIcon?: JSX.Element) => {
	if (startIcon === undefined && endIcon === undefined) {
		return undefined;
	}
	const startAdornment = getInputAdornment("start", startIcon);
	const endAdornment = getInputAdornment("end", endIcon);
	if (startAdornment && endAdornment) {
		return {
			startAdornment: startAdornment,
			endAdornment: endAdornment,
		};
	} else if (startAdornment) {
		return {
			startAdornment: startAdornment,
		};
	} else if (endAdornment) {
		return {
			endAdornment: endAdornment,
		};
	}
};