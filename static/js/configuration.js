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

//Error code
var ERRORCODE = {
	"ILLEGAL_ARGUMENT" 							 : 4000000,
	"MISSING_ARGUMENT" 							 : 4000001,
	"MISSING_ENTITY_FIELD" 						 : 4220000,
	"TOKEN_INVALID" 							 : 4010000,
	"PASSWORD_INCORRECT" 						 : 4010001,
	"SSO_FAILED" 								 : 4010002,
	"QUOTA_OUTAGE" 								 : 5070000,
	"GROUPS_CAN_OWN_OUTAGE" 					 : 5070001,
	"LINK_NOT_EXISTS" 							 : 4041000,
	"USER_NOT_EXISTS" 							 : 4040100,
	"USER_NAME_TOO_LONG" 						 : 4220100,
	"USER_NAME_TOO_SHORT" 						 : 4220101,
	"USER_NAME_CONTAINS_ILLEGAL_CHAR" 			 : 4220102,
	"USER_DISPLAY_NAME_CONTAINS_ILLEGAL_CHAR" 	 : 4220103,
	"USER_DISPLAY_NAME_TOO_LONG" 				 : 4220104,
	"USER_EMAIL_TOO_LONG" 						 : 4220105,
	"USER_EMAIL_INVALID" 						 : 4220106,
	"USER_ROLE_INVALID" 						 : 4220107,
	"USER_GROUPS_CAN_OWN_INVALID" 				 : 4220108,
	"USER_SOURCE_INVALID" 						 : 4220109,
	"USER_NAME_ALREADY_TAKEN"					 : 4090100,
	"USER_EMAIL_ALREADY_TAKEN" 					 : 4090101,
	"USER_NOT_ACTIVATED" 						 : 4030100,
	"USER_BLOCKED" 								 : 4030101,
	"USER_ROLE_ADMIN_REQUIRED" 					 : 4030102,
	"USER_ROLE_ROOT_REQUIRED" 					 : 4030103,
	"USER_ROLE_GT_TARGET_USER_ROLE_REQUIRED" 	 : 4030104,
	"USER_TARGET_ROLE_TOO_HIGH" 				 : 4030105,
	"GROUP_NOT_EXISTS" 							 : 4040200,
	"GROUP_NAME_TOO_LONG" 						 : 4220200,
	"GROUP_NAME_TOO_SHORT" 						 : 4220201,
	"GROUP_NAME_STARTS_WITH_DOT" 				 : 4220202,
	"GROUP_NAME_CONTAINS_ILLEGAL_CHAR" 			 : 4220203,
	"GROUP_NAME_FORBIDDEN" 						 : 4220204,
	"GROUP_INTRO_TOO_LONG" 						 : 4220205,
	"GROUP_TAG_TOO_LONG" 						 : 4220206,
	"GROUP_TAGS_TOO_MANY" 						 : 4220207,
	"GROUP_TAG_CONTAINS_ILLEGAL_CHAR" 			 : 4220208,
	"GROUP_TYPE_INVALID" 						 : 4220209,
	"GROUP_ANNOUNCE_TOO_LONG" 					 : 4220210,
	"GROUP_SOURCE_INVALID" 						 : 4220211,
	"GROUP_NAME_ALREADY_TAKEN" 					 : 4090200,
	"GROUP_NOT_ACTIVATED" 						 : 4030200,
	"GROUP_BLOCKED" 							 : 4030201,
	"GROUP_NOT_LOCAL" 							 : 4030202,
	"GROUP_NOT_JOINABLE" 						 : 4030203,
	"GROUP_NOT_QUITABLE" 						 : 4030204,
	"GROUP_ACCESS_DENIED" 						 : 4030205,
	"RELATION_NOT_EXISTS" 						 : 4040300,
	"RELATION_ALREADY_EXISTS" 					 : 4090300,
	"RELATION_ROLE_INVALID" 					 : 4220300,
	"RELATION_REMARKS_TOO_LONG" 				 : 4220301,
	"RELATION_NOT_ACTIVATED" 					 : 4030300,
	"RELATION_BLOCKED" 							 : 4030301,
	"RELATION_ROLE_ADMIN_REQUIRED" 				 : 4030302,
	"RELATION_ROLE_OWNER_REQUIRED" 				 : 4030303,
	"RELATION_ROLE_GT_TARGET_USER_ROLE_REQUIRED" : 4030304,
	"RELATION_TARGET_ROLE_TOO_HIGH" 			 : 4030305,
	"ROOT_NOT_EXISTS" 							 : 4040400,
	"FILE_NOT_EXISTS" 							 : 4040500,
	"FILE_PATH_INVALID" 						 : 4000500,
	"FILE_ALREADY_EXISTS" 						 : 4090500,
	"FILE_NOT_A_FILE" 							 : 4040501,
	"FILE_NOT_A_FOLDER" 						 : 4040502,
	"FILE_PERMISSION_NOT_SUPPORTED" 			 : 4030500,
	"FILE_NOT_INSERTABLE" 						 : 4030501,
	"FILE_NOT_READABLE" 						 : 4030502,
	"FILE_NOT_WRITABLE" 						 : 4030503,
	"FILE_NOT_DELETABLE" 						 : 4030504,
	"COMMENT_NOT_EXISTS" 						 : 4040600,
	"COMMENT_CONTENTS_TOO_LONG" 				 : 4220600,
	"SHARE_NOT_EXISTS" 							 : 4040700,
	"SHARE_PASSWORD_INCORRECT" 					 : 4030700,
	"SHARE_PASSWORD_REQUIRED" 					 : 4030701,
	"TRASH_NOT_EXISTS" 							 : 4040800,
	"CHUNKED_UPLOAD_NOT_EXISTS" 				 : 4040900,
	"REVISION_NOT_EXISTS" 						 : 4041000,
	"THUNDER_NOT_EXISTS" 						 : 4041100,
	"UNKNOWN" 									 : 5000000
};
