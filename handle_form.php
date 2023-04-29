<?php
$data = json_decode(file_get_contents('php://input'), true);

// check the honeypot
$honeypot = $data['nickname'];
$sanitizedHoney = filter_var($honeypot, FILTER_SANITIZE_STRING);
if ($sanitizedHoney) {
    header($_SERVER['SERVER_PROTOCOL'] . ' 405 Method Not Allowed');
    exit;
} else {

    $result = [
        'errors' => [],
        'success' => false,
        'message' => ''
    ];
    

    $name = $data['name'];
    $email = $data['email'];
    $object = $data['object'];
    $message = $data['message'];

    $sanitizedName = filter_var($name, FILTER_SANITIZE_STRING);
    if (!$sanitizedName) {
        $result['errors'][] = 'Please enter a valid name';
    }

    $sanitizedEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
    $sanitizedMessage = filter_var($message, FILTER_SANITIZE_STRING);

    $email_message = "Hai ricevuto un nuovo messaggio dal sito di Forgeplay" . "\n\n"
                . "Name: " . $sanitizedName . "\n\n"
                . "Phone: " . $sanitizedPhone . "\n\n"
                . "Email: " . $sanitizedEmail . "\n\n"
                . "Message:\n\n" . $sanitizedMessage;
  
    $to = 'alessio.falchi90@gmail.com';
  
    $subject = 'New message';
    
    $headers = 'From: noreply@' . $_SERVER['HTTP_HOST'] ."\r\n" .
    'Reply-To: ' . $sanitizedEmail . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
  
    $send_email = mail($to, $subject, $email_message, $headers);
  
    echo ($send_email) ? 'success' : 'error';
}


?>