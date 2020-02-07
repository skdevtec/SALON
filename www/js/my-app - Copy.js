var $$ = Dom7;
var conn_database = "https://salon.skdevtechnology.com/";
var error_connection = "Jaringan tidak tersedia !!!";
var app = new Framework7({
root: '#app',
name: 'Salon Membership',
theme:'ios',
id: 'com.skdevtech.membership',
touch: { fastClicks: true,},
view: { iosDynamicNavbar: false, },
routes: [
	{
		path: '/index/',
		url: 'index.html',
		on:
		{
			pageInit:function(e,page)
			{
			},
		},
	},
	// home
	{
		path: '/home/',
		url: 'pages/home.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				
			},	
		},
	},
	// Index member
	{
		path: '/index_member/',
		url: 'pages/member/index_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var $ptrContent = $$('.ptr-content');
				$ptrContent.on('ptr:refresh', function (e) {
					// Emulate 2s loading
					setTimeout(function () {
						mainView.router.refreshPage();
						// When loading done, we need to reset it
						app.ptr.done(); // or e.detail();
					}, 2000);
				});
				loadingdata();
				app.request({
					method:"GET",
					url:conn_database+"member/index_member.php",
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							for(var i = 0; i<x.length; i++)
							{
								$$('#list_member').append(`
									<li class="swipeout">
										<div class="swipeout-content">
										<a href="#" class="item-link item-content">
											<div class="item-inner">
											<div class="item-title-row">
												<div class="item-title">`+x[i]['username']+`</div>
												<div class="item-after"></div>
											</div>
											<div class="item-subtitle">`+x[i]['name']+`</div>
											</div>
										</a>
										</div>
										<div class="swipeout-actions-right">
										<a href="/edit_member/`+x[i]['username']+`" class="color-green edit-member">Edit</a>
										<a href="/show_member/`+x[i]['username']+`" class="color-blue show-member">Show</a>
										</div>
									</li>
								`);
							}
							determinateLoading = false;
							app.dialog.close();
						}
						else 
						{
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
			},	
		},
	},
	// Create member
	{
		path: '/create_member/',
		url: 'pages/member/create_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				$$('#btn-submit-register-member').on('click', function(e) {
					var username = $$('#username_register_member').val();
					var name = $$('#name_register_member').val();
					var password = $$('#password_register_member').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"member/create_member.php",
						data:{username:username, name:name, password:password},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// Edit member
	{
		path: '/edit_member/:username',
		url: 'pages/member/edit_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var username = page.router.currentRoute.params.username;
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"member/show_member.php",
					data:{username:username},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#username_edit_member').append(x[0]['username']);
							$$('#name_edit_member').val(x[0]['name']);
							determinateLoading = false;
							app.dialog.close();
						}
						else {
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				$$('#btn-submit-edit-member').on('click', function(e) {
					var name = $$('#name_edit_member').val();
					var password = $$('#password_edit_member').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"member/edit_member.php",
						data:{username:username, name:name, password:password},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// Show member
	{
		path: '/show_member/:id',
		url: 'pages/member/show_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				
			},	
		},
	},
	// Index Service
	{
		path: '/index_service/',
		url: 'pages/service/index_service.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var $ptrContent = $$('.ptr-content');
				$ptrContent.on('ptr:refresh', function (e) {
					// Emulate 2s loading
					setTimeout(function () {
						mainView.router.refreshPage();
						// When loading done, we need to reset it
						app.ptr.done(); // or e.detail();
					}, 2000);
				});
				loadingdata();
				app.request({
					method:"GET",
					url:conn_database+"service/index_service.php",
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							for(var i = 0; i<x.length; i++)
							{
								$$('#list_service').append(`
									<li class="swipeout">
										<div class="swipeout-content">
										<a href="#" class="item-link item-content">
											<div class="item-inner">
											<div class="item-title-row">
												<div class="item-title">`+(i+1)+`</div>
												<div class="item-after"></div>
											</div>
											<div class="item-subtitle">`+x[i]['name_service']+`</div>
											</div>
										</a>
										</div>
										<div class="swipeout-actions-right">
										<a href="/edit_service/`+x[i]['id_service']+`" class="color-green">Edit</a>
										<a href="/show_service/`+x[i]['id_service']+`" class="color-blue">Show</a>
										</div>
									</li>
								`);
							}
							determinateLoading = false;
							app.dialog.close();
						}
						else 
						{
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
			},	
		},
	},
	// Index Service Member
	{
		path: '/index_service_member/',
		url: 'pages/service/index_service_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var $ptrContent = $$('.ptr-content');
				$ptrContent.on('ptr:refresh', function (e) {
					// Emulate 2s loading
					setTimeout(function () {
						mainView.router.refreshPage();
						// When loading done, we need to reset it
						app.ptr.done(); // or e.detail();
					}, 2000);
				});
				loadingdata();
				app.request({
					method:"GET",
					url:conn_database+"service/select_service_member.php",
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							var temp = "";
							for(var i = 0; i<x.length; i++)
							{
								temp += `
									<tr>
										<td class="label-cell">`+x[i]['username']+`</td>
										<td class="numeric-cell">`+x[i]['name']+`</td>
										<td class="numeric-cell">`+x[i]['name_service']+`</td>
										<td class="numeric-cell">`+x[i]['count_service']+`</td>
									</tr>
								`;
							}
							$$('#list_member_service').html(temp);
							determinateLoading = false;
							app.dialog.close();
						}
						else 
						{
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
			},	
		},
	},
	// Create Service
	{
		path: '/create_service/',
		url: 'pages/service/create_service.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				$$('#btn-submit-create-service').on('click', function(e) {
					var name = $$('#name_create_service').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"service/create_service.php",
						data:{name:name},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// Edit Service
	{
		path: '/edit_service/:id',
		url: 'pages/service/edit_service.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var id = page.router.currentRoute.params.id;
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"service/show_service.php",
					data:{id:id},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#name_edit_service').val(x[0]['name_service']);
							determinateLoading = false;
							app.dialog.close();
						}
						else {
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				$$('#btn-submit-edit-service').on('click', function(e) {
					var name = $$('#name_edit_service').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"service/edit_service.php",
						data:{id:id, name:name},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// Create Service Member
	{
		path: '/create_service_member/',
		url: 'pages/service/create_service_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"service/index_service.php",
					data:{name:name},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							for(var i = 0; i<x.length; i++)
							{
								$$('#create_service_member').append(`
									<option value="`+x[i]['id_service']+`">`+x[i]['name_service']+`</option>
								`);
							}
						}
						else {
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				app.request({
					method:"POST",
					url:conn_database+"member/index_member.php",
					data:{name:name},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							for(var i = 0; i<x.length; i++)
							{
								$$('#create_member_service').append(`
									<option value="`+x[i]['username']+`">`+x[i]['username']+`-`+x[i]['name']+`</option>
								`);
							}
							determinateLoading = false;
							app.dialog.close();
						}
						else {
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				$$('#btn-submit-create-service_member').on('click', function(e) {
					var id_service = $$('#create_service_member').val();
					var username = $$('#create_member_service').val();
					var count_service = $$('#create_count_service_membe').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"service/create_service_member.php",
						data:{id_service:id_service, username:username, count_service:count_service},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// Transaction
	{
		path: '/transaction_service/',
		url: 'pages/transaction/transaction_service.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"member/index_member.php",
					data:{name:name},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							for(var i = 0; i<x.length; i++)
							{
								$$('#transaction_service_member').append(`
									<option value="`+x[i]['username']+`">`+x[i]['username']+`-`+x[i]['name']+`</option>
								`);
							}
							app.request({
								method:"POST",
								url:conn_database+"service/show_user_service.php",
								data:{username:x[0]['username']},
								success:function(data){
									var obj = JSON.parse(data);
									if(obj['status'] == true) {
										var x = obj['data'];
										for(var i = 0; i<x.length; i++)
										{
											$$('#transaction_service_service').append(`
												<option value="`+x[i]['id_service']+`">`+x[i]['name_service']+`</option>
											`);
										}
										$$('#transaction_service_count').val(x[0]['count_service']);
										determinateLoading = false;
										app.dialog.close();
									}
									else {
										app.dialog.alert(obj['message']);
										determinateLoading = false;
										app.dialog.close();
									}
								},
								error:function(data){
									determinateLoading = false;
									app.dialog.close();
									app.dialog.alert(error_connection);
								}
							});
						}
						else {
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				$$('#transaction_service_member').on('change', function(e) {
					var username = $$('#transaction_service_member').val();
					$$('#transaction_service_service').html("");
					$$('#transaction_service_count').val("");
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"service/show_user_service.php",
						data:{username:username},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								for(var i = 0; i<x.length; i++)
								{
									$$('#transaction_service_service').append(`
										<option value="`+x[i]['id_service']+`">`+x[i]['name_service']+`</option>
									`);
								}
								$$('#transaction_service_count').val(x[0]['count_service']);
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert("Service = "+obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
				$$('#transaction_service_service').on('change', function(e) {
					var id_service = $$('#transaction_service_service').val();
					var username = $$('#transaction_service_member').val();
					$$('#transaction_service_count').val("");
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"service/show_user_service_count.php",
						data:{username:username, id_service:id_service},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								$$('#transaction_service_count').val(x[0]['count_service']);
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert("Count = "+obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
				$$('#btn-submit-create-transaction_service').on('click', function(e) {
					var username = $$('#transaction_service_member').val();
					var id_service = $$('#transaction_service_service').val();
					var password = $$('#transaction_service_password').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"transaction/transaction_coba.php",
						data:{id_service:id_service, username:username, password:password},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection,'Notifikasi',function(){
								// app.views.main.router.back({
								// 	url: /home/,
								// 	force: true,
								// 	ignoreCache: true
								// });
							});
						}
					});
				});
			},	
		},
	},
]});
var mainView = app.views.create('.view-main',{ url: '/home/'});

function onBackKeyDown() {
	if(app.views.main.history.length == 1 || app.views.main.router.url == '/home/')
	{
		navigator.app.exitApp();
	} 
	else 
	{
		if(app.views.main.router.url == '/login/') {  
			navigator.app.exitApp();
		}
		else
		{
			app.dialog.close();
			// app.views.main.router.back();
			app.views.main.router.back({
				url: /home/,
				force: true,
				ignoreCache: true
			  });
			return false;
		}
	}
}
document.addEventListener("backbutton", onBackKeyDown, false);
function loadingdata() {
	showDeterminate(true);
	determinateLoading = false;
	function showDeterminate(inline) 
	{
		determinateLoading = true;
		var progressBarEl;
		if (inline) {
			progressBarEl = app.dialog.progress();
		} else {
			progressBarEl = app.progressbar.show(0, app.theme === 'md' ? 'yellow' : 'blue');
		}
		function simulateLoading() {
			setTimeout(function () {
				simulateLoading();
			}, Math.random() * 300 + 300);
		}
		simulateLoading();
	}
}