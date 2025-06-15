import {Link, Outlet} from "react-router-dom";
import {Logout} from "../../../features/common/icons/logout.tsx";
import {useSessionExpiration} from "../../../lib/hooks/use-session-expired.tsx";

const GameLayout = () => {
    useSessionExpiration()
    return (
        <div className="content-container overflow-y-hidden h-screen">
            <div className={"flex justify-between my-5"}>
               <Link to="/games/selection">
                   <h1 className={"text-white"}>Logo</h1>
               </Link>
               <Logout className={"text-white cursor-pointer"} />
            </div>
           <div className={"overflow-hidden"}>
               <Outlet/>
           </div>
        </div>
    )
}
export default GameLayout
