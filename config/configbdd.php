<?php

$servername = 'eductseaqfbioveg.mysql.db';
$dbname = 'eductseaqfbioveg';
$username = 'eductseaqfbioveg';
$password = 'BiovegCNB3';

//On essaie de se connecter
try{
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    //On définit le mode d'erreur de PDO sur Exception
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo 'Connexion réussie';
}

/*On capture les exceptions si une exception est lancée et on affiche
    *les informations relatives à celle-ci*/
catch(PDOException $e){
    echo "Erreur : " . $e->getMessage();
}

?>