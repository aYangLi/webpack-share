const htmlWebpackPlugin = require("html-webpack-plugin"); //html插件，生成的文件插入到html中
var path = require('path');//path模块对路径的操作
module.exports = {
  // context:'',//整个运行环境的上下文默认为根目录
  // entry 是配置页面的入口文件；
  entry:'./src/app.js', //第一种方试 
  // output 配置打包输出类相关；
  output:{
    // filename:'bundle.js',//打包出来的文件名，前两种方式的输出名字，
    filename:'js/[name].bundle.js',//第三种方式的输出；2以上强制要求多路径这种配置，1可以上面那种方式
    // 占位符总共三个，
    // [name]指的是入口对象的key，[hash]本次打包的hash值，
    // [chuckhash]每个文件打包的哈希值，只有当每个文件发生变化的时候这个哈希值才变化；(对静态资源是比较有用的)
    // path: __dirname + '/dist/js/',
    path: __dirname + '/dist',// path：打包输出目录
  },
  /**
   * 配置插件
   * plugin 和 loader 的区别是：
   * loader 是import时 根据 不同的文件名，匹配不同的 loader 对这个文件做处理，
   * plugin ，关注的不是文件的格式，而是在编译的各个阶段，会触发不同的事件，让开发者可以干预每个编译阶段；
   */
  plugins:[
    /**
     * html-webpack-plugin用来打包入口html文件
     * entry配置的入口是js文件, webpack以js文件为入口, 遇到import, 用配置的loader加载引入文件
     * 但作为浏览器打开的入口html, 是引用入口js的文件, 它在整个编译过程的外面,
     * 所以, 我们需要html-webpack-plugin来打包作为入口的html文件
     */ 
    new htmlWebpackPlugin({//生成js并且添加到html中，不传参数的话，默认在打包完成的目录下创建一个index.html文件并且引入打包完成的文件
      /**
       * template参数指定入口html文件路径, 插件会把这个文件交给webpack去编译,
       * webpack按照正常流程, 找到loaders中test条件匹配的loader来编译, 那么这里html-loader就是匹配的loader
       * html-loader编译后产生的字符串, 会由html-webpack-plugin储存为html文件到输出目录, 默认文件名为index.html
       * 可以通过filename参数指定输出的文件名
       * html-webpack-plugin也可以不指定template参数, 它会使用默认的html模板.
       */
      template:'module.html',//引入根目录下index.html模板，并将生成到的文件添加，重新在输出目录生成一个index.html
      filename:'module.html',//生成的文件名称；
      inject:'body',//插入到文件的部位（head， body）设置为false则不自动插入代码，根据需要手动在模板里面添加
      title:'this is a webpack module',
    }) ,
  ],
  // 配置loader
  module:{
    /*
    配置各种文件的加载器，称之为loader
    webpack 当遇到import ... 时，会调用这里配置的 loader 对引用的文件进行编译；
     */
    rules:[
      {
        test:/\.js$/,
        loader:'babel-loader',
        // 利用node中的path 模块把路径解析为绝对路径
        exclude:path.resolve(__dirname,'node_modules'),//排除哪些范围
        include:__dirname +'/src/',//包含哪些范围（babel-loader比较慢，配置这两项，加速转换）
        //参数
        query:{
          presets:['latest']
        }
      },
      {
        test:/\.css$/,
        loader:'style-loader!css-loader',//用感叹号串联loader 经过css-loader 处理完成css文件之后，style-loader会将它插入到html中
      },
      {
        test:/\.html$/,
        loader:'html-loader',//用感叹号串联loader 经过css-loader 处理完成css文件之后，style-loader会将它插入到html中
      },
      {
        test:/\.ejs$/,
        loader:'ejs-loader',//用感叹号串联loader 经过css-loader 处理完成css文件之后，style-loader会将它插入到html中
      },
      {
        test:/\.(png|jpg|gif|svg)$/i,
        loader:'file-loader',//用感叹号串联loader 经过css-loader 处理完成css文件之后，style-loader会将它插入到html中
        // 给file-loader传参数
        query:{
          name:'dist/img/[name]-[hash:5].[ext]',//打包之后的存放位置
        }
      },
      {
        test:/\.less$/,
        loader:'style-loader!css-loader!less-loader'
      }
    ]
  },
  // postcss: [
  //   require('autoprefixer')({
  //     browsers:['last 5 versions']
  //   })
  // ],
} 