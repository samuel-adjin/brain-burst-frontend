import {useState} from "react";
import Button from "../../../common/components/button";
import {Login} from "../../../common/icons/login.tsx";
import {forgotPassword} from "../../../../lib/data/auth.ts";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("User logged in", email);
            await forgotPassword(email)
            navigate("/auth/reset-password")
        } catch (err) {
            console.error("Login error", err);
        }
    };
    return (
        <div className={"text-white space-y-5 text-center"}>
            <div>
                <h1 className={"text-2xl  tracking-wider"}>Forgot password?</h1>
                <p className={"text-gray-600 text-sm"}>No worries, we will send you reset instructions</p>
            </div>
            <div>
                <form className={"justify-start space-y-5"}>
                    <div className="flex flex-col justify-between items-start gap-2 mt-2 text-white ">
                        <div>
                            <label htmlFor="email" className={"text-sm"}>Email</label>
                        </div>
                        <input type={"email"} className={"input-field w-[20vw]"} onChange={(e) =>setEmail(e.target.value)} required={true}/>
                    </div>
                <div className={"flex justify-start"}>
                    <Button icon={<Login/>} label={"Reset password"} className={"bg-btn-accent-light w-[20vw] py-5 rounded-r-3xl justify-center"} onClick={handleSubmit}/>
                </div>
                </form>
                <Link to="/auth/login">
                    <div className={"flex justify-center text-gray-600 text-md mt-5"}>
                        <h4>Back to login</h4>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default ForgotPasswordForm
