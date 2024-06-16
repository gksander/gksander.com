import { ContentContainer } from "./ContentContainer";

export function Footer({ isFat }: { isFat?: boolean }) {
  const year = new Date().getFullYear();
  return (
    <ContentContainer as="footer" className="py-5" isFat={isFat}>
      <p className="text-sm text-black-light">
        © {year} Grant Sander. All rights reserved.
      </p>
    </ContentContainer>
  );
}
