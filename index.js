const express = require('express');
// const fs = require('fs');
const Student = require('./students');


//function to login by roll 
// function hasRole(role,req,res,next){
// if(res.user && res.user.role===role){
// next();
// }else{
//     res.status(403).send('forbiden bro!')
// }
// }




const app = express();

//middleware to parese the json file formate
app.use(express.json());
//sttudent roll
// app.get('/student/grades', isAuthenticated, (req, res, next) => {
//     hasRole(ROLES.STUDENT, req, res, next);
// }, (req, res) => {
//     // Logic to fetch and return student grades
// });



//t
app.get('/students', (req, res) => {
    res.json(Student); 
    
});
/////////////////////////////// Route to get a specific user by ID
app.get('/students/:id',(req,res)=>{
    // Extract the user ID from the request parameters and parse it to an integer 
    //all id 
 const userId=parseInt(req.params.id);  
 //find the students id whose id is userId that maches to user.id 
//  user.id client request
//userId students object all id 
 const user=Student.find(use => use.id===userId)
 if(user){
    res.json(user);
 }else{
    res.status(404).send("bro not id is not mathch found error occured!")
 }
})
//////////////////////how to create bro!
app.post('/create',(req,res)=>{
     const newUser ={
        // id:uuid.v4(), but i uuid means unick id  but i have no npm 
        id:req.body.id,
        name:req.body.name,
        Grade:req.body.Grade
    }
//    or use 
//  const newUser=req.body; 
    //checking
    if(!newUser.name||!newUser.Grade){
        return res.sendStatus(400)
    }
    Student.push(newUser);
    // req.status(201).json(newUser)
    res.json(newUser);
})

//////////how to update
app.get('/students/:id',(req,res)=>{
    const userId=parseInt(req.params.id);  
    const updateStudent=req.body;//the updated data
    //first check the data is stored!
    const checkStudent=Student.some(user=>(user.id===userId))
    if(!checkStudent){
        res.status(404).send({message:"the data is not currently present!"});
    }
    Student=Student.map(user=>(user.id===userId) ? {...user,...updateStudent} : user)
    updateStudent= Student.find(user =>user.id===userId)
    res.json(updateStudent)
});


////////////////////////How can i delete bro!
app.get('students/:id',(req,res)=>{
    const userId=parseInt(req.params.id);
    Student=Student.filter(user=>(user.id!==userId))
    // res.status(404).send("error happen!")
    res.status(404).end;
})








const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port number ${PORT}`);
});











// Student = Student.map(user => {
//     if (user.id === userId) {
//       return { ...user, ...updateUser };
//     } else {
//       return user;
//     }
//   });

  