import type {IconProps} from "../../../types/icons.ts";


export const Division = ({color="currentColor",size="24",...attributes}:IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 22"
            width={size}
            height={size}
            {...attributes}
        >
            <path
                fill={color}
                d="M12 8h-2V7H9V5h1V4h2v1h1v2h-1Zm5 4H5v-2h12Zm-5 6h-2v-1H9v-2h1v-1h2v1h1v2h-1Z"
            ></path>
        </svg>
    )
}



