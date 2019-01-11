# vue-router-login-jump
2个需求： 1.点击进入user页，但是如果用户没有登录的话，中间有登录验证，会拦截，如果用户已登录则进入user页。
          2处理拦截至登录页，然后点去注册页，完善信息页，再回登录页，再登录进去，依然进去目标user页
对于2的是实现  要从localhost:8080->user页->跳转login页面->register页面->login页面登录->回到user页，对应路由路径为
                localhost:8080---> /login?redirect=/user --> /register?redirect=/user -->login/redirect=/user
