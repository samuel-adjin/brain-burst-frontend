import {Outlet} from "react-router-dom";
import {Account} from "../../../features/common/components/account";

const AuthLayout = () => {
    return (
        <div>
            <Account>
                <Outlet/>
            </Account>
            <div>

            </div>
        </div>
    )
}
export default AuthLayout
