import Link from "next/link";
import { categories } from "../../data/products";
const CategoryGrid = () => {
  return (
    <section className="py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1.5 w-8 bg-primary rounded-full" />
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Quick Selection</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-foreground/50 leading-relaxed">
            Everything you need for your electric vehicle, from high-performance scooters to genuine replacement parts.
          </p>
        </div>
        <Link
          href="/products"
          className="text-primary font-bold text-sm uppercase tracking-widest hover:underline underline-offset-8 transition-all"
        >
          View All Products
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/products?category=${category.name}`}
            className="group relative h-[320px] rounded-[2rem] overflow-hidden bg-secondary/50 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 animate-slide-in-bottom shadow-lg"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background Image */}
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale opacity-40 group-hover:opacity-75 group-hover:grayscale-0"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent group-hover:from-primary/80 group-hover:via-primary/40 transition-all duration-500" />

            {/* Content Labels */}
            <div className="absolute bottom-0 left-0 w-full p-8 transition-transform duration-500 group-hover:-translate-y-2">
              <h3 className="text-2xl font-black text-foreground group-hover:text-white transition-colors mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-foreground/60 group-hover:text-white/80 transition-colors">
                {category.description}
              </p>

              {/* Animated Arrow */}
              <div className="mt-6 flex items-center gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                <span className="text-xs font-bold text-white uppercase tracking-widest">Shop Now</span>
                <div className="h-[1px] w-8 bg-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};


export default CategoryGrid;
