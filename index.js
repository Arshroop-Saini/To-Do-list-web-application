const express = require('express');
const bodyParser = require('body-parser');
let ejs = require('ejs');
// Making our own module and requiring it
const date= require(__dirname+"/date.js");


const app= express();
app.use(bodyParser.urlencoded({extended: true}));

//Making a folder "public" that would contain all the local files like images or css so that our app would be able to render them.
app.use(express.static("public"))

// Declaring an arry items to which would be pushed every time when the user gives a post request at the home route. 
var items=["buy food", "cook food", "eat food"]

// Declaring an arry items to which would be pushed every time when the user gives a post request at the work route. 
let workItems=[]

// It specifies that ejs will render the files present in the views folder, so first we need to make that.
app.use("view engine", "ejs")

// get request
app.get('/', function(req, res){

// this is the old and long method of showing only the day.
// Method

//     // To find out which day is today.
//     var today = new Date()
//     var currentDay= today.getDate();
//     var day=""

// // Logic by if elses
//     if (currentDay ===0){
//         day=Monday;
//         // Rendering the current day and parsing it to a file named list.ejs present in the views folder.
//       res.render("list", {kindOfDay:day})
//     }else if (currentDay ===1){
//         day= Tuesday
//         res.render("list", {kindOfDay:day})
//     }else if (currentDay ===2){
//         day= Wednesday;
//         res.render("list", {kindOfDay:day})
//     }else if (currentDay ===3){
//         day= Thursday;
//         res.render("list", {kindOfDay:day})
//     }else if (currentDay ===4){
//         day= Friday;
//         res.render("list", {kindOfDay:day})
//     }else if (currentDay ===5){
//         day= Saturday;
//         res.render("list", {kindOfDay:day})
//     }else if (currentDay ===6){
//         day= Sunday;
//         res.render("list", {kindOfDay:day})
//     }else{
//         res.send("Invalid Day!, I am in a douby?");
//     }


// Method:2 to show days, date and month as well
// var today= new day();

// Converting the normal date format into the Locale system of our PC
// var options = {
// day: "numeric" ,
// month: "long" ,
// weekday: "long"

// }

// var day=today.toLocaleDateString("en-US", options);

// Method:3 Making our own local node module and then parsing it after requiring the module.
let day= date()
res.render("list", {listTitle:day}, {newListItems:items});

})

// post request
app.post('/', function(req, res){
    // capturing the data entered by the user into teh textbox
    var value= req.body.input

    // building the logic to push the data entered into the workItems array when the value of the submit button is equal to Work List and gets redirescted back into the /work route.
console.log(req.body)

   
if (req.body.submit=== "Work List") {
    workItems.push(value)
    res.redirect('/work')
}else{
    items.push(value)
    res.redirect('/')
}

    // pushing the values that the user enters into the textbox to the array items which we have defined at the top
    items.push(value);

    // sending the user back to the main route page.
    res.redirect('/')
})

app.get('/work', function(req, res){

    res.render('list', {listTitle:"Work List", newListItems:workItems})

})

app.post('/work', function(req, res){

    var value = req.body.input
    workItems.push(work)
    res.redirect('/work')
})

app.get('/about', function(req, res){
    res.render('about')
})


app.listen('8080', function(req, res){
    console.log('listening on http://localhost:8080');
})