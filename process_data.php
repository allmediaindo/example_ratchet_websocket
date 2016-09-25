<?php 
// load connection
include('connection.php');

function insertData($npm=null, $nama=null) {
	if(($npm!=null) || ($nama!=null)) {
		$sql = "INSERT INTO mahasiswa(npm, nama) VALUES('".$npm."', '".$nama."')";
		if(mysqli_query($GLOBALS['conn'], $sql)) {
			return true;
		}
		else {
			return false;
		}	
	}
	else {
		return false;
	}
	
}

function deleteData($id=null) {
	if($id!=null) {
		$sql = "DELETE FROM mahasiswa WHERE id='".$id."'";
		if(mysqli_query($GLOBALS['conn'], $sql)) {
			return true;
		}
		else {
			return false;
		}	
	}
	else {
		return false;
	}

} 

function selectData() {
	$sql = "SELECT * FROM mahasiswa ORDER BY npm";	
	$result = mysqli_query($GLOBALS['conn'], $sql);
	$data = array();
	if(mysqli_num_rows($result)>0) {
		while($row = mysqli_fetch_assoc($result)) {
			$tmp['id'] = $row['id'];
			$tmp['npm'] = $row['npm'];
			$tmp['nama'] = $row['nama'];
			array_push($data, $tmp);
		}
	}
	return $data;
}

// untuk handle request dari ajax

if($_GET['function']=='delete') {
	if(deleteData($_GET['id'])) {
		echo "sukses";
	}
	else {
		echo "gagal";
	}
}

if($_GET['function']=='select') {
	$data = selectData();
	$number = 1;
	foreach ($data as $row) {
		?>
		<tr>
			<td><?php echo $number; ?></td>
			<td><?php echo $row['npm']; ?></td>
			<td><?php echo $row['nama']; ?></td>
			<td><a href="#" id="delete" value="<?php echo $row['id'] ?>">delete</a></td>
		</tr>
		<?php
		$number++;
	}
}

if($_GET['function']=='tambah') {
	if(insertData($_POST['npm'], $_POST['nama'])) {
		echo 'sukses';
	}
	else {
		echo 'gagal';
	}
}