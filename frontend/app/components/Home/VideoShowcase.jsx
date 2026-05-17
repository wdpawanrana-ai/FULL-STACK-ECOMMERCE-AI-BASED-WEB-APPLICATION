"use client";

import { Instagram, Play, ExternalLink } from "lucide-react";

const VideoShowcase = () => {
    const reels = [
        {
            id: 1,
            thumbnail: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800",
            title: "Stealth X1 Speed Test",
        },
        {
            id: 2,
            thumbnail: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800",
            title: "Why PoojaEV Spares?",
        },
        {
            id: 3,
            thumbnail: "https://images.unsplash.com/photo-1517524008436-bbdb53c54434?w=800",
            title: "The Future is Electric",
        },
        {
            id: 4,
            thumbnail: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800",
            title: "Battery Maintenance Tips",
        },
    ];

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-center md:text-left">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                            EV Insights
                        </h2>
                        <p className="text-lg text-foreground/40 mt-2">
                            Watch our latest videos and test rides.
                        </p>
                    </div>
                    <a
                        href="https://instagram.com"
                        className="flex items-center gap-2 text-primary font-bold hover:underline"
                    >
                        <span>Follow on Instagram</span>
                        <ExternalLink size={18} />
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reels.map((reel) => (
                        <div
                            key={reel.id}
                            className="group relative overflow-hidden rounded-2xl bg-secondary aspect-square cursor-pointer"
                        >
                            <img
                                src={reel.thumbnail}
                                alt={reel.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play size={24} className="fill-current ml-1" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
                                <p className="font-bold text-sm">{reel.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoShowcase;
