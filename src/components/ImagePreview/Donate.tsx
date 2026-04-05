const Donate = () => {
  return (
    <a
      href="http://buymeacoffee.com/reactify.solutions"
      target="_blank"
      rel="noopener noreferrer"
      className="group mb-3 flex items-center gap-4 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 px-5 py-3.5 shadow-sm hover:shadow-md hover:border-amber-300 transition-all"
    >
      <span className="text-2xl" aria-hidden="true">☕</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-amber-900">Enjoying unbg?</p>
        <p className="text-xs text-amber-700/70">
          Help us keep it free - your support means the world!
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-sm group-hover:bg-amber-600 transition-colors">
        Support us
      </span>
    </a>
  );
};

export default Donate;
