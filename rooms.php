<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');
$pdo = new PDO('mysql:host=localhost;dbname=ag_chat', 'root', 'koodinh');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = file_get_contents('php://input');
    $data = json_decode($data, true);
    //chèn dữ liệu vào bảng tin nhắn
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    try {

        $stm = $pdo->prepare('INSERT INTO msgs(content,username,created_date) VALUES (?,?,?)');
        $stm->execute(array($data['content'], $data['username'], time()));
        //code...
    } catch (\Throwable $th) {
        //throw $th;
        echo $th->getMessage();
    }
    echo json_encode(array('content' => $data['content'], 'username' => $data));
}


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $lastTime = $_GET['lastTime'];
    if ($lastTime == null || $lastTime == '') {
        $result = $pdo->query('SELECT * FROM msgs ORDER BY created_date DESC LIMIT 0,5');
    } else {
        $result = $pdo->query('SELECT * FROM msgs WHERE created_date > ' . $lastTime . ' ORDER BY created_date DESC');
    }
    $data = array();
    foreach ($result as $r) {
        $data[] = $r;
    }
    echo json_encode($data);
}