import type {IconProps} from "../../../types/icons.ts";


export const Login = ({color="currentColor",size="24",...attributes}:IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            {...attributes}
        >
            <path
                fill={color}
                d="M10 11V8l5 4l-5 4v-3H1v-2zm-7.542 4h2.124A8.003 8.003 0 0 0 20 12A8 8 0 0 0 4.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7"
            ></path>
        </svg>
    )
}
