export default function SkeletonCard() {
  return (
    <div className="flex animate-pulse flex-col border p-6">
      <div className="mb-3 h-6 w-3/4 bg-gray-200"></div>
      <p className="mb-6 h-16 w-full flex-grow bg-gray-200"></p>
      <div className="h-6 w-full bg-gray-200"></div>
    </div>
  );
}
