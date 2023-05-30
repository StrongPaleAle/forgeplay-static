<?php
$data = json_decode(file_get_contents('php://input'), true);

    // create result array
    $result = [
        'success' => false,
        'message' => ''
    ];
    
    // sanitize the data and check for errors
    
    $email = $data['email'];
    

    

    $sanitizedEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
    if (!$sanitizedEmail || $sanitizedEmail == '' || !filter_var($sanitizedEmail, FILTER_VALIDATE_EMAIL)) {
        $result['message'] = 'Please enter a valid email';
    }

    // if there are errors, return the errors
    if (count($result['errors']) > 0) {
        // return the errors
        header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
        echo json_encode($result);
        exit;
    } else {
        // send the email
        $file = "emails.txt";
		$current = file_get_contents($file);
		$current .= $email . ",\n";
		file_put_contents($file, $current);
// return success message
        $result['success'] = true;
        $result['message'] = 'Thanks for subscribing!';
        echo json_encode($result);
        exit;
    }
        

    

?>