require('dotenv').config();
const express = require('express');
const PORT = process.env.DB_PORT || 3000;
const sequelize = require('./config/sequelize.js');
const Task = require('./model/task.js');

const app = express();
app.use(express.json());


async function testDB() {
    try {
      await sequelize.authenticate();
      console.log("✅ Database connected successfully!");
    } catch (error) {
      console.error("❌ Database connection failed:", error);
    }
  }
  
testDB();


//          GET ALL TASKS
app.get('/tasks', async(req, res) => {
    try{
        const tasks = await Task.findAll();
        if(!tasks){
            return res.status(404).json({message: 'No Task Found'});
        };
        return res.status(200).json({message: 'Tasks retrieved successfully', tasks});
    } catch (error) {
        res.status(500).json({message: `Internal Server Error ${error.message}`});
        console.log(error);
    }
});



//              CREATING A TASK
app.post('/create-task', async(req, res) => {
    const {title, description} = req.body;
    try{
        if(!title || !description){
            return res.status(400).json({message: 'All existing fields must be filled'});
        };

        const findTask = await Task.findOne({where: {title, description}});
        if(findTask){
            return res.status(400).json({message:"Task already exists"});
        };
        const newTask = {
            title,
            description
        };

        const task = await Task.create(newTask);
        return res.status(200).json({message: 'Task has been created successfully', task});
    } catch (error) {
        res.status(500).json(`Internal server error ${error.message}`);
        console.log(error);
    }
});



//              UPDATING A TASK by id
app.patch('/update-task/:id', async (req, res) => {
    const {id} = req.params;
    const {title , description} = req.body;
    try {
        const task = await Task.findOne({where: {id}});
        if(!task){
            return res.status(404).json({message: "Task not found"});
        };
        if(!title || !description) {
            return res.status(400).json({message: "All empty fields must be filled"});
        };
        if(title == task.title && description == task.description){
            return res.status(400).json({message: "New details cannot be the same as previous"});
        }
        await Task.update({title,  description}, { where: {id}});
        return res.status(200).json({message: "Task updated successfully", task})      
    } catch (error) {
        res.status(500).json({message: `Internal Server Error ${error.message}`});
        console.log(error);
    };
});




//                  DELETING A TASK
app.delete('/delete-task/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const task = await Task.findOne({where: {id}});
        if(!task){
            return res.status(404).json({message: "Task not found"});
        };
        await Task.destroy({where: {id}});
        return res.status(200).json({message: "Task deleted successfully"});
    } catch (error) {
        res.status(500).json({message: `Internal Server Error: ${error.message}`});
        console.log(error);
    };
});





app.listen(PORT, async (req, res) => {
    try{
        await sequelize.sync();
        console.log('Connection to database has been successfully establised');
    } catch (error) {
        console.log('Unable to connect to database', error);
    };
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;