/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  container,
  section,
  sectionHeader,
  sectionItem,
} from "./footer.module.css";

export default function Layout({ children, title }) {
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#f9f9fb" />
        <meta
          name="description"
          content="Search Anime by ScreenShot. Lookup the exact moment and the episode."
        />
        <meta
          name="keywords"
          content="Anime Scene Search, Search by image, Anime Image Search, アニメのキャプ画像"
        />
        <title>{`${title} - trace.moe`}</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/png" href="/favicon128.png" sizes="128x128" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Helmet>
      <div className={container}>
        {children}
      </div>
      <footer className={container}>
        <div className={section}>
          <div className={sectionHeader}>
            <Link to="/">trace.moe</Link>
          </div>
          <div className={sectionItem}>
            <Link to="/news">News</Link>
          </div>
          <div className={sectionItem}>
            <a href="https://github.com/soruly/trace.moe">GitHub</a>
          </div>
          <div className={sectionItem}>
            <a href="https://discord.gg/K9jn6Kj">Discord</a>
          </div>
          <div className={sectionItem}>
            <a href="https://t.me/whatanimeupdates">Telegram</a>
          </div>
          <div className={sectionItem}>
            <a href="https://soruly.github.io/trace.moe-api/">API Docs</a>
          </div>
        </div>
      </footer>
    </>
  );
}