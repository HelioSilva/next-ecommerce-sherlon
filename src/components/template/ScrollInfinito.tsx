import Image from "next/image";
import React from "react";
import Loading from "../common/Loading";
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
      {loading && <Loading loadRef={loaderRef} />}
    </div>
  );
};

export default ScrollInfinito;
