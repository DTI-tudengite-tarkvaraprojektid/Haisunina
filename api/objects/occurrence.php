<?php
class Occurrence{

    // database connection and table name
    private $conn;
    private $table_name = "occurrence";

    // object properties
    public $id;
    public $strength;
    public $location;
    public $time;
    public $date;
    public $description;
    public $user_id;
    public $smellType_id;


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
                strength=:strength, location=:location, time=:time, date=:date, user_id=:user_id, smellType_id=:smellType_id, description=:description";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->strength=htmlspecialchars(strip_tags($this->strength));
        $this->location=htmlspecialchars(strip_tags($this->location));
        $this->time=htmlspecialchars(strip_tags($this->time));
        $this->date=htmlspecialchars(strip_tags($this->date));
        $this->description=htmlspecialchars(strip_tags($this->description));
        $this->user_id=htmlspecialchars(strip_tags($this->user_id));
        $this->smellType_id=htmlspecialchars(strip_tags($this->smellType_id));


        // bind values
        $stmt->bindParam(":strength", $this->strength);
        $stmt->bindParam(":location", $this->location);
        $stmt->bindParam(":time", $this->time);
        $stmt->bindParam(":date", $this->date);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":smellType_id", $this->smellType_id);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }

    function read(){

        // select all query
        $query = "SELECT
                    p.strength, p.location, p.time, p.date, p.description, c.type
                FROM 
                     " . $this->table_name . " p
                LEFT JOIN
                    smellType c
                        ON p.smellType_id = c.id
            ORDER BY
                p.id ASC";
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

}




