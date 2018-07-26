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
3.使用中间件bcrypt加密。
4.使用全球公认的邮箱头像gravatar

##  四.login接口
1.使用中间件bcrypt验证密码正确性. bcrypt.compare()
2.使用jsonwebtoken,登录成功返回token 
   [jsonwebtoken api中文讲解][1]
   [基于token的身份验证][2]
3.使用passport，passport-jwt验证token
   [JWT上手：Express + Passport][3]
   

[1]: https://segmentfault.com/a/1190000009494020
[2]: http://blog.51cto.com/icooke/2063282
[3]: https://www.jianshu.com/p/dc9a3302b92a