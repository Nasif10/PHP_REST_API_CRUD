<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT');

$servername = "localhost";
$username = "root";
$password = "";
$db = "ecrud";

$conn = new mysqli($servername, $username, $password, $db) or die("Connection Failed");

$response = array();
$action = '';

if(isset($_GET['action'])){
    $action = $_GET['action'];
} 

if($action == 'read'){
    $sql = "SELECT * FROM employee";
    $result = $conn->query($sql);
    $response = $result -> fetch_all(MYSQLI_ASSOC);
}
elseif ($action == 'detail'){
    $data = json_decode(file_get_contents("php://input"), true);
    $eid = $data['eid'];
    $sql = "SELECT * FROM employee where id = {$eid}";
    $result = $conn->query($sql);
    $response = $result->fetch_all(MYSQLI_ASSOC);
}
elseif ($action == 'create'){
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data['name'];
    $phone = $data['phone'];
    $address = $data['address'];
    $department = $data['department'];
    $sql = "INSERT INTO employee(name, phone, address, department) VALUES ('{$name}', '{$phone}', '{$address}', '{$department}')";
    $result = $conn->query($sql);
    $response = array($result);
}
elseif ($action == 'update'){
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $name = $data['name'];
    $phone = $data['phone'];
    $address = $data['address'];
    $department = $data['department'];
    $sql = "UPDATE employee SET name = '{$name}',  phone = '{$phone}', address = '{$address}', department = '{$department}' where id = {$id}";
    $result = $conn->query($sql);
    $response = array($result);
}
elseif ($action == 'delete'){
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['eid'];
    $sql = "delete from employee where id = {$id}";
    $result = $conn->query($sql);
    $response = array($result);
}
elseif ($action == 'search'){
    $data = json_decode(file_get_contents("php://input"), true);
    $search = $data['src'];
    $sql = "SELECT * FROM employee where name like '%{$search}%'";
    $result = $conn->query($sql);
    $response = $result->fetch_all(MYSQLI_ASSOC);
}
elseif ($action == 'query'){
    $data = json_decode(file_get_contents("php://input"), true);
    $result = $conn->query("{$data['sql']}");
    $response = $result->fetch_all(MYSQLI_ASSOC);
}


$conn->close();
echo json_encode($response);
?>