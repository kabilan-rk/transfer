var jwt_token = ''

var input = document.getElementById("password");

// input.addEventListener("keyup", function(event) {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     document.getElementById("loginbtn").click();
//   }
// });
function login(){
    $('#Error').text("")
    var username = $('#username').val()
    var password = $('#password').val()
    if (username === '' || password === ''){
        $('#Error').text("Enter username and password")
    }
    else{
        var logindata = {
            "username": username,
            "password": password
        }
      axios.post(`${flask_api_url}`+'/login',logindata
      )
      .then(function (response) {
          data = response.data
          if (data["Status"]==="Success"){
            jwt_token = data['Token']
            console.log(jwt_token)
            localStorage.setItem('Token', jwt_token)
            axios.get(`${lambda_api_url}`+'/prod/getfiles')
            .then(function(response){
              console.log(response.data)
            })
            window.location.replace("main.html");
          }
          else if(data["Status"]=="Failure"){
            $('#Error').text(data["Msg"])
          }
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });   
    }


}