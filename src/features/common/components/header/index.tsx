import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div>
           <Link to="/">
               <h1>Logo</h1>
           </Link>
            <h1 className="text-5xl text-white font-bold">Brain Burst</h1>
        </div>
    )
}
export default Header
