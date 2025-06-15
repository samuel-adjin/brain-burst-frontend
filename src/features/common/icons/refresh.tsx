
import type {IconProps} from "../../../types/icons.ts";


export const Refresh = ({color="currentColor",size="24",...attributes}:IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            {...attributes}
        >
            <path
                fill="currentColor"
                d="M11.48 0h2.44l2.8 4l-2.8 4h-2.44l2.1-3H12a7 7 0 1 0 5.563 2.75l1.235-1.648A9 9 0 1 1 12 3h1.58z"
            ></path>
        </svg>
    )
}
