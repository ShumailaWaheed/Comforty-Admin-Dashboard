
"use client";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
}

const StatsCard = ({ title, value }: StatsCardProps): JSX.Element => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col border border-gray-100 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-[#029FAE]">{value}</p>
    </div>
  );
};

export default StatsCard;
