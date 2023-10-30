<?php
$data = json_decode(file_get_contents('php://input'), true);
$honeypot = $data['nickname'];
$sanitizedHoney = filter_var($honeypot, FILTER_SANITIZE_STRING);

if ($sanitizedHoney || $sanitizedHoney != '') {

    header($_SERVER['SERVER_PROTOCOL'] . ' 405 Method Not Allowed');
    exit;
} else {
    // create result array
    $result = [
        'errors' => [],
        'success' => false,
        'message' => ''
    ];
    
    // sanitize the data and check for errors
    
    $email = $data['email'];
       

    $sanitizedEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
    if (!$sanitizedEmail || $sanitizedEmail == '' || !filter_var($sanitizedEmail, FILTER_VALIDATE_EMAIL)) {

        $result['message'] = 'Please enter a valid email';
        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
        echo json_encode($result);
        exit;

    } else {
        // check file existence
        if (!file_exists("emails.txt")){
            touch("emails.txt");
        }
        $file = "emails.txt";
		$current = file_get_contents($file);
		// check if mail is present
		if(strpos($current, $email)) 
		{
			// return error message
		   $result['message'] = 'You are already subscribed!';
		   echo json_encode($result);
		   exit;
		} else {
			
			$current .= $email . ",\n";
			file_put_contents($file, $current);
			// return success message
	        $result['success'] = true;
	        $result['message'] = 'Thanks for subscribing!';
	        echo json_encode($result);
	        exit;

		}

    }
}
$data = json_decode(file_get_contents('php://input'), true);

// check the honeypot
$honeypot = $data['nickname'];
$sanitizedHoney = filter_var($honeypot, FILTER_SANITIZE_STRING);

if ($sanitizedHoney || $sanitizedHoney != '') {

    header($_SERVER['SERVER_PROTOCOL'] . ' 405 Method Not Allowed');
    exit;
} else {
    // create result array
    $result = [
        'errors' => [],
        'success' => false,
        'message' => ''
    ];
    
    // sanitize the data and check for errors
    
    $email = $data['email'];
    $games = $data['games'];
    $message = $data['acceptance'];

    $gamesArray = array();

    // $games.forEach(function(game) {
    //     $sanitizedGame = filter_var($game, FILTER_SANITIZE_STRING);
    //     if (!$sanitizedGame || $sanitizedGame == '') {
    //         $result['errors'][] = 'Please enter a game';
    //     } else {
    //         $gamesArray[] = $sanitizedGame;
    //     }
    // });

    $sanitizedEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
    if (!$sanitizedEmail || $sanitizedEmail == '' || !filter_var($sanitizedEmail, FILTER_VALIDATE_EMAIL)) {
        $result['errors'][] = 'Please enter a valid email';
    }

    $sanitizedObject = filter_var($object, FILTER_SANITIZE_STRING);
    if (!$sanitizedObject || $sanitizedObject == '') {
        $result['errors'][] = 'Please enter an object';
    }

    $sanitizedMessage = filter_var($message, FILTER_SANITIZE_STRING);
    if (!$sanitizedMessage || $sanitizedMessage == '') {
        $result['errors'][] = 'Please enter a message';
    }
    // if there are errors, return the errors
    if (count($result['errors']) > 0) {
        // return the errors
        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
        $result['message'] = 'There are errors in the form';
        echo json_encode($result);
        exit;
    } else {
        // send the email
        $email_message = "Hai ricevuto un nuovo messaggio dal sito di Forgeplay" . "\n\n"
                . "Nome: " . $sanitizedName . "\n\n"
                . "Email: " . $sanitizedEmail . "\n\n"
                . "Messaggio:\n" . $sanitizedMessage;
  
        $to = 'info@forgeplay.it';
    
        $subject = 'Nuovo messaggio Forgeplay: ' . $sanitizedObject;
        
        $headers = 'From: noreply@' . $_SERVER['HTTP_HOST'] ."\r\n" .
        'Reply-To: ' . $sanitizedEmail . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    
        $send_email = mail($to, $subject, $email_message, $headers);
        if (!$send_email) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
            $result['message'] = 'There was a problem sending your email';
            echo json_encode($result);
            exit;
        } else {
            // return success message
            $result['success'] = true;
            $result['message'] = 'Form submitted successfully';
            echo json_encode($result);
        }
        
    }
    
}

?>