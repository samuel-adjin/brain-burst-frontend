import Button from "../../../common/components/button";
import {Login} from "../../../common/icons/login.tsx";
import {Register} from "../../../common/icons/register.tsx";
import Header from "../../../common/components/header";
import {Link} from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="content-container-default">
        <div className={"space-y-24"}>
            {<Header/>}
            <div className={"space-y-10 flex flex-col"}>
                <Link to="/login">
                    <Button icon={<Login/>} label={"Login"} className={"bg-btn-primary w-64 py-5 rounded-r-3xl justify-center"}/>
                </Link>
                <Link to="/register">
                    <Button icon={<Register/>} label={"Register"} className={"bg-btn-secondary w-64 py-5 rounded-r-3xl justify-center"}/>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default LandingPage