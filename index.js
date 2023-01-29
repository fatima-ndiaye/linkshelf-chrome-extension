let myLinks = [];
const  inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');
const ulEl = document.getElementById('ul-el');
const linksFromLocalStrorage = JSON.parse(localStorage.getItem("myLinks"));


if(linksFromLocalStrorage)
{
    myLinks =linksFromLocalStrorage;
    render(myLinks);
}
tabBtn.addEventListener("click", function()
{
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) { // since only one tab should be active and in the current window at once
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))  //JSON.stringify => turn array into string
        render(myLinks);
    })

})
function render(links)
{
    let listItems = "";
    for (let i = 0; i < links.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${links[i]}'> ${links[i]} </a>
        </li>`;
    }
    ulEl.innerHTML = listItems;
}
inputBtn.addEventListener("click", function(){
    myLinks.push(inputEl.value)
    localStorage.setItem("myLinks", JSON.stringify(myLinks))  //JSON.stringify => turn array into string
    inputEl.value = ""
    render(myLinks);
});
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

