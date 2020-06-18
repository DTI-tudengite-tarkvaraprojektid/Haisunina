<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/smellType.php';


// instantiate database and category object
$database = new Database();
$db = $database->getConnection();

// initialize object
$smellType = new SmellType($db);

// query categorys
$stmt = $smellType->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // products array
    $smellTypes_arr=array();
    $smellTypes_arr["records"]=array();

    // retrieve our table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        extract($row);

        $smellType_item=array(
            "id" => $id,
            "type" => $type
        );

        array_push($smellTypes_arr["records"], $smellType_item);
    }

    // set response code - 200 OK
    http_response_code(200);

    // show categories data in json format
    echo json_encode($smellTypes_arr);
}

else{

    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no categories found
    echo json_encode(
        array("message" => "No types found.")
    );
}