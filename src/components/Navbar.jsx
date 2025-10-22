export default function Navbar() {
  return (
    <nav className="bg-white/70 shadow-sm w-full transition-all duration-600 backdrop-blur-md fixed top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-5 py-3">
        <h1 className="text-xl font-semibold tracking-wide text-slate-800">
          <span className="bg-linear-to-r from-indigo-600 to-cyan-400 text-transparent bg-clip-text">NetScan</span>
        </h1>
      </div>
    </nav>
  );
}
