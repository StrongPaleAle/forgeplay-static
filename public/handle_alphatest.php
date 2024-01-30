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
        'message' => '',
        'subscriptions' => [],
        'formgames' => []
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

            if(strpos($current, $sanitizedEmail) !== false) 
            {
                $subscriptions[] = $key;
                $result['subscriptions'][] = $key;
            }
        }
    }
    $subsLength = count($subscriptions);

    if ($subsLength >= 2) {
        $result['errors'][] = 'Ti sei già iscritto al test di due giochi in passato';
    } else {
        foreach ($games as $game) {
            $sanitizedGame = filter_var($game, FILTER_SANITIZE_STRING);


        if ($sanitizedGame && $sanitizedGame != '' && !in_array($sanitizedGame, $subscriptions) && array_key_exists($sanitizedGame, $files) ) {
                $file = $files[$game];
                if (!file_exists($file)){
                    touch($file);
                }
                $current = file_get_contents($file);
    
                if(strpos($current, $sanitizedEmail)) 
                {
                    $subscriptions[] = $key;
                    $result['subscriptions'][] = $key;
                }
                $gamesArray[] = $sanitizedGame;
                $result['formgames'][] = $sanitizedGame;
            }
        }
        
        $gamesLength = count($gamesArray);

        if ($gamesLength == 0 && $subsLength == 0) {
            $result['errors'][] = 'Seleziona almeno un gioco';
        } else if ($subsLength == 1 && $gamesLength > 1) {
            $result['errors'][] = 'Ti sei già iscritto al test di un gioco in passato. Puoi selezionare al massimo un altro gioco';
        } else if ($subsLength == 1 && $gamesLength == 0) {
            $result['errors'][] = 'Ti sei già iscritto al test di questo gioco in passato.';
        }
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
        $mail = false;
        foreach ($gamesArray as $game) {
            $file = $files[$game];
            if (!file_exists($file)){
                touch($file);
            }
            $current = file_get_contents($file);
            $current .= $sanitizedEmail . ",\n";
			file_put_contents($file, $current);
			// return success message
	        if ($game == 'tutam') {
                $tutam_template = 'mail-templates/tutam-test.html';
                sendEmail($sanitizedEmail, $tutam_template);
                $mail = true;
            } 
        }

        $result['success'] = true;
        if ($mail) {
            $result['message'] = 'Iscrizione effettuata con successo! Ti abbiamo inviato una mail con le istruzioni per accedere al test.';
        } else {
            $result['message'] = 'Iscrizione effettuata con successo!';
        }
        echo json_encode($result);
        exit;
		
        
        
    }
    
}
function sendEmail($email, $template_path) {
    $email_template = file_get_contents($template_path);
    
    if(!$email_template && file_exists($template_path)){
		$email_template = 'Email Template Error';
	} elseif(!$email_template && !file_exists($template_path)){
		$email_template = 'Email Template Not Found';
	}


    $subject = 'Benvenuto nel test di Forgeplay';

    
    $headers = array(
        'MIME-Version' => '1.0',
        'Content-type' => 'text/html; charset=utf-8',
        'From' => 'ForgePlay <noreply@' . $_SERVER['HTTP_HOST'] . '>',
        'Reply-To' => 'ForgePlay <noreply@' . $_SERVER['HTTP_HOST'] . '>',
    );

    $send_email = mail($email, $subject, $email_template, $headers);
}
?>