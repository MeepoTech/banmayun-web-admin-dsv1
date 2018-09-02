/*=============================================================================
#     FileName: admin.js
#         Desc: 
#       Author: Aizhiyuan
#        Email: aizhiyuan@meepotech.com
#     HomePage: 
#      Version: 0.0.1
#   LastChange: 2013-9-4 20:53:30
#      History:
=============================================================================*/
//Global variable
var itemArray = Array('user','quota','group','data','file','info','notice','client');

var pageSize = 20;
var strMaxLength = 15;
var pageNumberShowed = 5;
var topLimit = 10;

var GROUP_TYPE = {};
var USER_POSITION = {};

$(function(){
	//Supervisor
	$('.popbox').popbox();
	$('#reset_passowrd_submit').click(resetPasswordSubmit);
	//Quota group
	$('#quota_group_search').click(quotaGroupSearch);
	$('#quota_group_slide_back').click(quotaGroupSlideBack);
	$('#quota_group_submit').click(quotaGroupSubmit);
	$('#quota_group_cancel').click(quotaGroupCancel)
	$('#quota_group_success_close').click(quotaGroupAlertClose);
	$('#quota_group_page_first').click(quotaGroupPageFirst);
	$('#quota_group_page_right').click(quotaGroupPageRight);
	$('#quota_group_page_left').click(quotaGroupPageLeft);
	$('#quota_group_page_last').click(quotaGroupPageLast);
	
	//Quota user
	$('#quota_user_search').click(quotaUserSearch);
	$('#quota_user_slide_back').click(quotaUserSlideBack);
	$('#quota_user_submit').click(quotaUserSubmit);
	$('#quota_user_cancel').click(quotaUserCancel)
	$('#quota_user_success_close').click(quotaUserAlertClose);
	$('#quota_user_page_first').click(quotaUserPageFirst);
	$('#quota_user_page_right').click(quotaUserPageRight);
	$('#quota_user_page_left').click(quotaUserPageLeft);
	$('#quota_user_page_last').click(quotaUserPageLast);
	
	$('#userManage').click(userManage);
	$('#quotaManage').click(quotaManage);
	$('#groupManage').click(groupManage);
	$('#dataManage').click(dataManage);
    $('#fileManage').click(fileManage);
	$('#infoManage').click(infoManage);
    $('#noticeManage').click(noticeManage);
	$('#clientManage').click(clientManage);
	
	//User
	$('#user_edit_manage').click(userEditManage);
	$('#user_cancel_manage').click(userCancelManage);
	$('#user_delete_manage').click(userDeleteManage);
	$('#user_check_manage').click(userCheckManage);
	$('#user_search_submit').click(userSearchSubmit);
	$('#user_error_close').click(userAlertClose);
	$('#user_success_close').click(userAlertClose);
	$('#user_page_first').click(userPageFirst);
	$('#user_page_right').click(userPageRight);
	$('#user_page_left').click(userPageLeft);
	$('#user_page_last').click(userPageLast);
	
	//Group
	$('#slide_back').click(slideBack);
	$('#group_search_submit').click(groupSearchSubmit);
	$('#group_edit_manage').click(groupEditManage);
	$('#group_check_manage').click(groupCheckManage);
	$('#group_cancel_manage').click(groupCancelManage);
	$('#group_alert_close').click(groupAlertClose);
	$('#group_success_close').click(groupAlertClose);
	$('#group_page_first').click(groupPageFirst);
	$('#group_page_right').click(groupPageRight);
	$('#group_page_left').click(groupPageLeft);
	$('#group_page_last').click(groupPageLast);
	
	$('#group_delete_manage').click(groupDeleteManage);
	
	//Group User
	$('#group_user_edit_manage').click(groupUserEditManage);
	$('#group_user_check_manage').click(groupUserCheckManage);
	$('#group_user_page_first').click(groupUserPageFirst);
	$('#group_user_page_right').click(groupUserPageRight);
	$('#group_user_page_left').click(groupUserPageLeft);
	$('#group_user_page_last').click(groupUserPageLast);
	$('#group_user_search_submit').click(groupUserSearchSubmit);
	$('#group_user_add').click(groupUserAdd);
	$('#group_adduser_search_submit').click(groupAdduserSearchSubmit);
	$('#group_adduser_submit').click(groupAdduserSubmit);
	
	//Import
	$('#data_import').click(dataImport);
	$('#import_user').click(importUser);
	$('#import_group').click(importGroup);
	$('#import_execution').click(importExecution);
	$('#import_user_down').click(importUserDown);
	$('#import_group_down').click(importGroupDown);
	$('#import_result_close').click(resultClose);
	
	//Export
	$('#data_export').click(dataExport);
	$('#export_user').click(exportUser);
	$('#export_group').click(exportGroup);
	$('#export_execution').click(exportExecution);

    //Manual
    $('#manual_entry').click(manualEntry);

    //File
    $('#file_search_submit').click(fileSearchSubmit);
    $('#group_file_search_submit').click(groupFileSearchSubmit);
    $('#share_file_search_submit').click(shareFileSearchSubmit);
    $('#group_file_check_manage').click(groupFileCheckManage);
    $('#share_file_check_manage').click(shareFileCheckManage);
    $('#file_delete_manage').click(fileDeleteManage);
    $('#group_file_export_manage').click(groupFileExportManage);
    $('#share_file_export_manage').click(shareFileExportManage);
    fileDownload();

    //Notice
    $('#notice_create_manage').click(noticeCreateManage);
    $('#notice_edit_manage').click(noticeEditManage);
    $('#notice_cancel_manage').click(noticeCancelManage);
    $('#notice_delete_manage').click(noticeDeleteManage);
    $('#notice_slide_back').click(noticeSlideBack);
    $('#notice_editor_save').click(noticeEditorSave);
    $('#notice_editor_submit').click(noticeEditorSubmit);
    $('#notice_update_save').click(noticeUpdateSave);
    $('#notice_update_submit').click(noticeUpdateSubmit);
    $('#notice_editor_cancel').click(noticeEditorCancel);
    $('#notice_page_first').click(noticePageFirst);
    $('#notice_page_left').click(noticePageLeft);
    $('#notice_page_right').click(noticePageRight);
    $('#notice_page_last').click(noticePageLast);

    //Client
    $('#client_add_manage').click(clientAddManage);
    $('#client_delete_manage').click(clientDeleteManage);

	//Initialization
	initEnvironment();
	
	//Logout
	$('#admin_logout').click(logout);
});

function initEnvironment(){
	getGroupType();
	getGroupUserPosition();
    //User sort
    userSortEvent();
    listUser();
}

function flush_local_data(){
	sessionStorage.clear();
	localStorage.clear();
}

function check_logging(){
	if(!localStorage.logging && !sessionStorage.logging){
		flush_local_data();
		self.location.href="/";
	}
	else{
		local_data = JSON.parse(localStorage.data);
	    local_data.sort = {};
        local_data.sort.user = {};
    }
}

function clean_environment(){
	slideBack();
	quotaGroupSlideBack();
	quotaUserSlideBack();
	clearTable('quota_group_table');
	clearTable('quota_user_table');
	//Clean all search content
	$('#user_search_name').val('');
	$('#quota_user_search_name').val('');
	$('#quota_group_search_name').val('');
	$('#group_search_name').val('');
	$('#group_user_search_name').val('');
	$('#data_import_text').val('');
	//Cancel
	groupCancel();
	userCancelManage();
    noticeCancelManage();
	
	//clean page number
	$('#user_page_select_flag').val(0);
	$('#user_page_current_number').val(1);

    $('#group_page_select_flag').val(0);
    $('#group_page_current_number').val(1);
}

function switchItem(itemName){
	for(var index = 0 ; index < itemArray.length ; index++){
		var indexName = itemArray[index];
		if(itemName == indexName){
			$('#'+indexName+"Manage").addClass('active');
			$('#'+indexName+"_manage").css('display','block');
		}
		else{
			$('#'+indexName+"Manage").removeClass('active');
			$('#'+indexName+"_manage").css('display','none');
		}
	}
	clean_environment();
}

function logout(){
	function after_logout(data,status){
	    flush_local_data();
		window.location.href='/';
	}
	var completeUrl = url_templates.auth.signOut(local_data.token);
	request(completeUrl,"","post",after_logout);
}

function userManage(){
	switchItem('user');
	listUser();
}

function quotaManage(){
	switchItem('quota');
}

function groupManage(){
	switchItem('group');
	listGroup();
}

function fileManage(){
    switchItem('file');
}

function dataManage(){
	switchItem('data');
	//clearTableHeader('data_import_table');
	//clearTable('data_import_table');
	//dataProgressInit('import',0);
}

function infoManage(){
	switchItem('info');
	listInformation();
}

function noticeManage(){
    switchItem('notice');
    listNotice();
    initNoticeEditor();
}

function clientManage(){
	switchItem('client');
    listClients();
}

function resetPasswordSubmit(){
	var lastPassword = $('#last_password').val();
	var newPassword = $('#new_password').val();
	var newPasswordConfirm = $('#new_password_confirm').val();
	
	function after_reset(data,status){
		if(status == "error"){
		    check_error(data);
        }
		else{
			alert("密码修改成功，请重新登录！");
			flush_local_data();
			window.location.href="/";
		}
	}
	
	if( typeof lastPassword == "undefined" || lastPassword == null || lastPassword == ""
	  ||typeof newPassword == "undefined" || newPassword == null || newPassword == ""
	  ||typeof newPasswordConfirm == "undefined" || newPasswordConfirm == null || newPasswordConfirm == ""){
		  alert("所有项不能为空！");
		  return;
	}
	else{
		if(newPassword.length < 4 && newPassword.length > 20){
			alert("密码需要在5~20个字符间！");
			return;
		}
		if(newPassword != newPasswordConfirm){
			alert("两次密码必须相同！");
			return;
		}
		var completeUrl = url_templates.auth.changePassword(local_data.adminname,lastPassword,newPassword);
		request(completeUrl,"","post",after_reset);
	}
}

function userSortEvent(){
    /*0:null, 1:asc, 2:desc*/
    var rankIcon = {
        "default" : "fa-sort",
        "asc" : "fa-sort-amount-asc",
        "desc" : "fa-sort-amount-desc"
    };
    $('#user_table .column-sort').off('click');
    $('#user_table .column-sort').on('click', function(e){
        //Init
        $('#user_table').find(".column-sort").removeClass("active");
        $(this).addClass("active");
        for(var key in rankIcon) $('#user_table').find(".column-sort .icon").removeClass(rankIcon[key]);
        $('#user_table').find(".column-sort .icon").addClass(rankIcon["default"]);

        var item = $(this).attr("data-item");
        item = typeof item === "undefined" ? "name" : item;
        local_data.sort['user'].type = api_sort_type.user[item];
        local_data.sort['user'].order= api_sort_order.asc;
        var rank = parseInt($(this).attr("data-sort"));
        for(var key in rankIcon) $(this).find(".icon").removeClass(rankIcon[key]);
        
        if (rank == 0 || rank == 2) {
            $(this).attr("data-sort", 1);
            $(this).find(".icon").addClass(rankIcon["asc"]);
            local_data.sort['user'].order= api_sort_order.asc;
        } else {
            $(this).attr("data-sort", 2);
            $(this).find(".icon").addClass(rankIcon["desc"]);
            local_data.sort['user'].order= api_sort_order.desc;
        }
        listUser();
    });
}

function listUser(){
	clearTable('user_table');
	var currentPageNumber = parseInt($('#user_page_current_number').val());
	var offset = (currentPageNumber-1)*pageSize;
	
	function after_list(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
			var dataVal = [];
			var saveDataVal = [];
			if(currentPageNumber == 1){
				//Create page number
				var totalPageNumber = calcPageTotalCount(data.total,pageSize);
				$('#user_page_total_number').val(totalPageNumber);
				$('#user_page_label').text('Page 1 of '+totalPageNumber);
			}
			for(var index = 0,pos = 0 ; index < data.entries.length ; index++){
			    var user = data.entries[index];
				if(user.role.name != 'root'){
					//Construct data
					dataVal[pos] = [];
					dataVal[pos][0] = offset+pos+1;
					dataVal[pos][1] = '<input type="checkbox" value="'+user.id+'" name="'+pos+'">';
					dataVal[pos][2] = user.name;
					dataVal[pos][3] = String.denoise(user.display_name);
					dataVal[pos][4] = user.email;
					dataVal[pos][5] = user.created_at.display_value;
					dataVal[pos][6] = user.groups_can_own;
                    dataVal[pos][7] = user.source;
					dataVal[pos][8] = '<a onClick="resetPassword(\''+user.id+'\')">重置</a>';
					if(!user.is_blocked){
						dataVal[pos][9] = '<a style="color:#0088cc" onClick="changeUserState(\'0\',this,9)">已启用</a>';
					}
					else{
						dataVal[pos][9] = '<a style="color:#ff0000" onClick="changeUserState(\'1\',this,9)">已禁用</a>';
					}
				
					saveDataVal[pos] = [];
					saveDataVal[pos][0] = user.id;
					saveDataVal[pos][1] = user.name;
					saveDataVal[pos][2] = user.role.name;
					saveDataVal[pos][3] = user.groups_can_own;
					saveDataVal[pos][4] = user.source;
					pos = pos + 1;
				}
			}
			localStorage.setItem('userTableData',JSON.stringify(saveDataVal));
			createTable('user_table',dataVal);
		}
	}
	var completeUrl = url_templates.user.list(local_data.token,offset,pageSize,null,null,null,local_data.sort['user'].type,local_data.sort['user'].order);
	request(completeUrl,"","get",after_list);
}

function listGroup(){
	clearTable('group_table');
	var currentPageNumber = parseInt($('#group_page_current_number').val());
	var offset = (currentPageNumber-1)*pageSize;
	
	function after_list(data,status){
		if(status == "error"){
		    check_error(data);
        }
		else{
			var dataVal = [];
			var saveDataVal = [];
			if(currentPageNumber == 1){
				//Create page number
				var totalPageNumber = calcPageTotalCount(data.total,pageSize);
				$('#group_page_total_number').val(totalPageNumber);
				$('#group_page_label').text('Page 1 of '+totalPageNumber);
			}
			
			for(var index = 0 ; index < data.entries.length ; index++){
				var group = data.entries[index];
				dataVal[index] = [];
				dataVal[index][0] = offset+index+1;
				dataVal[index][1] = '<input type="checkbox" value="'+group.id+'" name="'+index+'">';
				dataVal[index][2] = '<a onClick="userList(\''+group.id+'\')">'+stringThumbnail(group.name)+'</a>';
				dataVal[index][3] = stringThumbnail(String.denoise(group.intro));
				dataVal[index][4] = stringThumbnail(String.denoise(group.tags));
				
				dataVal[index][5] = group.type.display_value;
				dataVal[index][6] = getGroupSearch(group.is_visible);
				dataVal[index][7] = group.created_at.display_value;
				dataVal[index][8] = group.source;

                if(group.is_promoted)
                    dataVal[index][9] = '<a style="color:#ff0000" onClick="changeGroupPromoted(\'0\',this)">是</a>';
                else
                    dataVal[index][9] = '<a style="color:#0088cc" onClick="changeGroupPromoted(\'1\',this)">否</a>';
                
                if(!group.is_blocked){
					dataVal[index][10] = '<a style="color:#0088cc" onClick="changeGroupState(\'0\',this)">已启用</a>';
				}
				else{
					dataVal[index][10] = '<a style="color:#ff0000" onClick="changeGroupState(\'1\',this)">已禁用</a>';;
				}
				
				saveDataVal[index] = [];
				saveDataVal[index][0] = group.name;
				saveDataVal[index][1] = String.denoise(group.intro);
				saveDataVal[index][2] = String.denoise(group.tags);
				saveDataVal[index][3] = group.type.name;
				saveDataVal[index][4] = group.id;
				saveDataVal[index][5] = group.type.display_value;
				saveDataVal[index][6] = group.is_visible;
			}
			//Save data
			localStorage.setItem('groupTableData',JSON.stringify(saveDataVal));
			createTable('group_table',dataVal);
		}
	}
	
	var completeUrl = url_templates.group.list(local_data.token,offset,pageSize);
    request(completeUrl,"","get",after_list);
}

