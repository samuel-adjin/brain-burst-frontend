import {Link, Outlet} from "react-router-dom";
import {Logout} from "../../../features/common/icons/logout.tsx";
import {useSessionExpiration} from "../../../lib/hooks/use-session-expired.tsx";
import {logout} from "../../../lib/data/auth.ts";
import {useNavigate} from "react-router-dom";
import logo from "../../../assets/logo.svg";
import {Trophy} from "../../../features/common/icons/trophy.tsx";

const GameLayout = () => {
    useSessionExpiration()
    const navigate = useNavigate()
    return (
        <div className="content-container  h-screen">
            <div className={"flex justify-between my-5"}>
               <Link to="/games/selection">
                  <div>
                      <img src={logo} alt="logo" className={'w-10'} />
                  </div>
               </Link>
               <div className={"flex gap-5"}>
                   <div>
                       <Link to="/games/score-board">
                           <Trophy/>
                       </Link>

                   </div>
                   <Logout className={"text-white cursor-pointer"} onClick={ async () => {
                       await logout()
                       navigate("/auth/login")

                   }} />
               </div>
            </div>
           <div className={"overflow-hidden"}>
               <Outlet/>
           </div>
        </div>
    )
}
export default GameLayout
