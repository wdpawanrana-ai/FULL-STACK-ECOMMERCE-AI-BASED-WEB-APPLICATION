import https from 'https';
import pkg from 'pg';
import { config } from 'dotenv';
const { Client } = pkg;

config({ path: "./config/config.env" });

const database = new Client({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "123456789",
    database: process.env.DB_NAME || "egp_store",
    port: process.env.DB_PORT || 5432,
});

const TARGET_URL = 'https://www.yakuzaev.com/electric-scooter/';

https.get(TARGET_URL, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', async () => {
        console.log("Fetched HTML, parsing images...");

        // Simple regex map logic to find image src containing model names
        const yakuzaModels = [
            "Duster", "Ruster", "Ruble", "Dragger", "Neu", "Ramie",
            "Viraj", "Zunaid", "Cherry", "ADAA", "Raavta", "ASVA",
            "Sparrow Plus", "Rush", "Y2", "Lucka"
        ];

        let modelImages = {};

        yakuzaModels.forEach(model => {
            let modelSlug = model.toLowerCase().replace(" ", "-");
            if (modelSlug === "ruble") modelSlug = "rubie"; // it was rubie in url
            // e.g. <img src="https://yakuzaev.com/wp-content/uploads/...duster.jpg"
            // We search data for instances of model Slug inside <img src="..."> 

            // This is a naive regex parser for demonstration. The site has images inside `src=".../yakuza-duster.jpg"` or similar.
            const regex = new RegExp(`src="([^"]*?${modelSlug}[^"]*?\\.(?:png|jpg|jpeg|webp))"`, 'i');
            const match = data.match(regex);

            if (match && match[1]) {
                modelImages[model] = match[1];
            } else {
                // If not found in src directly, maybe it's listed under a srcset or data-src
                const altRegex = new RegExp(`data-src="([^"]*?${modelSlug}[^"]*?\\.(?:png|jpg|jpeg|webp))"`, 'i');
                const altMatch = data.match(altRegex);
                if (altMatch && altMatch[1]) {
                    modelImages[model] = altMatch[1];
                }
            }
        });

        console.log("Scraped Images:", modelImages);

        // Update database
        try {
            await database.connect();
            for (const [model, imgUrl] of Object.entries(modelImages)) {

                // Formulate valid absolute URL if relative
                let finalUrl = imgUrl;
                if (finalUrl.startsWith('/')) {
                    finalUrl = 'https://www.yakuzaev.com' + finalUrl;
                } else if (!finalUrl.startsWith('http')) {
                    continue; // invalid url
                }

                const imagesJson = JSON.stringify([{
                    url: finalUrl,
                    public_id: `img_${Math.random().toString(36).substr(2, 9)}`
                }]);

                const searchName = `Yakuza ${model}`;
                await database.query("UPDATE products SET images = $1 WHERE name = $2", [imagesJson, searchName]);
                console.log(`Updated ${searchName} with ${finalUrl}`);
            }
        } catch (err) {
            console.error(err);
        } finally {
            await database.end();
            console.log("Done");
        }
    });

}).on('error', (e) => {
    console.error(e);
});