function listGroupUser(){
	var groupID = $('#current_group_id').val();
	clearTable('group_user_table');
	var currentPageNumber = parseInt($('#group_user_page_current_number').val());
	var offset = (currentPageNumber-1)*pageSize;
	function after_list(data,status){
		if(status == "error"){
			check_error(data);
		}
		else{
			var dataVal = [];
			var saveDataVal = [];
			if(currentPageNumber == 1){
				//Create page number
				var totalPageNumber = calcPageTotalCount(data.total,pageSize);
				$('#group_user_page_total_number').val(totalPageNumber);
				$('#group_user_page_label').text('Page 1 of '+totalPageNumber);
			}
			for(var index = 0 ; index < data.entries.length ; index++){
				var user = data.entries[index];
                dataVal[index] = [];
				dataVal[index][0] = index+1;
				dataVal[index][1] = '<input type="checkbox" value="'+user.id+'" name="'+index+'">';
				dataVal[index][2] = user.name;
				dataVal[index][3] = String.denoise(user.display_name);
				dataVal[index][4] = user.email;
				dataVal[index][5] = user.relation.role.display_value;
                dataVal[index][6] = user.source;
			    if(!user.relation.is_blocked){
					dataVal[index][7] = '<a style="color:#0088cc" onClick="changeGroupUserState(\'0\',this,7)">已启用</a>';
				}
				else{
					dataVal[index][7] = '<a style="color:#ff0000" onClick="changeGroupUserState(\'1\',this,7)">已禁用</a>';
				}
				
				saveDataVal[index] = [];
				saveDataVal[index][0] = groupID;
				saveDataVal[index][1] = user.id;
				saveDataVal[index][2] = user.relation.role.display_value;
				saveDataVal[index][3] = user.relation.role.name;
			}
			//$('#group_table').css('display','none');
			localStorage.setItem('groupUserTableData',JSON.stringify(saveDataVal));
			createTable('group_user_table',dataVal);
		}
	}
	
	var completeUrl = url_templates.group_user.list(groupID,local_data.token,null,offset,pageSize);
	request(completeUrl,"","get",after_list);
}

function changeUserState(currentState,currentTR,tdIndex){
	var tr = currentTR.parentNode.parentNode;
	var userID = tr.cells[1].firstChild.value;
	var isBlocked = false;
	
	if(currentState == 0){
		isBlocked = true;
	}
	
	function after_update(data,status){
		if(status == 'error'){
			check_error(data);
		}
		else{
			if(currentState == 0){
				tr.cells[tdIndex].innerHTML = '<a style="color:#ff0000" onClick="changeUserState(\'1\',this,'+tdIndex+')">已禁用</a>';
			}
			else{
				tr.cells[tdIndex].innerHTML = '<a style="color:#0088cc" onClick="changeUserState(\'0\',this,'+tdIndex+')">已启用</a>';
			}
		}
	}
	
	var form = JSON.stringify({
		"is_blocked" : isBlocked
	});
	
	var completeUrl = url_templates.user.update(userID,local_data.token);
	request(completeUrl,form,"post",after_update);
}

//Quota group
function quotaGroupSearch(){
	quotaGroupSlideBack();
	var groupName = $('#quota_group_search_name').val();
	clearTable('quota_group_table');
	var currentPageNumber = parseInt($('#quota_group_page_current_number').val());
	var offset = (currentPageNumber - 1) * parseInt(pageSize / 2);
	
	function after_search(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
			if(data.total == 0){
			}
			else{
				var dataVal = [];
				if(currentPageNumber == 1){
					//Create page number
					var totalPageNumber = calcPageTotalCount(data.total,pageSize);
					$('#quota_group_page_total_number').val(totalPageNumber);
					$('#quota_group_page_label').text('Page 1 of '+totalPageNumber);
				}
				for(var index = 0 ; index < data.entries.length ; index ++){
					dataVal[index] = [];
					var group = data.entries[index];
					dataVal[index][0] = offset+index+1;
					dataVal[index][1] = group.name;
					dataVal[index][2] = group.intro;
					dataVal[index][3] = group.tags;
					dataVal[index][4] = '<a onClick="groupQuotaChange(\''+group.id+'\')">修改 &rarr;</a>';
				}
				createTable('quota_group_table',dataVal);
			}
		}
	}
	var completeUrl = url_templates.search.groups(groupName,local_data.token,null,offset,parseInt(pageSize / 2));
	request(completeUrl,"","get",after_search);
}

function quotaGroupSubmit(){
	var group_id = $('#quota_group_id').val();
    var root_id = $('#quota_group_root_id').val();
	var group_quota = $('#quota_group_quota').val();
	
	function after_update(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
			$('#quota_group_success_prompt').css('display','block');
			var usage = parseInt($('#quota_group_usage_number').val());
			usage = usage / data.quota.bytes * 100;
			usage = Number(usage).toFixed(2);
			$('#quota_group_usage').css('width',usage+"%");
			$('#quota_group_usage_str').text(usage+"%");
		}
	}
	
	if(!valid_int.test(group_quota)
	   ||parseInt(group_quota)<0
	   ||parseInt(group_quota)>10000){
		$('#quota_group_quota_controls').addClass('error');
	}
	else{
		$('#quota_group_quota_controls').removeClass('error');
		group_quota = group_quota + 'GB';
		var completeUrl = url_templates.root.setQuota(root_id,group_quota,local_data.token);
		request(completeUrl,"","post",after_update);
	}
}

function quotaGroupCancel(){
	$('#quota_group_search_name').val("");
	$('#quota_group_id').val("");
	$('#quota_group_name').val("");
	$('#quota_group_usage').css('width',"0%");
	$('#quota_group_usage_str').text("0%");
	$('#quota_group_quota').val("");
	$('#quota_group_submit').attr('disabled',true);
	quotaGroupAlertClose();
}

function quotaGroupAlertClose(){
	$('#quota_group_success_prompt').css('display','none');
}

function quotaUserAlertClose(){
	$('#quota_user_success_prompt').css('display','none');
}

function groupQuotaChange(groupID){
	$('#quota_group_slide').animate({marginLeft:'-1158px'},500);
	
	function after_getInfo(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
			$('#quota_group_id').val(data.id);
            $('#quota_group_root_id').val(data.root_id);
			$('#quota_group_name').val(data.name);
            
            var url = url_templates.root.get(data.root_id,local_data.token);
            request(url,"","get",function(root,status){
                if(status == 'success'){
			        $('#quota_group_usage_number').val(root.used.bytes);
			        var usage = parseInt(root.used.bytes) / parseInt(root.quota.bytes) * 100;
			        usage = Number(usage).toFixed(2);
			        $('#quota_group_usage').css('width',usage+"%");
			        $('#quota_group_usage_str').text(usage+"%");
			        var quotaToGB = parseInt(root.quota.bytes) / (1024 * 1024 * 1024);
			        $('#quota_group_quota').val(quotaToGB);
			        $('#quota_group_submit').removeAttr('disabled');
                }
            });
		}
	}
	
	var completeUrl = url_templates.group.get(groupID,local_data.token);
	request(completeUrl,"","get",after_getInfo);
}

function quotaGroupSlideBack(){
	$('#quota_group_slide').animate({marginLeft:'0px'},500);
}

//Quota user
function quotaUserSearch(){
	quotaUserSlideBack();
	var userName = $('#quota_user_search_name').val();
	clearTable('quota_user_table');
	var currentPageNumber = parseInt($('#quota_user_page_current_number').val());
	var offset = (currentPageNumber - 1) * parseInt(pageSize / 2);
	
	function after_search(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
			if(data.total == 0){
			}
			else{
				var dataVal = [];
				if(currentPageNumber == 1){
					//Create page number
					var totalPageNumber = calcPageTotalCount(data.total,pageSize);
					$('#quota_user_page_total_number').val(totalPageNumber);
					$('#quota_user_page_label').text('Page 1 of '+totalPageNumber);
				}
				for(var index = 0 ; index < data.entries.length ; index++){
					dataVal[index] = [];
					var user = data.entries[index];
					dataVal[index][0] = offset+index+1;
					dataVal[index][1] = user.name;
					dataVal[index][2] = String.denoise(user.display_name);
					dataVal[index][3] = user.email;
					dataVal[index][4] = '<a onClick="userQuotaChange(\''+user.id+'\')">修改 &rarr;</a>';
				}
				createTable('quota_user_table',dataVal);
			}
		}
	}
	var completeUrl = url_templates.search.users(userName,local_data.token,null,offset,parseInt(pageSize / 2));
	request(completeUrl,"","get",after_search);
}

function quotaUserSubmit(){
	var user_id = $('#quota_user_id').val();
    var root_id = $('#quota_user_root_id').val();
	var user_quota = $('#quota_user_quota').val();
	
	function after_update(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
			$('#quota_user_success_prompt').css('display','block');
			var usage = parseInt($('#quota_user_usage_number').val());
			usage = usage / data.quota.bytes * 100;
			usage = Number(usage).toFixed(2);
			$('#quota_user_usage').css('width',usage+"%");
			$('#quota_user_usage_str').text(usage+"%");
		}
	}

	if(!valid_int.test(user_quota)
	   ||parseInt(user_quota)<0
	   ||parseInt(user_quota)>10000){
		$('#quota_user_quota_controls').addClass('error');
	}
	else{
		$('#quota_user_quota_controls').removeClass('error');
		user_quota = user_quota + 'GB';
		var completeUrl = url_templates.root.setQuota(root_id,user_quota,local_data.token);
		request(completeUrl,"","post",after_update);	
	}
}

function quotaUserCancel(){
	$('#quota_user_search_name').val("");
	$('#quota_user_id').val("");
	$('#quota_user_name').val("");
	$('#quota_user_usage').css('width',"0%");
	$('#quota_user_usage_str').text("0%");
	$('#quota_user_quota').val("");
	$('#quota_user_submit').attr('disabled',true);
	quotaUserAlertClose();
}

function quotaUserAlertClose(){
	$('#quota_user_success_prompt').css('display','none');
}

function userQuotaChange(userID){
	$('#quota_user_slide').animate({marginLeft:'-1158px'},500);
	function after_getInfo(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
			$('#quota_user_id').val(data.id);
            $('#quota_user_root_id').val(data.root_id);
			$('#quota_user_name').val(data.name);
            var url = url_templates.root.get(data.root_id,local_data.token);
            request(url,"","get",function(root,status){
                if(status == 'success'){
			        $('#quota_user_usage_number').val(root.used.bytes);
			        var usage = parseInt(root.used.bytes) / parseInt(root.quota.bytes) * 100;
			            usage = Number(usage).toFixed(2);
			        $('#quota_user_usage').css('width',usage+"%");
			        $('#quota_user_usage_str').text(usage+"%");
			        var quotaToGB = parseInt(root.quota.bytes) / (1024 * 1024 * 1024);
			        $('#quota_user_quota').val(quotaToGB);
			        $('#quota_user_submit').removeAttr('disabled');
                }
            });
		}
	}
	var completeUrl = url_templates.user.get(userID,local_data.token);
	request(completeUrl,"","get",after_getInfo);
}

function quotaUserSlideBack(){
	$('#quota_user_slide').animate({marginLeft:'0px'},500);
}

//Table operation
function clearTable(tableID){
	$('#'+tableID+">tbody tr").remove();
}

function clearTableHeader(tableID){
	$('#'+tableID+">thead>tr td").remove();
}


function createTable(tableID,data){
	if(data != null && typeof data != "undefined"){
		var $table = $('#'+tableID+'>tbody');
		for(var i = 0 ; i < data.length ; i++){
			$table.append(createRow(data[i]));
		}
	}
}

function createTableHeader(tableID,data){
	if(data != null && typeof data != 'undefined'){
		var $table = $('#'+tableID+'>thead>tr');
		for(var i = 0 ; i < data.length ; i++){
			$table.append('<td>'+data[i]+'</td>');
		}
	}
}

function createRow(data){
	var code = "<tr>";
	for(var index = 0 ; index < data.length ; index++){
		var td = "<td>"+data[index]+"</td>";
		code = code + td;
	}
	code = code + "</tr>";
	return code;
}

function calcPageTotalCount(itemCount,pageSize){
	return parseInt(((parseInt(itemCount)-1) / pageSize)) + 1;
}

//User
function userEditManage(){
	var val = $('#user_edit_manage').val();
	if(val == 0){
		userEdit();
	}
	else{
		userSave();
	}
}

function userEdit(){
	var $checkedList = $('#user_table >tbody input:checkbox:checked');
	if($checkedList.length == 0){
	}
	else{
		$checkedList.each(function(index, element) {
            var pos = element.name;
			var userID = element.value;
			var saveData = JSON.parse(localStorage.getItem("userTableData"));
			var groupCanOwn = saveData[pos][3];
            var userSource = saveData[pos][4];
			var groupCanOwnHTML = '<div class="control-group"><input type="text" class="span1" value="'+groupCanOwn+'"></div>';
            var userSourceHTML = '<div class="control-group"><input type="text" class="span1" value="'+userSource+'"></div>';
			$('#user_table > tbody tr:eq('+pos+') td:eq(6)').html(groupCanOwnHTML);
            $('#user_table > tbody tr:eq('+pos+') td:eq(7)').html(userSourceHTML);
        });
		activateEdit('user');
	}
}

function userSave(){
	var $checkedList = $('#user_table >tbody input:checkbox:checked');
	if($checkedList.length == 0){
	}
	else{
		var errorFlag = false;
		$checkedList.each(function(index, element) {
			var pos = element.name;
			var eachErrorFlag = false;
			var groupCanOwn = $('#user_table > tbody tr:eq('+pos+') td:eq(6) input[type="text"]').val();
			var userID = $('#user_table > tbody tr:eq('+pos+') td:eq(1) input[type="checkbox"]').val();
            var userSource = $('#user_table > tbody tr:eq('+pos+') td:eq(7) input[type="text"]').val();
			//Check data format
			if(!valid_int.test(groupCanOwn)){
				eachErrorFlag = true;
				$('#user_table > tbody tr:eq('+pos+') td:eq(6) .control-group').addClass('error');
			}
			
			if(eachErrorFlag){
				errorFlag = true;
			}
			else{
				$('#user_table > tbody tr:eq('+pos+') td:eq(6)').html(groupCanOwn);
				$('#user_table > tbody tr:eq('+pos+') td:eq(7)').html(userSource);
				//update localStorage
				var saveData = JSON.parse(localStorage.getItem('userTableData'));
				saveData[pos][3] = groupCanOwn;
				localStorage.setItem('userTableData',JSON.stringify(saveData));
				element.checked = false;
				updateUserInfo(userID,groupCanOwn,userSource);
			}
		});
		
		if(!errorFlag){
			deactivateEdit('user');
			$('#user_error_prompt').css('display','none');
			$('#user_success_prompt').css('display','block');
		}
		else{
			$('#user_error_prompt').css('display','block');
			$('#user_success_prompt').css('display','none');
		}
	}
}


function userCancelManage(){
	//Restore the data
	var savedData = JSON.parse(localStorage.getItem('userTableData'));
	if(typeof savedData != 'undefined' && savedData != null){
		for(var pos = 0 ; pos < savedData.length ; pos++){
			$('#user_table > tbody tr:eq('+pos+') td:eq(6)').html(savedData[pos][3]);
			$('#user_table > tbody tr:eq('+pos+') td:eq(7)').html(savedData[pos][4]);
		}
		deactivateEdit('user');
	}
}

function userDeleteManage(){
    if(!confirm("确定要删除这些用户吗?"))
        return ;
	var $checkedList = $('#user_table >tbody input:checkbox:checked');
	if($checkedList.length == 0){
	}
	else{
        var count = 0, total = $checkedList.length;
		$checkedList.each(function(index, element) {
			var userID = element.value;
            var completeUrl = url_templates.user.del(userID,local_data.token);
            request(completeUrl,"","delete",function(data,status){
                if(total == ++count)
                    listUser();
            });
        });
	}
}

function userCheckManage(){
	if($('#user_check_manage').is(':checked')){
		$('#user_table >tbody input:checkbox').each(function(index, element) {
            element.checked = true;
        });
	}
	else{
		$('#user_table >tbody input:checkbox').each(function(index, element) {
            element.checked = false;
        });
	}
}

function updateUserInfo(userID,groupCanOwn,userSource){
	var form = JSON.stringify({
        "source" : userSource,
		"groups_can_own" : groupCanOwn
	});
	function after_update(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
		}
	}
	
	var completeUrl = url_templates.user.update(userID,local_data.token);
	request(completeUrl,form,"post",after_update);
}

function resetPassword(userID){
	var result = window.confirm("您是否确定将此用户的密码重新设置成123456?");
	if(result == true){
		function after_update(data,status){
			if(status == 'error'){
			    check_error(data);
            }
			else{
				alert('密码重置成功');
			}
		}
		//var new_password = SHA256_hash('123456');
		var new_password = '123456';
        var completeUrl = url_templates.user.setPassword(userID,local_data.token,new_password);
		request(completeUrl,"","post",after_update);
	}
	else{
	}
}

function userSearchSubmit(){
	$('#user_page_current_number').val(1);
	$('#user_page_select_flag').val(1);
	userSearch();
}

