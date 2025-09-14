import Image from 'next/image';
import VideoManagerLogo from "../public/hackaton-video-manager-logo.svg";

const Logo = ({ testId }) => (
  <Image 
    src={VideoManagerLogo} 
    alt='hackaton-video-manager-logo' 
    width={230}
    height={32}
    data-testid={testId}
    priority
  />
);

export default Logo;
