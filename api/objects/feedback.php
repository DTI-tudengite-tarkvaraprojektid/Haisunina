<?php
class Feedback{

    // database connection and table name
    private $conn;
    private $table_name = "feedback";

    // object properties
    public $id;
    public $name;
    public $email;
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
                name=:name, email=:email, description=:description";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->description=htmlspecialchars(strip_tags($this->description));

        // bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":description", $this->description);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }
}
