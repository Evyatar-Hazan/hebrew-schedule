export const moduleConfig = {
  rules: [
    {
      test: /\.tsx$/,
      use: ["source-map-loader"],
      enforce: "pre",
      exclude: './node_modules\/react-datepicker/',
    },
  ],
};
