<?php 
    class client extends connect {      
        use getInstance;
        private $message;
        public function __construct(private $id, public $f_name, public $email, private $address, private $phone) {
            parent::__construct(); 
        }
        
        public function postDataClient() {
            $query = 'INSERT INTO clients (id_bill, full_name, email, address, phone) VALUES (?, ?, ?, ?, ?)'; 
            try {
                $res = $this->pdocx->prepare($query); 
                $res->execute([
                    $this->id,
                    $this->f_name,
                    $this->email,
                    $this->address,
                    $this->phone
                ]);   
                $this->message = ['status' => 200+$res->rowCount(), 'message' => "Saved Data"];
            }catch(\PDOException $error) {
                $this->message = ['status' => $error->getCode(), 'message' => $res->errorInfo()[2]]; 
            }finally {
                print_r($this->message); 
            }
        }
    }

?>