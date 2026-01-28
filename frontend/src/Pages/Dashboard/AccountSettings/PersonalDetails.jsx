import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { IoMdClose } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, loadUser, updateProfile } from "../../../Store/Actions/UserActions";
import { UPDATE_PROFILE_RESET } from "../../../Store/Types/UserTypes";

const PersonalDetails = ({show, onClose}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    const { error, isUpdated } = useSelector((state) => state.profile);

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("");

    const handleProfileSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("firstname", firstname);
        formData.set("lastname", lastname);
        formData.set("gender", gender);

        dispatch(updateProfile(formData));
    }

    useEffect(() => {

        if (isAuthenticated === false) {
            navigate("/login")
        }

        if (user) {
            setFirstname(user.firstname);
            setLastname(user.lastname);
            setGender(user.gender);
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
            dispatch(loadUser());
            
            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [isAuthenticated, dispatch, error, user, isUpdated, navigate, enqueueSnackbar]);


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
                    <h2 className="main_heading">Personal Details</h2>
                    <Button className="edit_profile_option" onClick={onClose}>
                        <IoMdClose />
                    </Button>
                </div>
                <Form onSubmit={handleProfileSubmit} className="login_register_form">
                    <Form.Group controlId="firstname" className="form_row">
                        <Form.Label>First Name <span>*</span></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="First Name" 
                            required 
                            value={firstname}
                            name="firstname"
                            onChange={(e) => setFirstname(e.target.value)}
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
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="form_row">
                        <Form.Check
                            type="radio"
                            id="gender_male"
                            name="gender"
                            label="Male"
                            value={"male"}
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                        <Form.Check
                            type="radio"
                            id="gender_female"
                            name="gender"
                            label="Female"
                            value={"female"}
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" className="btn_background" disabled={loading}>
                        {loading ? "Processing" : "Save"}
                    </Button>

                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default PersonalDetails