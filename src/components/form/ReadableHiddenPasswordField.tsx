import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { useState } from "react";
import FormTextField, { FormTextFieldProps } from "./FormTextField";

interface ReadableHiddenPasswordFieldProps extends FormTextFieldProps {
	title?: string;
	autoComplete?: string;
	name: string;
	className?: string;
	enableEnterSubmit?: boolean;
	enterSubmitAction?: () => void;
	inputRef?: React.RefObject<HTMLInputElement>;
}

const ReadableHiddenPasswordField = ({
	inputRef,
	title,
	autoComplete = "off",
	name,
	style,
	className,
	enableEnterSubmit,
	enterSubmitAction,
}: ReadableHiddenPasswordFieldProps) => {
	const [hidden, setHidden] = useState<boolean>(true);
	const changeVisibility = () => setHidden(!hidden);

	return (
		<FormTextField
			title={title}
			name={name}
			label="Password"
			inputRef={inputRef}
			type={hidden ? "password" : "text"}
			autoComplete={autoComplete}
			enableEnterSubmit={enableEnterSubmit}
			enterSubmitAction={enterSubmitAction}
			className={className}
			style={{
				...style,
			}}
			endIcon={
				<IconButton onClick={changeVisibility}>
					{hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
				</IconButton>
			}
		/>
	);
};

export default ReadableHiddenPasswordField;