import { CircularImage } from "../CircularImage";

export type ComposerImageIconProps = {
  path: string | null;
};

export function ComposerImageIcon({ path }: ComposerImageIconProps) {
  const fallback = "/avatar.png";

  return <CircularImage path={path ?? fallback} length={32} />;
}
