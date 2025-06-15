import type {PageHeaderProps} from "../../../../types/global.ts";


const PageHeader = ({ title, subtitle }:PageHeaderProps) => {
    return (
        <div className="text-center mb-12">
            <h1 className=" sm:text-lg text-4xl md:text-5xl font-bold text-white mb-4">
                {title}
            </h1>
            <p className="text-xl text-gray-600">
                {subtitle}
            </p>
        </div>
    )
}
export default PageHeader
