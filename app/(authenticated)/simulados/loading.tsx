export default function SimuladosLoading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between animate-pulse">
        <div>
          <div className="h-8 w-48 bg-muted rounded mb-2" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
        <div className="h-10 w-32 bg-muted rounded" />
      </div>

      {/* Exams Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-card p-6 animate-pulse"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 w-32 bg-muted rounded" />
              <div className="h-8 w-16 bg-muted rounded-full" />
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-3/4 bg-muted rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-9 flex-1 bg-muted rounded" />
              <div className="h-9 w-20 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
