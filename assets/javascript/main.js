
let tablebody=document.getElementById("table_body")

let TableDatas;
let start;
let employeelist=document.getElementById("employeelist")
// console.log(employeelist.value);
fetch('http://localhost:3000/employees')

.then((data)=>{
    console.log(data)
    return data.json();//convert to an object
})

.then((objectData)=>{

    employeelist.addEventListener("change",function(){
        // imagechange()
    pagination(objectData)
    
   
 
    })
    display(objectData)
    
})
 
function  display(employees){
   
    let tableData="";
     
    employees.map((value,index)=>{
        tableData+=`
        <tr>
        <th scope="row">#${zero(start+1)}${start+1}</th>
        <td><img src="http://localhost:3000/employees/${value.id}/avatar" class="rounded-circle me-2"height=30 width=30>
        ${value.salutation} ${value.firstName} ${value.lastName} </td>
        <td>${value.email} </td>
        <td>${value.phone}</td>
        <td>${value.gender}</td>
        <td>${value.dob}</td>
        <td>${value.country}</td>
        <td>
        <span  class="dots">

        <button onclick="optionbox(this.nextElementSibling)" class="dots-button "> <i class="fa-solid fa-ellipsis"></i></button>
          <div  id="subbox${index}" class="subdots" >
          <a href="details.html?id=${value.id}" target="_blank" > <i class="material-symbols-outlined">
          visibility
          </i><p>View Details</p></a>
              <button onclick="editemployee('${value.id}'),modaal(),reload()" id="editemployeebtn"><i class="fa-solid fa-pen"></i>
                  
                  <p>Edit </p></button>
              <button onclick="deleteemployee('${value.id}'),modaal()" id="deleteemployeebtn"><i class="material-symbols-outlined">
                  delete
                  </i><p>Delete </p></button>
          </div>
       
      </span>

</td>
    </tr>`

    start++;
    });
        document.getElementById("table_body").innerHTML=tableData;
    
}
function zero(slno){
    if(slno<=9){
        return 0
    }
    else {
        return " "

    }
}

let modal=document.getElementById("modal")
let optionbox = (action)=>{
            if (action.style.display === "none" || action.style.display === ""){
            action .style.display = "block";
         modal.style.display="block"
            }
            else {
                modaal()
                action.style.display = "none";

              }

return false
    }
    
function modaal(){
    console.log('overlay clicked');
    modal.style.display="none"
    for(let i=0;i<employeelist.value;i++){
          let subbox=document.getElementById("subbox"+i)
        if(subbox.style.display=="block"){
            subbox.style.display="none"
        }
    }
 }


// ***********addemployeeformopen************
let EmployeeForm=document.getElementById("EmployeeForm")
let Addemployee=document.getElementById("Addemployee")
let updatedbtn=document.getElementById("updatedbtn")
let overlay=document.getElementById("overlay")


   function addemployeeopn(){
    let addemployeeform=document.getElementById("addemployeeform")
    EmployeeForm.style.display="block"
    Addemployee.style.display="block"
    editEmployeeForm.style.display="none"
    updatedbtn.style.display="none"
     overlay.style.display="block"
     addemployeeform.style.display="block"
     refresh()
   }
// //   ****** close time form*****
   function closeup(){
    EmployeeForm.style.display="none"
    overlay.style.display="none"
    overlay.style.display="none"
   deleteform.style.display="none"
   editpopup.style.display="none"
   refresh()
   reload()
//    deletesuccessfully()

}
// // global declaration
let salutation=document.getElementById("salutation")
let firstname=document.getElementById("firstname")
let lastname=document.getElementById("lastname")
let username=document.getElementById("username")
let password=document.getElementById("password")
let emailaddress=document.getElementById("emailaddress")
let number=document.getElementById("number")
let Birth= document.getElementById("Birth")
let qualification=document.getElementById("qualification")
let address=document.getElementById("address")
let country=document.getElementById("country")
let state=document.getElementById("state")
let city=document.getElementById("city")
let pin=document.getElementById("pin")
// let Gender=document.getElementById("Gender")
let male =document.getElementById("male")
let female =document.getElementById("female")

function formdata(){

let user=
{
    salutation:salutation.value,
    firstName:firstname.value ,
    lastName:lastname.value,
    email:emailaddress.value ,
    phone:number.value ,
    dob:dob(Birth.value) ,
    gender: gender(),
    qualifications:qualification.value,
    address:address.value,
    city:city.value ,
    state:state.value ,
    country:country.value,
    username:username.value,
    password:password.value

}
console.log(user)
return user

    function gender(){
        if(male.checked){
        return male.value
        }
        if(female.checked) {
    return female.value
    }
}

}



