import Button from "../../../common/components/button";
import {Login} from "../../../common/icons/login.tsx";



const LoginForm = () => {
    return (
        <div>
            <form className={"space-y-10"}>
                <div className={"space-y-3"}>
                    <div className="flex flex-col justify-between items-start gap-2 mt-2 text-white ">
                        <div>
                            <label htmlFor="email" className={"text-sm"}>Email</label>
                        </div>
                        <input type={"email"}
                               className={"block w-64 outline-1 rounded-md py-2 focus:outline-white px-3 text-sm"}/>
                    </div>
                    <div className="flex flex-col justify-between items-start gap-2 mt-2 text-white">
                        <div>
                            <label htmlFor="password" className={"text-sm"}>Password</label>
                        </div>
                        <input type={"password"}
                               className={"block w-64 outline-1 rounded-md py-2 focus:outline-white px-3 text-sm"}/>
                    </div>
                   <div className={"flex justify-start text-white text-sm gap-2"}>
                       <input type="checkbox"  value="show"/>
                       <label htmlFor="email">Show password</label>
                   </div>

                </div>
                <Button icon={<Login/>} label={"Login"} className={"bg-btn-accent-light w-64 py-5 rounded-r-3xl justify-center"}/>
            </form>

        </div>
    )
}
export default LoginForm
