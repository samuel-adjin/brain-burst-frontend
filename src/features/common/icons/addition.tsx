import type {IconProps} from "../../../types/icons.ts";


export const Addition = ({color="currentColor",size="24",...attributes}:IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
            width={size}
            height={size}
            {...attributes}
        >
            <path
                fill={color}
                d="M960 0q133 0 255 34t230 96t194 150t150 195t97 229t34 256q0 133-34 255t-96 230t-150 194t-195 150t-229 97t-256 34q-133 0-255-34t-230-96t-194-150t-150-195t-97-229T0 960q0-133 34-255t96-230t150-194t195-150t229-97T960 0m0 1792q115 0 221-30t198-84t169-130t130-168t84-199t30-221q0-115-30-221t-84-198t-130-169t-168-130t-199-84t-221-30q-115 0-221 30t-198 84t-169 130t-130 168t-84 199t-30 221q0 115 30 221t84 198t130 169t168 130t199 84t221 30m64-896h512v128h-512v512H896v-512H384V896h512V384h128z"
            ></path>
        </svg>
    )
}
