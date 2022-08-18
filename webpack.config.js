const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDevelopment = process.env.NODE_ENV != 'production'
module.exports={
    mode: isDevelopment? 'development':'production',    
    devtool:isDevelopment?'eval-source-map':'source-map',
    entry: {
        bundle:path.resolve(__dirname, 'src', 'index.tsx')
     },
     output:{
             path:path.resolve(__dirname,'dist'),
             filename:'[name][contenthash].js',
             clean:true,
             assetModuleFilename:'[name].[ext]'
     },
    resolve:{
        extensions:['.js', '.jsx', '.ts', '.tsx']
    },
    devServer:{
        static:{
            directory: path.resolve(__dirname, 'dist')
        },
        port:3000,
        open:true,
        hot:true,
        compress:true,
        historyApiFallback:true,
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname, 'public', 'index.html')
        })
    ]
        
    ,
    module:{
        rules:[
            {test:/\.(j|t)sx$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {test:/\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {test:/\.(png|jp(e*)g|svg|gif)$/,
        exclude: /node_modules/,
        use: [{
            loader: 'file-loader',
            options: {
              name: '/images/[hash]-[name].[ext]',              
            },}]
        }
        ]
    }
}