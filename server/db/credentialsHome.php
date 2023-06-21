<?php 
    abstract class credentialsHome {
        protected $host = "localhost"; 
        private $user = "root";
        private $password = "";
        protected $dbname = "bills";
        public function __get($name) {
            return $this->$name; 
        }

    }

?>