function userSearch(){
	var userName = $('#user_search_name').val();
	if(Trim(userName) == ''){
        userManage();
        return;
    }
    clearTable('user_table');
	var currentPageNumber = parseInt($('#user_page_current_number').val());
	var offset = (currentPageNumber-1)*pageSize;
	
	function after_search(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
			var dataVal = [];
			var saveDataVal = [];
			if(currentPageNumber == 1){
				//Create page number
				var totalPageNumber = calcPageTotalCount(data.total,pageSize);
				$('#user_page_total_number').val(totalPageNumber);
				$('#user_page_label').text('Page 1 of '+totalPageNumber);
			}
			
			for(var index = 0,pos = 0 ; index < data.entries.length ; index++){
                var user = data.entries[index];
				if(user.role.name != 'root'){
					//Construct data
					dataVal[pos] = [];
					dataVal[pos][0] = pos+1;
					dataVal[pos][1] = '<input type="checkbox" value="'+user.id+'" name="'+pos+'">';
					dataVal[pos][2] = user.name;
					dataVal[pos][3] = String.denoise(user.display_name);
					dataVal[pos][4] = user.email;
					dataVal[pos][5] = user.created_at.display_value;
					dataVal[pos][6] = user.groups_can_own;
                    dataVal[pos][7] = user.source;
					dataVal[pos][8] = '<a onClick="resetPassword(\''+user.id+'\')">重置</a>';
					if(!user.is_blocked){
						dataVal[pos][9] = '<a style="color:#0088cc" onClick="changeUserState(\'0\',this,9)">已启用</a>';
					}
					else{
						dataVal[pos][9] = '<a style="color:#ff0000" onClick="changeUserState(\'1\',this,9)">已禁用</a>';
					}
				
					saveDataVal[pos] = [];
					saveDataVal[pos][0] = user.id;
					saveDataVal[pos][1] = user.name;
					saveDataVal[pos][2] = user.is_blokced;
					saveDataVal[pos][3] = user.groups_can_own;
                    saveDataVal[pos][4] = user.source;
					pos = pos + 1;
				}
			}
			localStorage.setItem('userTableData',JSON.stringify(saveDataVal));
			createTable('user_table',dataVal);
		}
	}
	var completeUrl = url_templates.search.users(userName,local_data.token,null,offset,pageSize);
	request(completeUrl,"","get",after_search);
}

function userAlertClose(){
	$('#user_error_prompt').css('display','none');
	$('#user_success_prompt').css('display','none');
}

//User page switch
function userPageFirst(){
	if(pageFirst('user')){
		var val = $('#user_page_select_flag').val();
		if(val == 0){
			listUser();
		}
		else{
			userSearch();
		}
	}
}

function userPageRight(){
	if(pageRight('user')){
		var val = $('#user_page_select_flag').val();
		if(val == 0){
			listUser();
		}
		else{
			userSearch();
		}
	}
}

function userPageLeft(){
	if(pageLeft('user')){
		var val = $('#user_page_select_flag').val();
		if(val == 0){
			listUser();
		}
		else{
			userSearch();
		}
	}
}

function userPageLast(){
	if(pageLast('user')){
		var val = $('#user_page_select_flag').val();
		if(val == 0){
			listUser();
		}
		else{
			userSearch();
		}
	}
}

//Group page switch
function groupPageFirst(){
	if(pageFirst('group')){
		var val = $('#group_page_select_flag').val();
		if(val == 0){
			listGroup();
		}
		else{
			groupSearch();
		}
	}
}

function groupPageRight(){
	if(pageRight('group')){
		var val = $('#group_page_select_flag').val();
		if(val == 0){
			listGroup();
		}
		else{
			groupSearch();
		}
	}
}

function groupPageLeft(){
	if(pageLeft('group')){
		var val = $('#group_page_select_flag').val();
		if(val == 0){
			listGroup();
		}
		else{
			groupSearch();
		}
	}
}

function groupPageLast(){
	if(pageLast('group')){
		var val = $('#group_page_select_flag').val();
		if(val == 0){
			listGroup();
		}
		else{
			groupSearch();
		}
	}
}

//Group user page switch
function groupUserPageFirst(){
	if(pageFirst('group_user')){
		var val = $('#group_user_page_select_flag').val();
        if(val == 0)
            listGroupUser();
        else
            groupUserSearchSubmit();
	}
}

function groupUserPageRight(){
	if(pageRight('group_user')){
        var val = $('#group_user_page_select_flag').val();
		if(val == 0)
            listGroupUser();
        else
            groupUserSearchSubmit();
	}
}

function groupUserPageLeft(){
	if(pageLeft('group_user')){
        var val = $('#group_user_page_select_flag').val();
        if(val == 0)
		    listGroupUser();
        else
            groupUserSearchSubmit();
	}
}

function groupUserPageLast(){
	if(pageLast('group_user')){
        var val = $('#group_user_page_select_flag').val();
        if(val == 0)
		    listGroupUser();
        else
            groupUserSearchSubmit();
	}
}

//Quota group page switch
function quotaGroupPageFirst(){
	if(pageFirst('quota_group')){
		quotaGroupSearch();
	}
}

function quotaGroupPageRight(){
	if(pageRight('quota_group')){
		quotaGroupSearch();
	}
}

function quotaGroupPageLeft(){
	if(pageLeft('quota_group')){
		quotaGroupSearch();
	}
}

function quotaGroupPageLast(){
	if(pageLast('quota_group')){
		quotaGroupSearch();
	}
}

//Quota user page switch
function quotaUserPageFirst(){
	if(pageFirst('quota_user')){
		quotaUserSearch();
	}
}

function quotaUserPageRight(){
	if(pageRight('quota_user')){
		quotaUserSearch();
	}
}

function quotaUserPageLeft(){
	if(pageLeft('quota_user')){
		quotaUserSearch();
	}
}

function quotaUserPageLast(){
	if(pageLast('quota_group')){
		quotaUserSearch();
	}
}

//Page switch
function pageFirst(pageItemName){
	var pageNumber = parseInt($('#'+pageItemName+'_page_current_number').val());
	var totalNumber = parseInt($('#'+pageItemName+'_page_total_number').val());
	if(pageNumber != 1){
		pageNumber = 1;
		var pageStr = 'Page '+pageNumber+' of '+totalNumber;
		$('#'+pageItemName+'_page_label').text(pageStr);
		$('#'+pageItemName+'_page_current_number').val(pageNumber);
		return true;
	}
	else{
		return false;
	}
}

function pageRight(pageItemName){
	var pageNumber = parseInt($('#'+pageItemName+'_page_current_number').val());
	var totalNumber = parseInt($('#'+pageItemName+'_page_total_number').val());
	if(pageNumber < totalNumber){
		pageNumber = pageNumber + 1;
		var pageStr = 'Page '+pageNumber+' of '+totalNumber;
		$('#'+pageItemName+'_page_label').text(pageStr);
		$('#'+pageItemName+'_page_current_number').val(pageNumber);
		return true;
	}
	else{
		return false;
	}
}

function pageLeft(pageItemName){
	var pageNumber = parseInt($('#'+pageItemName+'_page_current_number').val());
	var totalNumber = parseInt($('#'+pageItemName+'_page_total_number').val());
	if(pageNumber > 1){
		pageNumber = pageNumber - 1;
		var pageStr = 'Page '+pageNumber+' of '+totalNumber;
		$('#'+pageItemName+'_page_label').text(pageStr);
		$('#'+pageItemName+'_page_current_number').val(pageNumber);
		return true;
	}
	else{
		return false;
	}
}

function pageLast(pageItemName){
	var pageNumber = parseInt($('#'+pageItemName+'_page_current_number').val());
	var totalNumber = parseInt($('#'+pageItemName+'_page_total_number').val());
	if(pageNumber != totalNumber){
		pageNumber = totalNumber;
		var pageStr = 'Page '+pageNumber+' of '+totalNumber;
		$('#'+pageItemName+'_page_label').text(pageStr);
		$('#'+pageItemName+'_page_current_number').val(pageNumber);
		return true;
	}
	else{
		return false;
	}
}

//Group
function userList(groupID){
	$('#group_slide').animate({marginLeft:'-1158px'},500);
	$('#group_edit_manage').css('display','none');
	$('#group_user_edit_manage').css('display','inline-block');
	$('#group_user_add').css('display','inline-block');
	$('#group_delete_manage').val(1);
	$('#group_cancel_manage').val(1);
	$('#current_group_id').val(groupID);
	listGroupUser();
}

function slideBack(){
	$('#group_slide').animate({marginLeft:'0px'},500);
	$('#group_edit_manage').css('display','inline-block');
	$('#group_user_edit_manage').css('display','none');
	$('#group_delete_manage').val(0);
	$('#group_cancel_manage').val(0);
	$('#group_user_add').css('display','none');
	//Clean checkbox
	deactivateEdit('group_user');
	//$('#group_table').css('display','table');
}

function groupSearchSubmit(){
	$('#group_page_current_number').val(1);
	$('#group_page_select_flag').val(1);
	groupSearch();
}

function groupSearch(){
	var groupName = $('#group_search_name').val();
	if(Trim(groupName) == ''){
        groupManage();
        return;
    }
    clearTable('group_table');
	var currentPageNumber = parseInt($('#group_page_current_number').val());
	var offset = (currentPageNumber-1)*pageSize;
	
	function after_search(data,status){
		if(status == "error"){
		   check_error(data);
        }
		else{
			var dataVal = [];
			var saveDataVal = [];
			if(currentPageNumber == 1){
				//Create page number
				var totalPageNumber = calcPageTotalCount(data.total,pageSize);
				$('#group_page_total_number').val(totalPageNumber);
				$('#group_page_label').text('Page 1 of '+totalPageNumber);
			}
			
			for(var index = 0 ; index < data.entries.length ; index++){
				var group = data.entries[index];
				dataVal[index] = [];
				dataVal[index][0] = index+1;
				dataVal[index][1] = '<input type="checkbox" value="'+group.id+'" name="'+index+'">';
				dataVal[index][2] = '<a onClick="userList(\''+group.id+'\')">'+stringThumbnail(group.name)+'</a>';
				dataVal[index][3] = stringThumbnail(String.denoise(group.intro));
				dataVal[index][4] = stringThumbnail(String.denoise(group.tags));
				
				dataVal[index][5] = group.type.display_value;
				dataVal[index][6] = getGroupSearch(group.is_visible);
				dataVal[index][7] = group.created_at.display_value;
				dataVal[index][8] = group.source;

                if(group.is_promoted)
                    dataVal[index][9] = '<a style="color:#ff0000" onClick="changeGroupPromoted(\'0\',this)">是</a>';
                else
                    dataVal[index][9] = '<a style="color:#0088cc" onClick="changeGroupPromoted(\'1\',this)">否</a>';
                
                if(!group.is_blocked){
					dataVal[index][10] = '<a style="color:#0088cc" onClick="changeGroupState(\'0\',this)">已启用</a>';
				}
				else{
					dataVal[index][10] = '<a style="color:#ff0000" onClick="changeGroupState(\'1\',this)">已禁用</a>';;
				}
				
				saveDataVal[index] = [];
				saveDataVal[index][0] = group.name;
				saveDataVal[index][1] = String.denoise(group.intro);
				saveDataVal[index][2] = String.denoise(group.tags);
				saveDataVal[index][3] = group.type.name;
				saveDataVal[index][4] = group.id;
				saveDataVal[index][5] = group.type.display_value;
			}
			//Save data
			localStorage.setItem('groupTableData',JSON.stringify(saveDataVal));
			createTable('group_table',dataVal);
		}
	}
	var completeUrl = url_templates.search.groups(groupName,local_data.token,null,offset,pageSize);
	request(completeUrl,"","get",after_search);
}

function changeGroupPromoted(currentState,currentTR){
	var tr = currentTR.parentNode.parentNode;
	var groupID = tr.cells[1].firstChild.value;
	var isPromoted = true;
	
	if(currentState == 0){
		isPromoted = false;
	}
	
	function after_set(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
			if(currentState == 0){
                tr.cells[9].innerHTML = '<a style="color:#0088cc" onClick="changeGroupPromoted(\'1\',this)">否</a>';
			}
			else{
                tr.cells[9].innerHTML = '<a style="color:#ff0000" onClick="changeGroupPromoted(\'0\',this)">是</a>';
			}
		}
	}
	
	var completeUrl = url_templates.group.setPromoted(groupID,isPromoted,local_data.token);
	request(completeUrl,"","post",after_set);
}

function changeGroupState(currentState,currentTR){
	var tr = currentTR.parentNode.parentNode;
	var groupID = tr.cells[1].firstChild.value;
	var isBlocked = false;
	
	if(currentState == 0){
		isBlocked = true;
	}
	
	function after_update(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
			if(currentState == 0){
				tr.cells[10].innerHTML = '<a style="color:#ff0000" onClick="changeGroupState(\'1\',this)">已禁用</a>';
			}
			else{
				tr.cells[10].innerHTML = '<a style="color:#0088cc" onClick="changeGroupState(\'0\',this)">已启用</a>';
			}
		}
	}
	
	var form = JSON.stringify({
		"is_blocked" : isBlocked
	});
	
	var completeUrl = url_templates.group.update(groupID,local_data.token);
	request(completeUrl,form,"post",after_update);
}

function changeGroupUserState(currentState,currentTR){
	var tr = currentTR.parentNode.parentNode;
	var groupID = $('#current_group_id').val();
    var userID = tr.cells[1].firstChild.value;
	var isBlocked = false;
	
	if(currentState == 0){
		isBlocked = true;
	}
	
	function after_update(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
			if(currentState == 0){
				tr.cells[7].innerHTML = '<a style="color:#ff0000" onClick="changeGroupUserState(\'1\',this)">已禁用</a>';
			}
			else{
				tr.cells[7].innerHTML = '<a style="color:#0088cc" onClick="changeGroupUserState(\'0\',this)">已启用</a>';
			}
		}
	}
	
	var form = JSON.stringify({
		"is_blocked" : isBlocked
	});
	
	var completeUrl = url_templates.group_user.update(groupID,userID,local_data.token);
	request(completeUrl,form,"post",after_update);

}

function groupEditManage(){
	var val = $('#group_edit_manage').val();
	if(val == 0){
		groupEdit();
	}
	else{
		groupSave();
	}
}

function groupUserEditManage(){
	var val = $('#group_user_edit_manage').val();
	if(val == 0){
		groupUserEdit();
	}
	else{
		groupUserSave();
	}
}

function getGroupType(){
	function after_get(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
			for(var index = 0 ; index < data.length ; index++){
				GROUP_TYPE[data[index].name] = data[index].display_value;
			}
		}
	}
	var completeUrl = url_templates.consts.group_types(local_data.token);
	request(completeUrl,"","get",after_get);
}

function createGroupTypeSelect(itemNumber,itemName){
	var htmlStr = '<select id="group_type">';
    for(var key in GROUP_TYPE){
        if(itemName == GROUP_TYPE[key]){
		    htmlStr = htmlStr + '<option value="'+key+'">'+GROUP_TYPE[key]+'</option>';
		}
	}
		
	for(var key in GROUP_TYPE){
		if(itemName != GROUP_TYPE[key]){
			htmlStr = htmlStr + '<option value="'+key+'">'+GROUP_TYPE[key]+'</option>';
		}
	}
	htmlStr = htmlStr + '</select>';
	return htmlStr;
}

function getGroupUserPosition(){
	function after_get(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
			for(var index = 0 ; index < data.length ; index++){
				USER_POSITION[data[index].name] = data[index].display_value;
			}
		}
	}
	//TODO
    var completeUrl = url_templates.consts.relation_roles(local_data.token);
	request(completeUrl,"","get",after_get);
}

function createGroupUserPositionSelect(itemNumber,itemName){
	var htmlStr = '<select id="group_user_position" class="span6">';	
        htmlStr = htmlStr + '<option value="'+itemNumber+'">'+itemName+'</option>';
    for(var key in USER_POSITION){
		if(itemNumber != key){
			htmlStr = htmlStr + '<option value="'+key+'">'+USER_POSITION[key]+'</option>';
		}	
	}
	htmlStr = htmlStr + '</select>';
	return htmlStr;
}

function createGroupVisibleSelect(itemName){
	var htmlStr = '<select id="group_visible" class="span12">';
	if(itemName){
		htmlStr = htmlStr + '<option value="true">'+getGroupSearch(true)+'</option>';
		htmlStr = htmlStr + '<option value="false">'+getGroupSearch(false)+'</option>';
	}
	else{
		htmlStr = htmlStr + '<option value="false">'+getGroupSearch(false)+'</option>';
		htmlStr = htmlStr + '<option value="true">'+getGroupSearch(true)+'</option>';
	}
	htmlStr = htmlStr + '</select>';
	return htmlStr;
}

