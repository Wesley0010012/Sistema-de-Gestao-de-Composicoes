export type CircularImageProps = {
  path: string;
  length: number;
};

const fallbackImagePath = "/avatar.png";

export function resolveImagePath(path: string): string {
  if (!path) return fallbackImagePath;

  try {
    const url = new URL(path);
    const isLocalBackend = ["localhost", "127.0.0.1", "0.0.0.0"].includes(
      url.hostname,
    );

    if (isLocalBackend && url.pathname.startsWith("/storage/")) {
      return `${url.pathname}${url.search}${url.hash}`;
    }

    return path;
  } catch {
    return path;
  }
}

export function CircularImage({ path, length }: CircularImageProps) {
  const imagePath = resolveImagePath(path);

  return (
    <div className="d-flex align-items-center gap-2">
      <div
        style={{
          width: length,
          height: length,
          borderRadius: "50%",
        }}
      >
        <img
          style={{
            borderRadius: "50%",
          }}
          src={imagePath}
          width={length}
          height={length}
          onError={(event) => {
            if (event.currentTarget.src.endsWith(fallbackImagePath)) return;
            event.currentTarget.src = fallbackImagePath;
          }}
        />
      </div>
    </div>
  );
}
