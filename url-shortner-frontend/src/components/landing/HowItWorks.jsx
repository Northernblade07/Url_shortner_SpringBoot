const steps = [
  "Paste your long URL",
  "Generate a short link",
  "Track clicks & analytics",
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="space-y-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10">
              {step}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
