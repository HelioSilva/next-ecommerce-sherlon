import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex justify-center py-10">
      <Image src="/images/loading.svg" alt="loading" width={128} height={128} />
    </div>
  );
};

export default Loading;
