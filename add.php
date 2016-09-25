<!DOCTYPE html>
<html>
<head>
	<title>Tambah data</title>
	<script type="text/javascript" src="jquery-3.1.0.min.js"></script>
	<script type="text/javascript" src="myscript.js"></script>
	<script type="text/javascript">
		$(document).ready( function() {
			
		});
	</script>
</head>
<body>
	<a href="http://localhost/testratchet/">Home</a>
	<form method="post" action="#">
		<table>
			<tr>
				<td>NPM</td>
				<td><input type="text" name="npm" id="npm"></td>
			</tr>
			<tr>
				<td>Nama</td>
				<td><input type="text" name="nama" id="nama"></td>
			</tr>
			<tr>
				<td></td>
				<td>
					<font color="red" size="2"><div id="errorMessage"></div></font>
					<font color="green" size="2"><div id="successMessage"></div></font>
					<button id="submit">Submit</button>
				</td>
			</tr>
		</table>
	</form>
</body>
</html>