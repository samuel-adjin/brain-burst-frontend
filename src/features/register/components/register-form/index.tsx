import Button from "../../../common/components/button";
import {Register} from "../../../common/icons/register.tsx";
import {type ChangeEvent, type FormEvent, useState} from "react";
import {register, signUpErrorHandler} from "../../../../lib/data/auth.ts";
import {useNavigate} from "react-router-dom";
import {Bounce, ToastContainer} from "react-toastify";

const RegisterForm = () => {
    const [form, setForm] = useState({ email: '', password: '' , confirmPassword: '' });
    const[showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if(form.password !== form.confirmPassword) {
                throw new Error("Passwords don't match");
            }
            const isRegistered = await register({email:form.email,password:form.password});
            if(isRegistered){
                setForm({ email: '', password: '' , confirmPassword: '' })
                navigate("/auth/confirm-sign-up");
            }

        } catch (err) {
            await signUpErrorHandler(err as Error);
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
                        <input type={"email"} className={"input-field"}  onChange={(e) => setForm({ ...form, email: e.target.value })}/>
                    </div>
                    <div className="flex flex-col justify-between items-start gap-2 mt-2 text-white">
                        <div>
                            <label htmlFor="password" className={"text-sm"}>Password</label>
                        </div>
                        <input type={showPassword ?"text" : "password"} className={"input-field"}  onChange={(e) => setForm({ ...form, password: e.target.value })}/>
                    </div>
                    <div className="flex flex-col justify-between items-start gap-2 mt-2 text-white">
                        <div>
                            <label htmlFor="password" className={"text-sm"}>Confirm Password</label>
                        </div>
                        <input type={showPassword ?"text" : "password"} className={"input-field"}  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}/>
                    </div>
                    <div className={"flex justify-start text-white text-sm gap-2"}>
                        <input type="checkbox"  value="show" onChange={(e: ChangeEvent<HTMLInputElement>)=>{setShowPassword(e.target.checked);}}/>
                        <label htmlFor="email" className={"text-gray-500 text-sm"}>Show password</label>
                    </div>

                </div>
                <Button icon={<Register/>} label={"Register"} className={"bg-btn-accent w-64 py-5 rounded-r-3xl justify-center"} onClick={handleSubmit}/>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
                className={"text-sm"}
            />
        </div>
    )
}
export default RegisterForm
