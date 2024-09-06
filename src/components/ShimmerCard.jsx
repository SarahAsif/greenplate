import { Breathing } from "react-shimmer";

const ShimmerCard = () => (
  <div className="m-4 p-4 w-64 h-80 bg-gray-100 rounded-lg shadow-lg">
    <Breathing width={256} height={320} />
  </div>
);
export default ShimmerCard;
