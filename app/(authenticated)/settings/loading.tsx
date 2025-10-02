export default function SettingsLoading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between animate-pulse">
        <div>
          <div className="h-8 w-48 bg-muted rounded mb-2" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
      </div>

      {/* Settings Sections Skeleton */}
      <div className="grid gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-card p-6 animate-pulse"
          >
            <div className="h-6 w-32 bg-muted rounded mb-4" />
            <div className="space-y-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="flex items-center justify-between">
                  <div>
                    <div className="h-4 w-32 bg-muted rounded mb-2" />
                    <div className="h-3 w-48 bg-muted rounded" />
                  </div>
                  <div className="h-6 w-12 bg-muted rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
