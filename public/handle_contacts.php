<?php
$data = json_decode(file_get_contents('php://input'), true);

// check the honeypot
$honeypot = $data['nickname'];
$sanitizedHoney = htmlspecialchars($honeypot);

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
    $name = $data['name'];
    $email = $data['email'];
    $object = $data['object'];
    $message = $data['message'];
    $acceptance = $data['acceptance'];

    $sanitizedName = htmlspecialchars($name);
    if (!$sanitizedName || $sanitizedName == '') {
        $result['errors'][] = 'Please enter a name';
    }

    $sanitizedEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
    $sanitizedEmail = preg_replace('~[\r\n]+~', '', $sanitizedEmail);
    if (!$sanitizedEmail || $sanitizedEmail == '' || !filter_var($sanitizedEmail, FILTER_VALIDATE_EMAIL)) {
        $result['errors'][] = 'Please enter a valid email';
    }

    $sanitizedObject = htmlspecialchars($object);
    if (!$sanitizedObject || $sanitizedObject == '') {
        $result['errors'][] = 'Please enter an object';
    }

    $sanitizedMessage = htmlspecialchars($message);
    if (!$sanitizedMessage || $sanitizedMessage == '') {
        $result['errors'][] = 'Please enter a message';
    }
    if (!$acceptance || $acceptance != 'true') {
        $result['errors'][] = 'You must accept the terms and conditions';
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
  
        $to = 'alessio.falchi90@gmail.com';
        
        if (strpos($_SERVER['HTTP_HOST'], 'forgeplay.it') !== false) {
            $to = 'info@forgeplay.it';
        }
    
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