import react, {useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = ({children}) => {
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        if (user?.id){
            navigate("/");
        }
    }, [user, navigate]);

    return <div>{children}</div>;
};

export default Auth;