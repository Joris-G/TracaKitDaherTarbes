<?php
//require '../../vendor/autoload.php';
class Connexion {
	private $host = 'localhost:3306';
	private $login = 'root';
	private $pass = 'root';
	private $database = 'traca';
	private $db;

	private function connect()
	{
		try{
			$this->db = new PDO(
				'mysql:host='.$this->host.';dbname='.$this->database.';charset=utf8mb4', 
				$this->login, 
				$this->pass,
				array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES UTF8')
			);
			$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
		}catch (PDOException $e)
		{
			$msg = 'ERREUR PDO dans ' . $e->getFile() . ' L.' . $e->getLine() . ' : ' . $e->getMessage();
			die($msg);
		}
		return $this->db;
	}

	public function createQuery($sql, $parameters = null)
    {
        if ($parameters) {
            $result = $this->connect()->prepare($sql);
			$result->execute($parameters);
            return $result;
        }
		$result = $this->connect()->query($sql);
        return $result;
    }
}
?>