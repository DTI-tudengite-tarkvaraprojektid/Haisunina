<?php
class Smell{

    // database connection and table name
    private $conn;
    private $table_name = "smell";

    // object properties
    public $id;
    public $description;


    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // create product
    function create(){

        // query to insert record
        $query = "INSERT INTO
                " . $this->table_name . "
            SET
                description=:description";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->description=htmlspecialchars(strip_tags($this->description));

        // bind values
        $stmt->bindParam(":description", $this->description);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }
}
