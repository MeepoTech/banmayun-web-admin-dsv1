/*
	Web sdk: designed by aizhiyuan
*/
var apiAddress = "http://admin-azy-dsv1.meepotech.com:808/v1";
var servers = {
	auth		  : apiAddress + '/auth',
	users 		  : apiAddress + '/users',
	groups     	  : apiAddress + '/groups',
	roots		  : apiAddress + '/roots',
    shares        : apiAddress + '/s',
	fileops		  : apiAddress + '/fileops',
	chunked_upload: apiAddress + '/chunked_upload',
	delta		  : apiAddress + '/delta',
	search		  : apiAddress + '/search',
    md5           : apiAddress + '/md5',
	consts		  : apiAddress + '/consts',
	statistics	  : apiAddress + '/statistics',
	top			  : apiAddress + '/top',
	hot			  : apiAddress + '/hot',
	suggest		  : apiAddress + '/suggest',
    sso           : apiAddress + '/sso'
};

var api_sort_type = {
    "user" : {
        "default" : "name",
        "name" : "name",
        "group_count" : "group_count",
        "user_status" : "user_status"
    }
};

var api_sort_order = {
    "asc" : "asc",
    "desc" : "desc"
};

var url_templates = {
	//authorization
	auth : {
		signIn : function(username,password,ldapname){
			var url = servers.auth + '/sign_in?link_name=web&link_device=web&username={0}&password={1}';
				url = String.format(url,username,password);
			isValid(ldapname) ? url += String.format('&ldap_name={0}',ldapname) : url;
			return url;
		},
		signOut : function(token){
			var url = servers.auth + '/sign_out?token={0}';
			return String.format(url,token);
		},
		changePassword : function(username,password,newPassword){
			var url = servers.auth + '/change_password?username={0}&password={1}&new_password={2}';
			return String.format(url,username,password,newPassword);
		},
		forgetPassword : function(email){
			var url = servers.auth + '/forgot_password?email={0}';
			return String.format(url,email);
		},
		resetPassword : function(newPassword,token){
			var url = servers.auth + '/reset_password?new_password={0}&token={1}';
			return String.format(url,newPassword,token);
		},
        wiseduSSO: function(ticket){
            var url = servers.auth + '/wisedu_sso?ticket={0}';
            return String.format(url,ticket)
        },
        md5SSO: function(un,time,verify){
            var url = servers.auth + '/md5_sso?un={0}&time={1}&verify={2}';
            return String.format(url,un,time,verify);
        },
        rsaSSO: function(data){
            var url = servers.auth + '/rsa_sso?data={0}';
            return String.format(url,data);
        },
        thauthSSO: function(ticket){
            var url = servers.auth + '/thauth_sso?ticket={0}';
            return String.format(url,ticket);
        }
	},
	
	//links
	links : {
		get : function(userID,linkID,token){
			var url = servers.users + '/{0}/links/{1}?token={2}';
			return String.format(url,userID,linkID,token);
		},
		list : function(userID,token,offset,limit){
			var url = servers.users + '/{0}/links?token={1}';
				url = String.format(url,userID,token);
			isValid(offset) ? url += String.format('&offset={0}',offset) : url;
			isValid(limit)  ? url += String.format('&limit={0}',limit) : url;
			return url;
		},
		del : function(userID,linkID,token){
			var url = servers.users + '/{0}/links/{1}?token={2}';
			return String.format(url,userID,linkID,token);
		},
		delAll :	function(userID,token){
			var url = servers.users + '/{0}/links?token={1}';
			return String.format(url,userID,token);
		}
	},
	
	//user
	user : {
		exists : function(){
			return servers.users + '/exists?';
		},
		find : function(token){
            var url = servers.users + '/find?token={0}';
            return String.format(url,token);
        },
        create : function(password,token){
			var url = servers.users + '?password={0}';
				url = String.format(url,password);
			isValid(token) ? url += String.format('&token={0}',token) : url;
			return url;
		},
		get : function(userID,token){
			var url = servers.users + '/{0}?token={1}';
			return String.format(url,userID,token);
		},
		list : function(token,offset,limit,role,isActivated,isBlocked,sortType,sortOrder){
			var url = servers.users + '?token={0}';
				url = String.format(url,token);
			isValid(offset)      ? url += String.format('&offset={0}',offset) : url;
			isValid(limit)       ? url += String.format('&limit={0}',limit) : url;
			isValid(role)        ? url += String.format('&role={0}',role) : url;
			isValid(isActivated) ? url += String.format('&is_activated={0}',isActivated) : url;
			isValid(isBlocked)   ? url += String.format('&is_blocked={0}',isBlocked) : url;
            isValid(sortType)    ? url += String.format('&sort_type={0}',sortType) : url;
            isValid(sortOrder)    ? url += String.format('&sort_order={0}',sortOrder) : url;
			return url;
		},
		update : function(userID,token){
			var url = servers.users + '/{0}/update?token={1}';
			return String.format(url,userID,token);
		},
		del : function(userID,token){
			var url = servers.users + '/{0}?token={1}';
			return String.format(url,userID,token);
		},
		verifyEmail : function(userID,token){
			var url = servers.users + '/{0}/verify_email?token={1}';
			return String.format(url,userID,token);
		},
		setPassword : function(userID,token,newPassword){
			var url = servers.users + '/{0}/password?token={1}&new_password={2}';
			return String.format(url,userID,token,newPassword);
		}
	},
	
	//user avatar
	user_avatar : {
		set : function(userID,token){
			var url = servers.users + '/{0}/avatar?token={1}';
			return String.format(url,userID,token);
		},
		get : function(userID,token,format,size){
			var url = servers.users + '/{0}/avatar?token={1}&t={2}';
				url = String.format(url,userID,token,+new Date());
			isValid(format) ? url += String.format('&format={0}',format) : url;
			isValid(size)   ? url += String.format('&size={0}',size) : url;
			return url;
		}
	},
	
	//user group
	user_group : {
		add : function(userID,groupID,token){
			var url = servers.users + '/{0}/groups?group_id={1}&token={2}';
			return String.format(url,userID,groupID,token);
		},
		get : function(userID,groupID,token){
			var url = servers.users + '/{0}/groups/{1}?token={2}';
			return String.format(url,userID,groupID,token);
		},
		list : function(userID,token,isActivated,isBlocked,role,offset,limit){
			var url = servers.users + '/{0}/groups?token={1}';
				url = String.format(url,userID,token);
			isValid(offset)      ? url += String.format('&offset={0}',offset) : url;
			isValid(limit)       ? url += String.format('&limit={0}',limit) : url;
			isValid(role)        ? url += String.format('&role={0}',role) : url;
			isValid(isActivated) ? url += String.format('&is_activated={0}',isActivated) : url;
			isValid(isBlocked)   ? url += String.format('&is_blocked={0}',isBlocked) : url;
			return url;
		},
		update : function(userID,groupID,token){
			var url = servers.users + '/{0}/groups/{1}/update?token={2}';
			return String.format(url,userID,groupID,token);
		},
		remove : function(userID,groupID,token){
			var url = servers.users + '/{0}/groups/{1}?token={2}';
			return String.format(url,userID,groupID,token); 
		}
	},
	
	//group
	group : {
		exists : function(token){
			var url = servers.groups + '/exists?token={0}';
			return String.format(url,token);
		},
		create : function(token,ownerID){
			var url = servers.groups + '?token={0}';
				url = String.format(url,token);
			ownerID ? url += String.format('&owner_id={0}',ownerID) : url;
			return url;
		},
		get : function(groupID,token){
			var url = servers.groups + '/{0}?token={1}';
			return String.format(url,groupID,token);
		},
		list : function(token,offset,limit,type,isPromoted,isActivated,isBlocked){
			var url = servers.groups + '?token={0}';
				url = String.format(url,token);
			isValid(offset)      ? url += String.format('&offset={0}',offset) : url;
			isValid(limit)       ? url += String.format('&limit={0}',limit) : url;
			isValid(type)        ? url += String.format('&type={0}',role) : url;
            isValid(isPromoted)  ? url += String.format('&is_promoted={0}',isPromoted) : url;
			isValid(isActivated) ? url += String.format('&is_activated={0}',isActivated) : url;
			isValid(isBlocked)   ? url += String.format('&is_blocked={0}',isBlocked) : url;
			return url;
		},
		update : function(groupID,token){
			var url = servers.groups + '/{0}/update?token={1}';
			return String.format(url,groupID,token);
		},
		del : function(groupID,token){
			var url = servers.groups + '/{0}?token={1}';
			return String.format(url,groupID,token);
		},
        setPromoted: function(groupID,isPromoted,token){
            var url = servers.groups + '/{0}/set_promoted?is_promoted={1}&token={2}';
            return String.format(url,groupID,isPromoted,token);
        }
	},
	
	//group logo
	group_logo : {
		set : function(groupID,token){
			var url = servers.groups + '/{0}/logo?token={1}';
			return String.format(url,groupID,token);
		},
		get : function(groupID,token,format,size){
			var url = servers.groups + '/{0}/logo?token={1}&t={2}';
				url = String.format(url,groupID,token,+new Date());
			isValid(format) ? url += String.format('&format={0}',format) : url;
			isValid(size)   ? url += String.format('&size={0}',size) : url;
			return url;
		}
	},
	
	//group user
	group_user : {
		add : function(groupID,userID,token){
			var url = servers.groups + '/{0}/users?user_id={1}&token={2}';
			return String.format(url,groupID,userID,token);
		},
		get : function(groupID,userID,token){
			var url = servers.groups + '/{0}/users?user_id={1}&token={2}';
			return String.format(url,groupID,userID,token);
		},
		list : function(groupID,token,role,offset,limit,isActivated,isBlocked){
			var url = servers.groups + '/{0}/users?token={1}';
				url = String.format(url,groupID,token);
			isValid(offset)      ? url += String.format('&offset={0}',offset) : url;
			isValid(limit)       ? url += String.format('&limit={0}',limit) : url;
			isValid(role)        ? url += String.format('&role={0}',role) : url;
			isValid(isActivated) ? url += String.format('&is_activated={0}',isActivated) : url;
			isValid(isBlocked)   ? url += String.format('&is_blocked={0}',isBlocked) : url;
			return url;
		},
		update : function(groupID,userID,token){
			var url = servers.groups + '/{0}/users/{1}/update?token={2}';
			return String.format(url,groupID,userID,token);
		},
		remove : function(groupID,userID,token){
			var url = servers.groups + '/{0}/users/{1}?token={2}';
			return String.format(url,groupID,userID,token);
		}
	},
	
	//root
	root : {
		get : function(rootID,token){
			var url = servers.roots + '/{0}?token={1}';
			return String.format(url,rootID,token);
		},
		setDefaultPermission : function(rootID,token){
			var url = servers.roots + '/{0}/default_permission?token={1}';
			return String.format(url,rootID,token);
		},
		setQuota : function(rootID,quota,token){
			var url = servers.roots + '/{0}/quota?quota={1}&token={2}';
			return String.format(url,rootID,quota,token);
		},
        listRootsByUsedRatio : function(token, type, offset, limit) {
            var url = servers.roots + '/list_roots_by_used_ratio?token={0}';
                url = String.format(url, token);
            isValid(type)   ? url += String.format('&type={0}', type) : url;
            isValid(offset) ? url += String.format('&offset={0}', offset) : url;
            isValid(limit)  ? url += String.format('&limit={0}', limit) : url;
            return url;
        }
	},
	
	//file by path
	file_by_path : {
		put : function(rootID,path,modifiedAtMillis,token,overwrite){
			var url = servers.roots + '/{0}/files/p/{1}?modified_at_millis={2}&token={3}';
				url = String.format(url,rootID,path,modifiedAtMillis,token);
			isValid(overwrite) ? url += String.format('&overwrite={0}',overwrite) : url;
			return url;
		},
		get : function(rootID,path,token,version,offset,bytes){
			var url = servers.roots + '/{0}/files/p/{1}?token={2}';
				url = String.format(url,rootID,path,token);
			isValid(offset) ? url += String.format('&offset={0}',offset) : url;
			isValid(bytes)  ? url += String.format('&bytes={0}',bytes) : url;
			isValid(version)? url += String.format('&version={0}',version) : url;
			return url;
		},
		del : function(rootID,path,token){
			var url = servers.roots +'/{0}/files/p/{1}?token={2}';
			return String.format(url,rootID,path,token);
		}
	},
	
	//file by id
	file_by_id : {
		upload : function(rootID,metaID,clientMTime,token){
			var url = servers.roots + '/{0}/files/{1}?client_mtime={2}&token={3}';
			return String.format(url,rootID,metaID,clientMTime,token);
		},
		get : function(rootID,metaID,token,version,offset,bytes){
			var url = servers.roots +'/{0}/files/{1}?token={2}';
				url = String.format(url,rootID,metaID,token);
			isValid(version) ? url += String.format('&version={0}',version) : url;
			isValid(offset)  ? url += String.format('&offset={0}',offset) : url;
			isValid(bytes)   ? url += String.format('&bytes={0}',bytes) : url;
			return url;
		},
		getMeta : function(rootID,metaID,token){
			var url = servers.roots +'/{0}/files/{1}/meta?token={2}';
			return String.format(url,rootID,metaID,token);
		},
		getThumbnail : function(rootID,metaID,token,format,size){
			var url = servers.roots +'/{0}/files/{1}/thumbnail?token={2}';
				url = String.format(url,rootID,metaID,token);
			isValid(format) ? url += String.format('&format={0}',format) : url;
			isValid(size)   ? url += String.format('&size={0}',size) : url;
			return url;
		},
		listRevisions : function(rootID,metaID,token,offset,limit){
			var url = servers.roots + '/{0}/files/{1}/revisions?token={2}';
				url = String.format(url,rootID,metaID,token);
			isValid(offset) ? url += String.format('&offset={0}',offset) : url;
			isValid(limit)  ? url += String.format('&limit={0}',limit) : url;
			return url;
		},
		del : function(rootID,metaID,token){
			var url = servers.roots + '/{0}/files/{1}?token={2}';
			return String.format(url,rootID,metaID,token);
		},
        zipDownload: function(rootID,metaIDs,token){
            var url = servers.roots + '/{0}/files/zip_download?token={1}';
                url = String.format(url,rootID,token);
            for(var index = 0 ; index < metaIDs.length ; index++){
                url += String.format('&meta_id={0}',metaIDs[index]);
            }
            return url;
        }
	},
	
	//comments
	comment : {
		create : function(rootID,metaID,token){
			var url = servers.roots + '/{0}/files/{1}/comments?token={2}';
			return String.format(url,rootID,metaID,token);
		},
		get : function(rootID,metaID,commentID,token){
			var url = servers.roots + '/{0}/files/{1}/comments/{2}?token={3}';
			return String.format(url,rootID,metaID,commentID,token);
		},
		list : function(rootID,metaID,token,offset,limit){
			var url = servers.roots + '/{0}/files/{1}/comments?token={2}';
				url = String.format(url,rootID,metaID,token);
			isValid(offset) ? url += String.format('&offset={0}',offset) : url;
			isValid(limit)  ? url += String.format('&limit={0}',limit) : url;
			return url;
		},
		del : function(rootID,metaID,commentID,token){
			var url = servers.roots + '/{0}/files/{1}/comments/{2}?token={3}';
			return String.format(url,rootID,metaID,commentID,token);
		},
		delAll : function(rootID,metaID,token){
			var url = servers.roots + '/{0}/files/{1}/comments?token={2}';
			return String.format(url,rootID,metaID,token);
		}
	},
	
	//share
	share : {
		create : function(rootID,metaID,token,timeout,password){
			var url = servers.roots + '/{0}/files/{1}/shares?token={2}';
				url = String.format(url,rootID,metaID,token);
			isValid(password) ? url += String.format('&password={0}',password) : url;
			isValid(timeout)  ? url += String.format('&timeout={0}',timeout) : url;
			return url;
		},
		get : function(rootID,metaID,shareID,token){
			var url = servers.roots +'/{0}/files/{1}/shares/{2}?token={3}';
			return String.format(url,rootID,metaID,shareID,token);
		},
		list : function(rootID,metaID,token,offset,limit){
			var url = servers.roots + '/{0}/files/{1}/shares?token={2}';
				url = String.format(url,rootID,metaID,token);
			isValid(offset) ? url += String.format('&offset={0}',offset) : url;
			isValid(limit)  ? url += String.format('&limit-{0}',limit) : url;
			return url;
		},
		del : function(rootID,metaID,shareID,token){
			var url = servers.roots +'/{0}/files/{1}/shares/{2}?token={3}';
			return String.format(url,rootID,metaID,shareID,token);
		},
		delAll : function(rootID,metaID,token){
			var url = servers.roots + '/{0}/files/{1}/shares?token={2}';
			return String.format(url,rootID,metaID,token);
		},
        getShareMeta : function(shareID){
            var url = servers.shares + '/{0}/meta?';
            return String.format(url,shareID);
        },
        getShareAccessToken : function(shareID){
            var url = servers.shares + '/{0}/access_token?';
            return String.format(url,shareID);
        },
		getShareContent : function(shareID,token,password,version,offset,bytes){
			var url = servers.shares + '/{0}?token={1}';
			    url = String.format(url,shareID,token);
            isValid(password) ? url += String.format('&password={0}',password) : url;
            isValid(version)  ? url += String.format('&version={0}',version) : url;
            isValid(offset)   ? url += String.format('&offset={0}',offset) : url;
            isValid(bytes)    ? url += String.format('&bytes={0}',bytes) : url;
            return url
		},
        transfer : function(shareID,accessToken,token,rootID,path,password){
            var url = servers.shares + '/{0}/transfer?token={1}&share_access_token={2}&root_id={3}&path={4}';
                url = String.format(url,shareID,token,accessToken,rootID,path);

            isValid(password) ? url += String.format('&password={0}',password) : url;
            return url;
        },
        verifyPassword: function(shareID,password){
            var url = servers.shares + '/{0}/verify_password';
                url = String.format(url,shareID);

            isValid(password) ? url += String.format('?password={0}',password) : url;
            return url;
        }
	},
	
	//file operations
	fileop : {
		commitChunkedUpload : function(rootID,path,uploadID,clientMTime,token){
			var url = servers.fileops + '/commit_chunked_upload?root_id={0}&path={1}&upload_id={2}\&client_mtime={3}&token={4}';
			return String.format(url,rootID,path,uploadID,clientMTime,token);
		},
		copy : function(rootID,path,toPath,token){
			var url = servers.fileops + '/copy?root_id={0}&path={1}&to_path={2}&token={3}';
			return String.format(url,rootID,path,toPath,token);
		},
		createFolder : function(rootID,path,token,clientMTime){
			var url = servers.fileops + '/create_folder?root_id={0}&path={1}&token={2}';
				url = String.format(url,rootID,path,token);
			isValid(clientMTime) ? url += String.format('&client_mtime={0}',clientMTime) : url;
			return url;
		},
		getMeta : function(rootID,path,list,token){
			var url = servers.fileops + '/get_meta?root_id={0}&path={1}&list={2}&token={3}';
			return String.format(url,rootID,path,list,token);
		},
		listFolder : function(rootID,path,token){
			var url = servers.fileops + '/list_folder?root_id={0}&path={1}&token={2}';
			return String.format(url,rootID,path,token);
		},
		move : function(rootID,path,toPath,token){
			var url = servers.fileops + '/move?root_id={0}&path={1}&to_path={2}&token={3}';
			return String.format(url,rootID,path,toPath,token);
		},
		rollback : function(rootID,path,toVersion,token){
			var url = servers.fileops + '/rollback?root_id={0}&path={1}&to_version={2}&token={3}';
			return String.format(rootID,path,toVersion,token);
		},
		thunderUpload : function(rootID,path,md5,bytes,clientMTime,token){
			var url = servers.fileops + '/thunder_upload?root_id={0}&path={1}&md5={2}&bytes={3}&client_mtime={4}&token={5}';
			return String.format(url,rootID,path,md5,bytes,clientMTime,token);
		},
		utimeFolder : function(rootID,path,clientMTime,token){
			var url = servers.fileops + '/utime_folder?root_id={0}&path={1}&client_mtime={2}&token={3}';
			return String.format(url,rootID,path,clientMTime,token);
		},
		setPermission : function(rootID,path,token){
			var url = servers.fileops + '/set_permission?root_id={0}&path={1}&token={2}';
			return String.format(url,rootID,path,token);
		},
		listPermission : function(rootID,token){
			var url = servers.fileops + '/list_permissions?root_id={0}&token={1}';
			return String.format(url,rootID,token);
		},
        groupFilesDetectionByMd5 : function(token, md5){
            var url = servers.fileops + '/group_files_detection_by_md5?token={0}&md5={1}';
            return String.format(url,token,md5);
        }
	},
	
	//chunked upload
	chunked_upload : {
		get : function(token,uploadID,offset){
			var url = servers.chunked_upload + '?token={0}';
				url = String.format(url,token);
			isValid(uploadID) ? url += String.format('&upload_id={0}',uploadID) : url;
			isValid(offset)   ? url += String.format('&offset={0}',offset) : url;
			return url;
		}
	},
	
	//delta
	delta : {
		get : function(token,rootID,cursorID){
			var url = servers.delta + '?token={0}&root_id={1}';
				url = String.format(url,token,rootID);
			isValid(cursorID) ? url += String.format('&cursor_id={0}',cursorID) : url;
			return url;
		}
	},
	
	//trash
	trash : {
		get : function(rootID,trashID,token){
			var url = servers.roots + '/{0}/trashes/{1}?token={2}';
			return String.format(url,rootID,trashID,token);
		},
		list : function(rootID,token,offset,limit){
			var url = servers.roots + '/{0}/trashes?token={1}';
				url = String.format(url,rootID,token);
			isValid(offset) ? url += String.format('&offset={0}',offset) : url;
			isValid(limit) ? url += String.format('&limit={0}',limit) : url;
			return url;
		},
		del : function(rootID,trashID,token){
			var url = servers.roots + '/{0}/trashes/{1}?token={2}';
			return String.format(url,rootID,trashID,token);
		},
		delAll : function(rootID,token){
			var url = servers.roots + '/{0}/trashes?token={1}';
			return String.format(url,rootID,token);
		},
		restore : function(rootID,trashID,token,toPath){
			var url = servers.roots + '/{0}/trashes/{1}/restore?token={2}';
				url = String.format(url,rootID,trashID,token);
			isValid(toPath) ? url += String.format('&to_path={0}',toPath) : url;
			return url;
		}
	},
	
	//search
	search : {
		users : function(query,token,groupID,offset,limit){
			var url = servers.search + '/users?query={0}&token={1}';
				url = String.format(url,query,token);
			isValid(groupID) ? url += String.format('&group_id={0}',groupID) : url;
			isValid(offset)  ? url += String.format('&offset={0}',offset) : url;
			isValid(limit)   ? url += String.format('&limit={0}',limit) : url;
			return url;		
		},
		groups : function(query,token,userID,offset,limit){
			var url = servers.search + '/groups?query={0}&token={1}';
				url = String.format(url,query,token);
			isValid(userID) ? url += String.format('&userID={0}',userID) : url;
			isValid(offset) ? url += String.format('&offset={0}',offset) : url;
			isValid(limit)  ? url += String.format('&limit={0}',limit) : url;
			return url;
		},
		files : function(query,token,rootID,path,offset,limit){
			var url = servers.search + '/files?query={0}&token={1}';
				url = String.format(url,query,token);
			isValid(rootID) ? url += String.format('&root_id={0}',rootID) : url;
			isValid(path)   ? url += String.format('&path={0}',path) : url;
			isValid(offset) ? url += String.format('&offset={0}',offset) : url;
			isValid(limit)  ? url += String.format('&limit={0}',limit) : url;
			return url;
		}
	},

    //md5
    md5 : {
        list_group_metas : function(token, md5){
            var url = servers.md5 + '/list_group_metas?token={0}&md5={1}';
            return String.format(url, token, md5);
        },
        list_shares : function(token, md5){
            var url = servers.md5 + '/list_shares?token={0}&md5={1}';
            return String.format(url, token, md5);
        }
    },
	
	image : {
		get : function(rootID,metaID,token){
			var url = domain + '/img?rid={0}&mid={1}&token={2}';
			return String.format(url,rootID,metaID,token);
		}
	},
	
	//consts
	consts : {
		group_types : function(token){
			var url = servers.consts + '/group_types?token={0}';
			return String.format(url,token);
		},
        user_roles : function(token){
            var url  = servers.consts + '/user_roles?token={0}';
            return String.format(url,token);
        },
        system_space: function(token){
            var url = servers.consts + '/system_space?token={0}';
            return String.format(url,token);
        },
        relation_roles : function(token){
            var url = servers.consts + '/relation_roles?token={0}';
            return String.format(url,token);
        }
	},
	//statistics
	statistics : {
		realTime : function(token){
		    var url = servers.statistics + '/real_time?token={0}';
            return String.format(url,token);
        },
        summary : function(token,time){
            var url = servers.statistics + '/summary?token={0}&time={1}';
            return String.format(url,token,time);
        },
        top : function(token,limit){
            var url = servers.statistics + '/top?token={0}&limit={1}';
            return String.format(url,token,limit);
        },
        trend : function(token){
            var url = servers.statistics + '/trend?token={0}';
            return String.format(url,token);
        },
        delta : function(token, start_time, end_time) {
            var url = servers.statistics + '/delta?token={0}&start_time={1}&end_time={2}';
            return String.format(url, token, start_time, end_time);
        }
	},
	
	//top statistic
	top : {
		users : function(orderBy,token,offset,limit){
			var url = servers.top + '/users?order_by={0}&token={1}';
				url = String.format(url,orderBy,token);
			isValid(offset) ? url += String.format('&offset={0}',offset) : url;
			isValid(limit)  ? url += String.foramt('&limit={0}',limit) : url;
			return url;
		},
		groups : function(orderBy,token,offset,limit){
			var url = servers.top + '/groups?order_by={0}&token={1}';
				url = String.format(url,orderBy,token);
			isValid(offset) ? url += String.format('&offset={0}',offset) : url;
			isValid(limit)  ? url += String.format('&limit={0}',limit) : url;
			return url;
		},
		files : function(orderBy,token,offset,limit){
			var url = servers.top + '/files?order_by={0}&token={1}';
				url = String.format(url,orderBy,token);
			isValid(offset) ? url += String.format('&offset={0}',offset) : url;
			isValid(limit)  ? url += String.foramt('&limit={0}',limit) : url;
			return url;
		}
	},
	
	//hot statistic
	hot : {
		groups : function(){
		},
		files : function(){
		}
	},
	
	//suggest statistic
	suggest : {
		groups : function(){
		},
		files : function(){
		}
	},

    //notice
    notice : {
        list : function(offset,limit){
            var url = '/notice/list?offset={0}&limit={1}';
                url = String.format(url,offset,limit);
            return url;
        },
        get : function(id){
            var url = '/notice/{0}';
                url = String.format(url,id);
            return url;
        },
        update : function(id){
            var url = '/notice/{0}';
                url = String.format(url,id);
            return url;
        },
        save: function(){
            var url = '/notice/save';
            return url;
        },
        del: function(){
            var url = '/notice/del';
            return url;
        }
    },

    //client
    client : {
        upload: function(){
            var url = '/client';
            return url;
        },
        list: function(){
            var url = '/client';
            return url;
        },
        del: function(){
            var url = '/client/del';
            return url;
        },
        update: function(){
            var url = '/client/update';
            return url;
        }

    },

    //sso
    sso : {
        normal : function(type,options,device){
            var url = servers.sso + '?sso_type={0}&{1}&link_name={2}';

        },
        wisedu : function(ticket,device){
            var url = servers.sso + '?sso_type=WISEDU&ticket={0}&link_name={1}';
        }
    }
};

function isValid(value){
    if(value === null || typeof value === 'undefined')
        return false;
    else
        return true;
}
