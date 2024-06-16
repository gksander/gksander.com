import { ContentContainer } from "@components/ContentContainer";
import { FaGithub } from "@components/FaGithub";
import { FaLinkedIn } from "@components/FaLinkedIn";

export function Header() {
  return (
    <nav>
      <ContentContainer className="flex justify-between py-5">
        <a href="/" className="inline-block font-bold text-lg">
          gksander
        </a>

        <div className="flex gap-4 md:gap-6 items-center text-black">
          <a href="/posts" className="">
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