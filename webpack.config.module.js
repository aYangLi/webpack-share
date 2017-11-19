const htmlWebpackPlugin = require("html-webpack-plugin"); //html插件，生成的文件插入到html中
var _dirname = "";
module.exports = {
  // context:'',//整个运行环境的上下文默认为根目录
  entry:'./src/app.js', //第一种方试 
  output:{
    // filename:'bundle.js',//打包出来的文件名，前两种方式的输出名字，
    filename:'js/[name].bundle.js',//第三种方式的输出；2以上强制要求多路径这种配置，1可以上面那种方式
    // 占位符总共三个，
    // [name]指的是入口对象的key，[hash]本次打包的hash值，
    // [chuckhash]每个文件打包的哈希值，只有当每个文件发生变化的时候这个哈希值才变化；(对静态资源是比较有用的)
    // path: __dirname + '/dist/js/',
    path: __dirname + '/dist',
  },
  //配置插件
  plugins:[
    //生成js并且添加到html中，不传参数的话，默认在打包完成的目录下创建一个index.html文件并且引入打包完成的文件 
    new htmlWebpackPlugin({
      template:'module.html',//引入根目录下index.html模板，并将生成到的文件添加，重新在输出目录生成一个index.html
      filename:'module.html',//生成的文件名称；
      inject:'body',//插入到文件的部位（head， body）设置为false则不自动插入代码，根据需要手动在模板里面添加
      title:'this is a webpack module',
    }) ,
  ],
  // 配置loader
  module:{
    rules:[
      {
        test:/\.js$/,
        loader:'babel-loader',
        exclude:__dirname +'/node_modules/',//排除哪些范围
        include:__dirname +'/src/',//包含哪些范围（babel-loader比较慢，配置这两项，加速转换）
        //参数
        query:{
          presets:['latest']
        }
      }
    ]
  },
} 