const TopBar = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">Welcome back 👋</span>
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-black font-bold">
          U
        </div>
      </div>
    </header>
  );
};

export default TopBar;
