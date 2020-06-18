$( '#feedbackForm' ).submit(function ( e ) {
    axios({
        method: 'post',
        url: 'api/feedback/create.php',
        data: {
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            description: document.getElementById('description').value
        }
    });
})