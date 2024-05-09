import RequestCard from "@/components/requestCard";

export default function MedicalSupplies() {
  const list = [
    {
      title: "Request 1",
      img: "/images/fruit-1.jpeg",
      link: "/viewRequest",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-2">
      <RequestCard data={list[0]}></RequestCard>
    </div>
  );
}
