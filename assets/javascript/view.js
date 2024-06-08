
// GET EMPLOYEE ID
let url = new URLSearchParams(document.location.search);
console.log(url);
let employeeId = url.get("id") // globally assign employee id
console.log(employeeId);
// END GET EMPLOYEE ID
let mainer=document.getElementById("mainers")
mainer.style.height="auto"

// ************ view employee details id *******************


// fetch('http://localhost:3000/employees/'+employeeId)
let viewgetimag=document.getElementById("viewgetimag")
let fulldata
fetch('http://localhost:3000/employees/' + employeeId)


.then((employeedata)=>{
return employeedata.json();

})
.then((idemployeedata)=>{
    console.log(idemployeedata);
fulldata=idemployeedata;
console.log(fulldata);

    let fullName = `${idemployeedata.salutation} ${idemployeedata.firstName} ${idemployeedata.lastName}`;
 
//  console.log(fullName);


// viewgetimag.src="http://localhost:3000/employees/"+  employeeId + "/avatar";

document.getElementById("Name").innerHTML=fullName
document.getElementById("Email").innerHTML=idemployeedata.email
document.getElementById("Gender").innerHTML=idemployeedata.gender
document.getElementById("Age").innerHTML=Agecalculate(idemployeedata.dob)
document.getElementById("Dob").innerHTML=idemployeedata.dob
document.getElementById("Number").innerHTML=idemployeedata.phone
document.getElementById("qualification").innerHTML=idemployeedata.qualifications
document.getElementById("Address").innerHTML=idemployeedata.address
document.getElementById("Username").innerHTML=idemployeedata.username
document.getElementById("viewgetimag")
viewgetimag.src=`/uploads/${idemployeedata.avatar}`;



}) 
let overlay=document.getElementById("overlay")
let editforms=document.getElementById("EmployeeForm")
let editbtns=document.getElementById("editbtns")
let detailform=document.getElementById("viewdetailform")
editbtns.addEventListener("click",function(e){
    e.preventDefault();
    let editforms=document.getElementById("EmployeeForm")
    editforms.style.display="block"
    overlay.style.display="block"
    detailform.style.display="none"

})
let editEmployeeFormClose=document.getElementById("editEmployeeFormClose")

editEmployeeFormClose.addEventListener("click",function(e){
    e.preventDefault();
    editforms.style.display="none"
    overlay.style.display="none"
})
let addEmployeeFormCancel=document.getElementById("addEmployeeFormCancel")
addEmployeeFormCancel.addEventListener("click",function(e){
    e.preventDefault();
    editforms.style.display="none"
    overlay.style.display="none"
}) 

// / CALCULATING EMPLOYEE AGE

function Agecalculate (birthDate) {
  let dob = birthDate.split('-');
  console.log(birthDate);
  console.log(dob);


//   ["12","09"]

  let dateofbirth = [];
  for (let j = 0; j < 3; j++) {
    dateofbirth.push(Number(dob[j]));
  }
//   [12 , 9 ,]

  const currentDate = new Date();

  let age = currentDate.getFullYear() - dateofbirth[2];

  const hasBirthdayOccurred = currentDate.getMonth() < dateofbirth[1] ||(currentDate.getMonth() === dateofbirth[1] && currentDate.getDate() < dateofbirth[0]);

  if (hasBirthdayOccurred) {
    age--;
  }

  return age;
}

// ******************* edit employeee**********************


// .then ((fulldatas)=>{
    function detailsfull(){
    document.getElementById("salutation").value=fulldata.salutation
    document.getElementById("firstname").value=fulldata.firstName
    document.getElementById("lastname").value=fulldata.lastName
    document.getElementById("username").value=fulldata.username
    document.getElementById("password").value=fulldata. password
    document.getElementById("emailaddress").value=fulldata.email
    document.getElementById("number").value=fulldata.phone
    document.getElementById("Birth").value=dob(fulldata.dob)
    document.getElementById("qualifications").value=fulldata.qualifications
    document.getElementById("address").value=fulldata.address
    document.getElementById("country").value=fulldata.country
    document.getElementById("state").value=fulldata.state
    document.getElementById("city").value=fulldata.city
      document.getElementById("pin").value=fulldata.pin
    fulldata.gender==="male"?document.getElementById("male").checked=true:document.getElementById("female").checked=true;
    // getimge.src="http://localhost:3000/employees/"+  employeeId + "/avatar";
    getimge.src=`/uploads/${fulldata .avatar}`;


    }
  


    function dob(birthdate){
    
        let data= birthdate.split('-').reverse().join('-');
        console.log(data)
        return data
        }

 document.getElementById("editbtns").addEventListener("click", detailsfull);
 let deleteform=document.getElementById("deleteform")
