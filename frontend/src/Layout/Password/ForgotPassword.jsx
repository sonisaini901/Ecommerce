import { useState } from "react";
import SEO from "../SEO";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect } from "react";
import { clearErrors, forgotPassword } from "../../Store/Actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("email", email);
        dispatch(forgotPassword(formData));
        setEmail("");
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (message) {
            enqueueSnackbar(message, { variant: "success" });
        }
    }, [dispatch, error, message, enqueueSnackbar]);

    return(
        <>
            <SEO title={"Forgot Password - Forever Faster"} />

            <div className="user_register_section section-padding">
                <Container>
                    <Row>
                        <Col>
                            <Form method="post" onSubmit={handleSubmit} className="login_register_form">
                                <h2 className="main_heading large text-center">Forgot Password</h2>
            
                                <Form.Group controlId="emailaddress" className="form_row">
                                    <Form.Label>Email <span>*</span></Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Email" 
                                        required 
                                        value={email}
                                        name="email"
                                        onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword