filename = localStorage.getItem('Filename')
filestatus = localStorage.getItem('Status')
classarry = []
function stripdate(date){
    return date.slice(5,17)
}
function striptime(date){
    return date.slice(17,22)
}
$(document).ready(function () {
    $('#main').hide()
    $('#loader').show()
    if (filename === null) {
        alert('FilePathNotFound')
        window.location.replace("main.html");
    }
    else {
        if (filestatus!=4){
          $('#save').hide()
        }
        filename = filename.toUpperCase()
        jwt = localStorage.getItem('Token')
        if (jwt != null) {
            axios.get(`${lambda_api_url}` + '/prod/getresult?Filename=' + `${filename}` + ".pdf", { headers: { 'Authorization': 'Bearer ' + jwt } })
                .then(function (response) {
                    console.log(response.data)
                    data = response.data
                    $('#pdf').attr('src', data['Url'])
                    axios.get(`${flask_api_url}` + '/getdetails/' + `${filename}`)
                        .then(function (response) {
                            console.log(response.data)
                            results = response.data
                            headers = results['Consignmentheaders'][0]
                            for (value in headers) {
                                $('#' + `${value}`).val(headers[value])
                            }
                            waypoints = results['ConsignmentDetails']
                            console.log(waypoints)
                            $('#waypoint').empty()
                            cnt=0
                            waypoints.forEach(waypoint => {

                                html = ''
                                // header = 
                                // html += header
                                console.log(waypoint)
                                type = ''
                                classname = "waypoints"+cnt.toString();
                                classarry.push(classname)
                                if (waypoint['DestinationType'] === 1) {
                                    type = `
                                    <div class="${classname}">
                                    <h5>Waypoint - Pickup</h5>
                                    <div class="row">
                            <div class="col">
                              <div class="form-floating mb-1">
                                <input type="text" class="form-control" id="DestinationType" placeholder="name@example.com" value="Pickup">
                                <label for="DestinationType">DestinationType</label>
                              </div>
                            </div>
                            <div class="col">
                              <div class="form-floating mb-1">
                                <input type="text" class="form-control" id="ContactName" placeholder="name@example.com" value="${waypoint['ContactName']}">
                                <label for="ContactName">ContactName</label>
                              </div>
                            </div>
                            
                          </div>`
                                }
                                else if (waypoint['DestinationType'] === 2) {
                                    type = `
                                    <div class="${classname}">
                                    <h5>Waypoint - Delivery</h5><div class="row">
                            <div class="col">
                              <div class="form-floating mb-1">
                                <input type="text" class="form-control" id="DestinationType" placeholder="name@example.com" value="Delivery">
                                <label for="DestinationType">DestinationType</label>
                              </div>
                            </div>
                            <div class="col">
                              <div class="form-floating mb-1">
                                <input type="text" class="form-control" id="ContactName" placeholder="name@example.com" value=${waypoint['ContactName']}>
                                <label for="ContactName">ContactName</label>
                              </div>
                            </div>
                            
                          </div>`
                                }
                                else if (waypoint['DestinationType'] === 3) {
                                  type = `<h5>Waypoint - Return</h5><div class="row">
                          <div class="col">
                            <div class="form-floating mb-1">
                              <input type="text" class="form-control" id="DestinationType" placeholder="name@example.com" value="Return">
                              <label for="DestinationType">DestinationType</label>
                            </div>
                          </div>
                          <div class="col">
                            <div class="form-floating mb-1">
                              <input type="text" class="form-control" id="ContactName" placeholder="name@example.com" value=${waypoint['ContactName']}>
                              <label for="ContactName">ContactName</label>
                            </div>
                          </div>
                          
                        </div>`
                              }
                                html += type
                                details = `<div class="row">
                        <div class="col">
                          <div class="form-floating mb-1">
                            <input type="text" class="form-control" id="AppointmentDate" placeholder="name@example.com" value="${stripdate(waypoint['AppointmentDate'])}">
                            <label for="AppointmentDate">AppointmentDate</label>
                          </div>
                        </div>
      
                        
                        <div class="col">
                          <div class="form-floating mb-1">
                            <input type="text" class="form-control" id="AppointmentStartTime" placeholder="name@example.com" value="${striptime(waypoint['AppointmentStartTime'])}">
                            <label for="AppointmentStartTime">AppointmentStartTime</label>
                          </div>
                        </div>
                      </div>
                      <div class="row">

                      <div class="col">
                          <div class="form-floating mb-1">
                            <input type="text" class="form-control" id="AppointmentEndTime" placeholder="name@example.com" value="${striptime(waypoint['AppointmentEndTime'])}">
                            <label for="AppointmentEndTime">AppointmentEndTime</label>
                          </div>
                        </div>
                        
      
                        <div class="col">
                          <div class="form-floating mb-1">
                            <input type="text" class="form-control" id="CompanyName" placeholder="name@example.com" value="${waypoint['CompanyName']}">
                            <label for="CompanyName">CompanyName</label>
                          </div>
                        </div>
      
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="form-floating mb-1">
                            <input type="text" class="form-control" id="CompanyAddress" placeholder="name@example.com" value="${waypoint['CompanyAddress']}">
                            <label for="CompanyAddress">CompanyAddress</label>
                          </div>
                        </div>
      
                        <div class="col">
                          <div class="form-floating mb-1">
                            <input type="text" class="form-control" id="City" placeholder="name@example.com" value="${waypoint['City']}">
                            <label for="City">City</label>
                          </div>
                        </div>
      
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="form-floating mb-1">
                            <input type="text" class="form-control" id="State" placeholder="name@example.com" value="${waypoint['State']}">
                            <label for="State">State</label>
                          </div>
                        </div>
      
                        <div class="col">
                          <div class="form-floating mb-1">
                            <input type="text" class="form-control" id="Zip" placeholder="name@example.com" value="${waypoint['Zip']}">
                            <label for="Zip">Zip</label>
                          </div>
                        </div>
      
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="form-floating mb-1">
                            <input type="text" class="form-control" id="PostBoxNo" placeholder="name@example.com" value="${waypoint['PostBoxNo']}">
                            <label for="PostBoxNo">PostBoxNo</label>
                          </div>
                        </div>
      
                        <div class="col">
                          <div class="form-floating mb-1">
                            <input type="text" class="form-control" id="ContactNo" placeholder="name@example.com" value="${waypoint['ContactNo']}">
                            <label for="ContactNo">ContactNo</label>
                          </div>
                        </div>
      
                      </div>
                      <div class="row">
                  <div class="form-group">
                    <label for="NotesInstructions" style="vertical-align: middle;">NotesInstructions</label>
                    <textarea class="form-control" id="NotesInstructions" rows="3" >${waypoint['NotesInstructions']}</textarea>
                  </div>
                </div>
                </div>
                `               
                                html += details
                                cnt+=1
                                $('#waypoint').append(html)

                            })
                            // {
                            //     waypoint = waypoints[waypoint]
                            //     
                            //     $('#waypoint').append(waypoint)
                            // }
                        })
                    $('#main').show()
                    $('#loader').hide()
                })
        }
    }

})


