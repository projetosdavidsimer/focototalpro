export default function PlannerLoading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between animate-pulse">
        <div>
          <div className="h-8 w-48 bg-muted rounded mb-2" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-card p-6 flex flex-col animate-pulse"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-muted p-2 w-9 h-9" />
              <div className="h-6 w-32 bg-muted rounded" />
            </div>
            <div className="h-4 w-full bg-muted rounded mb-2" />
            <div className="h-4 w-3/4 bg-muted rounded mb-4" />
            <div className="mt-auto">
              <div className="h-10 w-full bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
