$.fn.autoSubmit = function (address){
			var config = {
				"_this_name"		: $(this).find('input[name = name]'),
				"_this_pass"		: $(this).find('input[name = pass]'),
				"_this_check"		: $(this).find('input[name = check]'),
				"_this_button"		: $(this).find('button[name=submit]'),
				"_this_isCkecked"	: false,
				"name"				: null,
				"pass"				: null
			};
			var submit = {
				autoCheck	: function (){
							var cookieArray = document.cookie;
							var cookieArrayTemp = cookieArray.split("; ");
							for(var i = 0 ; i < cookieArrayTemp.length ; i++){
								var cookieArrayTempName_Pass = cookieArrayTemp[i].split("=");
								if(cookieArrayTempName_Pass[0] == 'username'){
									config.name = cookieArrayTempName_Pass[1];
								}
								if(cookieArrayTempName_Pass[0] == 'userpass'){
									config.pass = cookieArrayTempName_Pass[1];
								}
							}
							config.name = config.name == '' ? false : config.name;
							config.pass = config.pass == '' ? false : config.pass;
							if(config.name && config.pass){
								$(config._this_button).html('取消');
								$(config._this_button).click(function (){
									document.cookie = "username="+"";
									document.cookie = "userpass="+"";
									$(config._this_button).html('登陆');
									return false;
								});
								$.ajax({
									type 	: 'POST',
									url		: address,
									data 	: {
										name : config.name,
										pass : config.pass
									},
									success : function (data){
												console.log(data);
									},
									dataType : "json"
								});
							}
				},
				saveUser 	: function (){
					config.isChecked = $(config._this_check)[0].checked ? true : false;
					if(config.isChecked){
							var cookieName = $(config._this_name).val();
							var cookiePass = $(config._this_pass).val();
							var cookiePass = hex_md5(cookiePass);
							document.cookie = "username="+cookieName;
							document.cookie = "userpass="+cookiePass;
							$.ajax({
									type 	: 'POST',
									url		: address,
									data 	: {
										name : config.name,
										pass : config.pass
									},
									success : function (data){
												//console.log(data);
									},
									dataType : "json"
							});
					}
				}
			}
			submit.autoCheck();
			$(this).submit(submit.saveUser);
}