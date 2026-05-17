import { Truck, ShieldCheck, Zap, Wrench, Settings, Battery } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: Battery,
      title: 'High-Range Batteries',
      description: 'LFP & NMC cells with up to 5-year replacement warranty.'
    },
    {
      icon: ShieldCheck,
      title: 'Original Spare Parts',
      description: '100% genuine factory-certified spare parts for all EV models.'
    },
    {
      icon: Wrench,
      title: 'Expert Service',
      description: 'Certified EV technicians and doorstep service assistance.'
    },
    {
      icon: Zap,
      title: 'Smart Charging',
      description: 'Next-gen fast chargers compatible with all major EV brands.'
    }
  ];

  return (
    <section className="py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative p-8 rounded-[2rem] bg-secondary/30 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 animate-slide-in-bottom shadow-sm hover:shadow-xl hover:shadow-primary/10"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Animated Icon Container */}
            <div className="w-16 h-16 mb-8 rounded-[1.25rem] bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6">
              <feature.icon size={30} className="transition-transform duration-500 group-hover:scale-110" />
            </div>

            <h3 className="text-xl font-black text-foreground mb-3 tracking-tight">
              {feature.title}
            </h3>
            <p className="text-sm text-foreground/50 leading-relaxed font-medium">
              {feature.description}
            </p>

            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <feature.icon size={80} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


export default FeatureSection;