<?php 
    interface enviroment {
        public function __get($name); 
    }
    abstract class connect extends credentialsHome implements enviroment {
        use getInstance;
        protected $pdocx; 
        public function __construct(private $driver = "mysql") {
            try{
                $this->pdocx = new PDO($this->driver.":host=".$this->__get('host').";dbname=".$this->__get('dbname').";user=".$this->user.";password=".$this->password);
                $this->pdocx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }catch (\PDOException $e) {
                $this->pdocx = $e->getMessage();
            }
        }
    }