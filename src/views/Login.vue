<template>
    <div class="login-contain">
        <el-form status-icon :rules="rules" :model="user" ref="test" class="demo-ruleForm" label-width="100px">
            <el-form-item label="账号" prop="username">
                <el-input v-model="user.username"></el-input>
            </el-form-item>

             <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="user.password"></el-input>
            </el-form-item>

             <el-form-item>
                <el-button type="primary" @click="login()" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
                 <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    data(){
        //自定义校验规则：
        var checkUserName=(rule,value,callback)=>{
            if(value===''){
                return callback(new Error('请输入用户名'));
            }else{
                callback();
            }
        };
        var checkPassWord =(rule,value,callback)=>{
            if(value===''){
                return callback(new Error('请输入密码'));
            }else{
                callback();
            }
        };
        return{
            user:{
                username:'admin',
                password:'admin'
            },
            fullscreenLoading: false,
            rules:{
                username:[{
                   required: true, validator: checkUserName, trigger: 'blur' 
                }],
                password:[{
                   required: true, validator: checkPassWord, trigger: 'blur' 
                }]
            }
        }
    },
    methods:{
        login(){
            console.log(this.$store.state);
            this.fullscreenLoading = true;
            this.$refs['test'].validate((valid) => {
                if (valid) {   
                    let url="http://localhost:8080/blog-web/login/checkLogin"; 
                    
                    this.$axios.post(url,this.$qs.stringify({username:this.user.username,password:this.user.password}),
                        { headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                        // { headers: {'Content-Type': 'application/json'}}
                    ).then(response=>{
                        this.fullscreenLoading = false;
                        if(response.data.code==0){
                            this.$store.commit("login",this.user);
                            var path = this.$route.query.redirect
                            this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
                            console.log("登录成功,是跳转成功之后的页面，后台搞还是前台跳转？");
                        }else{
                            console.log("登录失败,失败原因："+response.data.msg);
                        }
                       
                    }).catch(error =>{
                        alert(error);
                    });
                } else {
                    console.log('error submit!!');
                    this.fullscreenLoading = false;
                    return false;
                }
            });
        },
        logout () {
            this.$axios.get('/logout').then(resp => {
                if (resp.data.code === 200) {
                    // 前后端状态保持一致
                    this.$store.commit('logout');
                    this.$router.replace('/');
                }
            })
        }
    }
}
</script>