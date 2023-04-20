import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Dialog, Typography } from "@mui/material";
import { useRef } from "react";
import "./Login.css";
import FormTextField from "../form/FormTextField";
import ReadableHiddenPasswordField from "../form/ReadableHiddenPasswordField";
import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";

interface LoginDialogProps {
	open: boolean;
	isDoctorLogin?: boolean;
	handleClose: () => void;
	handleRegisterOpen: () => void;
	handleRegisterClose: () => void;
}

const LoginDialog = (props: LoginDialogProps) => {
	const handleSubmit = async (values: LoginValues) => {
		// const navigate = useNavigate();
		console.log("values", values);
		// let response = await AuthAPI.register(values);
		props.handleClose();
		// Navigate("/home");
		window.location.href=("/home");

		// console.log("AuthPAI response", response);
	};
	const wrapperRef = useRef<HTMLDivElement>(null);
	return (
		<Dialog fullWidth open={props.open} onClose={props.handleClose}>
			<div ref={wrapperRef} className={"login-main-component"}>
				<div
					className={"login-header-buttons"}
					style={{
						backgroundColor: "#F5F5F5",
					}}
				>
					<Button className="button" onClick={props.handleClose}
					style={{ 
						textTransform: "none",
						color: "#000000",
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
						Logging in
					</Typography>
				</div>
				<div
					style={{
						padding: "8px",
						paddingBottom: "24px",
					}}
				>	
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(formik: FormikProps<LoginValues>) => (
						<Form className="register-dialog-container">
							<div className="input-container">
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
									Log in
								</Typography>
							</Button>
						</Form>
					)}
				</Formik>
					<Typography variant="body2" color="text.secondary" align="center">
						Not a member of the community?{" "}
					</Typography>
					<Typography
						onClick={() => {
							props.handleRegisterOpen();

							props.handleClose();
						}}
						variant="body1"
						color="hyperlink"
						align="center"
						style={{
							marginTop: "8px",
							textDecoration: "underline",
							fontWeight: "bold",
							cursor: "pointer",
						}}
					>
						Register
					</Typography>
				</div>
			</div>
		</Dialog>
	);
};

interface LoginValues {
	email: string;
	password: string;
}

const initialValues: LoginValues = {
	email: "",
	password: "",
};

const validationSchema = yup.object({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup.string().required("Password is required"),
});

export default LoginDialog;