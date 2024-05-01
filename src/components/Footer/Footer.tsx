import { FaInstagram } from "react-icons/fa"
import Logo from "../Logo/Logo"
import { BsTwitterX } from "react-icons/bs"
import { RiFacebookFill } from "react-icons/ri"
import Typography from "../Typography/Typography"

export default function Footer() {
    return (
        <div className='w-full flex-row py-10'>
            <div className="w-full flex justify-between">
                <div className="w-[15%]">
                    <Logo variant="padraoWhite" width="lg"/>
                </div>

                <div className="flex gap-4">
                    <div className="btn btn-circle btn-outline">
                        <FaInstagram className="text-xl" color="white" />
                    </div>
                    <div className="btn btn-circle btn-outline">
                        <BsTwitterX className="text-xl" color="white" />
                    </div>
                    <div className="btn btn-circle btn-outline">
                        <RiFacebookFill className="text-xl" color="white" />
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-neutral my-10"/>

            <div className="w-full flex justify-center">
                <Typography variant="body1" color="white">© 2024 Copyright by educ.ai</Typography>
            </div>
        </div>
    )
}

