##  一.create-server 
1.引用express 
2.监听server
3.连接mongodb 
4.使用nodemon
> *  mac电脑要加 sudo
> *  指令为nodemon server.js
> *  nodemon用来监视node.js应用程序中的任何更改并自动重启服

##  二.create-router-model（users)
1.创建router:api/user/login
2.创建modal:users

##  三.register接口
1.该接口为post请求，需要使用body-parser
2.如果数据库中有该email,则不能重复注册，没有则可以正常注册。
3.使用中间件bcrypt。
4.使用全球公认的邮箱头像gravatar