function save(){
  data = {
    "filename": "",
    "results": {
        "Commodity": "",
        "ContactEmail": "",
        "ContactName": "",
        "ContactNumber": "",
        "CustomerName": "",
        "FuelSurcharge": "",
        "Instructions": "",
        "LineHaulRate": "",
        "LoadConfirmation": "",
        "Miles": "",
        "OrderDate": "",
        "Quantity": "",
        "RatePerMile": "",
        "RequiredEquip": "",
        "ShipperInfo": "",
        "TrailerSize": "",
        "Weight": "",
        "waypoints": [
        ]
    }
}
  data.filename = filename+".pdf"
  console.log($('#Commodity').val())
  data.results.Commodity = $('#Commodity').val()
  data.results.ContactEmail = $('#ContactEmail').val()
  data.results.ContactName = $('#ContactName').val()
  data.results.ContactNumber = $('#ContactNo').val()
  data.results.CustomerName = $('#ContactName').val()
  data.results.FuelSurcharge = $('#FuelSurcharge').val()
  data.results.Instructions = $('#InstructionsNotesComments').val()
  data.results.LineHaulRate = $('#LineHaulRate').val()
  data.results.LoadConfirmation = $('#LoadConfirmationNo').val()
  data.results.Miles = $('#Miles').val()
  data.results.OrderDate = $('#OrderDate').val()
  data.results.OrderDate = ''
  data.results.Quantity = $('#Quantity').val()
  data.results.RatePerMile = $('#RatePerMile').val()
  data.results.RequiredEquip = $('#RequiredEquipment').val()
  data.results.ShipperInfo = $('#ShipperInfo').val()
  data.results.TrailerSize = $('#TrailerSize').val()
  data.results.Weight = $('#Weight').val()
  waypointarray = []
  console.log(classarry)
  classarry.forEach(element=>{
    console.log(element)
    addr = {
      "City": "",
      "CompanyAddress": "",
      "CompanyName": "",
      "Contact": "",
      "ContactNumber": "",
      "DestinationType": "",
      "Instructions": "",
      "MaxAppointmentDate": "",
      "MaxAppointmentTime": "",
      "MinAppointmentDate": "",
      "MinAppointmentTime": "",
      "PO": "",
      "ShipperID": "",
      "State": "",
      "Zip": ""
  }
  addr.City = $(`.${element} #City`).val();
  addr.Contact = $(`.${element} #ContactName`).val();
  addr.DestinationType = $(`.${element} #DestinationType`).val();
  addr.MaxAppointmentDate = $(`.${element} #AppointmentDate`).val();
  addr.MinAppointmentTime = $(`.${element} #AppointmentStartTime`).val();
  addr.MaxAppointmentTime = $(`.${element} #AppointmentEndTime`).val();
  addr.CompanyName = $(`.${element} #CompanyName`).val();
  addr.CompanyAddress = $(`.${element} #CompanyAddress`).val();
  addr.State = $(`.${element} #State`).val();
  addr.Zip = $(`.${element} #Zip`).val();
  addr.PO = $(`.${element} #PostBoxNo`).val();
  addr.ContactNumber = $(`.${element} #ContactNo`).val();
  addr.Instructions = $(`.${element} #NotesInstructions`).val();
  addr.MinAppointmentDate = $(`.${element} #AppointmentDate`).val();
  waypointarray.push(addr)
  })
  data.results.waypoints = waypointarray
  console.log("data",data)
  axios.post(`${flask_api_url}`+'/save', data)
  .then(function(response){
    alert('Results Updated')
    window.location.replace("main.html");

  }
  )

  
  // window.location.replace("main.html");
}