import {type ChangeEvent, type FormEvent, useState} from "react";
import Button from "../../../common/components/button";
import {Login} from "../../../common/icons/login.tsx";
import {resetUserPassword} from "../../../../lib/data/auth.ts";



const PasswordResetForm = () => {
    const [form, setForm] = useState({ password: '' , confirmPassword: '' });
    const[showPassword, setShowPassword] = useState(false);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if(form.password !== form.password) {
                throw new Error("Passwords don't match");
            }
            console.log("User logged in", form);
            await resetUserPassword({email:"",password:form.password,confirmationCode:""});
        } catch (err) {
            console.error("Register error", err);
        }
    };
    return (
        <div>
            <form className={"space-y-10"}>
                <div className={"space-y-3"}>
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
                    <Button icon={<Login/>} label={"Reset password"} className={"bg-btn-secondary w-64 py-5 rounded-r-3xl justify-center"} onClick={handleSubmit}/>

                </div>
            </form>

        </div>)
}
export default PasswordResetForm