function groupEdit(){
	var $checkedList = $('#group_table >tbody input:checkbox:checked');
	if($checkedList.length == 0){
	}
	else{
		$checkedList.each(function(index, element) {
			var pos = element.name;
			var groupID = element.value;
			//var description = $('#group_table > tbody tr:eq('+pos+') td:eq(3)').html();
			var saveData = JSON.parse(localStorage.getItem('groupTableData'));
			
			var tags = saveData[pos][2];
			var description =saveData[pos][1];
			
			var tagsHTML = '<div class="control-group"><input type="text" class="span8" value="'+tags+'"></div>';
			var descriptionHTML = '<div class="control-group"><textarea row="1">'+description+'</textarea></div>';
			var selectHTML = createGroupTypeSelect(saveData[pos][3],saveData[pos][5]);
			var visibleHTML = createGroupVisibleSelect(saveData[pos][6]);
			
			$('#group_table > tbody tr:eq('+pos+') td:eq(4)').html(tagsHTML);
			$('#group_table > tbody tr:eq('+pos+') td:eq(3)').html(descriptionHTML);
			$('#group_table > tbody tr:eq('+pos+') td:eq(5)').html(selectHTML);
			$('#group_table > tbody tr:eq('+pos+') td:eq(6)').html(visibleHTML);
        });
		activateEdit('group');
	}
}

function groupSave(){
	var $checkedList = $('#group_table >tbody input:checkbox:checked');
	if($checkedList.length == 0){
	}
	else{
		var errorFlag = false;
		$checkedList.each(function(index, element) {
			var eachErrorFlag = false;
			var pos = element.name;
            var description = $('#group_table > tbody tr:eq('+pos+') td:eq(3) textarea').val();
			var tags = $('#group_table > tbody tr:eq('+pos+') td:eq(4) input[type="text"]').val();
			var type = $('#group_table > tbody tr:eq('+pos+') td:eq(5) select').find('option:selected').val();
			var type_str = $('#group_table > tbody tr:eq('+pos+') td:eq(5) select').find('option:selected').text();
			var visible = $('#group_table > tbody tr:eq('+pos+') td:eq(6) select').find('option:selected').val();
			var visible_str = $('#group_table > tbody tr:eq('+pos+') td:eq(6) select').find('option:selected').text();
			//Check data format
			if(invalid_letters.test(description)){
				eachErrorFlag = true;
				$('#group_table > tbody tr:eq('+pos+') td:eq(3) .control-group').addClass('error');
			}
			
			if(invalid_letters.test(tags)){
				eachErrorFlag = true;
				$('#group_table > tbody tr:eq('+pos+') td:eq(4) .control-group').addClass('error');
			}
			
			if(eachErrorFlag){
				errorFlag = true;
			}
			else{
				$('#group_table > tbody tr:eq('+pos+') td:eq(3)').html(stringThumbnail(description));
				$('#group_table > tbody tr:eq('+pos+') td:eq(4)').html(stringThumbnail(tags));
				$('#group_table > tbody tr:eq('+pos+') td:eq(5)').html(type_str);
				$('#group_table > tbody tr:eq('+pos+') td:eq(6)').html(visible_str);
				//update localStorage
				var saveData = JSON.parse(localStorage.getItem('groupTableData'));
				saveData[pos][1] = description;
				saveData[pos][2] = tags;
				saveData[pos][5] = type_str;
				saveData[pos][6] = visible;
				localStorage.setItem('groupTableData',JSON.stringify(saveData));
				element.checked = false;
				updateGroupInfo(saveData[pos][4],description,tags,type,type_str,visible);
			}
        });
		if(!errorFlag){
			deactivateEdit('group');
			$('#group_error_prompt').css('display','none');
			$('#group_success_prompt').css('display','block');
		}
		else{
			$('#group_error_prompt').css('display','block');
			$('#group_success_prompt').css('display','none');
		}
	}
}

function groupUserSearchSubmit(){
    $('#group_user_page_current_number').val(1);
    $('#group_user_page_select_flag').val(1);
    groupUserSearch();
}

function groupUserSearch(){
	var groupID = $('#current_group_id').val();
    var query = $('#group_user_search_name').val();
	if(Trim(query) == ''){
        $('#group_user_page_current_number').val(1);
        $('#group_user_page_select_flag').val(0);
        listGroupUser();
        return;
    }
	clearTable('group_user_table');
	var currentPageNumber = 1;
	var offset = (currentPageNumber-1)*pageSize;
	function after_search(data,status){
		if(status == "success"){
			var dataVal = [];
			var saveDataVal = [];
			if(currentPageNumber == 1){
				//Create page number
				var totalPageNumber = calcPageTotalCount(data.total,pageSize);
				$('#group_user_page_total_number').val(totalPageNumber);
				$('#group_user_page_label').text('Page 1 of '+totalPageNumber);
			}
			for(var index = 0 ; index < data.entries.length ; index++){
                var user = data.entries[index];
				dataVal[index] = [];
				dataVal[index][0] = index+1;
				dataVal[index][1] = '<input type="checkbox" value="'+user.id+'" name="'+index+'">';
				dataVal[index][2] = user.name;
				dataVal[index][3] = String.denoise(user.display_name);
				dataVal[index][4] = user.email;
				dataVal[index][5] = user.relation.role.display_value;
                dataVal[index][6] = user.source;
			    if(!user.relation.is_blocked){
					dataVal[index][7] = '<a style="color:#0088cc" onClick="changeGroupUserState(\'0\',this,7)">已启用</a>';
				}
				else{
					dataVal[index][7] = '<a style="color:#ff0000" onClick="changeGroupUserState(\'1\',this,7)">已禁用</a>';
				}
				
				saveDataVal[index] = [];
				saveDataVal[index][0] = groupID;
				saveDataVal[index][1] = user.id;
				saveDataVal[index][2] = user.relation.role.display_value;
				saveDataVal[index][3] = user.relation.role.name;
			}
			//$('#group_table').css('display','none');
			localStorage.setItem('groupUserTableData',JSON.stringify(saveDataVal));
			createTable('group_user_table',dataVal);
		}
	}

	var completeUrl = url_templates.search.users(query,local_data.token,groupID,offset,pageSize);
	request(completeUrl,"","get",after_search);
}

function groupUserAdd(){
	$('#group_adduser_modal').modal('show');
}

function groupAdduserSearchSubmit(){
	var userName = $('#group_adduser_search_name').val();
	clearTable('group_adduser_table');
	function after_search(data,status){
		if(status == 'error'){
		}
		else{
			var dataVal = [];
			for(var index = 0,pos = 0; index < data.entries.length; index++){
				var user = data.entries[index];
				if(user.id != "00000000-0000-0000-0000-000000000000"){
					dataVal[pos] = [];
					dataVal[pos][0] = user.name;
					dataVal[pos][1] = String.denoise(user.display_name);
					dataVal[pos][2] = user.email;
					dataVal[pos][3] = user.created_at.display_value;
					dataVal[pos][4] = '<a onClick="addUserToAlternativeBox(\''+user.name+'\',\''+user.id+'\')">添加</a>';
                    pos++;
				}
			}
			createTable('group_adduser_table',dataVal);
		}
	}
	var completeUrl = url_templates.search.users(userName,local_data.token);
	request(completeUrl,"","get",after_search);
}

function addUserToAlternativeBox(userName,userID){
	var flag = false;
	$userList = $('#group_adduser_result_box button');
	if($userList.length != 0){
		$userList.each(function(index, element) {
            if(userID == element.value){
				flag = true;
			}
        });
	}
	if(!flag){
		var appendHtml = '<span class="badge badge-info badge-pos">'+userName+'<button type="button" class="myClose" value="'+userID+'" onClick="deleteUserFromAlternativeBox(this)">&times;</button></span>';
		$('#group_adduser_result_box').append(appendHtml);
	}
	else{
		alert('该用户已经添加过!!');
	}
}

function deleteUserFromAlternativeBox(element){
	$(element).parent().remove();
}

function groupAdduserSubmit(){
	var groupID = $('#current_group_id').val();
	$userList = $('#group_adduser_result_box button');
	var length = $userList.length;
	var count = 0;
	if($userList.length == 0){
	}
	else{
		function after_add(data,status){
			if(status == 'error'){
			}
			else{
			}
			count = count + 1;
			if(count >= length){
				$('#group_adduser_result_box span').remove();
			}
		}
		$userList.each(function(index, element) {
            var userID = element.value;
			var completeUrl = url_templates.group_user.add(groupID,userID,local_data.token);
			request(completeUrl,"","post",after_add);
        });
	}
}

function clearAlternativeBox(){
	$('#group_adduser_result_box span').remove();
	clearTable('group_adduser_table');
	$('#group_adduser_search_name').val("");
	$('#group_adduser_modal').modal('hide');
	listGroupUser();
}

function groupUserEdit(){
	var $checkedList = $('#group_user_table >tbody input:checkbox:checked');
	if($checkedList.length == 0){
	}
	else{
		$checkedList.each(function(index, element) {
			var pos = element.name;
			var userID = element.value;
			var saveData = JSON.parse(localStorage.getItem('groupUserTableData'));
			var selectHTML = createGroupUserPositionSelect(saveData[pos][3],saveData[pos][2]);
			
			$('#group_user_table > tbody tr:eq('+pos+') td:eq(5)').html(selectHTML);
        });
		activateEdit('group_user');
	}
}

function groupUserSave(){
	var $checkedList = $('#group_user_table >tbody input:checkbox:checked');
	if($checkedList.length == 0){
	}
	else{
		$checkedList.each(function(index, element) {
			var pos = element.name;
			var position = $('#group_user_table > tbody tr:eq('+pos+') td:eq(5) select').find('option:selected').val();
            var position_str = $('#group_user_table > tbody tr:eq('+pos+') td:eq(5) select').find('option:selected').text();
			$('#group_user_table > tbody tr:eq('+pos+') td:eq(5)').html(position_str);
			
			//Update localStorage
			var saveData = JSON.parse(localStorage.getItem('groupUserTableData'));
			saveData[pos][2] = position_str;
			saveData[pos][3] = position;
			localStorage.setItem('groupUserTableData',JSON.stringify(saveData));
			element.checked = false;
			updateGroupUserInfo(saveData[pos][0],saveData[pos][1],{
                name : position,
                display_value: position_str
            });
        });
		deactivateEdit('group_user');
	}
}

function updateGroupInfo(groupID,description,tags,type,type_str,visible){
	/*var tagArray = tags.split(',');
	for(var index = 0; index < tagArray.length ; index++)
		tagArray[index] = Trim(tagArray[index]).toLowerCase();*/
		
	var form = JSON.stringify({
		"intro" : description,
		"tags" : tags,
		"type" : {
            'name': type,
            'display_value': type_str
        },
		"is_visible" : visible
	});
	
	function after_update(data,status){
		if(status == "error"){
		    check_error(data);
        }
		else{
		}
	}

	var completeUrl = url_templates.group.update(groupID,local_data.token);
	request(completeUrl,form,"post",after_update);
}

function updateGroupUserInfo(groupID,userID,position){
	var form = JSON.stringify({
		"role" : position
	});
	function after_update(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
		}
	}
	//TODO
    var completeUrl = url_templates.group_user.update(groupID,userID,local_data.token);
	request(completeUrl,form,"post",after_update);
}

function groupCancelManage(){
	var val = $('#group_cancel_manage').val();
	if(val == 0){
		groupCancel();
	}
	else{
		groupUserCancel();
	}
}

function groupCancel(){
	//Restore the data
	var savedData = JSON.parse(localStorage.getItem('groupTableData'));
	if(typeof savedData != 'undefined' && savedData != null){
		for(var pos = 0 ; pos < savedData.length ; pos++){
			$('#group_table > tbody tr:eq('+pos+') td:eq(3)').html(stringThumbnail(savedData[pos][1]));
			$('#group_table > tbody tr:eq('+pos+') td:eq(4)').html(stringThumbnail(savedData[pos][2]));
			$('#group_table > tbody tr:eq('+pos+') td:eq(5)').html(savedData[pos][5]);
			$('#group_table > tbody tr:eq('+pos+') td:eq(6)').html(getGroupSearch(savedData[pos][6]));
		}
		deactivateEdit('group');
	}
}

function groupUserCancel(){
	//Restore the data
	var savedData = JSON.parse(localStorage.getItem('groupUserTableData'));
	if(typeof savedData != 'undefined' && savedData != null){
		for(var pos = 0 ; pos < savedData.length ; pos++){
			$('#group_user_table > tbody tr:eq('+pos+') td:eq(5)').html(savedData[pos][2]); 
		}
		deactivateEdit('group_user');
	}
}

function deactivateEdit(tableItems){
	$('#'+tableItems+'_edit_manage').val(0);
	$('#'+tableItems+'_edit_manage').text('编辑');
	//Enable checkbox
	$('#'+tableItems+'_table input:checkbox').removeAttr('disabled');
	$('#'+tableItems+'_table input:checkbox').each(function(index, element) {
        element.checked = false;
    });
}

function activateEdit(tableItems){
	$('#'+tableItems+'_edit_manage').val(1);
	$('#'+tableItems+'_edit_manage').text('保存');
	//Disable checkbox
	$('#'+tableItems+'_table input:checkbox').attr('disabled',true);
}

function groupCheckManage(){
	if($('#group_check_manage').is(':checked')){
		$('#group_table >tbody input:checkbox').each(function(index, element) {
            element.checked = true;
        });
	}
	else{
		$('#group_table >tbody input:checkbox').each(function(index, element) {
            element.checked = false;
        });
	}
}

function groupAlertClose(){
	$('#group_error_prompt').css('display','none');
	$('#group_success_prompt').css('display','none');
}

function groupDeleteManage(){
	if(!confirm("确定要删除这些信息吗?"))
        return;
    var val = $('#group_delete_manage').val();
	if(val == 0){
		groupDelete();
	}
	else{
		groupUserDelete();
	}
}

function groupDelete(){
	var $checkedList = $('#group_table >tbody input:checkbox:checked');
	if($checkedList.length == 0){
	}
	else{
		$checkedList.each(function(index, element) {
			var pos = element.name;
			var groupID = $('#group_table > tbody tr:eq('+pos+') td:eq(1) input[type="checkbox"]').val();
			disbandGroup(groupID);
		});
	}
}

function disbandGroup(groupID){
	function after_disband(data,status){
		if(status == 'error'){ 
		    check_error(data);
        }
		else{
			listGroup();
		}
	}
	var completeUrl = url_templates.group.del(groupID,local_data.token);
	request(completeUrl,"","delete",after_disband);
}

function groupUserDelete(){
	var $checkedList = $('#group_user_table >tbody input:checkbox:checked');
	if($checkedList.length == 0){
	}
	else{
		$checkedList.each(function(index, element) {
			var pos = element.name;
			var groupID = $('#current_group_id').val();
			var userID = $('#group_user_table > tbody tr:eq('+pos+') td:eq(1) input[type="checkbox"]').val();
			deleteUserFromGroup(groupID,userID);
		});
	}
}

function deleteUserFromGroup(groupID,userID){
	function after_delete(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
			listGroupUser();
		}
	}
	
	var completeUrl = url_templates.group_user.remove(groupID,userID,local_data.token);
	request(completeUrl,"","delete",after_delete);
}

//Group user
function groupUserCheckManage(){
	if($('#group_user_check_manage').is(':checked')){
		$('#group_user_table >tbody input:checkbox').each(function(index, element) {
            element.checked = true;
        });
	}
	else{
		$('#group_user_table >tbody input:checkbox').each(function(index, element) {
            element.checked = false;
        });
	}
}

//Import
function dataImport(){
	var $element = $('#data_import');
    manualShow.hide($element);
	$('#data_slide').animate({marginLeft:'0px'},500);
}

function importUser(){
	$('#data_file_search').click();
	$('#import_execution').val(1);
	$('#data_file_search').change(importUserOnchange);
}

function importGroup(){
	$('#data_file_search').click();
	$('#import_execution').val(2);
	$('#data_file_search').change(importGroupOnchange);
}

function importUserOnchange(){
	var file = this.files[0];
	if(file.type != "text/plain"){
		alert("请上传TXT格式的文件!!");
	}
	else{
		$('#data_import_text').val(this.value);
		if(window.File && window.FileReader && window.FileList && window.Blob){
			var fileReader = new FileReader();
			fileReader.onloadend = function(e){
				var fileArray = fileStrToArray(e.target.result);
				createPreviewTable(fileArray,pageSize);
				dataProgressInit('import',fileArray.length-1);
			};
			fileReader.readAsText(file,'UTF-8');
		}
		else{
			alert('此浏览器的版本过低！');
		}
	}
}

function importGroupOnchange(){
	var file = this.files[0];
	if(file.type != "text/plain"){
		alert("请上传TXT格式的文件!!");
	}
	else{
		$('#data_import_text').val(this.value);
		if(window.File && window.FileReader && window.FileList && window.Blob){
			var fileReader = new FileReader();
			fileReader.onloadend = function(e){
				var fileArray = fileStrToArray(e.target.result);
				var previewArray = groupDataPretreatment(fileArray);
				createPreviewTable(previewArray,pageSize);
				dataProgressInit('import',previewArray.length-1);
			}; 
			fileReader.readAsText(file,'UTF-8');
		}
		else{
			alert('此浏览器的版本过低！');
		}
	}
}

