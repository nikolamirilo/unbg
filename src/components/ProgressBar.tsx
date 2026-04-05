export default function ProgressBar({
  doneCount,
  totalCount,
}: {
  doneCount: number;
  totalCount: number;
}) {
  if (totalCount <= 1) return null;

  const allDone = doneCount === totalCount;
  const pct = Math.round((doneCount / totalCount) * 100);

  return (
    <div className="mb-4 space-y-3">
      <div className="flex items-center gap-3">
        <div
          className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Processing progress: ${doneCount} of ${totalCount} images done`}
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${allDone ? "bg-emerald-500" : "bg-indigo-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span
          className={`text-xs font-medium whitespace-nowrap ${allDone ? "text-emerald-600" : "text-gray-500"}`}
          aria-live="polite"
        >
          {allDone ? "All done" : `${doneCount}/${totalCount} done`}
        </span>
      </div>

      {allDone && (
        <a
          href="http://buymeacoffee.com/reactify.solutions"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 px-5 py-4 shadow-sm hover:shadow-md hover:border-amber-300 transition-all"
        >
          <span className="text-3xl" aria-hidden="true">🎉</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-900">
              All {totalCount} images processed successfully!
            </p>
            <p className="text-xs text-amber-700/70">
              unbg is free forever. If it saved you time, consider buying us a
              coffee.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-sm group-hover:bg-amber-600 transition-colors flex items-center gap-1.5">
            <span aria-hidden="true">☕</span>
            Support us
          </span>
        </a>
      )}
    </div>
  );
}
