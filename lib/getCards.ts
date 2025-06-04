// lib/getCards.ts
import fs from "fs";
import path from "path";

// Define the structure of a card
export interface Card {
    image: string;
    firstLine: string; // First paragraph (category)
    secondLine: string; // Second paragraph (title)
    thirdLine: string; // Third paragraph (description)
    link: string; // Fourth paragraph (link)
}

// Utility function to fetch card data
export const getCards = (): Card[] => {
    const imgDir = path.join(process.cwd(), "public", "cards", "img");
    const txtDir = path.join(process.cwd(), "public", "cards", "text");

    // Helper function to extract the numeric part of a filename
    const extractNumberFromFilename = (filename: string): number | null => {
        const match = filename.match(/^(\d+)/); // Match numbers at the start of the filename
        return match ? parseInt(match[0], 10) : null;
    };

    // Read image files and extract their numeric IDs
    const images = fs.readdirSync(imgDir)
        .filter((file) => file.match(/^\d+/)) // Only process files starting with numbers
        .map((file) => ({
            id: extractNumberFromFilename(file),
            path: `/cards/img/${file}`,
        }))
        .filter((item) => item.id !== null) // Remove invalid entries
        .sort((a, b) => (a.id as number) - (b.id as number)); // Sort by numeric ID

    // Read text files and parse content
    const texts = fs.readdirSync(txtDir)
        .filter((file) => file.match(/^\d+/)) // Only process files starting with numbers
        .map((file) => {
            const filePath = path.join(txtDir, file);
            const content = fs.readFileSync(filePath, "utf8");
            const [firstLine, secondLine, thirdLine, link] = content.split("\n\n");
            return {
                id: extractNumberFromFilename(file),
                firstLine,
                secondLine,
                thirdLine,
                link,
            };
        })
        .filter((item) => item.id !== null) // Remove invalid entries
        .sort((a, b) => (a.id as number) - (b.id as number)); // Sort by numeric ID

    // Directly return the combined cards
    return images
        .filter((image) => texts.some((text) => text.id === image.id))
        .map((image) => {
            const text = texts.find((text) => text.id === image.id);
            return {
                image: image.path,
                firstLine: text?.firstLine || "",
                secondLine: text?.secondLine || "",
                thirdLine: text?.thirdLine || "",
                link: text?.link || "",
            };
        });
};