function importUserDown(){
	var text = "";
		text = text + export_user_header.user_name + ',';
		text = text + export_user_header.display_name + ',';
		text = text + export_user_header.password + ',';
        text = text + export_user_header.source + ',';
        text = text + export_user_header.email + '\n';
	
	var blob = new Blob([text],{type: "text/plain;charset=utf-8"});
	if(blob){
		saveAs(blob,"user_templates.txt");
	}
}

function importGroupDown(){
	var text = "";
		text = text + export_group_header.group_name + ',';
		text = text + export_group_header.description + ',';
		text = text + export_group_header.group_tags + ',';
		text = text + export_group_header.group_type +',';
		text = text + export_group_header.group_visible + ',';
		text = text + export_group_header.source + ',';
        text = text + export_group_header.group_user_count + '\n';
		
	var blob = new Blob([text],{type: "text/plain;charset=utf-8"});
	if(blob){
		saveAs(blob,"group_templates.txt");
	}
}

function importExecution(){
	var val = parseInt($('#import_execution').val());
	if(val == 1){
		importUserExec();
	}
	else if(val == 2){
		importGroupExec();
	}
	else{
		alert('请先选择导入选项');
	}
}

function importUserExec(){
	var file = document.getElementById('data_file_search').files[0];
	if(window.File && window.FileReader && window.FileList && window.Blob){
		var fileReader = new FileReader();
		fileReader = new FileReader();
		fileReader.onloadend=function(e){
			var fileArray = fileStrToArray(e.target.result);
			registerUser(fileArray);
		};
		fileReader.readAsText(file,'UTF-8');
	}
	else{
		alert('此浏览器的版本过低！不支持文件读写！');
	}
}

function importGroupExec(){
	var file = document.getElementById('data_file_search').files[0];
	if(window.File && window.FileReader && window.FileList && window.Blob){
		var fileReader = new FileReader();
		fileReader = new FileReader();
		fileReader.onloadend=function(e){
			var fileArray = fileStrToArray(e.target.result);
			var arrangedArray = groupDataArrange(fileArray);
			if(arrangedArray.length > 0){
				$('#import_result_label').css('display','block');
				$('#import_result_label .load-label-total').text(arrangedArray.length);
				$('#import_result_label .load-label-error').text(0);
				$('#import_result_label .load-label-success').text(0);
				for(var index = 0 ; index < arrangedArray.length ; index++){
					createGroupAndAddUser(arrangedArray[index],arrangedArray.length);
				}
			}
		};
		fileReader.readAsText(file,'UTF-8');
	}
	else{
		alert('此浏览器的版本过低！不支持文件读写！');
	}
}

function createGroupAndAddUser(groupInfo,total){
	var group = groupInfo.group;
	var user = groupInfo.user;
	var length = user.length;
	var count = 0;
	function after_add(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
		}
		count++;
		if(count == length - 1){
			var currentCount = parseInt($('#import_statistic > strong').text());
			dataProgressExec('import',currentCount+1,total);
			var success = parseInt($('#import_result_label .load-label-success').text());
			$('#import_result_label .load-label-success').text(success+1)
		}
	}
	
	function after_create(data,status){
		if(status == 'error'){
			var currentCount = parseInt($('#import_statistic > strong').text());
			dataProgressExec('import',currentCount+1,total);
			var error = parseInt($('#import_result_label .load-label-error').text());
			$('#import_result_label .load-label-error').text(error+1);
		}
		else{
			for(var index = 1 ; index < user.length; index++){
				var userID = getUserID(user[index][0],user[index][1]);
				if(userID != null){
					var completeUrl = url_templates.group_user.add(data.id,userID,local_data.token);
					request(completeUrl,"","post",after_add);
				}
			}
		}
	}
	
	var form = {
		'name' : group[0],
		'intro' : group[1], 
		'tags' : group[2],
		'type' : {
            name: group[3],
            display_value: GROUP_TYPE[group[3]]
        },
		'is_visible' : groupVisibleToSearch(group[4])
	};
    if(isValid(group[5]) && Trim(group[5]) != '')
        form['source'] = group[5];
    form = JSON.stringify(form);
	var ownerID = getUserID(user[0][0],user[0][1]);
	if(ownerID != null){
		var completeUrl = url_templates.group.create(local_data.token,ownerID);
		request(completeUrl,form,"post",after_create);
	}
}

function fileStrToArray(str){
	var regStr = /\r|\n/g;
	var infoArray = str.split(regStr);
	var trimArray = [];
	for(var index = 0,pos = 0 ; pos < infoArray.length ; pos++){
		if(Trim(infoArray[pos]) != ""){
			trimArray[index] = infoArray[pos].split(',');
			index++;
		}
	}
	return trimArray;
}

function groupDataPretreatment(fileArray){
	if(fileArray.length > 1){
		var index,pos;
		var tableData = [];
		tableData[0] = fileArray[0];
		for(pos = 1,index = 1;index < fileArray.length ;pos++,index++){
			tableData[pos] = fileArray[index];
			tableData[pos][2] = transforGroupTags(fileArray[index][2]);
			var length = fileArray[index].length;
			var countStr = fileArray[index][length - 1];
			if(countStr != '*'){
				var count = parseInt(countStr);
				index = index + count;
			}
		}
		return tableData;
	}
}

function groupDataArrange(fileArray){
	var resultArray = [];
	var index,pos;
	for(index = 1,pos = 0;index < fileArray.length ;pos++,index++){
		resultArray[pos] = new Object();
		resultArray[pos].group = fileArray[index];
		resultArray[pos].group[2] = fileArray[index][2].split('/').join(',');
		var length = fileArray[index].length;
		var countStr = fileArray[index][length - 1];
		if(countStr != '*'){
			var count = parseInt(countStr);
			resultArray[pos].user = [];
			for(var userIndex = 0 ; userIndex < count ; userIndex++){
				index++;
				resultArray[pos].user[userIndex] = fileArray[index];
			}
		}
	}
	return resultArray;
}

function getUserID(userName,source){
	var userID;
	function after_search(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
		    userID = data.id;
        }
	}
    var form = {};
    if(isValid(userName))
        form['name'] = userName;
    if(isValid(source))
        form['source'] = source;

    var form = JSON.stringify(form);
	var completeUrl = url_templates.user.find(local_data.token);
	requestSync(completeUrl,form,"post",after_search);
	return userID;
}

function groupVisibleToSearch(str){
	var flag = -1;
	if(str.length == 1){
		var type = str.toLowerCase();
		if(type == 'y')
			flag = "true";
		else if(type == 'n')
			flag = "false";
	}
	return flag;
}

function transforGroupTags(str){
	var tags = "";
	var tagArray = str.split('-');
	if(tagArray.length > 0){
		for(var index = 0 ; index < tagArray.length-1 ; index++){
			tags += tagArray[index] + ',';
		}
		tags += tagArray[tagArray.length-1];
	}
	return tags;
}

function createPreviewTable(dataArray,count){
	clearTableHeader('data_import_table');
	clearTable('data_import_table');
	if(dataArray.length > 1 && count > 0){
		var factCount = minVal(dataArray.length-1,count);
		createTableHeader('data_import_table',dataArray[0]);
		createTable('data_import_table',dataArray.slice(1,factCount+1));
	}
}

function registerUser(dataArray){
	var total = dataArray.length - 1;
	$('#import_result_label').css('display','block');
	$('#import_result_label .load-label-total').text(total);
	var success = 0;
	var error = 0;
	function after_register(data,status){
		if(status == 'error'){
			error = error + 1;
		    check_error(data);
        }
		else{
			success = success + 1;
		}
		dataProgressExec('import',success+error,total);
		$('#import_result_label .load-label-success').text(success);
		$('#import_result_label .load-label-error').text(error);
	}
	for(var index =1 ; index <= total ; index++){
        var form = {
			'name' : dataArray[index][0],
			'email' : dataArray[index][4],
			'display_name' : dataArray[index][1]
		};
        if(isValid(dataArray[index][3]) && Trim(dataArray[index][3]) != '')
            form['source'] = Trim(dataArray[index][3]);
        var form = JSON.stringify(form);
		var password = SHA256_hash(dataArray[index][2]);
        var completeUrl = url_templates.user.create(password,local_data.token);
		request(completeUrl,form,"post",after_register);
	}
}

function dataProgressInit(itemName,total){
	$('#'+itemName+'_progress').css('width','0%');
	$('#'+itemName+'_rate').text('0%');
	$('#'+itemName+'_statistic').html('已经导入<strong>0</strong>/'+total);
}

function dataProgressExec(itemName,count,total){
	var rate = Number(parseInt(count) / parseInt(total) * 100).toFixed(2);
	$('#'+itemName+'_progress').css('width',rate+'%');
	$('#'+itemName+'_rate').text(rate+'%');
	$('#'+itemName+'_statistic>strong').text(count);
}

function resultClose(){
	$('#import_result_label').css('display','none');
}

//Export
function dataExport(){
	var $element = $('#data_export');
	manualShow.hide($element);
    $('#data_slide').animate({marginLeft:'-1158px'},500);
}

function exportUser(){
	$('#export_execution').val(1);
	clearTableHeader('data_export_table');
	clearTable('data_export_table');
	function after_list(data,status){
		if(status == 'error'){
		    check_error(data);
        }
		else{
			var dataVal = [];
			var dataHeaderVal = [];
			dataHeaderVal[0] = export_user_header.user_name;
			dataHeaderVal[1] = export_user_header.display_name;
            dataHeaderVal[2] = export_user_header.source;
			dataHeaderVal[3] = export_user_header.email;
			dataHeaderVal[4] = export_user_header.groups_can_own;
			
			for(var index = 0 ; index < data.entries.length ; index++){
				var user = data.entries[index];
				dataVal[index] = [];
				dataVal[index][0] = user.name;
				dataVal[index][1] = String.denoise(user.display_name);
				dataVal[index][2] = user.source;
                dataVal[index][3] = user.email;
				dataVal[index][4] = user.groups_can_own;
			}
			$('#export_data_total').val(data.total);
			dataProgressInit('export',data.total);
			createTableHeader('data_export_table',dataHeaderVal);
			createTable('data_export_table',dataVal);
		}
	}
	var completeUrl = url_templates.user.list(local_data.token,0,pageSize);
	request(completeUrl,"","get",after_list);
}

function exportGroup(){
	$('#export_execution').val(2);
	clearTableHeader('data_export_table');
	clearTable('data_export_table');
	function after_list(data,status){
		if(status == 'error'){
			check_error(data);
		}
		else{
			var dataVal = [];
			var dataHeaderVal = [];
			dataHeaderVal[0] = export_group_header.group_name;
			dataHeaderVal[1] = export_group_header.description;
			dataHeaderVal[2] = export_group_header.group_tags;
			dataHeaderVal[3] = export_group_header.group_type;
            dataHeaderVal[4] = export_group_header.source;
			
			for(var index = 0 ; index < data.entries.length ; index++){
				var group = data.entries[index];
				dataVal[index] = [];
				dataVal[index][0] = stringThumbnail(group.name);
				dataVal[index][1] = stringThumbnail(String.denoise(group.intro),30);
				dataVal[index][2] = String.denoise(group.tags);
				dataVal[index][3] = group.type.display_value;
                dataVal[index][4] = group.source;
			}
			$('#export_data_total').val(data.total);
			dataProgressInit('export',data.total);
			createTableHeader('data_export_table',dataHeaderVal);
			createTable('data_export_table',dataVal);
		}
	}
	var completeUrl = url_templates.group.list(local_data.token,0,pageSize);
	request(completeUrl,"","get",after_list);
}

function exportExecution(){
	var val = parseInt($('#export_execution').val());
	if(val == 1){
		exportUserExec();
	}
	else if(val == 2){
		exportGroupExec();
	}
	else{
		alert("请选择导入选项!!");
	}
}

function exportUserExec(){
	var total = parseInt($('#export_data_total').val());
	var curCount = 0 ,error = 0, success = 0;
	var text = "";
	
	function after_list(data,status){
		if(status == 'error'){
			error = error + 1;
		    check_error(data);
        }
		else{
			for(var index = 0 ; index < data.entries.length ; index++){
				var user = data.entries[index];
				text = text + user.name + ",";
				text = text + String.denoise(user.display_name) + ",";
                text = text + user.source + ",";
				text = text + user.email + ",";
				text = text + user.groups_can_own + "\n";
				success = success + 1;
				dataProgressExec('export',success,total);
			}
		}
		$('#export_result_label .load-label-success').text(success);
		$('#export_result_label .load-label-error').text(error);
		
		if(success + error == total)
			writeToFile(text);
	}
	
	$('#export_result_label .load-label-total').text(total);
	$('#export_result_label').css('display','block');
	
	var times = total / pageSize;
	for(var i = 0 ; i < times ; i++){
		var completeUrl = url_templates.user.list(local_data.token,i*pageSize,pageSize);
		request(completeUrl,"","get",after_list);
	}
	if(times * pageSize < total){
		var completeUrl = url_templates.user.list(local_data_token,(times*pageSize),(total - times * pageSize));
		request(completeUrl,"","get",after_list);
	}
}

function exportGroupExec(){
	var total = parseInt($('#export_data_total').val());
	var curCount = 0 ,error = 0, success = 0;
	var text = "";
	
	function after_list(data,status){
		if(status == 'error'){
			error = error + 1;	
		    check_error(data);
        }
		else{
			for(var index = 0 ; index < data.entries.length ; index++){
				var group = data.entries[index];
				text = text + group.name + ",";
				text = text + group.intro + ",";
				text = text + group.tags + ",";
				text = text + group.type.display_value + ",";
                text = text + group.source + "\n";
				success = success + 1;
				dataProgressExec('export',success,total);
			}
		}
		$('#export_result_label .load-label-success').text(success);
		$('#export_result_label .load-label-error').text(error);
		
		if(success + error == total)
			writeToFile(text);
	}
	
	$('#export_result_label').css('display','block');
	$('#export_result_label .load-label-total').text(total);
	
	var times = total / pageSize;
	for(var i = 0 ; i < times ; i++){
		var completeUrl = url_templates.group.list(local_data.token,i*pageSize,pageSize);
		request(completeUrl,"","get",after_list);
	}
	if(times * pageSize < total){
		var completeUrl = url_templates.group.list(local_data.token,(times*pageSize),(total - times * pageSize));
		request(completeUrl,"","get",after_list);
	}
}

function writeToFile(text){
	var blob = new Blob([text],{type: "text/plain;charset=utf-8"});
	if(blob){
		var path = $('#data_export_text').val();
		if(path == "")
			path = "导出数据";
		saveAs(blob,path+".txt");
	}
}

function writeCSVToFile(text){
	var blob = new Blob([text],{type: "text/csv;charset=utf-8"});
	if(blob){
		var path = $('#data_export_text').val();
		if(path == "")
			path = "导出数据";
		saveAs(blob,path+".csv");
	}
}

//Manual operation
var manualShow = {
	"init" : function($element) {
		$('#data_manage .manage_bar button').removeClass('active');
		$element.addClass('active');
		var $table = $('#manual_user_table > tbody');
			$table.empty();
			$table.append(createManualTr.user());
	},
    "show" : function($element) {
    	manualShow.init($element);
        $('#manual_slide').show();
        $('#data_slide').hide();
    },
    "hide" : function($element) {
    	manualShow.init($element);
        $('#manual_slide').hide();
        $('#data_slide').show();
    }
};

function createUserJson($tr){
	return { 
		"element" : $tr,
		"data" : {
			"username" : $tr.find('.username input').val(),
			"nickname" : $tr.find('.nickname input').val(),
			"password" : $tr.find('.password input').val(),
			"source"   : $tr.find('.source input').val(),
			"email"    : $tr.find('.email input').val()
		}
	};
}

var manualDataOps = {
	"init" : function () {
		var $table = $('#manual_user_table > tbody');
			$table.empty();
			$table.append(createManualTr.user());
		/*if (typeof localStorage.getItem('manual_user') == 'undefined') {
			var data = {};
			localStorage.setItem('manual_user', JSON.stringify(data));
			$table.append(createManualTr.user());
		} else {
			var data = JSON.parse(localStorage.getItem('manual_user'));
			for (var key in data) {
				$table.append(createManualTr.user());
			}
		}*/
		//else if (type == 1) localStorage.setItem('manual_group', JSON.stringify(data));
	},
	"set" : function(key, value, type = 0) {
		if (type == 0) {
			var data = JSON.parse(localStorage.getItem('manual_user'));
				data[key] = value;
				localStorage.setItem('manual_user', JSON.stringify(data));
		} else if (type == 1) {
			var data = JSON.parse(localStorage.getItem('manual_group'));
				data[key] = value;
				localStorage.setItem('manual_group', JSON.stringify(data));
		}
	},
	"get" : function(key, type = 0) {
		var data;
		if (type == 0) data = JSON.parse(localStorage.getItem('manual_user'));
		else if (type == 1) data = JSON.parse(localStorage.getItem('manual_group'));
		return data[key];
	},
	"delete" : function(key, type = 0) {
		var data;
		if (type == 0) {
			data = JSON.parse(localStorage.getItem('manual_user'));
			delete json[key];
			localStorage.setItem('manual_user', JSON.stringify(data));
		} else if (type == 1) {
			data = JSON.parse(localStorage.getItem('manual_group'));
			delete json[key];
			localStorage.setItem('manual_group', JSON.stringify(data));
		}

	},
	"clear" : function(type = 0) {
		if (type ==0) localStorage.removeItem('manual_user');
		else if (type == 1) localStorage.removeItem('manual_group');
	}
};

