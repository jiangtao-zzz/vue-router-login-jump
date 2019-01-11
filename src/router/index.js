import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import user from '@/components/user'
import login from '@/components/login'
import register from '@/components/register'

Vue.use(Router)

 const router=new Router({
  routes: [
    {
      	path: '/',
      	name: 'HelloWorld',
      	component: HelloWorld
    },
    {
      path:'/register',
      name:'register',
      component:register,
    },
    {
		path:'/user',
		name:'user',
		component:user,
		meta:{
      autor:true//需要登陆
		}
    },
    {
    	path:'/login',
    	name:'login',
    	component:login,
    	meta:{
    		keepAlive:false,
    	}
    }
   
  ],
  mode:'history',

});
router.beforeEach((to,from,next)=>{
  const token=localStorage.getItem('token');  
 if (to.meta.autor) {
   if (token) {
     next();
   } else {
     next({
      path:'/login',
      query:{
        redirect:to.fullPath
      }
     })
   }
 } else {
    let f=from.query.redirect;
    let u=encodeURIComponent(f)
    if(f){
        let path=`${to.path}?redirect=${u}`;
        if(to.fullPath==path){//处理无限循环的问题
          next();
        }else{
          next({
            path:to.path,
            query:{
              redirect:f
            }
          })
        }

    }else{
      next();
    }

 }
})

export default router



