import Header from "../header";
import type {ReactNode} from "react";

type AccountProps = {
    children: ReactNode;
}

export const Account = ({children}:AccountProps) => {
    return (
        <div className={"content-container-default flex-col space-y-10"}>
            {<Header/>}
            <div>
                {children}
            </div>
        </div>
    )
}
