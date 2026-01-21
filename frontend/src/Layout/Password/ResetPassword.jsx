import { useDispatch, useSelector } from "react-redux";
import SEO from "../SEO"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { clearErrors, loadUser, resetPassword } from "../../Store/Actions/UserActions";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect } from "react";

const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
            return;
        }

        if (newPassword !== confirmPassword) {
            enqueueSnackbar("Password Doesn't Match", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set("password", newPassword);
        formData.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(params.token, formData));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Password Updated Successfully", { variant: "success" });
            dispatch(loadUser());
            navigate("/login")
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return(
        <>
            <SEO title={"Reset Password - Forever Faster"} />

            <div className="user_register_section section-padding">
                <Container>
                    <Row>
                        <Col>
                            <Form method="post" onSubmit={handleSubmit} className="login_register_form">
                                <h2 className="main_heading large text-center">Reset Password</h2>
                        
                                <Form.Group controlId="newPassword" className="form_row">
                                    <Form.Label>New Password <span>*</span></Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="New Password" 
                                        required 
                                        value={newPassword}
                                        name="newPassword"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="confirmPassword" className="form_row">
                                    <Form.Label>Confirm Password <span>*</span></Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Confirm Password" 
                                        required 
                                        value={confirmPassword}
                                        name="confirmPassword"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Form.Group>
            
                                <Button type="submit" className="btn_background" disabled={loading}>
                                    {loading ? "Processing" : "Submit"}
                                </Button>
                                                                                        
                                <div className="login_register_links">
                                    <Link to={"/register"}>Register</Link>
                                    <Link to={"/login"}>Login</Link>
                                </div>
                        
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default ResetPassword