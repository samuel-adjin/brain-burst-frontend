import type {IconProps} from "../../../types/icons.ts";




export const CircleTimer = ({color="currentColor",size="24",...attributes}:IconProps) => {

    return (
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
            />
            <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={attributes.strokeDasharray}
                strokeDashoffset={attributes.strokeDashoffset}
                className="transition-all duration-1000 ease-linear"
            />
        </svg>
    )
}




















