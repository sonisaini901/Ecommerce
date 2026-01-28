import { Button, Col, Container, Form, Row } from "react-bootstrap"
import SEO from "../SEO"
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { clearErrors, loginUser } from "../../Store/Actions/UserActions";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    }

    const redirect = location.search ? location.search.split("=")[1] : "account";

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(`/${redirect}`)
        }
    }, [dispatch, error, isAuthenticated, user, redirect, navigate, enqueueSnackbar]);

    return(
        <>
            <SEO title={"Login - Forever Faster"} />

            <div className="user_register_section section-padding">
                <Container>
                    <Row>
                        <Col>
                            <Form method="post" onSubmit={handleLoginSubmit} className="login_register_form">
                                <h2 className="main_heading large text-center">Login</h2>

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

                                <Form.Group controlId="password" className="form_row">
                                    <Form.Label>Password <span>*</span></Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Password" 
                                        required 
                                        value={password}
                                        name="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button type="submit" className="btn_background" disabled={loading}>
                                    {loading ? "Processing" : "Login"}
                                </Button>
                                                                
                                <div className="login_register_links">
                                    <Link to={"/register"}>Register</Link>
                                    <Link to={"/password/forgot"}>Forgot Password</Link>
                                </div>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Login