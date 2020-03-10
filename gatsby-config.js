module.exports = {
  siteMetadata: {
    title: `Skin UI`,
    description: `A Theme UI Live Preview and Code Editor`,
    keywords: [`gatsby`, `gatsbyjs`, `theme-ui`],
    url: `https://skin-ui.com`,
    ogImage: `images/skin-ui-open-graph-image.jpg`,
    bgImage: `images/skin-ui-background-image.jpg`,
    lang: `en`,
    author: `@pauliescanlon`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-76055934-9",
      },
    },
  ],
}
