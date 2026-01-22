const stats = [
  { value: "1M+", label: "Links Shortened" },
  { value: "500K+", label: "Users" },
  { value: "99.9%", label: "Uptime" },
];

const StatsSection = () => {
  return (
    <section id="stats" className="py-24 px-6 bg-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <h3 className="text-4xl font-bold">{s.value}</h3>
            <p className="text-gray-400 mt-2">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
