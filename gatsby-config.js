module.exports = {
  siteMetadata: {
    title: "gatsby-js-demo-et",
  },
  pathPrefix: "/gatsby-js-demo-et",
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Raleway`,
            variants: [`400`, `700`]
          },
          {
            family: `Roboto`,
            variants: [`400`, `700`]
          },
        ],
      },
    }
  ],
};
