"use client";

import { Star, CheckCircle2 } from "lucide-react";

const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            name: "Arjun Sharma",
            role: "Verified Owner",
            avatar: "https://i.pravatar.cc/150?u=arjun",
            rating: 5,
            comment: "PoojaEV has completely transformed my daily commute. The Stealth X1 is smooth, silent, and incredibly powerful. I've saved a lot on fuel in just 6 months!",
        },
        {
            id: 2,
            name: "Pooja Mehta",
            role: "Commuter Enthusiast",
            avatar: "https://i.pravatar.cc/150?u=pooja",
            rating: 5,
            comment: "Finding genuine spare parts was a nightmare until I found this showroom. Fast delivery and real OEM quality. Highly recommend their battery series!",
        },
        {
            id: 3,
            name: "Sameer Khan",
            role: "Delivery Professional",
            avatar: "https://i.pravatar.cc/150?u=sameer",
            rating: 5,
            comment: "I ride 80km every day. The lithium battery I bought from PoojaEV hasn't dropped its capacity once. Exceptional build quality and service.",
        },
    ];

    return (
        <section className="py-24 bg-secondary/10">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                        Hear From Our Riders
                    </h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="p-8 rounded-3xl bg-background border border-border/50 shadow-sm"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-primary text-primary" />
                                ))}
                            </div>

                            <p className="text-foreground/70 leading-relaxed mb-8 italic">
                                "{review.comment}"
                            </p>

                            <div className="flex items-center gap-3 pt-6 border-t border-border/50">
                                <img
                                    src={review.avatar}
                                    alt={review.name}
                                    className="h-12 w-12 rounded-full object-cover border-2 border-primary/20"
                                />
                                <div>
                                    <h3 className="font-bold text-foreground">{review.name}</h3>
                                    <p className="text-xs text-foreground/40 font-medium flex items-center gap-1">
                                        {review.role}
                                        <CheckCircle2 size={12} className="text-primary" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
