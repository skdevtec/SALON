var $$ = Dom7;
var conn_database = "https://salon.skdevtechnology.com/api/";
var error_connection = "Jaringan tidak tersedia !!!";
var app = new Framework7({
root: '#app',
name: 'Salon Membership',
id: 'com.skdevtech.membership',
touch: { fastClicks: true,},
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
	// home backup
	{
		path: '/index_backup/',
		url: 'pages/index_backup.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				loadingdata();
				app.request({
					method:"GET",
					url:conn_database+"/sothys/select_periode.php",
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#list_periode_backup').html('');
							for(var i = 0; i<x.length; i++)
							{
								$$('#list_periode_backup').append(`
									<p>
										<a href="https://salon.skdevtechnology.com/api/show_backup.php?tahun=` +x[i]['tahun']+ `"  target="_system" class="external button button-large button-raised button-fill tombol-menu-backup">` +x[i]['tahun']+ `</a>
									</p>
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
	// Salon
	{
		path: '/index_salon/',
		url: 'pages/salon/index_salon.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				
			},	
		},
	},
	// List Member Salon
	{
		path: '/list_member_salon/',
		url: 'pages/salon/list_member.html',
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
				$$('#list_member_salon').html('');
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"select_user.php",
					data:{category_user:'salon'},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#list_member_salon').html('');
							for(var i = 0; i<x.length; i++)
							{
								$$('#list_member_salon').append(`
									<li class="swipeout">
										<div class="swipeout-content">
										<a href="/detail_member_salon/`+x[i]['iduser']+`" class="item-link item-content">
											<div class="item-inner">
											<div class="item-title-row">
												<div class="item-title">`+x[i]['name_user']+`</div>
												<div class="item-after"></div>
											</div>
											<div class="item-subtitle">`+x[i]['phone_user']+`</div>
											</div>
										</a>
										</div>
										<div class="swipeout-actions-right">
											<a href="/ubah_member_salon/`+x[i]['iduser']+`" class="color-green edit-member">Ubah</a>
											<a href="#" data-id="` + x[i]['iduser'] + `" class="color-red show-member hapus-member-salon">Hapus</a>
										</div>
									</li>
								`);
							}
							$$('.hapus-member-salon').on('click', function () {
								var id = $$(this).data('id');
								app.dialog.confirm("Apakah Anda yakin untuk menghapus member ini?",function(){
									loadingdata();
									app.request({
										method:"POST",
										url:conn_database+"delete_user.php",
										data:{iduser:id},
										success:function(data){
											var obj = JSON.parse(data);
											if(obj['status'] == true) {
												var x = obj['data'];
												app.dialog.alert(x,'Notifikasi',function(){
													mainView.router.refreshPage();
												});
												determinateLoading = false;
												app.dialog.close();
											}
											else {
												determinateLoading = false;
												app.dialog.close();
												app.dialog.alert(obj['message']);
											}
										},
										error:function(data){
											determinateLoading = false;
											app.dialog.close();
											app.dialog.alert(error_connection);
										}
								  	});
								});
							});
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
				$$('#txtsearch_list_member_salon').on('keyup', function() {
					var cari = $$('#txtsearch_list_member_salon').val();
					app.request({
						method:"POST",
						url:conn_database+"select_user.php",
						data:{category_user:'salon', name_user:cari},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								$$('#list_member_salon').html('');
								for(var i = 0; i<x.length; i++)
								{
									$$('#list_member_salon').append(`
										<li class="swipeout">
											<div class="swipeout-content">
											<a href="/detail_member_salon/`+x[i]['iduser']+`" class="item-link item-content">
												<div class="item-inner">
												<div class="item-title-row">
													<div class="item-title">`+x[i]['name_user']+`</div>
													<div class="item-after"></div>
												</div>
												<div class="item-subtitle">`+x[i]['phone_user']+`</div>
												</div>
											</a>
											</div>
											<div class="swipeout-actions-right">
												<a href="/ubah_member_salon/`+x[i]['iduser']+`" class="color-green edit-member">Ubah</a>
												<a href="#" data-id="` + x[i]['iduser'] + `" class="color-red show-member hapus-member-salon">Hapus</a>
											</div>
										</li>
									`);
								}
								$$('.hapus-member-salon').on('click', function () {
									var id = $$(this).data('id');
									app.dialog.confirm("Apakah Anda yakin untuk menghapus member ini?",function(){
										loadingdata();
										app.request({
											method:"POST",
											url:conn_database+"delete_user.php",
											data:{iduser:id},
											success:function(data){
												var obj = JSON.parse(data);
												if(obj['status'] == true) {
													var x = obj['data'];
													app.dialog.alert(x,'Notifikasi',function(){
														mainView.router.refreshPage();
													});
													determinateLoading = false;
													app.dialog.close();
												}
												else {
													determinateLoading = false;
													app.dialog.close();
													app.dialog.alert(obj['message']);
												}
											},
											error:function(data){
												determinateLoading = false;
												app.dialog.close();
												app.dialog.alert(error_connection);
											}
											});
									});
								});
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
				});
			},	
		},
	},
	// Tambah member Salon
	{
		path: '/tambah_member_salon/',
		url: 'pages/salon/tambah_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				$$('#btn-submit-register-member-salon').on('click', function(e) {
					var nama_tambah_member_salon = $$('#nama_tambah_member_salon').val();
					var nomer_tambah_member_salon = $$('#nomer_tambah_member_salon').val();
					var alamat_tambah_member_salon = $$('#alamat_tambah_member_salon').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"insert_user.php",
						data:{
							name_user:nama_tambah_member_salon,
							address_user:alamat_tambah_member_salon,
							phone_user:nomer_tambah_member_salon,
							category_user:'salon',
						},
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
	// Ubah member Salon
	{
		path: '/ubah_member_salon/:id',
		url: 'pages/salon/ubah_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var x = page.router.currentRoute.params.id;
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"salon/user_service/select_user_service.php",
					data:{iduser:x},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#nama_ubah_member_salon').val(x['user'][0]['name_user']);
							$$('#nomer_ubah_member_salon').val(x['user'][0]['phone_user']);
							$$('#alamat_ubah_member_salon').val(x['user'][0]['address_user']);
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
				$$('#btn-submit-ubah-member-salon').on('click', function(e) {
					var nama_ubah_member_salon = $$('#nama_ubah_member_salon').val();
					var nomer_ubah_member_salon = $$('#nomer_ubah_member_salon').val();
					var alamat_ubah_member_salon = $$('#alamat_ubah_member_salon').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"update_user.php",
						data:{
							iduser:x,
							name_user:nama_ubah_member_salon,
							address_user:alamat_ubah_member_salon,
							phone_user:nomer_ubah_member_salon,
						},
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
	// Show member Salon
	{
		path: '/detail_member_salon/:id',
		url: 'pages/salon/detail_member.html',
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
				var x = page.router.currentRoute.params.id;
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"salon/user_service/select_user_service.php",
					data:{iduser:x},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#name_user_member_salon').append(x['user'][0]['name_user']);
							$$('#phone_user_member_salon').append(x['user'][0]['phone_user']);
							$$('#alamat_user_member_salon').append(x['user'][0]['address_user']);
							for(var i = 0; i<x['service'].length; i++)
							{
								$$('#service_user_member_salon').append(`
									<p>` +(i+1)+ `. `+ x['service'][i]['name_service'] +` -> `+ x['service'][i]['count_used_service'] +`/`+ x['service'][i]['count_total_service'] +`</p>
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
				$$('#btn-submit-riwayat-member-paket-salon').on('click', function(e) {
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"salon/log_salon/detail_log_salon.php",
						data:{iduser:x},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								var y = "";
								for(var i = 0; i<x['date'].length; i++)
								{
									y +=`<div class="timeline-item">
										<div class="timeline-item-date warna-text-menu">`+x['date'][i]['date_log_salon']+`</div>
										<div class="timeline-item-divider"></div>
										<div class="timeline-item-content">
											<div class="timeline-item-inner bckgrnd-riwayat">
									`;
									var temp = '';
									for(var j = 0; j<x['date_detail'].length; j++)
									{
										if(x['date_detail'][j]['date_log_salon'] == x['date'][i]['date_log_salon'])
										{
											temp += `
												<div class="timeline-item-time">`+x['date_detail'][j]['time_log_salon']+`</div>
												<div class="timeline-item-title">`+x['date_detail'][j]['name_service']+`</div>
											`;
										}
									}
									y+= temp + `</div>
										</div>
										</div>
									`;
								}
								$$('#riwayat_transaksi_user_paket_detail').html(y);
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
				});
			},	
		},
	},
	// List Paket Salon
	{
		path: '/list_paket_salon/',
		url: 'pages/salon/list_paket.html',
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
				$$('#succes_list_paket_salon').hide();
				$$('#list_paket_salon').html('');
				app.request({
					method:"POST",
					url:conn_database+"salon/service/select_service.php",
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#list_paket_salon').html('');
							for(var i = 0; i<x.length; i++)
							{
								$$('#list_paket_salon').append(`
									<li class="swipeout">
										<div class="swipeout-content">
										<a href="#" class="item-link item-content">
											<div class="item-inner">
											<div class="item-title-row">
												<div class="item-title">`+x[i]['name_service']+`</div>
												<div class="item-after"></div>
											</div>
											<div class="item-subtitle"></div>
											</div>
										</a>
										</div>
										<div class="swipeout-actions-right">
											<a href="/ubah_paket_salon/`+x[i]['idservice']+`" class="color-green edit-member">Ubah</a>
											<a href="#" data-id=" `+x[i]['idservice']+` " class="color-red hapus-paket-salon">Hapus</a>
										</div>
									</li>
								`);
							}
							$$('.hapus-paket-salon').on('click', function () {
								var id = $$(this).data('id');
								app.dialog.confirm("Apakah Anda yakin untuk menghapus paket ini?",function(){
									loadingdata();
									app.request({
										method:"POST",
										url:conn_database+"salon/service/delete_service.php",
										data:{idservice:id},
										success:function(data){
											var obj = JSON.parse(data);
											if(obj['status'] == true) {
												var x = obj['data'];
												app.dialog.alert(x,'Notifikasi',function(){
													mainView.router.refreshPage();
												});
												determinateLoading = false;
												app.dialog.close();
											}
											else {
												determinateLoading = false;
												app.dialog.close();
												app.dialog.alert(obj['message']);
											}
										},
										error:function(data){
											determinateLoading = false;
											app.dialog.close();
											app.dialog.alert(error_connection);
										}
									  });
								});
							});
							$$('#loading_list_paket_salon').hide();
							$$('#succes_list_paket_salon').show();
						}
						else 
						{
							$$('#loading_list_paket_salon').hide();
							app.dialog.alert(obj['message']);
							$$('#succes_list_paket_salon').hide();
						}
					},
					error:function(data){
						$$('#loading_list_paket_salon').hide();
						app.dialog.alert(error_connection);
						$$('#succes_list_paket_salon').hide();
					}
				});
				$$('#txtsearch_list_paket_salon').on('keyup', function()
				{
					var cari = $$('#txtsearch_list_paket_salon').val();
					app.request({
						method:"POST",
						url:conn_database+"salon/service/select_service.php",
						data:{name_service:cari},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								$$('#list_paket_salon').html('');
								for(var i = 0; i<x.length; i++)
								{
									$$('#list_paket_salon').append(`
										<li class="swipeout">
											<div class="swipeout-content">
											<a href="#" class="item-link item-content">
												<div class="item-inner">
												<div class="item-title-row">
													<div class="item-title">`+x[i]['name_service']+`</div>
													<div class="item-after"></div>
												</div>
												</div>
											</a>
											</div>
											<div class="swipeout-actions-right">
												<a href="/ubah_paket_salon/`+x[i]['idservice']+`" class="color-green edit-member">Ubah</a>
												<a href="#" data-id=" `+x[i]['idservice']+` " class="color-red hapus-paket-salon">Hapus</a>
											</div>
										</li>
									`);
								}
								$$('.hapus-paket-salon').on('click', function () {
									var id = $$(this).data('id');
									app.dialog.confirm("Apakah Anda yakin untuk menghapus paket ini?",function(){
										loadingdata();
										app.request({
											method:"POST",
											url:conn_database+"salon/service/delete_service.php",
											data:{idservice:id},
											success:function(data){
												var obj = JSON.parse(data);
												if(obj['status'] == true) {
													var x = obj['data'];
													app.dialog.alert(x,'Notifikasi',function(){
														mainView.router.refreshPage();
													});
													determinateLoading = false;
													app.dialog.close();
												}
												else {
													determinateLoading = false;
													app.dialog.close();
													app.dialog.alert(obj['message']);
												}
											},
											error:function(data){
												determinateLoading = false;
												app.dialog.close();
												app.dialog.alert(error_connection);
											}
										  });
									});
								});

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
				});
			},	
		},
	},
	// Tambah Paket Salon
	{
		path: '/tambah_paket_salon/',
		url: 'pages/salon/tambah_paket.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				$$('#btn-submit-tambah-paket-salon').on('click', function(e) {
					var nama_tambah_paket_salon = $$('#nama_tambah_paket_salon').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"salon/service/insert_service.php",
						data:{
							name_service:nama_tambah_paket_salon,
						},
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
	// Ubah Paket Salon
	{
		path: '/ubah_paket_salon/:id',
		url: 'pages/salon/ubah_paket.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var x = page.router.currentRoute.params.id;
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"salon/service/show_service.php",
					data:{idservice:x},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#nama_ubah_paket_salon').val(x[0]['name_service']);
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
				$$('#btn-submit-ubah-paket-salon').on('click', function(e) {
					var nama_ubah_paket_salon = $$('#nama_ubah_paket_salon').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"/salon/service/update_service.php",
						data:{
							idservice:x,
							name_service:nama_ubah_paket_salon,
						},
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
	// Tambah Paket Member Salon
	{
		path: '/tambah_paket_member_salon/',
		url: 'pages/salon/tambah_paket_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"salon/select_user_and_service.php",
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							for(var i = 0; i<x['service'].length; i++)
							{
								$$('#paket_tambah_paket_member_salon').append(`
									<option value="`+x['service'][i]['idservice']+`">`+x['service'][i]['name_service']+`</option>
								`);
							}
							var autocompleteDropdownAllaa = app.autocomplete.create({
								inputEl: '#paket_tambah_paket_member_salon',
								openIn: 'dropdown',
								source: function (query, render) {
								  var results = [];
								  // Find matched items
								  for (var i = 0; i < x['service'].length; i++) {
									if (x['service'][i]['name_service'].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(x['service'][i]['idservice']+'-'+x['service'][i]['name_service']);
								  }
								  // Render items by passing array with result items
								  render(results);
								}
							});
							for(var i = 0; i<x['user'].length; i++)
							{
								$$('#member_tambah_paket_member_salon').append(`
									<option value="`+x['user'][i]['iduser']+`">`+x['user'][i]['phone_user']+` - `+x['user'][i]['name_user']+`</option>
								`);
							}
							var autocompleteDropdownAllaa = app.autocomplete.create({
								inputEl: '#member_tambah_paket_member_salon',
								openIn: 'dropdown',
								source: function (query, render) {
								  var results = [];
								  // Find matched items
								  for (var i = 0; i < x['user'].length; i++) {
									if (x['user'][i]['name_user'].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(x['user'][i]['iduser']+'-'+x['user'][i]['phone_user']+`( `+x['user'][i]['name_user']+` )`);
								  }
								  // Render items by passing array with result items
								  render(results);
								}
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
				$$('#btn-submit-tambah-paket-member-salon').on('click', function(e) {
					var paket_tambah_paket_member_salon = $$('#paket_tambah_paket_member_salon').val();
					var member_tambah_paket_member_salon = $$('#member_tambah_paket_member_salon').val();
					var jumlah_tambah_paket_member_salon = $$('#jumlah_tambah_paket_member_salon').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"salon/user_service/insert_user_service.php",
						data:{
							iduser:member_tambah_paket_member_salon,
							idservice:paket_tambah_paket_member_salon,
							count_total_service:jumlah_tambah_paket_member_salon,
						},
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
	// List Pemakaian Member Salon
	{
		path: '/list_pemakaian_member_salon/',
		url: 'pages/salon/list_pemakaian.html',
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
				$$('#list_pemakaian_member_salon').html('');
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"select_user.php",
					data:{category_user:'salon'},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#list_pemakaian_member_salon').html('');
							for(var i = 0; i<x.length; i++)
							{
								$$('#list_pemakaian_member_salon').append(`
									<li class="swipeout">
										<div class="swipeout-content">
										<a href="/transaksi_paket_member_salon/`+x[i]['iduser']+`" class="item-link item-content">
											<div class="item-inner">
											<div class="item-title-row">
												<div class="item-title">`+x[i]['name_user']+`</div>
												<div class="item-after"></div>
											</div>
											<div class="item-subtitle">`+x[i]['phone_user']+`</div>
											</div>
										</a>
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
				$$('#txtsearch_list_pemakaian_member_salon').on('keyup', function()
				{
					var cari = $$('#txtsearch_list_pemakaian_member_salon').val();
					app.request({
						method:"POST",
						url:conn_database+"select_user.php",
						data:{category_user:'salon', name_user:cari},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								$$('#list_pemakaian_member_salon').html('');
								for(var i = 0; i<x.length; i++)
								{
									$$('#list_pemakaian_member_salon').append(`
										<li class="swipeout">
											<div class="swipeout-content">
											<a href="/transaksi_paket_member_salon/`+x[i]['iduser']+`" class="item-link item-content">
												<div class="item-inner">
												<div class="item-title-row">
													<div class="item-title">`+x[i]['name_user']+`</div>
													<div class="item-after"></div>
												</div>
												<div class="item-subtitle">`+x[i]['phone_user']+`</div>
												</div>
											</a>
											</div>
										</li>
									`);
								}

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
				});
			},	
		},
	},
	// Transaksi Paket Member Salon
	{
		path: '/transaksi_paket_member_salon/:id',
		url: 'pages/salon/transaksi_paket_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var y = page.router.currentRoute.params.id;
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"salon/user_service/select_user_service.php",
					data:{iduser:y, ket:'transaksi_salon'},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							for(var i = 0; i<x['service'].length; i++)
							{
								$$('#paket_transaksi_paket_member_salon').append(`
									<option value="`+x['service'][i]['idservice']+`">`+x['service'][i]['name_service']+`</option>
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
				$$('#btn-submit-transaksi-paket-member-salon').on('click', function(e) {
					app.dialog.confirm("Apakah Anda yakin untuk menggunakan paket ini?",function(){
						var paket_transaksi_paket_member_salon = $$('#paket_transaksi_paket_member_salon').val();
						loadingdata();
						app.request({
							method:"POST",
							url:conn_database+"salon/log_salon/insert_log_salon.php",
							data:{
								iduser:y,
								idservice:paket_transaksi_paket_member_salon,
							},
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
				});
			},	
		},
	},
	// Sothys
	{
		path: '/index_sothys/',
		url: 'pages/sothys/index_sothys.html',
		on: 
		{
			pageInit: function (e, page) 
			{
		
			},	
		},
	},
	// List Member Sothys
	{
		path: '/list_member_sothys/',
		url: 'pages/sothys/list_member.html',
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
				$$('#list_member_sothys').html('');
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"select_user.php",
					data:{category_user:'sothys'},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#list_member_sothys').html('');
							for(var i = 0; i<x.length; i++)
							{
								$$('#list_member_sothys').append(`
									<li class="swipeout">
										<div class="swipeout-content">
										<a href="/detail_member_sothys/`+x[i]['iduser']+`" class="item-link item-content">
											<div class="item-inner">
											<div class="item-title-row">
												<div class="item-title">`+x[i]['name_user']+`</div>
												<div class="item-after"></div>
											</div>
											<div class="item-subtitle">`+x[i]['phone_user']+`</div>
											</div>
										</a>
										</div>
										<div class="swipeout-actions-right">
											<a href="/transaksi_member_produk_sothys/`+x[i]['iduser']+`" class="color-blue edit-member">Transaksi</a>
											<a href="/ubah_member_sothys/`+x[i]['iduser']+`" class="color-green edit-member">Ubah</a>
											<a href="#" data-id="` + x[i]['iduser'] + `" class="color-red show-member hapus-member-sothys">Hapus</a>
										</div>
									</li>
								`);
							}
							$$('.hapus-member-sothys').on('click', function () {
								var id = $$(this).data('id');
								app.dialog.confirm("Apakah Anda yakin untuk menghapus member ini?",function(){
									loadingdata();
									app.request({
										method:"POST",
										url:conn_database+"delete_user.php",
										data:{iduser:id},
										success:function(data){
											var obj = JSON.parse(data);
											if(obj['status'] == true) {
												var x = obj['data'];
												app.dialog.alert(x,'Notifikasi',function(){
													mainView.router.refreshPage();
												});
												determinateLoading = false;
												app.dialog.close();
											}
											else {
												determinateLoading = false;
												app.dialog.close();
												app.dialog.alert(obj['message']);
											}
										},
										error:function(data){
											determinateLoading = false;
											app.dialog.close();
											app.dialog.alert(error_connection);
										}
								  	});
								});
							});
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
				$$('#txtsearch_list_member_sothys').on('keyup', function() {
					var cari = $$('#txtsearch_list_member_sothys').val();
					app.request({
						method:"POST",
						url:conn_database+"select_user.php",
						data:{category_user:'sothys', name_user:cari},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								$$('#list_member_sothys').html('');
								for(var i = 0; i<x.length; i++)
								{
									$$('#list_member_sothys').append(`
										<li class="swipeout">
											<div class="swipeout-content">
											<a href="/detail_member_sothys/`+x[i]['iduser']+`" class="item-link item-content">
												<div class="item-inner">
												<div class="item-title-row">
													<div class="item-title">`+x[i]['name_user']+`</div>
													<div class="item-after"></div>
												</div>
												<div class="item-subtitle">`+x[i]['phone_user']+`</div>
												</div>
											</a>
											</div>
											<div class="swipeout-actions-right">
												<a href="/transaksi_member_produk_sothys/`+x[i]['iduser']+`" class="color-blue edit-member">Transaksi</a>
												<a href="/ubah_member_sothys/`+x[i]['iduser']+`" class="color-green edit-member">Ubah</a>
												<a href="#" data-id="` + x[i]['iduser'] + `" class="color-red show-member hapus-member-sothys">Hapus</a>
											</div>
										</li>
									`);
								}
								$$('.hapus-member-sothys').on('click', function () {
									var id = $$(this).data('id');
									app.dialog.confirm("Apakah Anda yakin untuk menghapus member ini?",function(){
										loadingdata();
										app.request({
											method:"POST",
											url:conn_database+"delete_user.php",
											data:{iduser:id},
											success:function(data){
												var obj = JSON.parse(data);
												if(obj['status'] == true) {
													var x = obj['data'];
													app.dialog.alert(x,'Notifikasi',function(){
														mainView.router.refreshPage();
													});
													determinateLoading = false;
													app.dialog.close();
												}
												else {
													determinateLoading = false;
													app.dialog.close();
													app.dialog.alert(obj['message']);
												}
											},
											error:function(data){
												determinateLoading = false;
												app.dialog.close();
												app.dialog.alert(error_connection);
											}
											});
									});
								});
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
				});
			},	
		},
	},
	// Tambah member Sothys
	{
		path: '/tambah_member_sothys/',
		url: 'pages/sothys/tambah_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				$$('#btn-submit-register-member-sothys').on('click', function(e) {
					var nama_tambah_member_sothys = $$('#nama_tambah_member_sothys').val();
					var nomer_tambah_member_sothys = $$('#nomer_tambah_member_sothys').val();
					var alamat_tambah_member_sothys = $$('#alamat_tambah_member_sothys').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"insert_user.php",
						data:{
							name_user:nama_tambah_member_sothys,
							address_user:alamat_tambah_member_sothys,
							phone_user:nomer_tambah_member_sothys,
							category_user:'sothys',
						},
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
	// Ubah member Sothys
	{
		path: '/ubah_member_sothys/:id',
		url: 'pages/sothys/ubah_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var x = page.router.currentRoute.params.id;
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"salon/user_service/select_user_service.php",
					data:{iduser:x},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#nama_ubah_member_sothys').val(x['user'][0]['name_user']);
							$$('#nomer_ubah_member_sothys').val(x['user'][0]['phone_user']);
							$$('#alamat_ubah_member_sothys').val(x['user'][0]['address_user']);
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
				$$('#btn-submit-ubah-member-sothys').on('click', function(e) {
					var nama_ubah_member_sothys = $$('#nama_ubah_member_sothys').val();
					var nomer_ubah_member_sothys = $$('#nomer_ubah_member_sothys').val();
					var alamat_ubah_member_sothys = $$('#alamat_ubah_member_sothys').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"update_user.php",
						data:{
							iduser:x,
							name_user:nama_ubah_member_sothys,
							address_user:alamat_ubah_member_sothys,
							phone_user:nomer_ubah_member_sothys,
						},
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
	// Show member Sothys
	{
		path: '/detail_member_sothys/:id',
		url: 'pages/sothys/detail_member.html',
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
				var x = page.router.currentRoute.params.id;
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"salon/user_service/select_user_service.php",
					data:{iduser:x},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#name_user_member_sothys').append(x['user'][0]['name_user']);
							$$('#phone_user_member_sothys').append(x['user'][0]['phone_user']);
							$$('#alamat_user_member_sothys').append(x['user'][0]['address_user']);
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
				$$('#btn-submit-riwayat-member-paket-sothys').on('click', function(e) {
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"sothys/log_sothys/detail_log_sothys.php",
						data:{iduser:x},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								var y = "";
								for(var i = 0; i<x['date'].length; i++)
								{
									y +=`<div class="timeline-item">
										<div class="timeline-item-date">`+x['date'][i]['date_log_sothys']+`</div>
										<div class="timeline-item-divider"></div>
										<div class="timeline-item-content">
											<div class="timeline-item-inner bckgrnd-riwayat">
									`;
									var temp = '';
									for(var j = 0; j<x['date_detail'].length; j++)
									{
										if(x['date_detail'][j]['date_log_sothys'] == x['date'][i]['date_log_sothys'])
										{
											temp += `
												<div class="timeline-item-time">`+x['date_detail'][j]['time_log_sothys']+`</div>
												<div class="timeline-item-title">`+x['date_detail'][j]['name_product']+`</div>
												<div class="timeline-item-subtitle">`+x['date_detail'][j]['count_log_sothys_detail']+`</div>
											`;
										}
									}
									y+= temp + `</div>
										</div>
										</div>
									`;
								}
								$$('#riwayat_transaksi_user_paket_detail').html(y);
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
				});
			},	
		},
	},
	// List Produk Sothys
	{
		path: '/list_produk_sothys/',
		url: 'pages/sothys/list_produk.html',
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

				$$('#succes_list_produk_sothys').hide();
				$$('#list_produk_sothys').html('');
				app.request({
					method:"POST",
					url:conn_database+"sothys/product/select_product.php",
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#list_produk_sothys').html('');
							for(var i = 0; i<x.length; i++)
							{
								$$('#list_produk_sothys').append(`
									<li class="swipeout">
										<div class="swipeout-content">
										<a href="#" class="item-link item-content">
											<div class="item-inner">
											<div class="item-title-row">
												<div class="item-title">`+x[i]['name_product']+`</div>
												<div class="item-after"></div>
											</div>
											<div class="item-subtitle">`+formatRupiah(x[i]['price_product'])+`</div>
											<div class="item-subtitle"></div>
											</div>
										</a>
										</div>
										<div class="swipeout-actions-right">
											<a href="/ubah_produk_sothys/`+x[i]['idproduct']+`" class="color-green edit-member">Ubah</a>
											<a href="#" data-id=" `+x[i]['idproduct']+` " class="color-red hapus-produk-sothys">Hapus</a>
										</div>
									</li>
								`);
							}
							$$('.hapus-produk-sothys').on('click', function () {
								var id = $$(this).data('id');
								app.dialog.confirm("Apakah Anda yakin untuk menghapus produk ini?",function(){
									loadingdata();
									app.request({
										method:"POST",
										url:conn_database+"sothys/product/delete_product.php",
										data:{idproduct:id},
										success:function(data){
											var obj = JSON.parse(data);
											if(obj['status'] == true) {
												var x = obj['data'];
												app.dialog.alert(x,'Notifikasi',function(){
													mainView.router.refreshPage();
												});
												determinateLoading = false;
												app.dialog.close();
											}
											else {
												determinateLoading = false;
												app.dialog.close();
												app.dialog.alert(obj['message']);
											}
										},
										error:function(data){
											determinateLoading = false;
											app.dialog.close();
											app.dialog.alert(error_connection);
										}
									  });
								});
							});
							$$('#loading_list_produk_sothys').hide();
							$$('#succes_list_produk_sothys').show();
						}
						else 
						{
							app.dialog.alert(obj['message']);
							$$('#loading_list_produk_sothys').hide();
							$$('#succes_list_produk_sothys').hide();
						}
					},
					error:function(data){
						$$('#loading_list_produk_sothys').hide();
						app.dialog.alert(error_connection);
						$$('#succes_list_produk_sothys').hide();
					}
				});

				$$('#txtsearch_list_produk_sothys').on('keyup', function()
				{
					var cari = $$('#txtsearch_list_produk_sothys').val();
					app.request({
						method:"POST",
						url:conn_database+"sothys/product/select_product.php",
						data:{name_product:cari},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								$$('#list_produk_sothys').html('');
								for(var i = 0; i<x.length; i++)
								{
									$$('#list_produk_sothys').append(`
										<li class="swipeout">
											<div class="swipeout-content">
											<a href="#" class="item-link item-content">
												<div class="item-inner">
												<div class="item-title-row">
													<div class="item-title">`+x[i]['name_product']+`</div>
													<div class="item-after"></div>
												</div>
												<div class="item-subtitle">`+x[i]['price_product']+`</div>
												</div>
											</a>
											</div>
											<div class="swipeout-actions-right">
												<a href="/ubah_produk_sothys/`+x[i]['idproduct']+`" class="color-green edit-member">Ubah</a>
												<a href="#" data-id=" `+x[i]['idproduct']+` " class="color-red hapus-produk-sothys">Hapus</a>
											</div>
										</li>
									`);
								}
								$$('.hapus-produk-sothys').on('click', function () {
									var id = $$(this).data('id');
									app.dialog.confirm("Apakah Anda yakin untuk menghapus produk ini?",function(){
										loadingdata();
										app.request({
											method:"POST",
											url:conn_database+"sothys/product/delete_product.php",
											data:{idproduct:id},
											success:function(data){
												var obj = JSON.parse(data);
												if(obj['status'] == true) {
													var x = obj['data'];
													app.dialog.alert(x,'Notifikasi',function(){
														mainView.router.refreshPage();
													});
													determinateLoading = false;
													app.dialog.close();
												}
												else {
													determinateLoading = false;
													app.dialog.close();
													app.dialog.alert(obj['message']);
												}
											},
											error:function(data){
												determinateLoading = false;
												app.dialog.close();
												app.dialog.alert(error_connection);
											}
										  });
									});
								});

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
				});
			},	
		},
	},
	// Tambah Produk Sothys
	{
		path: '/tambah_produk_sothys/',
		url: 'pages/sothys/tambah_produk.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				$$('#btn-submit-tambah-produk-sothys').on('click', function(e) {
					var nama_tambah_produk_sothys = $$('#nama_tambah_produk_sothys').val();
					var harga_tambah_produk_sothys = $$('#harga_tambah_produk_sothys').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"sothys/product/insert_product.php",
						data:{
							name_product:nama_tambah_produk_sothys,
							price_product:harga_tambah_produk_sothys,
						},
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
	// Ubah Produk Sothys
	{
		path: '/ubah_produk_sothys/:id',
		url: 'pages/sothys/ubah_produk.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var x = page.router.currentRoute.params.id;
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"sothys/product/show_product.php",
					data:{idproduct:x},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#nama_ubah_produk_sothys').val(x[0]['name_product']);
							$$('#harga_ubah_produk_sothys').val(x[0]['price_product']);
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
				$$('#btn-submit-ubah-produk-sothys').on('click', function(e) {
					var nama_ubah_produk_sothys = $$('#nama_ubah_produk_sothys').val();
					var harga_ubah_produk_sothys = $$('#harga_ubah_produk_sothys').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"/sothys/product/update_product.php",
						data:{
							idproduct:x,
							name_product:nama_ubah_produk_sothys,
							price_product:harga_ubah_produk_sothys,
						},
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
	// Transaksi Paket Member Sothys
	{
		path: '/transaksi_member_produk_sothys/:id',
		url: 'pages/sothys/transaksi_produk_sothys.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var y = page.router.currentRoute.params.id;
				
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"sothys/product/select_product.php",
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#list_produk_sothys').html('');
							for(var i = 0; i<x.length; i++)
							{
								$$('#produk_transaksi_produk_member_sothys').append(`
									<option value="`+x[i]['idproduct']+`">`+x[i]['name_product']+`</option>
								`);
							}
							var autocompleteDropdownAll = app.autocomplete.create({
								inputEl: '#produk_transaksi_produk_member_sothys',
								openIn: 'dropdown',
								source: function (query, render) {
								  var results = [];
								  // Find matched items
								  for (var i = 0; i < x.length; i++) {
									if (x[i]['name_product'].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(x[i]['idproduct']+'-'+x[i]['name_product']);
								  }
								  // Render items by passing array with result items
								  render(results);
								}
							});
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

				var arrtmp = [];
				var arrtmpc = [];
				var arrtmpp = [];
				var tmpjmlh = 0;
				$$('#btn-tambah-produk-transaksi-produk-member-sothys').on('click', function(e) {
					tmpjmlh++;
					
					var idproduct = $$('#produk_transaksi_produk_member_sothys').val();
					var count_product = $$('#count_produk_transaksi_produk_member_sothys').val();
					console.log(idproduct);
					// arrtmp.push($$('#produk_transaksi_produk_member_sothys').val());
					// arrtmpc.push($$('#count_produk_transaksi_produk_member_sothys').val());
					if(count_product == "" || count_product < 1) {
						app.dialog.alert('Minimum jumlah transaksi adalah 1 produk.');
					} else {
						loadingdata();
						app.request({
							method:"POST",
							url:conn_database+"sothys/product/show_product.php", data: {idproduct: idproduct},
							success:function(data){
								var obj = JSON.parse(data);
								if(obj['status'] == true) {
									var x = obj['data'];
									$$('#list_produk_transaksi_produk_member_sothys').append(`
										<li class="item-content item-input">
											<div class="item-media">
											<i class="icon demo-list-icon"></i>
											</div>
											<div class="item-inner">
											<div class="item-title item-label">Produk</div>
											<div class="item-input-wrap input-dropdown-wrap">
												<select placeholder="Please choose..." id="produk_transaksi_produk_member_sothys_detail`+tmpjmlh+`">
													<option value="`+x[0]['idproduct']+`">`+x[0]['name_product']+`</option>
												</select>
											</div>
												<input type="number" id="count_produk_transaksi_produk_member_sothys_detail`+tmpjmlh+`" value="`+count_product+`" placeholder="Jumlah"><a> x <input type="hidden" id="price_produk_transaksi_produk_member_sothys_detail`+tmpjmlh+`" value="`+x[0]['price_product']+`" placeholder="Jumlah">`+formatRupiah(x[0]['price_product'])+`</a>
											</div>
										</li>
									`);
									determinateLoading = false;
									app.dialog.close();
									$$('#count_produk_transaksi_produk_member_sothys').val("1");
									$$('#produk_transaksi_produk_member_sothys').val('');
									// arrtmpp.push(x[0]['price_product']);
									// total += parseInt(count_product) * parseInt(x[0]['price_product']);	
									// $$('#total-transaksi-produk-member-sothys').html();
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
					}
				});

				$$('#btn-submit-transaksi-produk-member-sothys').on('click', function(e) {
					var total = 0;
					for(var i = 1;i<=tmpjmlh;i++)
					{
						var val_id=$$('#produk_transaksi_produk_member_sothys_detail'+i).val();
						var val_count=$$('#count_produk_transaksi_produk_member_sothys_detail'+i).val();
						var val_price=$$('#price_produk_transaksi_produk_member_sothys_detail'+i).val();
						if(!(val_count == 0 || val_count == '' || val_count == null || val_count == undefined))
						{
							arrtmp.push($$('#produk_transaksi_produk_member_sothys_detail'+i).val());
							arrtmpc.push($$('#count_produk_transaksi_produk_member_sothys_detail'+i).val());
							arrtmpp.push($$('#price_produk_transaksi_produk_member_sothys_detail'+i).val());
							total += parseInt($$('#count_produk_transaksi_produk_member_sothys_detail'+i).val()) * parseInt($$('#price_produk_transaksi_produk_member_sothys_detail'+i).val());
						}
					}
					app.dialog.confirm("Total transaksi ini adalah "+formatRupiah(total.toString())+" ?",function(){
						loadingdata();
						app.request({
							method:"POST",
							url:conn_database+"sothys/log_sothys/insert_log_sothys.php",
							data:{
								iduser:y,
								idproduct:arrtmp,
								count_log:arrtmpc,
								price_log:arrtmpp,
							},
							success:function(data){
								var obj = JSON.parse(data);
								if(obj['status'] == true) {
									var x = obj['data'];
									app.dialog.alert(x,'Notifikasi',function(){
										var url = 'https://salon.skdevtechnology.com/api/sothys/log_sothys/checkout_log_sothys.php'
										cordova.InAppBrowser.open(url, '_system', 'location=no');
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

function loadingdataperiode(keterangan) {
	showDeterminate(true);
	determinateLoading = false;
	function showDeterminate(inline) 
	{
		determinateLoading = true;
		var progressBarEl;
		if (inline) {
			progressBarEl = app.dialog.progress(keterangan);
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

function formatRupiah(angka, prefix){
	var number_string = angka.replace(/[^,\d]/g, '').toString(),
	split   		= number_string.split(','),
	sisa     		= split[0].length % 3,
	rupiah     		= split[0].substr(0, sisa),
	ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

	// tambahkan titik jika yang di input sudah menjadi angka ribuan
	if(ribuan){
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}

	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return 'IDR ' + rupiah + ',00';
}