<?php 
    trait getInstance {
        public static $instance;
        public static function getInstance(){
            $arguments = func_get_args(); 
            $arguments = array_pop($arguments);
            return (!(self::$instance instanceof self) || !empty($arg)) ? self::$instance = new static(...(array) $arguments) : self::$instance;
        }
        function __set($name, $value) {
            $this->$name = $value; 
        }
    }


    function autoload($class) {
        $Directories = [ 
            dirname(__DIR__).'server/bill/',
            dirname(__DIR__).'server/client/',
            dirname(__DIR__).'server/db/',
            dirname(__DIR__).'server/product/',
            dirname(__DIR__).'server/seller/',
        ]; 

        $classFile = str_replace('\\', '/', $class) . '.php';

        foreach($Directories as $D) {
            $file = $D.$classFile; 
            if (file_exists($file)) {
                require $file;
                break;
            }
        }
    }

    spl_autoload_register('autoload'); 