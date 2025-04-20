export default function BlogPostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-6 font-mono text-md mt-5 p-8">
      <div className="h-8 w-24 bg-zinc-800 rounded-md mb-8 animate-pulse" />
      
      <div className="h-12 w-3/4 bg-zinc-800 rounded-md mb-4 animate-pulse" />
      <div className="h-6 w-1/4 bg-zinc-800 rounded-md mb-12 animate-pulse" />
      
      <div className="space-y-6">
        <div className="h-4 w-full bg-zinc-800 rounded-md animate-pulse" />
        <div className="h-4 w-5/6 bg-zinc-800 rounded-md animate-pulse" />
        <div className="h-4 w-4/6 bg-zinc-800 rounded-md animate-pulse" />
        <div className="h-4 w-full bg-zinc-800 rounded-md animate-pulse" />
        <div className="h-4 w-3/6 bg-zinc-800 rounded-md animate-pulse" />
      </div>
      
      {/* Skeleton cho danh sách có dấu chấm tròn */}
      <div className="space-y-4 my-8">
        <div className="flex items-start">
          <div className="h-3 w-3 rounded-full bg-green-500/40 mt-1 mr-3 flex-shrink-0" />
          <div className="h-4 w-5/6 bg-zinc-800 rounded-md animate-pulse" />
        </div>
        <div className="flex items-start">
          <div className="h-3 w-3 rounded-full bg-green-500/40 mt-1 mr-3 flex-shrink-0" />
          <div className="h-4 w-4/6 bg-zinc-800 rounded-md animate-pulse" />
        </div>
        <div className="flex items-start">
          <div className="h-3 w-3 rounded-full bg-green-500/40 mt-1 mr-3 flex-shrink-0" />
          <div className="h-4 w-5/6 bg-zinc-800 rounded-md animate-pulse" />
        </div>
        <div className="flex items-start">
          <div className="h-3 w-3 rounded-full bg-green-500/40 mt-1 mr-3 flex-shrink-0" />
          <div className="h-4 w-3/6 bg-zinc-800 rounded-md animate-pulse" />
        </div>
      </div>
      
      <div className="h-64 w-full bg-zinc-800 rounded-lg my-8 animate-pulse" />
      
      {/* Skeleton cho danh sách đánh số */}
      <div className="space-y-4 my-8">
        <div className="flex items-start">
          <div className="text-green-500/60 w-6 flex-shrink-0 font-mono">1.</div>
          <div className="h-4 w-5/6 bg-zinc-800 rounded-md animate-pulse" />
        </div>
        <div className="flex items-start">
          <div className="text-green-500/60 w-6 flex-shrink-0 font-mono">2.</div>
          <div className="h-4 w-4/6 bg-zinc-800 rounded-md animate-pulse" />
        </div>
        <div className="flex items-start">
          <div className="text-green-500/60 w-6 flex-shrink-0 font-mono">3.</div>
          <div className="h-4 w-5/6 bg-zinc-800 rounded-md animate-pulse" />
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="h-4 w-full bg-zinc-800 rounded-md animate-pulse" />
        <div className="h-4 w-5/6 bg-zinc-800 rounded-md animate-pulse" />
        <div className="h-4 w-4/6 bg-zinc-800 rounded-md animate-pulse" />
      </div>
    </div>
  );
}