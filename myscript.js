$(document).ready( function() {
	var output;
	var websocket;

	// call when html page is open/load
	WebSocketSupport();
	if(window.location.href=='http://localhost/testratchet/') {
		loadData();
	}

	function browserSupportsWebSockets() {
	    if ("WebSocket" in window) {
	        return true;
	    }
	    else {
	        return false;
	    }
	}

	function WebSocketSupport() {
	    if (browserSupportsWebSockets() === false) {
	        console.log('Sorry! Your web browser does not supports web sockets');

	        return;
	    }

	    websocket = new WebSocket('ws:localhost:8080');

	    websocket.onopen = function(e) {
	    	console.log("You have have successfully connected to the server");
	    };


	    websocket.onmessage = function(e) {
	        onMessage(e)
	    };

	    websocket.onerror = function(e) {
	        onError(e)
	    };
	}

	// event ketika pesan di terima
	function onMessage(e) {
		loadData();
	}

	// event ketika error diterima
	function onError(e) {
	    writeToScreen(e.data);
	}

	// event kirim pesan
	function doSend(message) {
	    websocket.send(message);
	   	console.log(message);
	}

	/* =========================== UNTUK HALAMAN INDEX ===================================== */
	function loadData() {
		$.ajax({
			url : 'http://localhost/testratchet/process_data.php',
			type : 'GET',
			data : {
				'function' : 'select'
			},
			success : function(data) {
				document.getElementById('tbody').innerHTML = data;
				console.log('load data');
			}
		});
	}

	// delete data
	$('body').on('click', '#delete', function() {
		$.ajax({
			url : 'http://localhost/testratchet/process_data.php?function=delete',
			type : 'GET',
			data : {
				'id' : $(this).attr('value'),
			},
			success : function(data) {
				if(data=='sukses') {
					loadData();
					// kirim pesan delete data
					doSend('delete_data');
				}
			}
		})
	});

	/* =========================== UNTUK HALAMAN TAMBAH DATA ===================================== */
	$('body').on('click', '#submit', function() {
		document.getElementById('successMessage').innerHTML = null;
		npm = $('#npm').val();
		nama = $('#nama').val();

		if((nama.trim()=="") || (npm.trim()=="")) {
			alert('isi kelengkapan data');
			document.getElementById('successMessage').innerHTML = null;
		}
		else {
			$.ajax({
				url : 'http://localhost/testratchet/process_data.php?function=tambah',
				type : 'POST',
				data : {
					'npm' : npm,
					'nama' : nama,
				},
				success : function(data) {
					if(data=='gagal') {
						document.getElementById('errorMessage').innerHTML = 'npm sudah terdaftar';
						document.getElementById('successMessage').innerHTML = null;

					}
					else {
						document.getElementById('errorMessage').innerHTML = null;
						document.getElementById('successMessage').innerHTML = 'input data berhasil';
						document.getElementById('npm').value = null;
						document.getElementById('nama').value = null;
						// kirim pesan tambah data
						doSend('add_data');
					}
				}
			});	
		}
		
		return false;
	});
});



