const htmlWebpackPlugin = require("html-webpack-plugin"); //html插件，生成的文件插入到html中
var _dirname = "";
module.exports = {
  // context:'',//整个运行环境的上下文默认为根目录
  // entry:'./src/script/main.js', //第一种方试
  // entry:['./src/script/main.js','./src/script/a.js'],//第二种打包方式，解决平行的互相依赖的打包到一起
  entry:{
    main:'./src/script/main.js',
    a:'./src/script/a.js',
    b:'./src/script/b.js',
    c:'./src/script/c.js',
  },//第三种方式，传一个对象， 上面两种方式的融合（多页面应用），都可以传（我们现在配置的就是这种方式 ）  
  output:{
    // filename:'bundle.js',//打包出来的文件名，前两种方式的输出名字，
    filename:'js/[name]-[hash].js',//第三种方式的输出；2以上强制要求多路径这种配置，1可以上面那种方式
    // 占位符总共三个，
    // [name]指的是入口对象的key，[hash]本次打包的hash值，
    // [chuckhash]每个文件打包的哈希值，只有当每个文件发生变化的时候这个哈希值才变化；(对静态资源是比较有用的)
    // path: __dirname + '/dist/js/',
    path: __dirname + '/dist',
    publicPath:'http://cdn.com/',//打包生成的文件加上服务器地址，默认不加
  },
  //配置插件
  plugins:[
    //生成js并且添加到html中，不传参数的话，默认在打包完成的目录下创建一个index.html文件并且引入打包完成的文件 
    new htmlWebpackPlugin({
      template:'index.html',//引入根目录下index.html模板，并将生成到的文件添加，重新在输出目录生成一个index.html
      filename:'a.html',//生成的文件名称；
      inject:'head',//插入到文件的部位（head， body）设置为false则不自动插入代码，根据需要手动在模板里面添加
      title:'webpack in very good',
      date:new Date(),
      minify:{
        removeComments:true,//删除注释
        collapseWhitespace:true,//删除空格
      },//对生成的html文件进行压缩；
      // chunks:['a','main'],//代码块，指定当前的引入哪些代码块（指定当前html里面包含的哪些chunk）；
      //excludeChunks:[],//与上面相反，排除哪些块；
    }) ,
    //多页面需要多次调用；会诊中的做法是遍历对象多次执行，传入不同的参数
    new htmlWebpackPlugin({
      template:'index.html',//引入根目录下index.html模板，并将生成到的文件添加，重新在输出目录生成一个index.html
      filename:'b.html',//生成的文件名称；
      inject:'head',//插入到文件的部位（head， body）设置为false则不自动插入代码，根据需要手动在模板里面添加
      title:'webpack in',
      date:new Date(),
      // minify:{
      //   removeComments:true,//删除注释
      //   collapseWhitespace:true,//删除空格
      // },//对生成的html文件进行压缩；
    }) ,
    new htmlWebpackPlugin({
      template:'index.html',//引入根目录下index.html模板，并将生成到的文件添加，重新在输出目录生成一个index.html
      filename:'c.html',//生成的文件名称；
      inject:'head',//插入到文件的部位（head， body）设置为false则不自动插入代码，根据需要手动在模板里面添加
      title:'webpack in very ',
      date:new Date(),
      // minify:{
      //   removeComments:true,//删除注释
      //   collapseWhitespace:true,//删除空格
      // },//对生成的html文件进行压缩；
    }) ,
  ]
} 