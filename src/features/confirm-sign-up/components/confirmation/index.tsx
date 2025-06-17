import {type FormEvent, useState} from "react";
import {confirmUserAccount, resendConfirmation} from "../../../../lib/data/auth.ts";
import {useNavigate} from "react-router-dom";
import Button from "../../../common/components/button";
import {Bounce, toast, ToastContainer} from "react-toastify";



const ConfirmAccount = () => {
    const [code, setCode] = useState("")
    const navigate = useNavigate();
    const email = sessionStorage.getItem('temp_auth_email');
    const[loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {

        const isVerified = await confirmUserAccount(code)
            if(isVerified){
                setLoading(true);
                navigate("/games/selection")
            }
        } catch (err) {
            console.error("confirmation error", err);
        }
    };

    const resendCode = async (e: FormEvent) => {
        e.preventDefault();
        // toast.info("Resending Code...");
        await resendConfirmation(email ?? "")
        toast.success("Confirmation code sent successfully!");


    }
    return (
        <div className={"bg-white p-10 rounded-lg text-gray-800 mx-3"}>
            <div >
                <h1 className={"lg:text-5xl text-2xl leading-loose font-bold"}>Email Confirmation</h1>
                <div className={"text-sm lg:text-md"}>
                    <p>We have sent an email to <span className={"text-btn-secondary font-bold"}>{email}</span> to confirm the validity of your email
                        address.</p>
                    <p>After receiving the email use the confirmation code to complete your registration</p>
                </div>
            </div>
            <form className={""}>
                <div className={"flex flex-col justify-center items-center"}>
                    <div className="flex flex-col justify-between items-start gap-2 mt-5  ">
                        <div>
                            <label htmlFor="email" className={"lg:text-md text-sm font-bold"}>Confirmation Code</label>
                        </div>
                        <input type={"email"} className={"input-field outline-black hover:outline-black"} onChange={(e) => setCode(e.target.value)}/>
                    </div>
                    { !loading ?
                        <div className={"flex justify-start mt-5 gap-x-5 text-sm lg:text-md"}>
                            <Button label={"Confirm"} className={`bg-btn-accent `}  onClick={handleSubmit}/>
                            <Button label={"Resend"} className={`bg-btn-secondary `}  onClick={resendCode}/>
                        </div> : <div>Loading...</div>
                    }
                </div>
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
export default ConfirmAccount
