const express = require("express");
const { chromium } = require("playwright");

const app = express();

app.get("/login", async (req, res) => {

    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext();

    const page = await context.newPage();

    // Listen to all requests
    page.on("request", request => {

        const headers = request.headers();

        if (headers.authorization) {

            console.log("\n===== AUTH TOKEN FOUND =====\n");

            console.log(headers.authorization);

            console.log("\n============================\n");
        }
    });

    await page.goto("https://connect.bracu.ac.bd");

    console.log("Login manually in the opened browser.");

    // Wait enough time for login + API calls
    await page.waitForTimeout(120000);

    res.send("Finished. Check terminal.");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});