function manualEvent() {
	//Manual user table
    var $user_table = $('#manual_user_table > tbody');

    $user_table.on('click', '.ops-list .ops.save', function(e) {
    	var $tr = $(this).parents('tr');
    	var userArray = [];
    	var user = createUserJson($tr);
    		userArray.push(user);

    	manualUserRegister(userArray);
	});
    $user_table.on('click', '.ops-list .ops.trash', function(e) {
    	var $tr = $(this).parents('tr');
    		$tr.remove();
    });
    $user_table.on('click', '.ops-list .ops.plus', function(e) {
    	var $tr = $(this).parents('tr');
    		$tr.after(createManualTr.user());
    });

    //Button event
    $('#manual_user_cancel').off('click');
    $('#manual_user_submit').off('click');

    $('#manual_user_cancel').on('click', function(e){
    	var $element = $('#manual_entry');
    	manualShow.show($element);
    });
    $('#manual_user_submit').on('click', function(e){
    	var userArray = [];
    	$user_table.find('tr').each(function(index, element){
    		if (!$(element).find('.checker').is(":checked")) {
    			var user = createUserJson($(element));
    			userArray.push(user);
    		}
    	});
    	manualUserRegister(userArray);
    });

    //Manual group table
    var $group_table = $('#manual_group_table > tbody');

    $group_table.on('click', '.ops-list .ops.save', function(e) {
	});
    $group_table.on('click', '.ops-list .ops.trash', function(e) {
    	var $tr = $(this).parents('tr');
    		$tr.remove();
    });
    $group_table.on('click', '.ops-list .ops.plus', function(e) {
    	var $tr = $(this).parents('tr');
    		$tr.after(createManualTr.group());
    });
}

var createManualTr = {
    "user" : function() {
        var html = 
            '<tr>\
            	<td>#</td>\
            	<td><input type="checkbox" class="checker" disabled></td>\
            	<td><div class="control-group username"><input type="text" class="span12"></div></td>\
            	<td><div class="control-group nickname"><input type="text" class="span12"></div></td>\
            	<td><div class="control-group password"><input type="text" class="span12"></div></td>\
            	<td><div class="control-group source"><input type="text" class="span12"></div></td>\
            	<td><div class="control-group email"><input type="text" class="span12"></div></td>\
            	<td><div class="status">未提交</div></td>\
            	<td>\
            		<div class="ops-list">\
	            		<span class="ops fa fa-save save"></span>\
	            		<span class="ops fa fa-trash-o trash"></span>\
	            		<span class="ops fa fa-plus plus"></span>\
                    </div>\
                </td>\
            </tr>';
        return html;
    },
    "group" : function() {
    	var html = 
    		'<tr>\
    			<td>#</td>\
    			<td><input type="checkbox" class="checker" disabled></td>\
    			<td><div class="control-group groupname"><input type="text" class="span12"></div></td>\
                <td>\
                	<div class="control-group describe">\
                		<textarea row="1"></textarea>\
                	</div>\
                </td>\
                <td><div class="control-group tab"><input type="text" class="span12"></div></td>\
                <td>\
                	<div class="control-group type">\
                		<select id="group_type">\
                			<option value="protected">受保护的（加入需要审核）</option>\
                			<option value="system_public">系统公共的（新创建的用户会自动加入）</option>\
                			<option value="public">公开的（加入无需审核）</option>\
                			<option value="private">私有的（禁止新成员加入）</option>\
                        </select>\
                    </div>\
                </td>\
                <td>\
                	<div class="control-group search">\
                		<select id="group_visible" class="span12">\
                			<option value="true">可搜索</option>\
                			<option value="false">不可搜索</option>\
                		</select>\
                	</div>\
                </td>\
                <td><div class="control-group source"><input type="text" class="span12"></div></td>\
                <td><div class="status">未提交</div></td>\
                <td>\
                	<div class="ops-list">\
                		<span class="ops fa fa-save save"></span>\
                		<span class="ops fa fa-trash-o trash"></span>\
                		<span class="ops fa fa-plus plus"></span>\
                	</div>\
                </td>\
            </tr>';
        return html;
    }
};

function manualUserRegister(userArray){
    for (var i = 0; i < userArray.length; i++) {
    	checkRegisterEvent(userArray[i], function(item){
	    	function find(username) {
				var $element;
				for (var i = 0; i < userArray.length; i++) {
					if (userArray[i].data['username'] == username) {
						$element = userArray[i].element;
						break;
					}
				}
				return $element;
			}

	    	var form = {
	    		'name' : item['username'],
				'email' : item['email'],
				'display_name' : item['nickname']
			};

			form['source'] = Trim(item['source']);
			var form = JSON.stringify(form);
			var password = SHA256_hash(item['password']);
			var url = url_templates.user.create(password,local_data.token);
			request(url,form,"post",function(data, status){
				if (status == "error") {
				} else {
					//Get element
					var $element = find(data['name']);
						$element.find('input:checkbox').attr('checked', 'checked');
						$element.find('.status').addClass('success');
						$element.find('.status').text('已提交');
				}
			});
		});
	}
}
function manualEntry() {
	var $element = $('#manual_entry');
    manualShow.show($element);
    manualEvent();
}

//User register check
function checkRegisterEvent(user, exec) {
	var $element = user.element;

	var name_dtd = $.Deferred();
	var email_dtd= $.Deferred();
	var pwd_dtd  = $.Deferred();

	var username = $element.find('.username input').val();
	var email = $element.find('.email input').val();
	var password = $element.find('.password input').val();

	//Regular check
	var flag = true;
	//1. Username check
	var name_pattern = /^[a-zA-Z0-9_\-]{1,}$/;// 下划线、数字、字母
	var minLen = 3, maxLen = 20;
	var $userEle = $element.find('.username');
	$userEle.removeClass('error');

	if(!username.match(name_pattern) || username.length < minLen || username.length > maxLen){
		$userEle.addClass('error');
		flag = false;
	}

	//2. Email check
	var email_pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	var email = $element.find('.email input').val();
	var $emailEle = $element.find('.email');
	$emailEle.removeClass('error');

	if(!email.match(email_pattern)){
		$emailEle.addClass('error');
		flag = false;
	}

	//3. Password check
	var $pwdEle = $element.find('.password');
	var password = $element.find('.password input').val();
	$pwdEle.removeClass('error');

	if(password.length < 5 || password.length > 20){
		$pwdEle.addClass('error');
		flag = false;
	}

	//Remote check
	var result = new Array();
		result[0] = true;
		result[1] = true;

	//Username
	var check_name = function() {
		var dtd = $.Deferred();
		var form = JSON.stringify({
			"name" : username
		});
		var url = url_templates.user.exists();
		request(url, form, "post", function(data,status){
			if(status == "error"){
				$userEle.addClass('error');
				result[0] = false;
			}
			dtd.resolve();
		});
		return dtd.promise();
	};

	//Email
	var check_email = function() {
		var dtd = $.Deferred();
		var form = JSON.stringify({
			"email" : email
		});
		var completeUrl = url_templates.user.exists();
		request(completeUrl,form,"post",function(data,status){
			if(status == "error"){
				$emailEle.addClass('error');
				result[1] = false;
			}
			dtd.resolve();
		});
		return dtd.promise();
	};

	var d1 = check_name();
	var d2 = check_email();

	$.when(d1, d2)
	.done(function(){
		if (!result[0] || !result[1] || !flag) {
			$element.find('.status').addClass('error');
			$element.find('.status').text('有错误');
		} else {
			$element.find('.status').removeClass('error');
			$element.find('.status').text('已提交');
			exec(user.data);
		}
	})
	.fail(function(){
		$element.find('.status').addClass('error');
		$element.find('.status').text('有错误');
	});
}

//File detection
function fileSearchSubmit(){
    var md5 = $('#file_search_by_md5').val();
    var groupUrl = url_templates.md5.list_group_metas(local_data.token, md5);
    var shareUrl = url_templates.md5.list_shares(local_data.token, md5);
    var group_data = null, share_data = null;
    $.when($.ajax({
        url : groupUrl,
        type : "get",
        success: function(data,status){
            group_data = data;
        }
    }),$.ajax({
        url : shareUrl,
        type : "get",
        success : function(data,status){
            share_data = data;
        }
    }))
    .done(function(data,status){
        if (group_data == null || share_data == null){
            var dataVal = [];
            var saveDataVal = [];
            //if(currentPageNumber == 1){
            //}
            for(var index = 0,pos = 0 ; index < group_data.entries.length ; index++){
                var file = group_data.entries[index];
                //Construct data
                dataVal[pos] = [];
                dataVal[pos][0] = pos+1;
                dataVal[pos][1] = '<input type="checkbox" value="'+file.id+'" name="'+pos+'">';
                dataVal[pos][2] = file.name;
                dataVal[pos][3] = file.owned_by_group.name;
                dataVal[pos][4] = file.path;
                dataVal[pos][5] = file.created_by.name;
                dataVal[pos][6] = file.created_at.display_value;
            }

            localStorage.setItem('fileTableData',JSON.stringify(saveDataVal));
            createTable('file_table',dataVal);
        }
    })
    .fail(function(data){
        alert("error");
    });

    /*var completeUrl = url_templates.fileop.groupFilesDetectionByMd5(local_data.token, md5);
    request(completeUrl, "", "post", function(data,status){
        if (status == "error"){
            check_error(data);
        } else {
            var dataVal = [];
            var saveDataVal = [];
            //if(currentPageNumber == 1){
            //}
            for(var index = 0,pos = 0 ; index < data.entries.length ; index++){
                var file = data.entries[index];
                //Construct data
                dataVal[pos] = [];
                dataVal[pos][0] = pos+1;
                dataVal[pos][1] = '<input type="checkbox" value="'+file.id+'" name="'+pos+'">';
                dataVal[pos][2] = file.name;
                dataVal[pos][3] = file.owned_by_group.name;
                dataVal[pos][4] = file.path;
                dataVal[pos][5] = file.created_by.name;
                dataVal[pos][6] = file.created_at.display_value;
            }

            localStorage.setItem('fileTableData',JSON.stringify(saveDataVal));
            createTable('file_table',dataVal);
        }
    });*/
}

//File Search
function fileSearchSwitch(item){
    var fileArray = ['group', 'share'];
    var flag = false;
    for(var i = 0; i < fileArray.length; i++) if(item == fileArray[i]) flag = true;
    if (!flag) return;

    $('#group_file_table').hide();
    $('#share_file_table').hide();
    $('#group_file_table tbody').empty();
    $('#share_file_table tbody').empty();
    $('#group_file_check_manage').removeAttr('checked');
    $('#share_file_check_manage').removeAttr('checked');
    $('#'+item+'_file_table').show();

    $('#file_search_by_md5').attr('data-item', item); 
    $table = $('#'+item+'_file_table');
}

function fileDownload(){
    $('.file_table').off('click', '.file_name');
    $('.file_table').on('click', '.file_name', function(e){
        var rootID = $(this).attr('data-rid');
        var metaID = $(this).attr('data-mid');
        var dlUrl = url_templates.file_by_id.get(rootID, metaID, local_data.token);
        window.location.href = dlUrl;
    });
}

function groupFileSearchSubmit(){
    fileSearchSwitch('group');
    var md5 = $('#file_search_by_md5').val();
    var groupUrl = url_templates.md5.list_group_metas(local_data.token, md5);
    request(groupUrl, "", "get", function(data,status){
        if (status == "error"){
            check_error(data);
        } else {
            var dataVal = [];
            var saveDataVal = [];
            //if(currentPageNumber == 1){
            //}
            for(var index = 0,pos = 0 ; index < data.entries.length ; index++){
                var file = data.entries[index];
                //Construct data
                dataVal[pos] = [];
                dataVal[pos][0] = pos+1;
                dataVal[pos][1] = String.format('<input type="checkbox" value="{0}" name="{1}" data-mid="{2}" data-rid="{3}">', file.id, pos, file.id, file.root_id);
                dataVal[pos][2] = String.format('<a class="file_name" data-rid="{0}" data-mid="{1}">{2}</a>', file.root_id, file.id, file.name);
                dataVal[pos][3] = file.owned_by_group.name;
                dataVal[pos][4] = file.path;
                dataVal[pos][5] = file.created_by.name;
                dataVal[pos][6] = file.created_at.display_value;
                pos += 1;
            }
            localStorage.setItem('groupFileTableData',JSON.stringify(saveDataVal));
            createTable('group_file_table',dataVal);
        }
    });
}


function shareFileSearchSubmit(){
    fileSearchSwitch('share');
    var md5 = $('#file_search_by_md5').val();
    var shareUrl = url_templates.md5.list_shares(local_data.token, md5);
    request(shareUrl, "", "get", function(data,status){
        if (status == "error"){
            check_error(data);
        } else {
            var dataVal = [];
            var saveDataVal = [];
            for(var index = 0,pos = 0 ; index < data.entries.length ; index++){
                var share = data.entries[index];
                //Construct data
                dataVal[pos] = [];
                dataVal[pos][0] = pos+1;
                dataVal[pos][1] = String.format('<input type="checkbox" value="{0}" name="{1}" data-sid="{2}" data-mid="{3}" data-rid="{4}">', share.id, pos, share.id, share.meta.id, share.meta.root_id);
                dataVal[pos][2] = String.format('<a class="file_name" data-rid="{0}" data-mid="{1}">{2}</a>', share.meta.root_id, share.meta.id, share.meta.name);
                dataVal[pos][3] = share.url;
                dataVal[pos][4] = share.need_password ? share.password : "---";
                dataVal[pos][5] = share.meta.created_by.name;
                dataVal[pos][6] = share.created_by.name;
                dataVal[pos][7] = share.created_at.display_value;
                pos += 1;
            }
            localStorage.setItem('shareFileTableData',JSON.stringify(saveDataVal));
            createTable('share_file_table',dataVal);
        }
    });
}

function groupFileCheckManage(){
    if($('#group_file_check_manage').is(':checked')){
        $('#group_file_table > tbody input:checkbox').each(function(index, element){
            element.checked = true;
        });
    } else {
        $('#group_file_table > tbody input:checkbox').each(function(index, element){
            element.checked = false;
        });
    }
}

function shareFileCheckManage(){
    if($('#share_file_check_manage').is(':checked')){
        $('#share_file_table > tbody input:checkbox').each(function(index, element){
            element.checked = true;
        });
    } else {
        $('#share_file_table > tbody input:checkbox').each(function(index, element){
            element.checked = false;
        });
    }
}

function fileDeleteManage(){
    if(!confirm("确定要删除这些用户吗?")) return;

    var item = $('#file_search_by_md5').attr('data-item');
    if(item == "group") {
        var $checkedList = $('#group_file_table > tbody input:checkbox:checked');
        if($checkedList.length > 0){
            var count = 0, total = $checkedList.length;
            $checkedList.each(function(index, element) {
                var rootID = $(element).attr("data-rid");
                var metaID = $(element).attr("data-mid");
                var completeUrl = url_templates.file_by_id.del(rootID, metaID, local_data.token);
                request(completeUrl, "", "delete", function(data,status){
                    if (status == "error"){
                        check_error(data);
                    } else {
                        $(element).parents('tr').slideToggle(200,function(){
                            $(element).parents('tr').remove();
                        });
                    }
                });
            });
        }
    } else if (item == "share") {
        var $checkedList = $('#share_file_table > tbody input:checkbox:checked');
        if($checkedList.length > 0){
            var count = 0, total = $checkedList.length;
            $checkedList.each(function(index, element) {
                var rootID = $(element).attr("data-rid");
                var metaID = $(element).attr("data-mid");
                var shareID= $(element).attr("data-sid");
                var completeUrl = url_templates.share.del(rootID,metaID,shareID,local_data.token);
                request(completeUrl,"","delete",function(data,status){
                    if(status == "error"){
                        check_error(data);
                    } else {
                        $(element).parents('tr').slideToggle(200,function(){
                            $(element).parents('tr').remove();
                        });
                    }
                });
            });
        }
    }
}

