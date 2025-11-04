interface SocialLinkProps {
    Icon?: React.ElementType;
    href: string;
    text: string;
    variant?: 'light' | 'dark';
}

export default function SocialLink({
    Icon,
    href,
    text,
    variant = 'light'
}: SocialLinkProps) {
    return (
        <a
            href={href}
            className={`flex flex-row items-center space-x-2 border-b pb-1
                border-transparent transition-all duration-500
                 ${variant === 'light' ? 'hover:border-white' : 'hover:border-[#1c335e]'}`}
        >
            {Icon && <Icon />}
            <p>{text}</p>
        </a>
    );
}