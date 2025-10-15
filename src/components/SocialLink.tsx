import type { IconType } from "react-icons";

interface SocialLinkProps {
    Icon: IconType;
    href: string;
    text: string;
}

export default function SocialLink({ Icon, href, text }: SocialLinkProps) {
    return (
        <a href={href} className="flex flex-row items-center space-x-2 border-b-1 pb-1 border-transparent hover:border-white transition-all duration-500">
            <Icon />
            <p>{text}</p>
        </a>
    );
}