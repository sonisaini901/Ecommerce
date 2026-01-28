import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, loadUser, updatePassword } from "../../../Store/Actions/UserActions";
import { UPDATE_PASSWORD_RESET } from "../../../Store/Types/UserTypes";
import { Button, Form, Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";

const PasswordUpdate = ({show, onClose}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { user, isAuthenticated } = useSelector(state => state.user);
    const { passwordError, isPasswordUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmitHandler = (e) => {
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
        formData.set("oldPassword", oldPassword);
        formData.set("newPassword", newPassword);
        formData.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(formData));
    }

    useEffect(() => {

        if (isAuthenticated === false) {
            navigate("/login")
        }

        if (passwordError) {
            enqueueSnackbar(passwordError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isPasswordUpdated) {
            enqueueSnackbar("Password Updated Successfully", { variant: "success" });
            dispatch(loadUser());
            
            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, isAuthenticated, passwordError, isPasswordUpdated, navigate, enqueueSnackbar]);


    return(
        <Modal
            size="lg"
            show={show}
            onHide={() => onClose()}
            scrollable={true}
            className="profile_edit_modal"
            centered
        >
            <Modal.Body>
                <div className="account_setting_header">
                    <h2 className="main_heading">Login Details</h2>
                    <Button className="edit_profile_option" onClick={onClose}>
                        <IoMdClose />
                    </Button>
                </div>
                <Form onSubmit={updatePasswordSubmitHandler} className="login_register_form">

                    <Form.Group controlId="emailaddress" className="form_row">
                        <Form.Label>Email <span>*</span></Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Email" 
                            required 
                            defaultValue={user && user.email}
                            name="emailaddress"
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group controlId="currentPassword" className="form_row">
                        <Form.Label>Current Password <span>*</span></Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Current Password" 
                            required 
                            value={oldPassword}
                            name="oldPassword"
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="newPassword" className="form_row">
                        <Form.Label>New Password <span>*</span></Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="New Password" 
                            required 
                            value={newPassword}
                            name="newPassword"
                            onChange={(e) => setNewPassword(e.target.value)}
                            aria-describedby="passwordHelpBlock"
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must contain at least 8 characters.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="confirmPassword" className="form_row">
                        <Form.Label>Confirm New Password <span>*</span></Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Confirm New Password" 
                            required 
                            value={confirmPassword}
                            name="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" className="btn_background" disabled={loading}>
                        {loading ? "Processing" : "Save Changes"}
                    </Button>

                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default PasswordUpdate