// ******************search*******************************
function search() {
    start=0
    let newarray = [];
    let searchvalue = document.getElementById("search").value.toLowerCase();
    for (let i = 0; i < TableDatas.length; i++) {
        let firstname = TableDatas[i].firstName.toLowerCase();
        let emailaddress = TableDatas[i].email.toLowerCase();
        let lastname = TableDatas[i].lastName.toLowerCase();
        let number = TableDatas[i].phone.toString();

        // Corrected the condition to properly check if the filter exists in the strings
        if (firstname.includes(searchvalue) || 
            emailaddress.includes(searchvalue) || 
            lastname.includes(searchvalue) || 
            number.includes(searchvalue)) {
            newarray.push(TableDatas[i]);
        }
    }
    if(TableDatas.length==6){
        
    

        
    }
    display(newarray);
    // searching()
  
}
// ******************search*******************************




function addemployee(){


let user=
{
    salutation:salutation.value,
    firstName:firstname.value ,
    lastName:lastname.value,
    email:emailaddress.value ,
    phone:number.value ,
    dob:dob(Birth.value) ,
    gender: gender(),
    qualifications:qualification.value,
    address:address.value,
    city:city.value ,
    state:state.value ,
    country:country.value,
    username:username.value,
    password:password.value

}
// console.log(user)
    
 fetch ("http://localhost:3000/employees",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(formdata())

})

 .then((Response)=>{
    console.log(Response.value);
    if(Response.ok){
        Addsuccessfully()  
    // window.location.href="main.html?"
    }
           
    uplodavatar(Response.id,profileimg)
 
})


validateform()

}




function dob(birthdate){
    let data= birthdate.split('-').reverse().join('-');
    // console.log(data)
    return data
    } 
    function gender(){
        let male=document.getElementById("male")
        let female=document.getElementById("female")
        if(male.checked){
        return male.value
        }else {
    return female.value
    }
}





    
    


// // ***************pagination*******************
// defultemployees
fetch('http://localhost:3000/employees'). then((data)=>{
    return data.json();//convert to an object
}).then((objectData)=>{
    pagination(objectData)
})

//
let end

function pagination(employees){
    let paginationbtn=document.getElementById("paginationbtn")

     start=0;
    end=start+(employeelist.value)
    let employeearray=[];
    let totalpage=Math.ceil(employees.length/employeelist.value)
    // btn creation
    // console.log(employees.length)

    paginationbtn.innerHTML=""
    for(i=1;i<=totalpage;i++){  
    let newbutton= document.createElement("button")
        // console.log(i);
    newbutton.textContent=i;
    newbutton.id="pages"+i;
    if(document.getElementById("pages1")){
document.getElementById("pages1").classList.add("active")
    }
    newbutton.onclick=function(){
        Activepage(newbutton)
        // console.log("hi");
        employeeperpage(newbutton.textContent)
        // console.log(employeeperpage);
    }
 function Activepage(activebtn){
    
    for(let i=1;i<=totalpage;i++){
        let pagenumber=document.getElementById("pages"+i)
        if(pagenumber.classList.contains("active")){
            pagenumber.classList.remove("active")
        }
    }
    activebtn.classList.add("active")
 }
 paginationbtn.appendChild(newbutton)

}
    for(let i=start;i<end;i++){
        employeearray.push(employees[i])
    }
    display(employeearray)    
function employeeperpage(pagenum){
console.log(pagenum);

// pagenum.style.borderColor="red"

let emptyarray=[];
 start =(pagenum-1)*(employeelist.value)
 let stop =(start + parseInt(employeelist.value))
 

 for ( let i=start;i<stop&& i<employees.length;i++){

    emptyarray.push(employees[i])
 }
  console.log(emptyarray);
  display(emptyarray)
}

}




// // ************photoupload*******
let Adduploading=document.getElementById("upload")
let imageFile=document.getElementById("uploading")
let inputfile=document.getElementById("inputfile")
let getimge=document.getElementById("getimg")
let profileimg;
Adduploading.addEventListener('change',function(){
    profileimg=Adduploading.files[0]
    console.log(profileimg);
if(profileimg){
    // inputfile.style.display="none"
    addemployeeform.style.display="none"
    editEmployeeForm.style.display="block"
    ediEmployeeheading.innerHTML="Add Employee"
    // imagechange(
}
getimge.src=URL.createObjectURL(profileimg);
//         console.log(file);
})

imageFile.addEventListener('change',function(){
    profileimg=imageFile.files[0]
    console.log(profileimg);
    getimge.src=URL.createObjectURL(profileimg);
    // imagechange()
    
})

// *****************imageuplodingfunction PUT**********







function update(){
    // e.preventdefault()
    if(profileimg){
        uplodavatar(editemployeeid, profileimg)
        imagechange()
   
    }
    fetch('http://localhost:3000/employees/'+editemployeeid,{
        method:"PUT",
        headers:{
"Content-Type":"application/json"
        },
        body:JSON.stringify(formdata()),
      
    })
    .then((Response)=>{
        if(Response.ok){
            // editsuccessfully() 
         
        }
        EmployeeForm.style.display="none"
        overlay.style.display="none"
        
        // 
       console.log(Response);
       uplodavatar(Response.id,profileimg)
 
    
    })
   
   
}


