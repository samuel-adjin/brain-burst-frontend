import type {ButtonProps} from "../../../../types/global.ts";


const ActionButton = ({ icon, label, onClick, disabled, className }:ButtonProps) => {
    return (
        <div className="relative inline-block">
            <button
                onClick={onClick}
                disabled={disabled}
                className={`flex items-center gap-2 px-12 py-4 font-bold text-xl shadow-lg rounded-l-2xl rounded-r-2xl transition-all duration-300 transform ${className}`}
                style={{
                    clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0% 100%)",
                }}
            >
                {label}
                {icon}
            </button>
        </div>
    )
}
export default ActionButton
