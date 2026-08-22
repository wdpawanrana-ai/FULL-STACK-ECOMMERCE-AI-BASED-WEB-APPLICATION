import { Users, Target, Award, Shield } from 'lucide-react';

/**
 * About page for PoojaEV describing our journey, values and dedication to quality EV vehicles.
 */
const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Precision Safety',
      description: 'Every component, from standard tire rims to lithium batteries, undergoes strict safety and quality testing.'
    },
    {
      icon: Award,
      title: 'Genuine Factory OEM',
      description: 'We are certified suppliers of authentic OEM factory spares ensuring maximum lifespan for your vehicle.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Helping 5,000+ happy riders switch to zero-emission mobility seamlessly.'
    },
    {
      icon: Target,
      title: 'Ecological Innovation',
      description: 'Constantly engineering improved range extensions and fast-charging grid integrations.'
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">

        {/* About Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-primary font-bold uppercase tracking-[0.25em] text-xs">PoojaEV Mission</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6">About POOJAEV</h1>
          <p className="text-lg md:text-xl text-foreground/60 leading-relaxed font-medium">
            Building performance-driven electric vehicles and parts showroom for eco-conscious riders.
          </p>
        </div>

        {/* Pillars / Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {values.map((value, index) => (
            <div key={index} className="bg-secondary/40 border border-border/40 rounded-3xl p-8 hover:border-primary/30 transition-all duration-300">
              <div className="w-14 h-14 mb-6 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <value.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed font-medium">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Company Story Overview Section */}
        <div className="bg-secondary/20 border border-border/40 rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-black text-foreground mb-4">Our Journey</h2>
          <p className="text-sm text-foreground/75 leading-relaxed font-medium mb-4">
            Founded with a vision to revolutionize urban transportation, PoojaEV has grown from a specialized EV service center to a premier national distributor of premium electric scooters, state-of-the-art Lithium batteries (featuring NMC & LFP chemical composition), and durable manufacturer-certified spare parts.
          </p>
          <p className="text-sm text-foreground/75 leading-relaxed font-medium">
            We believe that clean energy shouldn't come with compromises. That's why every product in our catalog—ranging from heavy duty braking assemblies to smart chargers—is sourced, engineered, and certified by experienced automobile mechanics to meet strict performance metrics on rough terrains.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;