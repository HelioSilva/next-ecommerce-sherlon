import Image from "next/image";
import React from "react";
const ScrollInfinito = ({
  loaderRef,
  children,
  loading,
}: {
  loaderRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  loading: boolean;
}) => {
  return (
    <div className="flex flex-col w-full space-y-5">
      {children}

      {/* Loader aparece no final */}
      {loading && (
        <div ref={loaderRef} className="flex justify-center py-10">
          <Image
            src="/images/loading.svg"
            alt="loading"
            width={128}
            height={128}
          />
        </div>
      )}
    </div>
  );
};

export default ScrollInfinito;
