export async function formPostData(formData, handler){
    let formattedFormData = JSON.parse(JSON.stringify(formData));   
    const response = await fetch(
        handler,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedFormData)
        }
    );
    return response.json();
    
}