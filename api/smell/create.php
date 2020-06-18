<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../config/database.php';

// instantiate product object

include_once '../objects/occurrence.php';


$database = new Database();
$db = $database->getConnection();

$occurrence = new Occurrence($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if (
    !empty($data->strength) &&
    !empty($data->location) &&
    !empty($data->date) &&
    !empty($data->time) &&
    !empty($data->smellType_id)
) {

    // set product property values
    $occurrence->strength = $data->strength;
    $occurrence->location = $data->location;
    $occurrence->time = $data->time;
    $occurrence->date = $data->date;
    $occurrence->description = $data->description;
    $occurrence->user_id = $data->user_id;
    $occurrence->smellType_id = $data->smellType_id;


    // create the product
    if ($occurrence->create()) {

        // set response code - 201 created
        http_response_code(201);

        // tell the user
        echo json_encode(array("message" => "Smell was created."));
    } // if unable to create the product, tell the user
    else {

        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        echo json_encode(array("message" => "Unable to create smell."));
    }

} else {

    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Unable to create smell. Data is incomplete."));
}
