

import type {IconProps} from "../../../types/icons.ts";


export const Loading = ({color="currentColor",size="24",...attributes}:IconProps) => {
    return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        {...attributes}
        className={"animate-spin"}
    >
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M8.124 5a8 8 0 1 0 7.752 0"
        ></path>
    </svg>
    )
}


