<?php

if(isset($_GET["user"])){
	$user = $_GET["user"];
}else{
	$user = "U000";
}


$string_data = file_get_contents("datos/items.txt");
$datos = unserialize($string_data);


if(!isset($datos[$user])){
	$datos[$user]=(array(
		"001" => 0,
		"002" => 0,
		"003" => 0
		)
	);
}

header('Content-Type: application/json');
echo json_encode($datos[$user]);

?>
