`use strict`;

// Get data

function getData() {

    fetch("https://kea-alt-del.dk/customersupport/")
    .then(response=>response.json())
    .then(show)
}

getData();

// Get template elements content

function show(requests){
    console.log(requests);
    let requestTemplate = document.querySelector('.request-template').content;
 
    requests.sort((a, b) => b.importance - a.importance);

    requests.forEach(request=>{
        console.log(request)

// Clone template

        let clone = requestTemplate.cloneNode(true);

        // Show the importance

        clone.querySelector('.importance-color').textContent=``;
        if(request.importance<40){
            clone.querySelector('.importance-color').textContent=`Minor Importance`;
            clone.querySelector('.importance-color').style.background = "linear-gradient(to right, #11998e, #38ef7d)";
            clone.querySelector('.importance-color').setAttribute("id", "minor");
        } else if (request.importance>70) {
            clone.querySelector('.importance-color').textContent=`Primary Importance`;
            clone.querySelector('.importance-color').style.background = "linear-gradient(to left, #e52d27, #b31217)";
            clone.querySelector('.importance-color').setAttribute("id", "primary");
        } 
        else {
            clone.querySelector('.importance-color').textContent=`Secondary Importance`;
            clone.querySelector('.importance-color').style.background ="linear-gradient(to left, #ffe259, #ffa751)";
            clone.querySelector('.importance-color').setAttribute("id", "secondary");
        };
        
        // Show the middle name if submitted
        
        if(request.middle){
            clone.querySelector('.request-name').textContent=`${request.first} ${request.middle} ${request.last}`;
        } else {
            clone.querySelector('.request-name').textContent=`${request.first} ${request.last}`;
        }
        clone.querySelector('.request-place').textContent=`from ${request.place}`;
        clone.querySelector('.request-message').textContent=`${request.message}`;
        clone.querySelector('.request-date').textContent=`${request.time.day}/${request.time.month}/${request.time.year} at ${request.time.hour}:${request.time.minute}`;
        clone.querySelector(".more").addEventListener("click", function(e){
            e.target.previousElementSibling.textContent = request.full;
        });
        clone.querySelector(".completed").addEventListener("click", function(e){
            alert("Are you sure that this problem is resolved?");
            e.target.parentElement.remove();
        })


// Show in HTML
        document.querySelector("#request-section").appendChild(clone)
    });

}