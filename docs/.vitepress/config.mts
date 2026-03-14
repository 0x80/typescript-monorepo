import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Typescript Monorepo",
  description:
    "A quest for the perfect Typescript monorepo setup with Firebase, Next.js, and modern tooling.",
  cleanUrls: true,
  ignoreDeadLinks: [/^http:\/\/localhost/],
  themeConfig: {
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Getting Started", link: "/getting-started" },
          { text: "Architecture", link: "/architecture" },
          { text: "Tooling", link: "/tooling" },
        ],
      },
      {
        text: "Firebase",
        items: [
          { text: "Overview", link: "/firebase" },
          { text: "Typed Firestore", link: "/typed-firestore" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/0x80/typescript-monorepo" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 Thijs Koerselman",
    },
  },
});
