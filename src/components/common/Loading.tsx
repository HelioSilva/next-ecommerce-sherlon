import Image from "next/image";

const Loading = ({ ref }: { ref: React.Ref<HTMLDivElement> }) => {
  return (
    <div ref={ref} className="flex justify-center py-10">
      <Image src="/images/loading.svg" alt="loading" width={128} height={128} />
    </div>
  );
};

export default Loading;
