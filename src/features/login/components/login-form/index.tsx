import Button from "../../../common/components/button";
import {Login} from "../../../common/icons/login.tsx";
import {useState} from "react";
import {Link} from "react-router-dom";



const LoginForm = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const[showPassword, setShowPassword] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // const user = await Auth.signIn(form.username, form.password);
            console.log("User logged in", {email: form.email, password: form.password});
        } catch (err) {
            console.error("Login error", err);
        }
    };

    return (
        <div>
            <form className={"space-y-10"}>
                <div className={"space-y-3"}>
                    <div className="flex flex-col justify-between items-start gap-2 mt-2 text-white ">
                        <div>
                            <label htmlFor="email" className={"text-sm"}>Email</label>
                        </div>
                        <input type={"email"} className={"input-field"} onChange={(e) => setForm({ ...form, email: e.target.value })}/>
                    </div>
                    <div className="flex flex-col justify-between items-start gap-2 mt-2 text-white">
                        <div>
                            <label htmlFor="password" className={"text-sm"}>Password</label>
                        </div>
                        <input type={showPassword ?"text" : "password"} className={"input-field"} onChange={(e) => setForm({ ...form, password: e.target.value })}/>
                    </div>
                   <div className={"flex justify-between text-gray-500 gap-2 text-sm"}>
                       <div>
                           <input type="checkbox"  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setShowPassword(e.target.checked);}} value="show"/>
                           <label htmlFor="email" className={"ml-1"}>Show password</label>
                       </div>
                       <Link to={"/auth/forgot-password"} className={"text-sm"}>
                           <div>Forgot Password?</div>
                       </Link>
                   </div>

                </div>
                <Button icon={<Login/>} label={"Login"} className={"bg-btn-accent-light w-64 py-5 rounded-r-3xl justify-center"} onClick={handleSubmit}/>
            </form>

        </div>
    )
}
export default LoginForm
