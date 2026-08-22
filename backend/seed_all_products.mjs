import pkg from "pg";
import { config } from "dotenv";
const { Client } = pkg;

config({ path: "./backend/config/config.env" });

const database = new Client({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "123456789",
    database: process.env.DB_NAME || "egp_store",
    port: process.env.DB_PORT || 5432,
});

const CATEGORIES = [
    "Electric Scooters",
    "Lithium Batteries",
    "Motor & Controllers",
    "Tires & Rims",
    "Braking Systems",
    "Charging Solutions",
    "Lights & Signals",
    "Accessories"
];

const productsData = {
    "Electric Scooters": [
        { name: "Apex S1 Pro", desc: "High-speed long-range foldable electric scooter.", price: 85000 },
        { name: "Urban Glider X", desc: "Lightweight city commuter with dual suspension.", price: 45000 },
        { name: "Thunder R7", desc: "Off-road electric scooter with 2000W dual motor.", price: 120000 },
        { name: "Neo E-Way", desc: "Budget friendly reliable scooter for beginners.", price: 35000 },
        { name: "Falcon V9", desc: "Premium aesthetic design with smart app integration.", price: 95000 }
    ],
    "Lithium Batteries": [
        { name: "MaxPower 60V 30Ah", desc: "High capacity lithium-ion battery for long range.", price: 45000 },
        { name: "QuickCharge 48V 20Ah", desc: "Fast charging battery pack with BMS protection.", price: 32000 },
        { name: "EnduroCell 72V 40Ah", desc: "Heavy duty battery for performance scooters.", price: 65000 },
        { name: "EconPack 36V 15Ah", desc: "Portable replacement battery for small scooters.", price: 18000 },
        { name: "Lithium Master Pro", desc: "Smart BMS battery with real-time health monitoring.", price: 55000 }
    ],
    "Motor & Controllers": [
        { name: "DirectDrive 1000W Hub", desc: "Powerful hub motor for electric scooters.", price: 15000 },
        { name: "SineWave Controller 45A", desc: "Smooth acceleration and silent operation.", price: 8500 },
        { name: "Ultra-Torque 3000W Motor", desc: "Industrial grade motor for racing scooters.", price: 28000 },
        { name: "Smart Controller V2", desc: "Programmable controller with regeneration.", price: 12000 },
        { name: "MiniHub 350W", desc: "Compact motor for folding portable scooters.", price: 7500 }
    ],
    "Tires & Rims": [
        { name: "All-Terrain 10-inch Tire", desc: "Robust vacuum tire for any surface.", price: 2500 },
        { name: "Alloy Rim Sport 11", desc: "Lightweight durable aluminum alloy rim.", price: 4200 },
        { name: "PunctureProof Solid Tire", desc: "Never worry about flats with this solid design.", price: 3000 },
        { name: "Performance Slick Tire", desc: "Maximum grip for high-speed street riding.", price: 2800 },
        { name: "Steel Rim HD", desc: "Reinforced steel rim for heavy loads.", price: 3500 }
    ],
    "Braking Systems": [
        { name: "Hydraulic Disc Brake Set", desc: "Premium stopping power for high speeds.", price: 9500 },
        { name: "Semi-Metallic Brake Pads", desc: "High performance pads with long life.", price: 800 },
        { name: "Mechanical E-Brake", desc: "Reliable mechanical brake with sensor cutoff.", price: 3500 },
        { name: "E-Scooter ABS Unit", desc: "Anti-lock braking module for safety.", price: 5500 },
        { name: "Ventilated Disc Rotor", desc: "Quick cooling rotor for intensive braking.", price: 1800 }
    ],
    "Charging Solutions": [
        { name: "Turbo Charger 5A", desc: "Reduce charging time by 50% with high output.", price: 4500 },
        { name: "Standard 2A Charger", desc: "Stable and safe charger for overnight use.", price: 1500 },
        { name: "Smart Charging Station", desc: "Multiple ports with automatic voltage selection.", price: 8500 },
        { name: "Portable Solar Charger", desc: "Eco-friendly charging for outdoor trips.", price: 12000 },
        { name: "Charger Port Upgrade", desc: "Waterproof charging socket replacement.", price: 1200 }
    ],
    "Lights & Signals": [
        { name: "LED Halo Headlight", desc: "Ultra-bright headlight with modern design.", price: 3200 },
        { name: "Smart Turn Signals", desc: "Wireless indicators for safer turning.", price: 2500 },
        { name: "Under-glow RGB Kit", desc: "Customizable lighting for evening rides.", price: 4500 },
        { name: "Brake Warning Tail-light", desc: "Flashing tail-light for maximum visibility.", price: 1800 },
        { name: "Handlebar Warning Light", desc: "Side-view safety lights for handlebars.", price: 900 }
    ],
    "Accessories": [
        { name: "Waterproof Storage Bag", desc: "Spacious bag that mounts to the steering stem.", price: 2200 },
        { name: "Phone Mount Pro", desc: "Secure aluminum mount for all smartphones.", price: 1800 },
        { name: "Scooter Security Lock", desc: "Heavy duty steel cable lock with alarm.", price: 3500 },
        { name: "Folding Mechanism Plate", desc: "Reinforcement piece for folding hinges.", price: 4500 },
        { name: "Rubber Deck Mat", desc: "Non-slip comfortable grip mat for deck.", price: 1500 }
    ]
};

async function seed() {
    try {
        await database.connect();
        const userRes = await database.query("SELECT id FROM users WHERE role = 'Admin' LIMIT 1;");
        const adminId = userRes.rows[0].id;

        // Clear existing products first to avoid duplicates if needed
        await database.query("DELETE FROM products;");

        for (const category of CATEGORIES) {
            const products = productsData[category];
            for (const p of products) {
                const imgKeyword = category.split(' ')[0].toLowerCase();
                const images = JSON.stringify([{
                    url: `https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format`, // Placeholder high quality
                    public_id: `img_${Math.random().toString(36).substr(2, 9)}`
                }]);

                const query = `
                    INSERT INTO products (name, description, price, category, stock, images, created_by)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                `;
                const values = [
                    p.name,
                    p.desc,
                    p.price / 283, // Match back-end division logic
                    category,
                    20, // 20 units stock for each
                    images,
                    adminId
                ];
                await database.query(query, values);
            }
        }
        console.log("Successfully seeded 40 products!");
    } catch (err) {
        console.error(err);
    } finally {
        await database.end();
    }
}

seed();
