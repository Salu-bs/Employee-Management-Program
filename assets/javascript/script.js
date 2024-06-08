// ***********addemployeeformopen************
let EmployeeForm = document.getElementById("EmployeeForm");
let Addemployee = document.getElementById("Addemployee");
let updatedbtn = document.getElementById("updatedbtn");
let overlay = document.getElementById("overlay");
let employeeLength = document.getElementById("employeeLength");
// edit.......................
let addemployeeform = document.getElementById("addemployeeform")
let editEmployeeForm = document.getElementById("editEmployeeForm")
let editemployeebtn = document.getElementById("editemployeebtn")
let editemployeeid
let editIndex;

// delete.....................
let deleteform = document.getElementById("deleteform");
let DELETEEMPLOYEEbtn = document.getElementById("DELETEEMPLOYEEbtn");

// photoUPload............................................
let Adduploading = document.getElementById("upload")
let imageFile = document.getElementById("uploading")
let inputfile = document.getElementById("inputfile")
let getimge = document.getElementById("getimg")
let profileimg;

// validationErrror.................
 
// // *************validation*******************
let FirstNameError = document.getElementById("FirstNameError")
let LastNameError = document.getElementById("LastNameError")
let UsernameError = document.getElementById("UsernameError")
let PasswordError = document.getElementById("PasswordError")
let emailError = document.getElementById("emailError")
let NumberError = document.getElementById("NumberError")
let BirthError = document.getElementById("BirthError")
let QualificationError = document.getElementById("QualificationError")
let AddressError = document.getElementById("AddressError")
let CityError = document.getElementById("CityError")
let PinZipErrors = document.getElementById("PinZipError")
let GenderError = document.getElementById("GenderError")
let SalutationError = document.getElementById("SalutationError")
let CountryError = document.getElementById("CountryError")
let StateError = document.getElementById("StateError")


// Globaldeclaration......................................................
let salutation = document.getElementById("salutation")
let firstname = document.getElementById("firstname")
let lastname = document.getElementById("lastname")
let username = document.getElementById("username")
let password = document.getElementById("password")
let emailaddress = document.getElementById("emailaddress")
let number = document.getElementById("number")
let Birth = document.getElementById("Birth")
let qualification = document.getElementById("qualification")
let address = document.getElementById("address")
let country = document.getElementById("country")
let state = document.getElementById("state")
let city = document.getElementById("city")
let pin = document.getElementById("pin")
// let G=document.getElementById("Gender")
let male = document.getElementById("male")
let female = document.getElementById("female")
// Globaldeclaration.. CLOSE....................................................
function resetForm() {
  // Reset the form fields
  document.getElementById("EmployeeForm").reset();
  
  // Clear custom error messages and reset styles
  const errorElements = document.querySelectorAll('.empty');
  errorElements.forEach(el => el.innerHTML = '');
  
  const inputElements = document.querySelectorAll('.form-control, .form-select');
  inputElements.forEach(el => el.style.borderColor = '');

  // Reset image preview and other custom elements
  // document.getElementById('getimge').src = '';
  // profileimg = null;
}

let allemployeeData=[]
// Employeelist and current page....................
// 
// AddemployeeFORM OPEM.............

function addemployeeopn() {
  let addemployeeform = document.getElementById("addemployeeform")
  EmployeeForm.style.display = "block"
  Addemployee.style.display = "block"

  editEmployeeForm.style.display = "none"
  updatedbtn.style.display = "none"
  overlay.style.display = "block"
  addemployeeform.style.display = "block"

}
//  DELETEFormclose...........
function closeuppop() {
  deleteform.style.display = "none"
  editpopup.style.display = "none"

}
// form close...........................................................
function closeup() {
  EmployeeForm.style.display = "none"
  deleteform.style.display = "none"

  overlay.style.display = "none"
  overlay.style.display = "none"

  // refresh()
  // reload()
  //    deletesuccessfully()

}
function close() {
  EmployeeForm.style.display = "none"
  overlay.style.display = "none"
  overlay.style.display = "none"

}
function closeuppop() {
  deleteform.style.display = "none"
  editpopup.style.display = "none"
  //  firstpages()
}
// pre buttons...................................................................