function groupFileExportManage(){
    var md5 = $('#file_search_by_md5').val();
    var groupUrl = url_templates.md5.list_group_metas(local_data.token, md5);
    request(groupUrl, "", "get", function(data,status){
        if(status == "error") {
            check_error(data);
        } else {
            var text = "";
            for (var index = 0; index < data.entries.length; index++){
                var file = data.entries[index];
                text = text + file.name + ",";
                text = text + file.owned_by_group.name + ",";
                text = text + file.path + ",";
                text = text + file.created_by.name + ",";
                text = text + file.created_at.display_value + "\n";
            }
            writeToFile(text);
        }
    });
}

function shareFileExportManage(){
    var md5 = $('#file_search_by_md5').val();
    var shareUrl = url_templates.md5.list_shares(local_data.token, md5);
    request(shareUrl, "", "get", function(data,status){
        if (status == "error") {
            check_error(data);    
        } else {
            var text = "";
            for (var index = 0; index < data.entries.length; index++){
                var share = data.entries[index];
                text = text + share.meta.name + ",";
                text = text + share.url + ",";
                text = text + (share.need_password ? share.password : "---") + ",";
                text = text + share.meta.created_by.name + ",";
                text = text + share.created_by.name + ",";
                text = text + share.created_at.display_value + "\n";
            }
            writeToFile(text);
        }
    });
}

//Information
function listInformation(){
	//TODO
    getRealTimeData();
	getTopData();
    getTopUsedRatio();
	getTrendData();

    bindInfoListen();
    getActivity();
}

function getNowDayDate(){
    var date = new Date();
    var seperator = "/";
    var month = date.getMonth() + 1;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day >= 0 && day <= 9) {
        day = "0" + day;
    }
    return day + seperator + month + seperator + date.getFullYear();
}
function getTimestamp(year,month,day){
    var date = new Date();

    return Date.UTC(year, month, day, date.getHours(), date.getMinutes(), date.getSeconds(), 0);
}
function getActivity(){
    //Get current time
    var current_day = getNowDayDate();
    $('#current_day').attr('data-date', current_day);
    $('#current_day').find('input').val(current_day);
    $('#current_day').datepicker();

    function getActivitySummary(timestamp){
        var search_time = timestamp == null ? +new Date() : timestamp;
        var completeUrl = url_templates.statistics.summary(local_data.token, search_time);
        request(completeUrl,"","get",function(data,status){
            if (status == "success") {
                var $body = $('#activity_table').find('tbody');

                var dataVal = [], values = [];
                values[0] = data.active_users_count_previous_day;
                values[1] = data.active_users_count_previous_week;
                values[2] = data.active_users_count_previous_month;
                dataVal.push(values);
                
                clearTable('activity_table');
                createTable('activity_table',dataVal);

            } else {
                check_error(data);
            }
        });
    }

    $('#activity_submit').off('click');
    $('#activity_submit').on('click', function(e){
        var times = $('#current_day').find('input').val();
            times = times.split('/');
        var year = parseInt(times[2]);
        var month= parseInt(times[1]);
        var day  = parseInt(times[0]);
        getActivitySummary(getTimestamp(year, month, day));
    });

    $('#activity_submit').click();
}
function bindInfoListen(){
    $('#info_manage .top-tab a').off('click');
    $('#info_manage .top-tab a').on('click',function(e){
        var item = $(this).attr('data-item');
        $('#info_manage .top-tab a').removeClass('active');
        $('#info_manage .top-tab').find('.'+item).addClass('active');
    
        $('#info_manage .info-item').hide();
        $('#info_manage').find('div.'+item).show();
    });

    $('#ratio_show_type').find('button span.text').text("全部");
    $('#ratio_show_type ul li a').off('click');
    $('#ratio_show_type ul li a').on('click',function(e){
        var item = $(this).attr('data-item');
        $('#ratio_show_type').find('button span.text').text($(this).text());
        if (item == "all") getTopUsedRatio();
        else getTopUsedRatio(item);
    });

    //datetime
    $('#start_months').datepicker();
    $('#end_months').datepicker();

    function parse_time(value) {
        var times = value.split('/');
        var month = parseInt(times[0]);
        var year  = parseInt(times[1]);
        return Date.UTC(year, month, 1, 0, 0, 0, 0);
    }

    function getMonths(start_time, end_time) {
        var start_times = start_time.split('/');
        var end_times = end_time.split('/');

        var start_year = parseInt(start_times[1]);
        var start_month= parseInt(start_times[0]);

        var end_year = parseInt(end_times[1]);
        var end_month= parseInt(end_times[0]);

        var months = [];

        var start_months = (start_year - 1) * 12 + start_month - 1;
        var end_months = (end_year - 1) * 12 + end_month - 1;

        for(var index = start_months; index <= end_months; index++) {
            var s_y = Math.floor(index / 12) + 1;
            var s_m = index % 12 + 1;

            var e_index = index + 1;
            var e_y = Math.floor(e_index / 12) + 1;
            var e_m = e_index % 12 + 1;
            months.push({
                "year" : s_y,
                "month" : s_m,
                "start_time" : Date.UTC(s_y, s_m, 1, 0, 0, 0, 0),
                "end_time" : Date.UTC(e_y, e_m, 1, 0, 0, 0, 0) - 1
            });
        }

        return months;
    }

    var report_type = {
        "search" : "查找",
        "export" : "导出"
    };

    $('#report_export').off("click");
    $('#report_export').on("click", function(e){
        $('#report_submit').click();
        var saveData = JSON.parse(localStorage.getItem('reportData'));
        
        var text = "日期,用户数,群组数,元数据数,文件数,空间使用量\n";
        for (var index = 0; index < saveData.length; index++) {
            var text = text + saveData[index][0] + ",";
                text = text + saveData[index][1] + ",";
                text = text + saveData[index][2] + ",";
                text = text + saveData[index][3] + ",";
                text = text + saveData[index][4] + ",";
                text = text + saveData[index][5] + "\n";
        }
        writeToFile(text);
    });

    $('#report_submit').off('click');
    $('#report_submit').on('click', function(e){
        
        var start_value = $('#start_months').find('input').val();
        var end_value = $('#end_months').find('input').val();

        var start_time = parse_time(start_value);
        var end_time = parse_time(end_value);

        var months = getMonths(start_value, end_value);

        var dataVal = [], count = 0, total = months.length;
        $('.data-search-progress').show();
        $('.data-search-progress').find('div.bar').css("width", "0%");
        for(var index = 0; index < months.length; index ++) {
            var deltaUrl = url_templates.statistics.delta(local_data.token, months[index].start_time, months[index].end_time);
            requestSync(deltaUrl, "", "get", function(data,status){
                if (status == "error") {
                    check_error(data);
                } else {
                var bytes_value = formatFileSize(Math.abs(data.bytes));
                bytes_value = data.bytes < 0 ? '-' + bytes_value : bytes_value;
                /*dataVal[index] = [];
                dataVal[index][0] = String.format("{0}年{1}月", months[index].year, months[index].month);
                dataVal[index][1] = data.user_count;
                dataVal[index][2] = data.group_count;
                dataVal[index][3] = data.meta_count;
                dataVal[index][4] = data.file_count;
                dataVal[index][5] = bytes_value;*/
                
                var values = [];
                values[0] = String.format("{0}年{1}月", months[index].year, months[index].month);
                values[1] = data.user_count;
                values[2] = data.group_count;
                values[3] = data.meta_count;
                values[4] = data.file_count;
                values[5] = bytes_value;

                dataVal.push(values);
                }
                count ++;
                var percent = parseInt((parseFloat(count) / parseFloat(total)) * 100) + "%";
                $('.data-search-progress').find('div.bar').css("width", percent);
            });
        }
        clearTable('report_table');
        localStorage.setItem('reportData',JSON.stringify(dataVal));
        createTable('report_table',dataVal);
    });
}

function getTopUsedRatio(type){
    var ratioUrl = url_templates.root.listRootsByUsedRatio(local_data.token,type,0,20);
    request(ratioUrl, "", "get", function(data,status){
        if (status == "error") {
            check_error(data);
            return;
        }

        function getName(item) {
            var name = ""
            if (item.type == "user") {
                name = item.user.name;
            } else if(item.type == "group") {
                name = item.group.name;
            }
            return name;
        }

        var ratios = [];
        for (var index = 0; index < data.entries.length; index++) {
            var item = data.entries[index];
            if(typeof item.used_ratio == "undefined") item.used_ratio = 0;
            ratios[index] = {
                name : getName(item),
                value : parseFloat(Number(parseFloat(item.used_ratio) * 100).toFixed(1))
            };
        }
        $('#used_ratio_rank_chart').highcharts(genBarOptions("空间使用比率Top20", "使用量百分比(%)", "使用量", ratios))
    });
}

function getTopData(){
	function after_get(data,status){
		if(status == "error"){
			check_error(data);
            return;
		}
		var extensions = [];
		for(var index = 0 ; index < data.top_extensions.length ; index++){
			extensions[index] = {
				name : data.top_extensions[index].extension,
				value: parseFloat(Number((parseInt(data.top_extensions[index].count) / parseInt(data.top_extensions[index].total) * 100)).toFixed(1))
			};
		}
		$('#file_type_chart').highcharts(genBarOptions("文件类型统计Top10","百分比(%)","百分比",extensions));
        
		var userGroups = [];
		for(var index = 0 ; index < data.top_user_groups.length ; index++){
			userGroups[index] = {
				name : data.top_user_groups[index].name,
				value: data.top_user_groups[index].user_count
			};
		}
		$('#group_user_chart').highcharts(genBarOptions("人数最多的群组Top10","人数(位)","人数",userGroups));
        
		var fileGroups = [];
		for(var index = 0 ; index < data.top_file_groups.length ; index++){
			fileGroups[index] = {
				name : data.top_file_groups[index].name,
				value: data.top_file_groups[index].root.file_count
			};
		}
		$('#group_file_chart').highcharts(genBarOptions("文件数量最多的群组Top10","文件数(个)","文件数",fileGroups));
        
        var sizeGroups = [];
		for(var index = 0; index < data.top_size_groups.length ; index++){
			var size = data.top_size_groups[index].root.used.bytes / (1024 * 1024 * 1024);
			size = parseFloat(Number(size).toFixed(2));
			sizeGroups[index] = {
				name : data.top_size_groups[index].name,
				value: size
			}
        }
		$('#group_usage_chart').highcharts(genBarOptions("空间使用量最多的群组Top10","使用量(GB)","使用量",sizeGroups));
	}
    
    var completeUrl = url_templates.statistics.top(local_data.token,topLimit);
    request(completeUrl,"","get",after_get);
}

function getRealTimeData(){
	//TODO
    getRealTimeCount();
	getSummaryCount();
}

function getRealTimeCount(){
	var completeUrl = url_templates.statistics.realTime(local_data.token);
	request(completeUrl,"","get",function(data,status){
		if(status == "success"){
			$('#info_manage').find('.userNum').text(data.user_count);
			$('#info_manage').find('.groupNum').text(data.group_count);
			$('#info_manage').find('.onlineNum').text(data.token_count);
		}
        else if(status == "error"){
            check_error(data);
        }
	});
}

function getSummaryCount(){
	var completeUrl = url_templates.statistics.summary(local_data.token,+new Date());
	request(completeUrl,"","get",function(data,status){
		if(status == "success"){
			var spaceUrl = url_templates.consts.system_space(local_data.token);
            request(spaceUrl,"","get",function(root,status){
				if(status == 'success'){	
                    var usageInfo = parseSize(data.bytes,root.quota);
					var percent = usageInfo.used + "/" + usageInfo.quota;
					$('#info_manage').find('.bar').css("width",usageInfo.percent);
					$('#info_manage').find('.percent').text(percent);
				}
			});
            $('#info_manage').find('.fileNum').text(data.file_count);
		}
        else if(status == "error"){
            check_error(data);
        }
	});
}

function parseSize(size,quota){
	var usage = size;
	if(usage <= 1024)
        usage += " B";
    else if( usage <= 1024*1024)
    {
        usage /= 1024;
        usage = usage.toFixed(2);
        usage += " KB";
    }
    else if(usage <= 1024*1024*1024)
    {
        usage /= (1024.0*1024);  
        usage = usage.toFixed(2);
        usage += " MB";
    }
    else
    {
        usage /= (1024*1024*1024);
        usage = usage.toFixed(2);
        usage += " GB";
    }
	
	return {
		used : usage,
		quota: quota.display_value,
		percent: Number(size / quota.bytes * 100).toFixed(2) + "%"
	};
}

function getTrendData(){
	var completeUrl = url_templates.statistics.trend(local_data.token);
	request(completeUrl,"","get",function(data,status){
		if(status == "error"){
			return;
		}
		var userTrendData = {};
		var groupTrendData = {};
		var fileTrendData = {};
		userTrendData = {
			name : [{ title: "用户数",
                      y: "y"
                    }],
			point: []
		};
		
		groupTrendData = {
			name : [{ title: "群组数",
                      y: "y"
                    }],
			point: []
		};
		
		fileTrendData = {
			name : [{ title: "文件数",
                      y: "y1"
                    },
                    { title: "meta数",
                      y: "y2"
                    }],
			point : []
		};
		
		for(var index = 0 ; index < data.trend_stat_info.length ; index++){
			userTrendData.point[index] = {
				'x' : data.trend_stat_info[index].time_millis,
				'y' : data.trend_stat_info[index].user_count
			};
			
			groupTrendData.point[index] = {
				'x' : data.trend_stat_info[index].time_millis,
				'y' : data.trend_stat_info[index].group_count
			};
			
			fileTrendData.point[index] = {
				'x' : data.trend_stat_info[index].time_millis,
				'y1' : data.trend_stat_info[index].file_count,
				'y2' : data.trend_stat_info[index].meta_count
			};
		}
	    var user_history_chart = AmCharts.makeChart("user_history_chart", genAMLineOptions("历史用户数量","人数（位）",userTrendData));
        user_history_chart.addListener("rendered", zoomChart);
        if(user_history_chart.zoomChart){
            user_history_chart.zoomChart();
        }
	    var group_history_chart = AmCharts.makeChart("group_history_chart", genAMLineOptions("历史群组数量","群组数（个）",groupTrendData));
        group_history_chart.addListener("rendered", zoomChart);
        if(group_history_chart.zoomChart){
            group_history_chart.zoomChart();
        }
		//$('#user_history_chart').highcharts(genLineOptions("历史用户数量","人数（位）",userTrendData));
		//$('#group_history_chart').highcharts(genLineOptions("历史群组数量","群组数（个）",groupTrendData));
		//$('#file_history_chart').highcharts(genLineOptions("历史文件与Meta数量","文件数（个）",fileTrendData));
	    var file_history_chart = AmCharts.makeChart("file_history_chart", genAMLineOptions("历史文件与Meta数量","文件数（个）",fileTrendData));
        file_history_chart.addListener("rendered", zoomChart);
        if(file_history_chart.zoomChart){
            file_history_chart.zoomChart();
        }

        function zoomChart(){
            file_history_chart.zoomToIndexes(Math.round(chart.dataProvider.length * 0.4), Math.round(chart.dataProvider.length * 0.55));
        }
    });

}

function genBarOptions(title,yText,itemName,data){
	var options = {
		chart : {
			type : "column"
		},
		title : {
			text : title
		},
		xAxis : {
			categories : [],
			labels : {
				rotation : -45,
				align : 'right',
				style : {
					fontSize : '13px',
					fontFamily : 'Verdana,sans-serif'
				}
			}
		},
		yAxis : {
			title : {
				text : yText
			},
			allowDecimals : true
		},
		series :[{
			name : itemName,
			data : []
		}]
	};
	for(var index = 0 ; index < data.length ; index++){
		options.xAxis.categories.push(data[index].name);
		options.series[0].data.push(data[index].value);
	}
	return options;
}

function genAMLineOptions(title, yText, data){
    var options = {
        "type" : "serial",
        "theme": "light",
        "titles": [{
            "text": title}],
        "marginTop": 0,
        "marginRight": 20,
        "dataProvider": data.point,
        "valueAxes": [{
            "axisAlpha": 0,
            "position": "left",
            "title": yText
        }],
        "legend":{
            "position":"absolute",
            "maxColums": 2,
            "top": 60,
            "align": "left",
            "autoMargins":true
        },
        "graphs": [],
        "chartScrollbar": {},
        "chartCursor": {
            "categoryBalloonDateFormat": "YYYY-MM-DD",
            "cursorAlpha": 0,
            "valueLineEnabled":true,
            "valueLineBalloonEnabled":true,
            "valueLineAlpha":0.5,
            "fullWidth":true
        },
        "categoryField": "x",
        "categoryAxis": {
            "minPeriod": "DD",
            "dashLength": 5,
            "parseDates": true,
            "showFirstLabel": true,
            "showLastLabel": true,
            "minorGridAlpha": 0.1,
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true
        }
    };
	for(var index = 0 ; index < data.name.length ; index++){
        var graph = {
            "id": data.name[index].y,
            "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            "bullet": "round",
            "title": data.name[index].title,
            "bulletSize": 2,         
            //"lineColor": "#d1655d",
            "lineThickness": 2,
            "negativeLineColor": "#637bb6",
            "type": "smoothedLine",
            "valueField": data.name[index].y
        };
		options["graphs"].push(graph);
	}
    var chartScrollbar = {
        "graph": data.name[0].y,
        "gridAlpha":0,
        "color":"#888888",
        "scrollbarHeight":55,
        "backgroundAlpha":0,
        "selectedBackgroundAlpha":0.1,
        "selectedBackgroundColor":"#888888",
        "graphFillAlpha":0,
        "autoGridCount":true,
        "selectedGraphFillAlpha":0,
        "graphLineAlpha":0.2,
        "graphLineColor":"#c2c2c2",
        "selectedGraphLineColor":"#888888",
        "selectedGraphLineAlpha":1
    };
    //options["graphs"].push(chartScrollbar);
    return options;
}

