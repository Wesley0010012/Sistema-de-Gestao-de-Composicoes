export type CircularImageProps = {
  path: string;
  length: number;
};

export function CircularImage({ path, length }: CircularImageProps) {
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
          src={path}
          width={length}
          height={length}
        />
      </div>
    </div>
  );
}
