import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Dialog, Typography } from "@mui/material";
// import AuthAPI from "api/AuthAPI";
import FormTextField from "../form/FormTextField";
import ReadableHiddenPasswordField from "../form/ReadableHiddenPasswordField";
import { Form, Formik, FormikProps } from "formik";
import { useNavigate } from "react-router";
import * as yup from "yup";
import "./Login.css";
import AuthAPI from "../../api/AuthApi";
import { Navigate } from "react-router-dom";

interface RegisterDialogProps {
	open: boolean;
	handleLoginOpen: () => void;
	handleClose: () => void;
}

const RegisterDialog = (props: RegisterDialogProps) => {
	const handleSubmit = async (values: RegistrationValues) => {
		// const navigate = useNavigate();
		console.log("values", values);
		let response = await AuthAPI.register(values.username, values.email, values.password);
		props.handleClose();
		// navigate("/home");
		window.location.href=("/home");

		console.log("AuthAPI response", response);
	};
	return (
		<Dialog
			fullWidth
			open={props.open}
			onClose={props.handleClose}
			PaperProps={{
				style: {
					boxSizing: "border-box",
					boxShadow: "none",
				},
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<div
					className={"login-header-buttons"}
					style={{
						backgroundColor: "#F5F5F5",
						width: "100%",
					}}
				>
					<Button
						className="button"
						style={{ 
							textTransform: "none",
							color: "#000000",
						 }}
						onClick={() => {
							// props.handleLoginOpen();
							props.handleClose();
						}}
					>
						<ArrowBackIosNew
							style={{
								height: "16px",
								width: "16px",
								marginRight: "4px",
							}}
						/>
						<Typography variant="h6" className="login-header-return-button">
							Back
						</Typography>
					</Button>
					<Typography
						variant="body1"
						className="login-header-return-button"
						style={{
							fontStyle: "italic",
							marginRight: "24px",
						}}
					>
						Signing up
					</Typography>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(formik: FormikProps<RegistrationValues>) => (
						<Form className="register-dialog-container">
							<div className="input-container">
								<FormTextField
									name="username"
									label="Username"
									value={formik.values.username}
								/>

								<FormTextField
									name="email"
									label="Email"
									value={formik.values.email}
								/>

								<ReadableHiddenPasswordField
									name="password"
									label="Password"
									value={formik.values.password}
									variant="outlined"
								/>
							</div>
							<Button
								fullWidth
								onClick={() => formik.handleSubmit()}
								type="submit"
								color="primary"
								variant="contained"
								disabled={!formik.isValid || formik.isSubmitting}
								style={{
									textTransform: "none",
									padding: "16px 40px",
								}}
							>
								<Typography variant="h5" color="#FFFFFF">
									Register
								</Typography>
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</Dialog>
	);
};

interface RegistrationValues {
	username: string;
	email: string;
	password: string;
}

const initialValues: RegistrationValues = {
	username: "",
	email: "",
	password: "",
};

const validationSchema = yup.object({
	username: yup.string().required("Username is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup.string().required("Password is required"),
});

export default RegisterDialog;