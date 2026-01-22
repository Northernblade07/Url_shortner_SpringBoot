import {motion} from "framer-motion";

const features = [
  { title: "Fast & Secure", desc: "JWT-based authentication and blazing performance." },
  { title: "Analytics", desc: "Track clicks and performance in real-time." },
  { title: "Custom URLs", desc: "Personalized short links for branding." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
            <p className="text-gray-400">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
