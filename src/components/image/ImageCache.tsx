import Image from "next/image";
import { CSSProperties } from "react";

const ImageCache = ({
  src,
  fill,
  width,
  height,
  alt,
  className,
  sizes,
  style,
}: {
  fill?: boolean;
  src: string;
  width?: number;
  height?: number;
  className?: string;
  alt: string;
  sizes?: string;
  style?: CSSProperties | undefined;
}) => {
  return (
    <Image
      className={className}
      fill={fill}
      alt=""
      src={src}
      width={width}
      height={height}
      quality={50}
      sizes={sizes}
      style={{
        width: "auto",
        height: "auto",
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
      }}
    />
  );
};

export default ImageCache;
