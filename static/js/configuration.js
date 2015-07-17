/*=============================================================================
#     FileName: configuration.js
#         Desc: 
#       Author: Aizhiyuan
#        Email: aizhiyuan@meepotech.com
#     HomePage: 
#      Version: 0.0.1
#   LastChange: 2013-9-19 08:56:30
#      History:
=============================================================================*/
var export_user_header = {
	user_name : "用户名",
	display_name : "昵称",
	email : "邮箱",
	groups_can_own : "可用群组数",
	password : "密码",
    source: '来源'
};

var export_group_header = {
	group_name : "群组名",
	description : "描述",
	group_tags : "标签",
	group_type : "类型",
	group_visible: "是否可搜索",
    source: '来源',
	group_user_count: "导入成员数"
};

function getGroupSearch(searchVal){
	if(searchVal){
		return "可搜索";
	}
	else{
		return "不可搜索";
	}
}
