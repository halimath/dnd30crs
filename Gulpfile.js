"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const { resolve } = require("path");
const puppeteer = require("puppeteer");
const { version } = require("./package.json");

sass.compiler = require("node-sass");

function sassTask () {
    return gulp.src("./styles/*.sass")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./css"));
}

gulp.task("sass", sassTask);

gulp.task("sass:watch", function () {
    gulp.watch(["./styles/**/*.sass"], sassTask);
});

gulp.task("pdf", async function () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`file:${resolve(__dirname, "charakterbogen.html")}`, {
        waitUntil: 'networkidle2',
    });
    await page.pdf({
        path: `charakterbogen-${version}.pdf`,
        format: "A4",
        printBackground: true,
    });

    await browser.close();
});