// Edit data displaying...................................................
async function editemployee(editid, index) {
  console.log(editid);
  editIndex = index
  addemployeeform.style.display = "none"
  Addemployee.style.display = "none"
  updatedbtn.style.display = "block"
  EmployeeForm.style.display = "block"
  overlay.style.display = "block"
  editemployeeid = editid
  // refresh()
  // reload()
  // 
  await fetch('http://localhost:3000/employees/' + editemployeeid)
    .then((data) => {
      return data.json()
    })
    .then((employee) => {

      salutation.value = employee.salutation
      firstname.value = employee.firstName
      lastname.value = employee.lastName
      username.value = employee.username
      password.value = employee.password
      emailaddress.value = employee.email
      number.value = employee.phone
      pin.value = employee.pin
      Birth.value = dob(employee.dob)
      qualification.value = employee.qualifications
      address.value = employee.address
      country.value = employee.country
      state.value = employee.state
      city.value = employee.city
      employee.gender === "male" ? document.getElementById("male").checked = true : document.getElementById("female").checked = true;
      getimge.src = `/uploads/${employee.avatar}`
    })
  editEmployeeForm.style.display = "block"
}
async function update() {
  try {
    if (profileimg) {
      await uplodavatar(editemployeeid, profileimg);
      // imagechange(); // Uncomment if needed
    }
    const response = await fetch('http://localhost:3000/employees/' + editemployeeid, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formdata()) // Assuming formdata() returns the data to be updated
    });

    if (response.ok) {
      const updatedEmployee = await response.json();
      console.log("Updated Employee:", updatedEmployee.employee);
      allemployeeData[editIndex] = updatedEmployee.employee;
      console.log("allemployeeData:", allemployeeData);
      display(allemployeeData, 1, limits);  // Recalculate and display the updated list
      editTableData = updatedEmployee.employee;
      console.log("editTableData:", editTableData);

      // Close the form and overlay
      EmployeeForm.style.display = "none";
      overlay.style.display = "none";
    } else {
      console.error('Failed to update employee.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}






// modal..........................................
let modal = document.getElementById("modal")
let optionbox = (action) => {
  if (action.style.display === "none" || action.style.display === "") {
    action.style.display = "block";
    modal.style.display = "block"
  }
  else {
    modaal()
    action.style.display = "none";
  }
  return false
}
function modaal() {
  modal.style.display = "none"
  for (let i = 0; i < employeelist.value; i++) {
    let subbox = document.getElementById("subbox" + i)
    if (subbox.style.display == "block") {
      subbox.style.display = "none"
    }
  }
}


// formData ..................................................
function formdata() {

  let user =
  {
    salutation: salutation.value,
    firstName: firstname.value,
    lastName: lastname.value,
    email: emailaddress.value,
    phone: number.value,
    dob: dob(Birth.value),
    gender: gender(),
    qualifications: qualification.value,
    address: address.value,
    city: city.value,
    state: state.value,
    country: country.value,
    username: username.value,
    password: password.value,
    pin: pin.value

  }
  return user
  // gender.............................................................
  function gender() {
    // document.getElementById("male")
    // l=document.getElementById("female")
    if (male.checked) {
      return male.value
    }
    if (female.checked) {
      return female.value
    }
  }
  // birth......................
  function dob(birthdate) {
    let data = birthdate.split('-').reverse().join('-');
    // console.log(data)
    return data
  }
  function gender() {
    let male = document.getElementById("male")
    let female = document.getElementById("female")
    if (male.checked) {
      return male.value
    } else {
      return female.value
    }
  }

}
// DOB AND GENDER GLOBAL FUNCTION....................................
function dob(birthdate) {
  let data = birthdate.split('-').reverse().join('-');
  return data
}
function gender() {
  let male = document.getElementById("male")
  let female = document.getElementById("female")
  if (male.checked) {
    return male.value
  } else {
    return female.value
  }
}

// image upload function.................................................
// Global serial number tracker
let filename;
let currentSerialNumber = 0;

async function uplodavatar(id, image) {
  let avatardata = new FormData();
  avatardata.append("avatar", image);
  try {
    const response = await fetch('http://localhost:3000/employees/' + id + "/avatar", {
      method: "POST",
      body: avatardata
    });

    if (!response.ok) {
      throw new Error('Failed to upload avatar');
    }
    const result = await response.json();

  // console.log(result.filePath);
   const filePath = result.filePath;
   filename = filePath.substring(filePath.indexOf("/") + 1);
  console.log(filename); // "1717414037404localhost_3000_home.png"
  
    return result.avatar; // Assume the server returns the URL or path of the uploaded avatar
  } catch (error) {
    console.error('Error:', error);
  }
}

// photo change function ..........................................

let profileImgSrc;
// Event listener for the Adduploading input element
Adduploading.addEventListener('change', function () {
  profileimg = Adduploading.files[0];
  if (profileimg) {
    addemployeeform.style.display = "none";
    editEmployeeForm.style.display = "block";
    ediEmployeeheading.innerHTML = "Add Employee";
  }
  // Create object URL and assign it to the global variable
  profileImgSrc = URL.createObjectURL(profileimg);
  getimge.src = profileImgSrc;
});

// Event listener for the imageFile input element
imageFile.addEventListener('change', function () {
  profileimg = imageFile.files[0];
  // Create object URL and assign it to the global variable
  profileImgSrc = URL.createObjectURL(profileimg);
  getimge.src = profileImgSrc;
});


// addemployee..POSTMETHOD.......
let newempImg;
let avatarUrl;

const defaultImageUrl = 'default-avatar.jpg'; // Set the default image URL here

async function addemployee() {
  if ( validateForm()) {
    try {
      const response = await fetch("http://localhost:3000/employees/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formdata())
      });

      const data = await response.json();
      if (data.status === "success") {
        EmployeeForm.style.display = "none";
        resetForm();
        close();
        modaal();
        closeup();

        if (profileimg) {
          console.log(profileimg);
          await uplodavatar(data.id, profileimg);
        } else {
          filename = defaultImageUrl; // Use default image if no profile image is uploaded
        }
        console.log(filename);
        
        let employeeData = { ...data.data };

        // Update the avatar field
        employeeData.avatar = filename;
        allemployeeData.unshift(employeeData);

        display(allemployeeData, 1, limits);  // Recalculate and display the updated list

        // Directly insert the new employee data to the table
        insertNewEmployee({ ...data.data, avatar: filename });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    console.log('Form validation failed.');
  }
}



function insertNewEmployee(newEmployee) {
  console.log(newEmployee);
  dataCount += 1;
  totalpage = Math.ceil(dataCount / limits);
  employeeLength.textContent = `of ${dataCount}`;
  pagination();
}

//validation form...........................................................
function validateField(key, requireSpecialChar = false, isEmail = false) {
  let field = document.getElementById(key).value;
  let errorElement = document.getElementById(`${key}-error`);

  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  if (!field) {
      errorElement.innerHTML = `${capitalizeFirstLetter(key)} is required`;
      document.getElementById(key).style.borderColor = "red";
      return false;
  }

  if (isEmail && !validateEmailFormat(field)) {
      errorElement.innerHTML = `Please enter a valid email address`;
      document.getElementById(key).style.borderColor = "red";
      return false;
  }
  if (requireSpecialChar && key === "password") {
      const passwordValidationResult = validatePassword(field);
      if (passwordValidationResult !== true) {
          errorElement.innerHTML = passwordValidationResult;
          document.getElementById(key).style.borderColor = "red";
          return false;
      }
  }
  errorElement.innerHTML = "";
  document.getElementById(key).style.borderColor = "unset";
  return true;
}
function validateEmailFormat(email) {
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
function validatePassword(password) {
  let specialCharacters = "!@#$%^&*";
  
  if (!password) {
      return "Password is required";
  }

  if (password.length < 7) {
      return "Password must be at least 7 characters long";
  }

  for (let char of password) {
      if (specialCharacters.includes(char)) {
          return true;
      }
  }

  return "Password must contain at least one special character";
}

function validateGender() {
  let male = document.getElementById("male");
  let female = document.getElementById("female");
  let genderError = document.getElementById("Gender-error");
  if (!male.checked && !female.checked) {
    genderError.innerHTML = "Gender is required";
    return false;
  }
  genderError.innerHTML = "";
  return true;
}

function validateForm() {
  let isValid = true;

  isValid = validateField("salutation") && isValid;
  isValid = validateField("firstname") && isValid;
  isValid = validateField("lastname") && isValid;
  isValid = validateField("username") && isValid;
  isValid = validateField("password", true) && isValid;
  isValid = validateField("emailaddress", false, true) && isValid;
  isValid = validateField("number") && isValid;
  isValid = validateField("Birth") && isValid;
  isValid = validateGender() && isValid;
  isValid = validateField("qualification") && isValid;
  isValid = validateField("address") && isValid;
  isValid = validateField("country") && isValid;
  isValid = validateField("state") && isValid;
  isValid = validateField("city") && isValid;
  isValid = validateField("pin") && isValid;

  return isValid;
}
// validation close

// popup.........................................................
let editpopup = document.getElementById("popup")
let editpopups = document.getElementById("editpopups")



function editsuccessfully() {
  heading.innerHTML = "Employee Edited  Succesfully!!"
  let editpopup = document.getElementById("popup")
  editpopup.style.display = "block"
  EmployeeForm.style.display = "none"
}
let heading = document.getElementById("heading")
function Addsuccessfully() {
  let editpopup = document.getElementById("popup")
  editpopup.style.display = "block"
  EmployeeForm.style.display = "none"
  heading.innerHTML = "Add Employee Succesfully!!"
}
function deletesuccessfully() {
  // window.location.href = "http://localhost:3000/home";
  //

  let editpopup = document.getElementById("popup")
  editpopup.style.display = "block"
  setTimeout(function () {
    editpopup.style.display = "none";
  }, 2000);
  deleteform.style.display = "none"

}
function editsuccessfully() {
  // window.location.href = "http://localhost:3000/home";
  //

  let editpopups = document.getElementById("editpopups")
  editpopups.style.display = "block"
  setTimeout(function () {
    editpopups.style.display = "none";
  }, 2000);
  EmployeeForm.style.display = "none"

}

function updateSerialNumbers() {
  var tableBody = document.getElementById('table_body');
  var rows = tableBody.rows;
  for (var i = 0; i < rows.length; i++) {
    rows[i].getElementsByTagName('th')[0].textContent = '#' + zero(i + 1);
  }
}
function zero(num) {
  return (num < 10 ? '0' : '') + num;
}



// ............new...................................
let currentPage = 1; // Default current page
let limits = parseInt(document.getElementById("employeelist").value); // Default limit
let dataCount = 0; // Total number of data entries
let searchValue = ''; // Current search query
let totalpage = 1; // Total number of pages

// Event listener for limit change
document.getElementById("employeelist").addEventListener("change", function () {
  currentPage = 1; // Reset page to 1 when changing limit
  limits = parseInt(this.value); // Update limits with the new value
  fetchData(currentPage, limits); // Fetch and display data with the new limits
});

// Search function
async function search() {
  searchValue = document.getElementById('search').value;
  currentPage = 1; // Reset to the first page for new search
  fetchData(currentPage, limits); // Fetch data with search query
}

// Fetch data function
async function fetchData(currentPage, limits) {
  try {
    const url = `http://localhost:3000/employees?page=${currentPage}&limit=${limits}&search=${searchValue}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log(data);
    dataCount = data.count || 0;
  
    totalpage = data.totalPages;
    allemployeeData =data.data
    display(allemployeeData, currentPage, limits);
 
    employeeLength.textContent = `of ${dataCount}`;
    pagination();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
// Display data function
function display(data, currentPage, rowsPerPage) {
  let tableData = "";

  // Check if data is empty
 // Check if data is empty
 if (data.length === 0) {
  tableData = `<tr><td colspan="8" class="text-center" style="font-size: 20px;"><i class="far fa-user" style="font-size: 25px;"></i> No employees found</td></tr>`;
}

else {
    const startIndex = (currentPage - 1) * rowsPerPage;

    for (let index = 0; index < data.length; index++) {
      const value = data[index];
      const serialNumber = startIndex + index + 1;
      const imageUrl = value.avatar || data.profileImgSrc;

      // console.log(data.profileImgSrc);// Use profileImgSrc or fallback to avatar

      tableData += ` 
        <tr class="edit">
            <td scope="row">#${zero(serialNumber)}</td>
            <td><img src="/uploads/${imageUrl}" alt="profileimg" class="rounded-circle me-2" height=30 width=30>
                ${value.salutation} ${value.firstName} ${value.lastName} 
            </td>
            <td>${value.email}</td>
            <td>${value.phone}</td>
            <td>${value.gender}</td>
            <td>${value.dob}</td>
            <td>${value.country}</td>
            <td>
                <span class="dots">
                    <button onclick="optionbox(this.nextElementSibling)" class="dots-button ">
                        <i class="fa-solid fa-ellipsis"></i>
                    </button>
                    <div id="subbox${index}" class="subdots">
                        <a href="view/?id=${value._id}">
                            <i class="material-symbols-outlined">visibility</i>
                            <p>View Details</p>
                        </a>
                        <button onclick="editemployee('${value._id}','${index}')" id="editemployeebtn">
                            <i class="fa-solid fa-pen"></i>
                            <p>Edit</p>
                        </button>
                        <button onclick="deleteemployee('${value._id}','${index}'),modaal()" id="deleteemployeebtn">
                            <i class="material-symbols-outlined">delete</i>
                            <p>Delete</p>
                        </button>
                    </div>
                </span>
            </td>
        </tr>`;
    }
  }

  document.getElementById("table_body").innerHTML = tableData;

  function zero(slno) {
    return slno <= 9 ? "0" + slno : slno;
  }
}

// Pagination function
function  pagination() {
  let paginationbtn = document.getElementById("paginationbtn");
  paginationbtn.innerHTML = "";
  let totalPages = Math.ceil(dataCount / limits);
  for (let i = 1; i <= totalPages; i++) {
    let newbutton = document.createElement("button");
    newbutton.textContent = i;
    newbutton.id = "pages" + i;
    if (i === currentPage) {
      newbutton.classList.add("active");
    }
    newbutton.onclick = function () {
      currentPage = i;
      Activepage(newbutton);
      fetchData(currentPage, limits); // Fetch and display data for the new page
    };
    paginationbtn.appendChild(newbutton);
  }
}

// Active page function
function Activepage(button) {
  let activeButton = document.querySelector(".pagination button.active");
  if (activeButton) {
    activeButton.classList.remove("active");
  }
  button.classList.add("active");
}

// Initial fetch data
fetchData(currentPage, limits);

function Activepage(activebtn) {
  const allButtons = document.querySelectorAll("#paginationbtn button");
  allButtons.forEach(btn => btn.classList.remove("active"));
  activebtn.classList.add("active");
}


// buttonce...............................................................
function firstpages() {
  currentPage = 1;
  fetchData(currentPage, limits);
}
function prebtn() {
  if (currentPage > 1) {
    currentPage--;
    fetchData(currentPage, limits);

}
}

function nextpage() {
  let totalPages = Math.ceil(dataCount / limits);
  if (currentPage < totalPages) {
    currentPage++;
    fetchData(currentPage, limits);
  }

}

function finalpages() {
  currentPage = Math.ceil(dataCount / limits);
  fetchData(currentPage, limits);
}



// delete................................
function deleteemployee(deleteid, index) {
  deleteform.style.display = 'block';
  overlay.style.display = "block";

  // Define the event handler function
  const deleteButtonHandler = function () {
    fetch('http://localhost:3000/employees/' + deleteid, {
      method: "DELETE",
    })
      .then(response => {
        return response.json().then(data => ({
          status: response.status,
          body: data
        }));
      })
      .then(({status, body}) => {
        if (status === 200) {
          const resdelete = body.deletedEmployeeId;
          console.log(resdelete);
          const employeeIndex = allemployeeData.findIndex(employee => employee._id === resdelete);
          console.log(employeeIndex);
          if (employeeIndex !== -1) {
            allemployeeData.splice(employeeIndex, 1);
            display(allemployeeData, 1, employeelist.value);
            // Refresh the table display
          }
          deleteEmployee(resdelete );

        } else {
          console.error('Failed to delete employee:', body.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        // Reset form and overlay display
        deleteform.style.display = 'none';
        overlay.style.display = "none";
        // Remove the event listener after the operation to prevent memory leaks
        DELETEEMPLOYEEbtn.removeEventListener("click", deleteButtonHandler);
      });
  };
  // Remove any existing event listener to avoid duplicate handlers
  DELETEEMPLOYEEbtn.removeEventListener("click", deleteButtonHandler);

  // Add the event listener to the delete button
  DELETEEMPLOYEEbtn.addEventListener("click", deleteButtonHandler);
}
function deleteEmployee(resdelete){
  console.log(resdelete);
  dataCount -= 1;
  totalpage = Math.ceil(dataCount / limits);
  employeeLength.textContent = `of ${dataCount}`;
  pagination();
  
 }

function updateSerialNumbers() {
  var tableBody = document.getElementById('table_body');
  var rows = tableBody.rows;
  for (var i = 0; i < rows.length; i++) {
    rows[i].getElementsByTagName('th')[0].textContent = '#' + zero(i + 1);
  }
}

 