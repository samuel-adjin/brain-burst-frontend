import {Link} from "react-router-dom";
import logo from "../../../../assets/logo.svg"

const Header = () => {
    return (
        <div>
           <Link to="/">
               <div className="flex justify-center mb-5">
                   <img src={logo} alt="logo" className={'w-40'} />
               </div>
           </Link>
            <h1 className="text-5xl text-white font-bold">Brain Burst</h1>
        </div>
    )
}
export default Header
