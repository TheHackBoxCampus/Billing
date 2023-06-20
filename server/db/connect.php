<?php 
    interface enviroment {
        public function __get($name); 
    }

    abstract class connect extends credentials implements enviroment {
        use getInstance;
        protected $pdocx; 
        public function __construct(private $driver = "mysql",  private $port = 3306) {
            try{
                $this->pdocx = new PDO($this->driver.":host=".$this->__get('host').";port=".$this->port.";dbname=".$this->__get('dbname').";user=".$this->user.";password=".$this->password);
                $this->pdocx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }catch (\PDOException $e) {
                $this->pdocx = $e->getMessage();
            }
        }
    }