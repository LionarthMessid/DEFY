import Card from "@/components/card";
import finnABI from "@/utils/contract/finnABI.json";
import { useContractRead } from "wagmi";

export default function ShowBucket({ address }: { address: string }) {
  const { data: bucketDetails, isLoading } = useContractRead({
    address: address as `0x${string}`,
    abi: finnABI,
    functionName: "getBucketDetails",
    args: [address],
    onError: (error) => {
      console.log("error isss", error);
    },
    onSuccess: (data: any) => {
      console.log("fetched isss", data); // Log the data once it is successfully fetched
    },
  });

  // Log bucketDetails only after it's fetched
  if (bucketDetails) {
    console.log("bucketDetails", bucketDetails);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <Card data={bucketDetails} />;
}
