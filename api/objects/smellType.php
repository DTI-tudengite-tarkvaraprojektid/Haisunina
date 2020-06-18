<?php
class SmellType{

    // database connection and table name
    private $conn;
    private $table_name = "smellType";

    // object properties
    public $id;
    public $type;


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
                type=:type";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->type=htmlspecialchars(strip_tags($this->type));

        // bind values
        $stmt->bindParam(":type", $this->type);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }

    function read(){

        // select all query
        $query = "SELECT
                    id, type
                FROM 
                     " . $this->table_name;

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

}
