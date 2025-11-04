import { BsInstagram } from "react-icons/bs";
import { MdMail } from "react-icons/md";
import SocialLink from "./socialLink";


interface SocialGroupProps {
    title: string;
    instagramName: string;
    emailAddress: string;
}

export default function SocialGroup({ title,emailAddress, instagramName }: SocialGroupProps) {
    return (
        <div className="space-y-3">
            <p className="font-semibold">{title}</p>
            <SocialLink Icon={BsInstagram}  href={`https://www.instagram.com/${instagramName}`} text={instagramName} />
            <SocialLink Icon={MdMail} href={`mailto:${emailAddress}`} text={emailAddress} />
        </div>
    );
}
