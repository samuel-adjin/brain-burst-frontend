import type {IconProps} from "../../../types/icons.ts";


export const Minus = ({color="currentColor",size="24",...attributes}:IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            width={size}
            height={size}
            {...attributes}
        >
            <path
                fill={color}
                d="M8.5 5a.5.5 0 0 1 0 1h-6a.5.5 0 0 1 0-1z"
            ></path>
        </svg>
    )
}
