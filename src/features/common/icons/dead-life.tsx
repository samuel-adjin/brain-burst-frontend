import type {IconProps} from "../../../types/icons.ts";


export const DeadLife = ({color="currentColor",size="24",...attributes}:IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 72 72"
            width={size}
            height={size}
            {...attributes}
        >
            <path
                fill="#FF473E"
                d="M39.1 54c1-.9 1-2.4.2-3.4l-7.6-8.8c-.8-.9-.7-2.2.1-3.1l.2-.1l8.4-8.1c.8-.7.9-1.9.3-2.7c0 0-6.7-10.2-6.8-10.4c-8-8-21.2-7.7-28.8 1C-.6 24.9-1.3 34.6 3.4 42C5 44.5 7 46.4 9.3 47.9l17.8 14.4c1 .8 2.5.8 3.4-.1z"
            ></path>
            <path
                fill="#FF473E"
                d="M66.9 18.6c-5.7-6.6-14.5-8.4-22-5.6c-2.2.8-3.1 3.5-2 5.6l5.3 9.7l.1.2c.7 1.2.3 2.8-.7 3.6L37.8 40c-.6.5-.7 1.3-.3 1.9l6.9 9.6l.1.1c.5.7.4 1.6-.3 2.2L31.9 64.1c-.7.6-.7 1.6 0 2.1l1.8 1.4c1.4 1.1 3.4 1.1 4.8 0l24.3-19.8s.1 0 .1-.1c1.8-1.2 3.5-2.8 4.9-4.7c5.4-7.2 5.1-17.5-.9-24.4"
            ></path>
        </svg>
    )
}