function genLineOptions(title,yText,data){
	var options = {
		chart : {
			type : 'line',
			animation : Highcharts.svg
		},
		title : {
			text : title
		},
		xAxis : {
			type : 'datetime',
			tickPixelInterval : 150
		},
		yAxis : {
			title : {
				text : yText,
			},
			plotLines :[{
				value : 0,
				width : 1,
				color : '#808080'
			}]
		},
		plotOptions : {
			line : {
				dataLabels : {
					enabled : false
				},
				enableMouseTracking : true
			}
		},
		tooltip: {
        	formatter: function() {
            	return '<b>'+ this.series.name +'</b><br/>'+
                	Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        exporting: {
        	enabled: false
        },
		series:[]
	};
	
	for(var i = 0 ; i < data.length ; i++){
		options.series[i] = {};
		options.series[i].name = data[i].name;
		options.series[i].data = [];
		for(var j = 0 ; j < data[i].point.length ; j++){
			options.series[i].data.push({
				x : data[i].point[j].x,
				y : data[i].point[j].y
			});
		}
	}
	
	return options;
}

function genPieOptions(title,data){
	var options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: title
        },
        tooltip: {
    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: []
        }]
    };
	
	var percentSum = 0;
	for(var index = 0 ; index < data.length ; index++){
		var name = data[index].extension;
		var percent = Number((parseInt(data[index].count) / parseInt(data[index].total) * 100)).toFixed(1);
		percentSum += percent;
		if(index == 0){
			options.series[0].data.push({
				name: name,
				y:	percent,
				sliced:true,
				selected:true
			});
			total = parseInt(data[index].total);
		}
		else{
			options.series[0].data.push([name,percent]);
		}
	}
	var lastPercent = 100-percentSum;
	options.series[0].data.push(["其他",lastPercent]);
	return options;
}


//Notice manage
function noticeCreateManage(){
    $('.notice-new').show();
    $('.notice-old').hide();
    noticeSlideForward();
}

function noticeEditManage(){
    var value = $('#notice_edit_manage').val();
    if(value == 0){
        noticeListEdit();
    }
    else{
        noticeListSave();
    }
}
function noticeCancelManage(){
    var $checkedList = $('#notice_table >tbody input:checkbox:checked');
    if($checkedList.length > 0){
        $checkedList.each(function(index, element) {
            var i = element.name;
            $curEle = $('#notice_table > tbody tr:eq('+i+') td:eq(4)');
            $curEle.find('select').remove();
            $curEle.find('.text').show();
        });
    }
    deactivateEdit('notice');
}

function noticeListEdit(){
    var $checkedList = $('#notice_table >tbody input:checkbox:checked');
    if($checkedList.length > 0){
        $('#notice_edit_manage').val(1);
        $('#notice_edit_manage').text('保存');
        $checkedList.each(function(index, element) {
            var i = element.name;
            $curEle = $('#notice_table > tbody tr:eq('+i+') td:eq(4)');
            var pos = $curEle.find('.text').attr('data-pos');
            $curEle.append(createSettingsSelect(pos));
            $curEle.find('.text').hide();
        });
    }
    function createSettingsSelect(pos){
        var htmlStr = '<select class="notice_settings span7">';
        if(pos == 0){
            htmlStr += '<option value="0">未置顶</option>';
            htmlStr += '<option value="1">置顶</option>';
        }
        else{
            htmlStr += '<option value="1">置顶</option>';
            htmlStr += '<option value="0">未置顶</option>';
        }
        htmlStr += '</select>';
        return htmlStr;
    }
}

function noticeListSave(){
    var $checkedList = $('#notice_table >tbody input:checkbox:checked');
    if($checkedList.length > 0){
        $('#notice_edit_manage').val(0);
        $('#notice_edit_manage').text('编辑');
        $checkedList.each(function(index, element) {
            var i = element.name;
            var id = element.value;
            $curEle = $('#notice_table > tbody tr:eq('+i+') td:eq(4)');
            var pos = $curEle.find('select option:selected').val();
            var text= $curEle.find('select option:selected').text();
            $curEle.find('select').remove();
            $curEle.find('.text').attr('data-pos',pos);
            $curEle.find('.text').text(text);
            $curEle.find('.text').show();

            var data = {
                'pos': pos
            };
            var completeUrl = url_templates.notice.update(id);

            $.post(completeUrl,data,function(result,status){
                if(status == 'success'){
                }
            });
        });
    }
}

function noticeDeleteManage(){
    var $checkedList = $('#notice_table >tbody input:checkbox:checked');
    if($checkedList.length > 0){
        var ids = {};
        $checkedList.each(function(index, element){
            var pos = element.name;
            ids[index] = $('#notice_table > tbody tr:eq('+pos+') td:eq(1) input[type="checkbox"]').val();
        });
        ids['count'] = $checkedList.length;
        //Delete notice
        var completeUrl = url_templates.notice.del();
        $.post(completeUrl,ids,function(data,status){
            if(status == 'success'){     
                listNotice();
            }
        });
    }
}

function noticeSlideForward(){
    $('#notice_slide').animate({marginLeft:'-1158px'},500);
    $('#notice_manage .tools').hide();
    noticeCancelManage();
}

function noticeSlideBack(){
    $('#notice_slide').animate({marginLeft:'0px'},500);
    $('#notice_manage .tools').show();

    listNotice();
    //Clean title and content
    $('#noticeTitle').val('');
    $('#noticeSummary').val('');
    $('#notice_image_preview').attr('src','');
    $('#editor').html('');
}


//Notice editor
function initNoticeEditor(){
    initToolbarBootstrapBindings();
    $('#editor').wysiwyg({fileUploadError: showErrorAlert});
    window.prettyPrint && prettyPrint();
}

function initToolbarBootstrapBindings() {
    var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 'Courier New', 'Comic Sans MS',
                 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times', 'Times New Roman', 'Verdana'];
    var fontTarget = $('[title=Font]').siblings('.dropdown-menu');
    
    $.each(fonts, function (idx, fontName) {
        fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
    });
    $('a[title]').tooltip({container:'body'});
    $('.dropdown-menu input').click(function() {return false;})
                             .change(function () {$(this).parent('.dropdown-menu')
                             .siblings('.dropdown-toggle').dropdown('toggle');})
                             .keydown('esc', function () {this.value='';$(this).change();});
    $('[data-role=magic-overlay]').each(function () { 
        var overlay = $(this), target = $(overlay.data('target')); 
        overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
    });
    if ("onwebkitspeechchange"  in document.createElement("input")) {
        var editorOffset = $('#editor').offset();
        $('#voiceBtn').css('position','absolute')
                      .offset({top: editorOffset.top, left: editorOffset.left+$('#editor').innerWidth()-35});
    } else {
        $('#voiceBtn').hide();
    }

    //init image preview
    $('#notice_image_preview').off('click');
    $('#notice_image_preview').on('click',function(e){
        $('#notice_image input').click();
    });
    $('#notice_image input').change(function(e){
        var reader = new FileReader();
        reader.onload = function(data){
            $('#notice_image_preview').attr('src',data.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    });
};

function showErrorAlert (reason, detail) {
    var msg='';
    if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
    else {
        console.log("error uploading file", reason, detail);
    }
    $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
      '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
};

function noticeEditorSave(){
    noticeEditorExec(0);
}

function noticeEditorSubmit(){
    noticeEditorExec(1);
}

function noticeEditorExec(type){ 
    var data = {
        'title': $('#noticeTitle').val(),
        'content': $('#editor').html(),
        'time': (new Date()).toLocaleString(),
        'type': type,
        'summary': $('#noticeSummary').val(),
        'cover': $('#notice_image_preview').attr('src')
    };
    var completeUrl = url_templates.notice.save();
    $.post(completeUrl,data,function(result,status){
        if(status == 'success'){
            alert('操作成功');
            if(type == 1)
                noticeSlideBack();
        }
    });
}

function noticeUpdateSave(){
    noticeUpdateExec(0);
}

function noticeUpdateSubmit(){
    noticeUpdateExec(1);
}

function noticeUpdateExec(type){
    var data = {
        'title': $('#noticeTitle').val(),
        'content': $('#editor').html(),
        'time': (new Date()).toLocaleString(),
        'type': type,
        'summary': $('#noticeSummary').val(),
        'cover': $('#notice_image_preview').attr('src')
    };
    var completeUrl = url_templates.notice.get($('#noticeID').val());

    $.post(completeUrl,data,function(result,status){
        if(status == 'success'){
            alert('操作成功');
            if(type == 1)
                noticeSlideBack();
        }
    });
}

function noticeEditorCancel(){
    noticeSlideBack();
}

function listNotice(){
    clearTable('notice_table');
    var currentPageNumber = parseInt($('#notice_page_current_number').val());
    var offset = (currentPageNumber - 1)*pageSize;

    var completeUrl = url_templates.notice.list(offset,pageSize);
    $.get(completeUrl,function(data,status){
        if(status=="success"){
            if(currentPageNumber == 1){
                //Create page number
                var totalPageNumber = calcPageTotalCount(data.total,pageSize);
                $('#notice_page_total_number').val(totalPageNumber);
                $('#notice_page_label').text('Page 1 of '+totalPageNumber);
            }
            var dataVal = [];
            for(var index = 0 ; index < data.count ; index++){
                dataVal[index] = []
                dataVal[index][0] = index + 1;
                dataVal[index][1] = '<input type="checkbox" value="'+data.notice[index]['id']+'" name="'+index+'">';
                dataVal[index][2] = '<a onClick="noticeDetail(\''+data.notice[index]['id']+'\')">'+stringThumbnail(data.notice[index]['title'])+'</a>';
                dataVal[index][3] = data.notice[index]['time'];
                dataVal[index][4] = '<span class="text" data-pos="'+data.notice[index]['pos']+'">'+ (parseInt(data.notice[index]['pos']) == 1  ? '置顶' : '未置顶') + '</span>';
                dataVal[index][5] = parseInt(data.notice[index]['type']) == 0 ? '未发表' : '已发表';
            }

            createTable('notice_table',dataVal);
        }
    },'json');
}

function noticeDetail(id){
    var completeUrl = url_templates.notice.get(id);
    $('.notice-old').show();
    $('.notice-new').hide();
    noticeSlideForward();
    $.get(completeUrl,function(data,status){
        if(status == "success"){
            $('#notice_image img').attr('src','');
            $('#noticeID').val(id);
            $('#noticeTitle').val(data['title']);
            $('#editor').html(data['content']);
            $('#noticeSummary').val(data['summary']);
            $('#notice_image_preview').attr('src',data['cover']);
        }
    },'json');
}

function htmlencode(s){  
    var div = document.createElement('div');  
        div.appendChild(document.createTextNode(s));  
    return div.innerHTML.toString();
}

function htmldecode(s){  
    var div = document.createElement('div');  
        div.innerHTML = s;  
    return div.innerText || div.textContent;  
} 

//Notice page switch
function noticePageFirst(){
    if(pageFirst('notice')){
        var val = $('#notice_page_select_flag').val();
        if(val == 0){
            listNotice();
        }
        else{
        }
    }
}

function noticePageRight(){
	if(pageRight('notice')){
		var val = $('#notice_page_select_flag').val();
		if(val == 0){
			listNotice();
		}
		else{
		}
	}
}

function noticePageLeft(){
	if(pageLeft('notice')){
		var val = $('#notice_page_select_flag').val();
		if(val == 0){
			listNotice();
		}
		else{
		}
	}
}

function noticePageLast(){
	if(pageLast('notice')){
		var val = $('#notice_page_select_flag').val();
		if(val == 0){
			listNotice();
		}
		else{
		}
	}
}

//Client
function clientAddManage(){
    $('#client_upload_modal').modal('show');
    $('#client_upload_modal .modal-header .close').off();
    $('#client_upload_modal .modal-header .close').on('click',function(){
        clearEnv();
    });

    function clearEnv(){
        $('#client_upload_modal').modal('hide');
        $('#upload-progress').find('.bar').css('width','0px');
        $('#upload-progress').find('.text').text('0%');
        $('#client_upload_modal form').get(0).reset();
        listClients();
    }

    $('#client_upload_file').fileupload({
        sequentialUploads: true,
        add: function(e, data){
            data.url = url_templates.client.upload();
            var jqXHR;
            $('#client_upload_submit').on('click',function(ev){
                $('#client_time').val((new Date()).toLocaleString()); 
                jqXHR = data.submit();
                $('#client_upload_submit').off('click');
            });
            $('#client_upload_cancel').on('click',function(ev){
                jqXHR.abort();
                $('#client_upload_cancel').off();
                clearEnv();
            });
            //reset environment
            $('#upload-progress').find('.bar').css('width', '0%');
            $('#upload-progress').find('.text').text('0%');
        },
        progress: function(e, data){
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#upload-progress').find('.bar').css('width', progress + '%');
            $('#upload-progress').find('.text').text(progress + '%');
        },
        done: function(e, data)
        {
            alert('上传成功！');
        }
    });
}

function listClients(){
    clearTable('client_table');
    var completeUrl = url_templates.client.list();
    $.get(completeUrl,function(data,status){
        if(status == 'success'){
            var dataVal = [];
            for(var index = 0 ; index < data.count ; index++){
                dataVal[index] = []
                dataVal[index][0] = index + 1;
                dataVal[index][1] = '<input type="checkbox" value="'+data.client[index]['id']+'" name="'+index+'">';
                dataVal[index][2] = stringThumbnail(data.client[index]['name']);
                dataVal[index][3] = data.client[index]['platform'];
                dataVal[index][4] = data.client[index]['version'];
                dataVal[index][5] = data.client[index]['time'];
                if(parseInt(data.client[index]['status']) == 0)
                    dataVal[index][6] = '<a style="color:#ff0000" onClick="changeClientState(\'1\',this)">未发布</a>';
                else
                    dataVal[index][6] = '<a style="color:#0088cc" onClick="changeClientState(\'0\',this)">已发布</a>';
                dataVal[index][7] = data.client[index]['dlcount'];
            }

            createTable('client_table',dataVal);
        }
    },'json');
}

function changeClientState(changeToState,currentTR){
	var tr = currentTR.parentNode.parentNode;
	var clientID = tr.cells[1].firstChild.value;
	
	function after_update(data,status){
		if(status == 'error'){
		}
		else{
			if(changeToState == 0){
				tr.cells[6].innerHTML = '<a style="color:#ff0000" onClick="changeClientState(\'1\',this)">未发布</a>';
			}
			else{
				tr.cells[6].innerHTML = '<a style="color:#0088cc" onClick="changeClientState(\'0\',this)">已发布</a>';
			}
		}
	}
	
	var form = {};
    form["id"] = clientID;
    form["status"] = changeToState;
	
	var completeUrl = url_templates.client.update();
    $.post(completeUrl,form,after_update);
}

function groupEditManage(){
	var val = $('#group_edit_manage').val();
	if(val == 0){
		groupEdit();
	}
	else{
		groupSave();
	}
}


function clientDeleteManage(){
    var $checkedList = $('#client_table >tbody input:checkbox:checked');
    if($checkedList.length > 0){
        var ids = {};
        $checkedList.each(function(index, element){
            var pos = element.name;
            ids[index] = $('#client_table > tbody tr:eq('+pos+') td:eq(1) input[type="checkbox"]').val();
        });
        ids['count'] = $checkedList.length;
        //Delete notice
        var completeUrl = url_templates.client.del();
        $.post(completeUrl,ids,function(data,status){
            if(status == 'success'){     
                listClients();
            }
        });
    }
}

//key down
function keyDown(name){
	if(event.keyCode == 13){
		switch(name){
			case 'user_search':
			userSearchSubmit();
			break;
			
			case 'group_search':
			groupSearchSubmit();
			break;
			
			case 'quota_user_search':
			quotaUserSearch();
			break;
			
			case 'quota_group_search':
			quotaGroupSearch();
			break;
			
			case 'group_user_search':
			groupUserSearchSubmit();
			break;
		}
	}
}
