import { ContentContainer } from "@components/ContentContainer";
import { FaGithub } from "@components/FaGithub";
import { FaLinkedIn } from "@components/FaLinkedIn";

type Props = {
  isFat?: boolean;
};

export function Header({ isFat = false }: Props) {
  return (
    <nav>
      <ContentContainer className="flex justify-between py-5" isFat={isFat}>
        <a href="/" className="inline-block font-bold text-lg">
          gksander
        </a>

        <div className="flex gap-4 md:gap-6 items-center text-black">
          <a
            href="/posts"
            className="font-bold text-sm px-3 py-1 -mr-3 rounded-full hover:bg-background-dark transition-colors duration-150"
          >
            Posts
          </a>

          {SOCIAL_LINKS.map((link) => (
            <a
              href={link.href}
              key={link.href}
              aria-label={`Link to social profile`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <link.icon className="w-7 h-7" />
            </a>
          ))}
        </div>
      </ContentContainer>
    </nav>
  );
}

const SOCIAL_LINKS = [
  { icon: FaGithub, href: "https://github.com/gksander" },
  {
    icon: FaLinkedIn,
    href: "https://linkedin.com/in/gksander",
  },
];
