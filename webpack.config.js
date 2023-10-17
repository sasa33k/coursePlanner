// const path = require('path');
// module.exports = {
// mode:"development",
// devtool:"source-map",
//   entry: './src/index.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'public')
//   },
//     module: {
//         rules: [
//             {
//               test:/\.css$/,
//               use:['style-loader', 'css-loader']
//             },
//             { test: /\.m?js$/,
//               use: {
//                 loader: 'babel-loader',
//                 options: {
//                   presets: ['@babel/preset-env', '@babel/preset-react' ]
//                 }
//               }
//             }
//         ]
//     }
// };


const path = require('path'); 
module.exports = { 
    devtool:"source-map",
    mode:"production", //  production / development
    entry: './src/index.js', 
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public') 
    },
    optimization: {
      nodeEnv: 'production',
      minimize: true,
      concatenateModules: true,
  
    },
    module: { 
        rules: [{
            test:/\.css$/, 
            use:['style-loader', 'css-loader']
        }, { 
            test: /\.m?js$/, 
            use: {
                loader: 'babel-loader', 
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react' ], 
                },
            } 
        }]
    }
};