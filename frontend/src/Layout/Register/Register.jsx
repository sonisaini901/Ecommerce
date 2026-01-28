import "./Register.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clearErrors, registerUser } from "../../Store/Actions/UserActions";
import SEO from "../SEO";

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        cpassword: "",
    });

    const { firstname, lastname, email, password, cpassword } = user;

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        if (password.length < 8) {
            enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
            return;
        }
        if (password !== cpassword) {
            enqueueSnackbar("Password Doesn't Match", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set("firstname", firstname);
        formData.set("email", email);
        formData.set("lastname", lastname);
        formData.set("password", password);

        dispatch(registerUser(formData));

    }

    const handleDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/account')
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    return(
        <>
            <SEO title="Register - Forever Faster" />

            <div className="user_register_section section-padding">
                <Container>
                    <Row>
                        <Col>
                            <Form method="post" onSubmit={handleRegisterSubmit} className="login_register_form">
                                <h2 className="main_heading large text-center">Register</h2>

                                <Form.Group controlId="firstname" className="form_row">
                                    <Form.Label>First Name <span>*</span></Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="First Name" 
                                        required 
                                        value={firstname}
                                        name="firstname"
                                        onChange={handleDataChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="lastname" className="form_row">
                                    <Form.Label>Last Name <span>*</span></Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Last Name" 
                                        required 
                                        value={lastname}
                                        name="lastname"
                                        onChange={handleDataChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="emailaddress" className="form_row">
                                    <Form.Label>Email <span>*</span></Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Email" 
                                        required 
                                        value={email}
                                        name="email"
                                        onChange={handleDataChange}
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
                                        onChange={handleDataChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="cpassword" className="form_row">
                                    <Form.Label>Confirm Password <span>*</span></Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Confirm Password" 
                                        required 
                                        value={cpassword}
                                        name="cpassword"
                                        onChange={handleDataChange}
                                    />
                                </Form.Group>

                                <Button type="submit" className="btn_background" disabled={loading}>
                                    {loading ? "Processing" : "Register"}
                                </Button>
                                
                                <div className="login_register_links">
                                    <Link to={"/login"}>Already Register? Login</Link>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Register