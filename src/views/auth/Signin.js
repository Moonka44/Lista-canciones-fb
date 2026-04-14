import react, { useState } from "react";
import { signin } from "../../Store/auth/authAction";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    Card,
    FormGroup,
    Label,
    Form,
    Input,
    Button
} from "reactstrap";
const Signin = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="p-4">
            <Card className="p-4">
                <h1> Signin </h1>
                
                <Form
                onSubmit= {(e) => {

                    e.preventDefault ();
                    dispatch (signin({email,password}));
                    setEmail ("");
                    setPassword ("");
                }}
                >
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                        type="email"
                        placeholder= "Ingresa un correo"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                       <Input
                        type="password"
                        placeholder= "Ingresa tu contraseña"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <div className="d-flex justify-content-center align-items-center ">
                        <Button color="primary">
                            SignIn
                        </Button>
                    </div>
                </Form>
                <p className="text-center pt-3">
                    ¿No tienes cuenta? <Link to="/signup">Signup</Link>
                </p>
            </Card>

        </div>

    );
};

export default Signin;