// // *****************imageuplodingfunction POST**********
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
// // *************validation*******************
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
        // salutation.ClassList.add(active)
  SalutationError.innerHTML="Salutation is required "
        document.getElementById("salutation").style.borderColor = "red";
        SalutationError.innerHTML="Salutation is required "

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
    document.getElementById("country").style.borderColor = "#b6bbc7";
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
    document.getElementById("password").style.borderColor = "black";
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
    if((!validateCity())&&(! validateFirstName())&&(!validateState())&&(!validateCountry())&&(!validateAddress())&&(!validateQualification())&&(!validateGender())&&(!validateBirth())&&(!validateNumber())&&(!validateEmail())&&(!validatePassword())&&(!validateUsername())&&( !validateLastName())&&(! validateSalutation())){
    return false
    }
    if(( !validateSalutation())&&( !validateFirstName())&&(!validateUsername())&&(!validatePassword())&&(!validateEmail())&&!validateNumber()&&(!validateBirth())&&(!validateQualification())&&(!validateAddress())&&(!validateCountry())&&(!validateState())&&(!validateCity())&&(validateGender())&&(!validateLastName()))
        return false;
}
// ***************************** popup*****************************************************************
let editpopup=document.getElementById("popup")
// function editsuccessfully(){
//     let editpopup=document.getElementById("popup")
    // editpopup.style.display="block"
//     EmployeeForm.style.display="none"
// }
let heading=document.getElementById("heading")
//   function Addsuccessfully(){
//     let editpopup=document.getElementById("popup")
//     heading.innerHTML="Add Employee Succesfully!!"
//     editpopup.style.display="block"
//     EmployeeForm.style.display="none"

//     overlay.style.display="none";

//   }
  function deletesuccessfully(){
    let editpopup=document.getElementById("popup")
    editpopup.style.display="block"
    heading.innerHTML="Employee Deleted  Succesfully!!"
    deleteform.style.display="none"
}
// function imagechange(){
//     let editpopup=document.getElementById("popup")
//     editpopup.style.display="block"
//     heading.innerHTML="Image updated  Succesfully!!"
//     EmployeeForm.style.display="none"
    
// }
// ********************popupclosing***************


// ******************refresh opening**************************
function refresh(){

    // addemployeeopn()
let salutation=document.getElementById("salutation").value=""
let firstname=document.getElementById("firstname").value=""
let lastname=document.getElementById("lastname").value=""
let username=document.getElementById("username").value=""
let password=document.getElementById("password").value=""
let emailaddress=document.getElementById("emailaddress").value=""
let number=document.getElementById("number").value=""
let Birth= document.getElementById("Birth").value=""
let qualification=document.getElementById("qualification").value=""
let address=document.getElementById("address").value=""
let country=document.getElementById("country").value=""
let state=document.getElementById("state").value=""
let city=document.getElementById("city").value=""
let pin=document.getElementById("pin").value=""
let Gender=document.getElementById("Gender").value=" "
// let male =document.getElementById("male").value=""
// let female =document.getElementById("female").value=""


}
// ******************refresh closing**************************

function reload(){
document.getElementById("country").style.borderColor = " ";
document.getElementById("SalutationError").style.display="none"
document.getElementById("StateError").style.display="none"
document.getElementById("CountryError").style.display="none"
document.getElementById("firstname").style.borderColor = "unset"; 
document.getElementById("city").style.borderColor = "#0d6efd";
document.getElementById("username").style.borderColor = "";
 document.getElementById("city").style.borderColor = "";
    document.getElementById("number").style.borderColor = "";
    document.getElementById("address").style.borderColor = "";
    document.getElementById("qualification").style.borderColor = "";
    document.getElementById("Birth").style.borderColor = "";
    document.getElementById("emailaddress").style.borderColor = "";
    document.getElementById("password").style.borderColor = "";
    document.getElementById("lastname").style.borderColor = "";
    document.getElementById("firstname").style.borderColor = "";
    document.getElementById("city").style.borderColor = " ";
    document.getElementById("state").style.borderColor = "#b6bbc7";
    document.getElementById("salutation").style.borderColor = "#b6bbc7";
    document.getElementById("country").style.borderColor = "#b6bbc7";

    FirstNameError.innerHTML=""
    GenderError.innerHTML=" "
     LastNameError.innerHTML=" "
     UsernameError.innerHTML=" "
     PasswordError.innerHTML=" "
     emailError.innerHTML=" "
     NumberError.innerHTML=" "
     BirthError.innerHTML=" "
     QualificationError.innerHTML=" "
     AddressError.innerHTML=" "
     CityError.innerHTML=" "
    //  PinZipError.innerHTML=" "
     SalutationError.innerHTML=" "
     CountryError.innerHTML=" "
     StateError.innerHTML=" "
    //  validateform()
    }
// ******************search***************