let DELETEEMPLOYEEbtns=document.getElementById("DELETEEMPLOYEEbtns")
DELETEEMPLOYEEbtns.addEventListener("click",function(){
    deleteform.style.display="block"
    overlay.style.display="block"
    detailform.style.display="none"



})
// function update(){

//     fetch('http://localhost:3000/employees/'+employeeId,{
//         method:"PUT",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify(formdata()),

//     })
//     // e.preventDefault()

// }


// function update(){
//     if(profileimg){
//         uplodavatar( employeeId, profileimg)
//     }
//     fetch('http://localhost:3000/employees/'+ employeeId,{
//         method:"PUT",
//         headers:{
// "Content-Type":"application/json"
//         },
//         body:JSON.stringify(formdata()),
      
//     })
// //    e.preventDefault()
// }
// *****************imageuplodingfunction**********
function uplodavatar(id,image){
    let avatardata=new FormData()
    avatardata.append("avatar",image)
    try{
        const res=  fetch('http://localhost:3000/employees/'+id+"/avatar",{
        method:"POST",
        body:avatardata

    })
    }
    catch(error){
        console.log(error);
    }

} 

let emp;

function update() {
    if (profileimg) {
        uplodavatar(employeeId, profileimg);
        // imagechange();
    }

    fetch('http://localhost:3000/employees/' + employeeId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formdata()),
    })
    .then((response) => {
        if (response.ok) {
            response.json().then((updatedEmployee) => {
                emp = updatedEmployee.id;
                console.log(emp);
                editsuccessfully(emp)
                // window.location.href = "http://localhost:3000/view/?id=" + emp; // Corrected redirection URL

                // Close the form and overlay
                EmployeeForm.style.display = "none";
                overlay.style.display = "none";

                // Show success message
                // editsuccessfully();
            });
        } else {
            console.error('Failed to update employee.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function formdata(){
    //   e.preventDefault();
    let salutation=document.getElementById("salutation")
    let firstname=document.getElementById("firstname")
    let lastname=document.getElementById("lastname")
    let username=document.getElementById("username")
    let password=document.getElementById("password")
    let emailaddress=document.getElementById("emailaddress")
    let number=document.getElementById("number")
    let Birth=document.getElementById("Birth")

    let qualifications=document.getElementById("qualifications")
    let address=document.getElementById("address")
    let country=document.getElementById("country")
    let state=document.getElementById("state")
    let city=document.getElementById("city")
    let pin=document.getElementById("pin")

let user=
{
    

    salutation:salutation.value,
    firstName:firstname.value ,
    lastName:lastname.value,
    email:emailaddress.value ,
    phone:number.value ,
    dob:dob(Birth.value) ,
    gender: gender(),
    qualifications:qualifications.value,
    address:address.value,
    city:city.value ,
    state:state.value ,
    country:country.value,
    username:username.value,
    password:password.value
   
}
return user


    function gender(){
        let male=document.getElementById("male")
        let female=document.getElementById("female")
        if(male.checked==true){
        return male.value
        }else if(female.checked==true){
    return female.value
    }

}
}

function dob(birthdate){
    // let Birth=document.getElementById("Birth").value

    let data= birthdate.split('-').reverse().join('-');
    console.log(data)
    return data
    }

// // / **********delete method*************
let DELETEEMPLOYEES=document.getElementById("DELETEEMPLOYEEbtn")
DELETEEMPLOYEES.addEventListener("click",function(){

  // let mainer=document.getElementById("mainer")

    deleteform.style.display= 'block'
    overlay.style.display="block"
   
   

// **********delete method*************
            fetch('http://localhost:3000/employees/'+ employeeId,{
                method:"DELETE",
            })
    .then((Response)=>{
        console.log(Response.value);
        if(Response.ok){

            // deletesuccessfully()  
            deleteform.style.display= 'none'

           
        }
    })
    
   

    
    })



  

// function main(){
//  window.location.href="main.html?"
// }


let   employeedetails=document.getElementById("employeedetails")

function closeup(){
    employeedetails.style.display="none"
    overlay.style.display="none"
    overlay.style.display="none"
    detailform.style.display="block"

}

// ************photoupload*******
let Adduploading=document.getElementById("upload")
let imageFile=document.getElementById("uploading")
let inputfile=document.getElementById("inputfile")
let getimge=document.getElementById("getimg")
let profileimg;


imageFile.addEventListener('change',function(){
    profileimg=imageFile.files[0]
    console.log(profileimg);
    getimge.src=URL.createObjectURL(profileimg);
})
// let viewgetimage=document.getElementById("viewgetimage")


// *****************imageuplodingfunction PUT**********
// function update(){
//     if(profileimg){
//         uplodavatar(employeeId, profileimg)
//     }
//     fetch('http://localhost:3000/employees/'+employeeId,{
//         method:"PUT",
//         headers:{
// "Content-Type":"application/json"
//         },
//         body:JSON.stringify(formdata()),
      
//     })
//     editsuccessfully()
//     window.location.href="http://localhost:3000/view/?id=employeeId"

   
// }
let editpopups=document.getElementById("editpopups")

function editsuccessfully(emp) {
    // Display the success popup
    let editpopups = document.getElementById("editpopups");
    editpopups.style.display = "block";

    // Hide the popup and redirect after 2 seconds
    setTimeout(function() {
        editpopups.style.display = "none";
        EmployeeForm.style.display = "none";
        // Redirect to the view page with the updated employee ID
        window.location.href = "http://localhost:3000/view/?id=" + emp;
    }, 2000);
}



// *****************imageuplodingfunction POST**********
function uplodavatar(id,image){
    let avatardata=new FormData()
    avatardata.append("avatar",image)
    try{
        fetch('http://localhost:3000/employees/'+id+"/avatar",{
        method:"POST",
        body:avatardata
    })
    }
    catch(error){
        console.log(error);
    }


} 



// *************validation*******************


let FirstNameError=document.getElementById("FirstNameError")
let LastNameError=document.getElementById("LastNameError")
let UsernameError=document.getElementById("UsernameError")
let PasswordError=document.getElementById("PasswordError")
let emailError=document.getElementById("emailError")
let NumberError=document.getElementById("NumberError")
let BirthError=document.getElementById("BirthError")
let QualificationError=document.getElementById("QualificationError")
let AddressError=document.getElementById("AddressError")
let CityError=document.getElementById("CityError")
let PinZipError=document.getElementById("Pin/ZipError")
let GenderError=document.getElementById("GenderError")
let SalutationError=document.getElementById("SalutationError")
let CountryError=document.getElementById("CountryError")
let StateError=document.getElementById("StateError")


function validateSalutation(){
    let salutation=document.getElementById("salutation").value
    if (salutation==""){
 
        document.getElementById("salutation").style.borderColor = "red";
        SalutationError.innerHTML="Salutation is required "
        // salutation.ClassList.add(active)
        console.log(SalutationError);
        return false;
       
    }else{
        SalutationError.innerHTML=""
    }
    SalutationError.innerHTML=" "
    document.getElementById("salutation").style.borderColor = "unset";
    // return true;
}
function validateCountry(){
    let country=document.getElementById("country").value
    console.log(country);
    if (country==""){
        CountryError.innerHTML="Country is required "
        document.getElementById("country").style.borderColor = "red";
        console.log(SalutationError);
        return false;
    
    }
    CountryError.innerHTML=" "
    document.getElementById("country").style.borderColor = "unset";
    // return true;
}
function validateState(){
    let state=document.getElementById("state").value
    console.log(state);
    if (state==""){
        StateError.innerHTML="State is required "
        document.getElementById("state").style.borderColor = "red";
        console.log(SalutationError);
        return false;
    
    }
    StateError.innerHTML=" "
    document.getElementById("state").style.borderColor = "unset";
    
    // return true;

}


function validateFirstName(){
    let firstname=document.getElementById("firstname").value
    if (firstname.length==0){
        document.getElementById("firstname").style.borderColor = "red"; 

      FirstNameError.innerHTML="FirstName is required "
        return false;

    }
    FirstNameError.innerHTML=""
    document.getElementById("firstname").style.borderColor = "unset";


    // return true;


}

function validateLastName(){
    let lastname=document.getElementById("lastname").value
    if (lastname.length==0){
        LastNameError.innerHTML="LastName is required "
        document.getElementById("lastname").style.borderColor = "red";
        return false;
        

    }
    LastNameError.innerHTML=""
    // return true;

    document.getElementById("lastname").style.borderColor = "unset";
}
function validatePassword(){
    // let password=document.getElementById("password").value
    let password=document.getElementById("password").value
    
    if(password.length==0){
        PasswordError.innerHTML="password is required" 
        document.getElementById("password").style.borderColor = "red";
        return false;
    }

    if(password.length<=6){
        console.log(password.length)
        PasswordError.innerHTML="password atleast 6 charactor" 
        document.getElementById("password").style.borderColor = "red";
        return false;
    }
    
    PasswordError.innerHTML=" "
    document.getElementById("password").style.borderColor = "unset";
    // return true;
}
function validateEmail(){
    let emailaddress=document.getElementById("emailaddress").value
     let email= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     if(emailaddress.length==0){ 
        emailError.innerHTML="Email is required" 
        document.getElementById("emailaddress").style.borderColor = "red";
    
        return false;
    }

    if(emailaddress.match(email)){
       
        emailError.innerHTML="" 
        document.getElementById("emailaddress").style.borderColor = "unset";
        return false;
    }

    document.getElementById("emailaddress").style.borderColor = "red";
    emailError.innerHTML=" Invalid email address! " 
    // return true;
}
function validateBirth(){
    let Birth= document.getElementById("Birth").value

    if(Birth.length==0){
        BirthError.innerHTML="Date of Birth is required" 
        document.getElementById("Birth").style.borderColor = "red";
        return false;
    }
    BirthError.innerHTML=""
    document.getElementById("Birth").style.borderColor = "unset";
    // return true;
}
function validateQualification(){
       
    let qualification=document.getElementById("qualification").value
   

    if(qualification.length==0){ 

        QualificationError.innerHTML="qualification is required"
        // QualificationError.style.borderColor=" 1px solid red"
        document.getElementById("qualification").style.borderColor = "red";
        return false;
    }
     QualificationError.innerHTML=" " 
     document.getElementById("qualification").style.borderColor = "unset";
    // return true;
}
function validateNumber(){
    let number=document.getElementById("number").value
    
    if(number.length==0){ 
        NumberError.innerHTML=" Phone is required" 
        document.getElementById("number").style.borderColor = "red";
    
        return false;
    }
     
    if(number.length>10||number.length<10){ 
        NumberError.innerHTML="Invalid phone number format" 
        document.getElementById("number").style.borderColor = "red";
    
        return false;
    }
      
    NumberError.innerHTML=" "
    document.getElementById("number").style.borderColor = "unset";


}
function validateAddress(){
    let address=document.getElementById("address").value

  
    if(address.length==0){ 
        AddressError.innerHTML=" Address is required" 
        document.getElementById("address").style.borderColor = "red";
        return false;

    }
    AddressError.innerHTML=" "
    document.getElementById("address").style.borderColor = "unset";
    // return true;

}
function validateCity(){
    let city=document.getElementById("city").value
    if(city.length==0){ 
        CityError.innerHTML="City is required" 
        document.getElementById("city").style.borderColor = "red";
        return false;

    }
    CityError.innerHTML=" "
    // return true;
    document.getElementById("city").style.borderColor = "unset";
}
function validateGender(){
    let male =document.getElementById("male")
    let female =document.getElementById("female")
console.log(male);
    if(male.checked==false && female.checked==false ){ 
    GenderError.innerHTML="Gender is required" 
    
    return false;

}
    GenderError.innerHTML="" 

    return true;

// }

}
function validateUsername(){
    let username=document.getElementById("username").value
    if(username.length==0){
        UsernameError.innerHTML="Username is requred "
        document.getElementById("username").style.borderColor = "red";
        return false  
    }
    UsernameError.innerHTML=" "
    document.getElementById("username").style.borderColor = "unset";
    // return true
}
function validateform(){
    if((!validateCity())&&(! validateFirstName())&&(!validateState())&&(!validatepin())&&(!validateCountry())&&(!validateAddress())&&(!validateQualification())&&(!validateGender())&&(!validateBirth())&&(!validateNumber())&&(!validateEmail())&&(!validatePassword())&&(!validateUsername())&&( !validateLastName())&&(! validateSalutation())){
    return false
    }
    if( ( !validateSalutation())&&( !validateFirstName())&&(!validateUsername())&&(!validatePassword())&&(!validateEmail())&&!validateNumber()&&(!validateBirth())&&(!validateQualification())&&(!validateAddress())&&(!validateCountry())&&(!validateState())&&(!validateCity())&&(validateGender())&&(!validateLastName())&&(!validatepin()))
        return false;
       
}
// search working
// let editpopups=document.getElementById("editpopups")

let heading=document.getElementById("heading")
  function Addsuccessfully(){
    let editpopup=document.getElementById("popup")
    editpopup.style.display="block"
    EmployeeForm.style.display="none"
  heading.innerHTML="Add Employee Succesfully!!"
  }
  function deletesuccessfully(){
    let editpopup=document.getElementById("popup")
    editpopup.style.display="block"
    heading.innerHTML="Employee Deleted  Succesfully!!"
    deleteform.style.display="none"
}
function imagechange(){
    let editpopup=document.getElementById("popup")
    editpopup.style.display="block"
    heading.innerHTML="Image updated  Succesfully!!"
    EmployeeForm.style.display="none"
}
function closeup(){
    // EmployeeForm.style.display="none"
    overlay.style.display="none"
    overlay.style.display="none"
   deleteform.style.display="none"
   editpopups.style.display="none"
   detailform.style.display="block"


//    refresh()

//    deletesuccessfully()
}
 let deleteformcancel=document.getElementById("deleteformcancel")
 deleteformcancel.addEventListener("click",function(){
    detailform.style.display="block"
 })



let DELETEEMP=document.getElementById("DELETEEMPLOYEEbtns")
DELETEEMP.addEventListener("click",function(){
    let mainer=document.getElementById("mainers")
mainer.style.height="76%"

})
let edit=document.getElementById("editbtns")
edit.addEventListener("click",function(){
    let mainer=document.getElementById("mainers")
    mainer.style.height="76%"
    
    })


    // let deleteform=document.getElementById("deleteform")
    let DELETEEMPLOYEEbtn=document.getElementById("DELETEEMPLOYEEbtn")
    function deleteemployee(deleteid){
    
        deleteform.style.display= 'block'
        overlay.style.display="block"
      
        DELETEEMPLOYEEbtn.addEventListener("click",function(){
    // **********delete method*************
                fetch('http://localhost:3000/employees/'+deleteid,{
                    method:"DELETE",
                })
                deletesuccessfully()
            })
    
    //      fetch('http://localhost:3000/employees'). then((data)=>{
    //     return data.json();//convert to an object
    // }).then((objectData)=>{
    //     pagination(objectData.reverse())
    // })
        
    
        
       
    }
    let employees=document.getElementById("employees")
employees.addEventListener("click",function(){
    window.location.href="java.html?"

})


let Dashboard=document.getElementById("Dashboard")
Dashboard.addEventListener("click",function(){
    window.location.href="java.html?"

})