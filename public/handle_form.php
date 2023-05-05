<?php
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
    $name = $data['name'];
    $email = $data['email'];
    $object = $data['object'];
    $message = $data['message'];

    $sanitizedName = filter_var($name, FILTER_SANITIZE_STRING);
    if (!$sanitizedName || $sanitizedName == '') {
        $result['errors'][] = 'Please enter a name';
    }

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