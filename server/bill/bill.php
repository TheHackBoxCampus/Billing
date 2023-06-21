<?php
    class bill extends connect {
        use getInstance;
        private $message; 
        public function __construct(protected $N_bill) {
            parent::__construct(); 
        }

        public function postDataBill() {
            $query = 'INSERT INTO bill (N_Bill) VALUES (?)';
            try{
                $res = $this->pdocx->prepare($query); 
                $res->execute([$this->N_bill]); 
                $this->message = ['status' => 200+$res->rowCount(), 'message' => 'Data saved']; 
            }catch(\PDOException $error) {
                $this->message = ['status' => $error->getCode(), 'message' => $res->errorInfo()[2]]; 
            }finally {
                print_r($this->message); 
            }
        }

    }

?>