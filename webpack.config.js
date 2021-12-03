var path = require("path");
var webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    "v-snow": "./src/v-snow/index.ts",
    "v-snow.min": "./src/v-snow/index.ts",
    main: "./src/main.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: process.env.NODE_ENV === "development" ? "/dist/" : "./dist/",
    filename: "[name].js",
    library: "v-snow",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: "vue-style-loader!css-loader!sass-loader!postcss-loader"
            // sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
          }
        }
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
          esModule: false
        }
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: `
              @import "assets/css/_variables.scss";
            `
            }
          },
          "postcss-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".scss", ".css", ".ts", ".js", ".json", ".vue"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      assets: path.resolve(__dirname, "assets/"),
      fonts: path.join(__dirname, "assets/fonts"),
      images: path.join(__dirname, "assets/img")
    }
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: "./"
    },
    watchFiles: ["src"],
    hot: true,
    port: 9000
  },
  plugins: [new VueLoaderPlugin()],
  performance: {
    hints: false,
    maxEntrypointSize: 1000,
    maxAssetSize: 2000
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
