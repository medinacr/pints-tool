const employeeSelect = document.querySelector('.employee-select');
const employeeOption = document.querySelector('.option');
const employeeDropDown = document.querySelector('.container');
const employeeName = document.querySelector('.employee-name');
const employeeHours = document.querySelector('.employee-hours');
const submit = document.querySelector('.button')
const result = document.querySelector('.result');


const employeeNames = ["ls","pv","cm","lc","as","hp","ra","bm","am","rm","fc", "ray"];

const data = {};

// How Many Employees
for (let i = 0; i < 13; i++) {
  const newOption = document.createElement('option');
  newOption.value = i + 1;
  newOption.text = i + 1;
  newOption.style.color = "black";
  employeeSelect.appendChild(newOption);
}



// Listen for changes in employeeSelect
employeeSelect.addEventListener('change', function() {
  // Get the selected value from employeeSelect
  const selectedValue = parseInt(employeeSelect.value);

  // Remove existing containers
  while (employeeDropDown.firstChild) {
    employeeDropDown.removeChild(employeeDropDown.firstChild);
  }

  // Create new containers based on the selected value
  for (let i = 0; i < selectedValue; i++) {
    // Create a new container
    const newContainer = document.createElement('div');
    newContainer.classList.add('format');

    // Create the "Hours" div
    const hoursDiv = document.createElement('div');
    hoursDiv.classList.add('hours');
    const hoursParagraph = document.createElement('p');
    hoursParagraph.textContent = 'Hours';
    const hoursSelect = document.createElement('select');
    hoursSelect.classList.add('employee-hours');
    const hoursOption = document.createElement('option');
    hoursSelect.appendChild(hoursOption);
    hoursDiv.appendChild(hoursParagraph);
    hoursDiv.appendChild(hoursSelect);

    // Create the "Employee" div
    const employeeDiv = document.createElement('div');
    employeeDiv.classList.add('employee');
    const employeeParagraph = document.createElement('p');
    employeeParagraph.textContent = 'Employee';
    const employeeSelectDropdown = document.createElement('select');
    employeeSelectDropdown.classList.add('employee-name');
    const employeeOption = document.createElement('option');
    employeeSelectDropdown.appendChild(employeeOption);
    employeeDiv.appendChild(employeeParagraph);
    employeeDiv.appendChild(employeeSelectDropdown);

    // Append "Hours" and "Employee" divs to the container
    newContainer.appendChild(hoursDiv);
    newContainer.appendChild(employeeDiv);

    // Append the new container to the container list
    employeeDropDown.appendChild(newContainer);

    // Append Employee Hours
    for (let i = 0; i < 10; i += 0.5) {
      const newOptionHours = document.createElement('option');
      newOptionHours.value = i.toFixed(1);
      newOptionHours.textContent = i.toFixed(1);
      newOptionHours.style.color = "black";
      hoursSelect.appendChild(newOptionHours);
    }

    // Append Employee Names
    for (let i = 0; i < employeeNames.length; i++) {
      const newOption = document.createElement('option');
      newOption.value = employeeNames[i];
      newOption.textContent = employeeNames[i];
      employeeSelectDropdown.appendChild(newOption);
    }
  }
});

submit.addEventListener('click', function() {
  
  const selectedData = [];
  result.innerHTML = '';

  // Iterate through each container to collect selected values
  const containers = document.querySelectorAll('.format');
  containers.forEach(container => {
    const hoursSelect = container.querySelector('.employee-hours');
    const nameSelect = container.querySelector('.employee-name');
    const hours = parseFloat(hoursSelect.value);
    const name = nameSelect.value;
    selectedData.push({ hours, name });
  });
  
  const totalHours = selectedData.reduce((total, entry) => total + entry.hours, 0)
  const tipAmount = parseInt(document.querySelector('.tip-amount').value)

  console.log(totalHours, 'totalHours')
  
  // Calculate tip based on stored data
   selectedData.forEach(entry => {
    const tip = (entry.hours / totalHours) * tipAmount;

    // Create a container div for each employee entry
    const entryContainer = document.createElement('div');
    entryContainer.classList.add('entry-container');

    const employeeName = document.createElement('p');
    employeeName.classList.add('employee-name');
    employeeName.innerText = entry.name;

    const tipAmountElement = document.createElement('p');
    tipAmountElement.classList.add('tip-amount');
    tipAmountElement.innerText = tip.toFixed(2);

    // Append employee name and tip amount to the entry container
    entryContainer.appendChild(employeeName);
    entryContainer.appendChild(tipAmountElement);

    // Append the entry container to the result container
    result.appendChild(entryContainer);

    console.log(`Employee: ${entry.name}, Tip: ${tip.toFixed(2)}`);
  });

  
});
