/*=============================================================================
#     FileName: login.js
#         Desc: 
#       Author: Aizhiyuan
#        Email: aizhiyuan@meepotech.com
#     HomePage: 
#      Version: 0.0.1
#   LastChange: 2013-9-19 08:56:30
#      History:
=============================================================================*/
$(function(){
	$('#login_submit').click(login);
});

function checkRemember(){
	if(localStorage.logging){
		self.location.href="/home";
	}
}

function login(){
	var username = $('#username').val();
	var password = $('#password').val();
    var flag = false;	
	function after_login(data,status){
		var local_data = {};
		if(status == "error"){
			flag = true;
            alert('输入的用户名或密码错误！');
		}
		else{
			local_data.adminname = username;
			local_data.token = data.token;
			local_data.device = data.id;
            local_data.userid = data.user_id;
            
            var verifyUrl = url_templates.user.get(data.user_id,data.token);
            request(verifyUrl,"","get",function(user,status){
                if(status == 'success' && user.role.name == 'root'){
			        var rememberMe = document.getElementById('remember_me').checked;
			        if(rememberMe){
				        localStorage.setItem("logging",true);
			        }
			        else{
				        sessionStorage.setItem("logging",true);
			        }
			        localStorage.setItem("data",JSON.stringify(local_data));
                
                    self.location.href="/home";
                }
                else{
                    flag = true;
                    alert('您无权登录');
                }
            });
		}
	}
	
	var completeUrl = url_templates.auth.signIn(username,password);
	request(completeUrl,'','post',after_login, readyLogin);
    
    function readyLogin(){
        if(!flag){
            $('#loginText').css("color", "#006dcc");
            var loginText = $("#loginText").text();
            loginText.length < 5 && (loginText = "Login");
            loginText += ".";
            loginText.length > 9 && (loginText = "Login");
            $("#loginText").text(loginText);
            setTimeout(readyLogin, 1e3);
        } else {
            $('#loginText').css("color", "#000000");
            $("#loginText").text("Login");
        }
    }
}

function login_keyDown(){
	if(event.keyCode == 13){
		login();
	}
}
