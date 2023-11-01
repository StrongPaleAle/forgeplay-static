<?php

$data = json_decode(file_get_contents('php://input'), true);

// check the honeypot
$honeypot = $data['nickname'];
$sanitizedHoney = filter_var($honeypot, FILTER_SANITIZE_STRING);

if ($sanitizedHoney || $sanitizedHoney != '') {

    header($_SERVER['SERVER_PROTOCOL'] . ' 405 Method Not Allowed');
    exit;
} else {
    // create an array to store errors
    $files = [ 
        'tutam' => 'tutam.txt', 
        'laser-chickens' => 'laser-chickens.txt', 
        'candy-math' => 'candy-math.txt',
        'folklory' => 'folklory.txt',
        'puzzle-game' => 'puzzle-game.txt'
    ];

    $subscriptions = array();

    // create result array
    $result = [
        'errors' => [],
        'success' => false,
        'message' => ''
    ];
    
    // sanitize the data and check for errors
    
    $email = $data['email'];
    $games = $data['games'];
    $acceptance = $data['acceptance'];
    
    $gamesArray = array();

    $sanitizedEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
    if (!$sanitizedEmail || $sanitizedEmail == '' || !filter_var($sanitizedEmail, FILTER_VALIDATE_EMAIL)) {
        $result['errors'][] = 'Inserisci una email valida';
    } else {
        // check if email is already present
        foreach ($files as $key => $file) {
            if (!file_exists($file)){
                touch($file);
            }
            $current = file_get_contents($file);

            if(strpos($current, $sanitizedEmail)) 
            {
                $subscriptions[] = $key;
            }
        }
    }
    $subsLength = count($subscriptions);

    if ($subsLength == 2) {
        $result['errors'][] = 'Ti sei già iscritto al test di due giochi in passato';
    } else {
        foreach ($games as $game) {
            $sanitizedGame = filter_var($game, FILTER_SANITIZE_STRING);
            if ($sanitizedGame || $sanitizedGame != '' || !in_array($sanitizedGame, $subscriptions)) {
                $gamesArray[] = $sanitizedGame;
            }
        }
        
        $gamesLength = count($gamesArray);

        if ($gamesLength == 0) {
            $result['errors'][] = 'Seleziona almeno un gioco';
        } else if ($subsLength == 1 && $gamesLength > 1) {
            $result['errors'][] = 'Ti sei già iscritto al test di un gioco in passato. Puoi selezionare al massimo un altro gioco';
        }
    }
    
    

    
    
    

    $sanitizedEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
    if (!$sanitizedEmail || $sanitizedEmail == '' || !filter_var($sanitizedEmail, FILTER_VALIDATE_EMAIL)) {
        $result['errors'][] = 'Inserisci una email valida';
    } 

    if (!$acceptance || $acceptance != 'true') {
        $result['errors'][] = 'Devi accettare i termini e le condizioni';
    }

    // if there are errors, return the errors
    if (count($result['errors']) > 0) {
        // return the errors
        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
        $result['message'] = 'Sono presenti errori nella form';
        echo json_encode($result);
        exit;
    } else {
        // check file existence
        
        foreach ($gamesArray as $game) {
            $file = $files[$game];
            if (!file_exists($file)){
                touch($file);
            }
            $current = file_get_contents($file);
            $current .= $sanitizedEmail . ",\n";
			file_put_contents($file, $current);
			// return success message
	        
        }

        $result['success'] = true;
        $result['message'] = 'Iscrizione effettuata con successo!';
        echo json_encode($result);
        exit;
		
        
        
    }
    
}

?>