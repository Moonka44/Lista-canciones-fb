import react, { useState } from "react";
import { signup } from "../../Store/auth/authAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    Card,
    FormGroup,
    Label,
    Form,
    Input,
    Button,
    Spinner
} from "reactstrap";
const Signup = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {loader} = useSelector((state) => state.auth);
    return (
        <div className="p-4">
            <Card className="p-4">
                <h1> Signup </h1>
                
                <Form
                onSubmit= {(e) => {

                    e.preventDefault ();
                    dispatch (signup({email,password}));
                    setEmail ("");
                    setPassword ("");
                }}
                >
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                         required
                        type="email"
                        placeholder= "Ingresa un correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                       <Input
                       required
                        type="password"
                        placeholder= "Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <div className="d-flex justify-content-center align-items-center ">
                        <Button color="primary">
                            {loader ? <Spinner color="light" size="sm" /> : "Signup"}
                        </Button>
                    </div>
                </Form>
                <p className="text-center pt-3">
                    ¿Ya tienes cuenta? <Link to="/signin">Signin</Link>
                </p>
            </Card>

        </div>

    );
};

export default Signup;