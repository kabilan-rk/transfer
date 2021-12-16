var jwt = null
localStorage.setItem('Filename', null)
localStorage.setItem('Status', null)

function writetoken(filename,status){
    console.log(filename,status)
    localStorage.setItem('Filename', filename)
    localStorage.setItem('Status', status)
    window.location.replace("filedetails.html");

}
function stripdate(date){
    return date.slice(5,25)
}

function appendlist(array){
    $('#forreview-td').empty();
    $('#notprocessed-td').empty();
    $('#error-td').empty();
    $('#reviewed-td').empty();

    array.forEach(element => {
        if (element.status == 4){
            $('#table1').DataTable().row.add( [
                stripdate(element.CreationTime),
                stripdate(element.LastModificationTime),
                element.filename,
                `<a href="#" onclick="writetoken('${element.id}','${element.status}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></a>`,
                
            ] ).draw();
        }
        if (element.status == 1){
            $('#table2').DataTable().row.add( [
                stripdate(element.CreationTime),
                element.filename
            ] ).draw();
            html = `<tr><th scope="row">${element.fileidentifier}</th><td>${element.CreationTime}</td><td>${element.filename}</td></tr>`;
        }
        if (element.status == 3){
            $('#table3').DataTable().row.add( [
                stripdate(element.CreationTime),
                element.filename,
                `<a href="#" onclick="writetoken('${element.id}','${element.status}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></a>`,
                
            ] ).draw();
        }
        if (element.status == 5){
            $('#table4').DataTable().row.add( [
                stripdate(element.CreationTime),
                element.filename,
                `<a href="#" onclick="writetoken('${element.id}','${element.status}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></a>`,
                
            ] ).draw();
        }
    });
}

$(document).ready(function(){
    $('.main').hide()
    $('#loader').show()
    jwt = localStorage.getItem('Token')
    // appendlist(arraylst)
    $('#table1').DataTable();
    $('#table2').DataTable();
    $('#table3').DataTable();
    $('#table4').DataTable();





    if (jwt != null){
        axios.get(`${flask_api_url}`+'/getfiles')
        .then(function(response){
            $('#loader').hide()
            $('.main').show()
            console.log(response.data)
            appendlist(response.data)
        })
        .catch(function(error){
            console.log(error)
        })
    }
    else{
        alert('login to contine')
        window.location.replace("login.html");
    }
})