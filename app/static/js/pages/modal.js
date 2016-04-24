//register
new Vue({
    el: ".register-modal",
    data: {
        user_email: "",
        user_password: "",
        user_name:""
    },
    methods: {
        register: function(){
            var _this = this;
            var userEmail = this.user_email;
            var userPassword = this.user_password;
            var userName = this.user_name;
            $.ajax({
                url:'',
                type:'get',
                data:{
                    user_name:user_name,
                    password:password,
                    time:new Date().getTime()
                },
                success:function(data){
                    if(data.iserro){
                        _this.erro.iserro = true;
                        _this.erro.text = data.msg;
                        _this.erro.target = data.data.target;
                        return;
                    }
                    loginSucc(_this,data.data);
                }
            })
        }

    }

})
//login
new Vue({
    el: ".login-modal",
    data: {
        user_email: "",
        user_password: ""
    },
    methods: {
        login: function(){
            alert("2")
            var _this = this;
            var user_email = this.user_email;
            var user_password = this.user_password;
            //$.ajax({
            //    url:'data.json',
            //    type:'get',
            //    dataType:'json',
            //    //data:{
            //    //    user_email:user_email,
            //    //    user_password:user_password
            //    //},
            //    success:function(data){
            //        //if(data.iserro){
            //        //    _this.erro.iserro = true;
            //        //    _this.erro.text = data.msg;
            //        //    _this.erro.target = data.data.target;
            //        //    return;
            //        //}
            //        //localStorage.userInfo = JSON.stringify(data.data);
            //        //if(_this.remember){
            //        //    localStorage.remember = _this.remember;
            //        //}else{
            //        //    localStorage.remember = false;
            //        //}
            //        //router.go('/list');
            //        alert(data)
            //    }
            //})

            $.get('data.json',function (data){

            });
        }
    }
})
