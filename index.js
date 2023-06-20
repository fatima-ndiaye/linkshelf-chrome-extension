// Initialize an empty array to store links
let myLinks = [];

// Get the necessary DOM elements
const  inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');
const ulEl = document.getElementById('ul-el');
// Retrieve links from local storage, if available
const linksFromLocalStrorage = JSON.parse(localStorage.getItem("myLinks"));

// If links are found in local storage, assign them to myLinks array and render them
if(linksFromLocalStrorage)
{
    myLinks =linksFromLocalStrorage;
    render(myLinks);
}

// Event listener for the "Open Tab" button
tabBtn.addEventListener("click", function()
{
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) { // since only one tab should be active and in the current window at once
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))  //JSON.stringify => turn array into string
        // Render the updated links
        render(myLinks);
    })

})
function render(links)
{
    let listItems = "";
    for (let i = 0; i < links.length; i++) {
        // Create list items with anchor tags for each link
        listItems += `
        <li>
            <a target='_blank' href='${links[i]}'> ${links[i]} </a>
        </li>`;
    }
    // Update the HTML content of the unordered list with the generated list items
    ulEl.innerHTML = listItems;
}

// Event listener for the "Save Input" button
inputBtn.addEventListener("click", function(){
    // Push the link value from the input field into myLinks array
    myLinks.push(inputEl.value)
    // Store the updated myLinks array in local storage
    localStorage.setItem("myLinks", JSON.stringify(myLinks))  //JSON.stringify => turn array into string
    // Clear the input field
    inputEl.value = ""
    // Render the updated links
    render(myLinks);
});

// Event listener for the "Delete All" button (double-click event)
deleteBtn.addEventListener("dblclick", function(){
 //When clicked, clear localStorage, myLinks, and the DOM
 localStorage.clear();
 myLinks = [];
 render(myLinks);
})

























//ulEl.innerHTML += "<li>" + myLeads[i] + "</li>" ==
// create element: const li = document.createElement("li")
// set text content: li.textContent = myLeads[i]
// append to ul: ulEl.append(li)

