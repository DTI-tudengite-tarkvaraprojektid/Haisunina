<?php
class User{

    // database connection and table name
    private $conn;
    private $table_name = "user";

    // object properties
    public $id;
    public $user_name;

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
                user_name=:user_name";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->user_name=htmlspecialchars(strip_tags($this->user_name));

        // bind values
        $stmt->bindParam(":user_name", $this->user_name);


        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }
}
