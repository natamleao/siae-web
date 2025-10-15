import { BsInstagram } from "react-icons/bs";
import { MdMail } from "react-icons/md";
import SocialLink from "./socialLink";


interface SocialGroupProps {
    title: string;
}

export default function SocialGroup({ title }: SocialGroupProps) {
    return (
        <div className="space-y-3">
            <p className="font-semibold">{title}</p>
            <SocialLink Icon={BsInstagram} href="#" text="Instagram" />
            <SocialLink Icon={MdMail} href="#" text="Email" />
        </div>
    );
}
