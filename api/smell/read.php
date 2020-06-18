<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/occurrence.php';


// instantiate database and category object
$database = new Database();
$db = $database->getConnection();

// initialize object
$occurrence = new Occurrence($db);


// query categorys
$stmt = $occurrence->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // products array
    $occurrence_arr=array();
    $occurrences_arr["records"]=array();

    // retrieve our table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        extract($row);

        $occurrence_item=array(
//            "id" => $id,
            "strength" => $strength,
            "location" => $location,
            "time" => $time,
            "date" => $date,
            "description" => $description,
            "type" => $type,
//            "user" => $user,


        );

        array_push($occurrences_arr["records"], $occurrence_item);
    }

    // set response code - 200 OK
    http_response_code(200);

    // show categories data in json format
    echo json_encode($occurrences_arr);
}

else{

    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no categories found
    echo json_encode(
        array("message" => "No occurrences found.")
    );
}