require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const sequelize = require('./config/sequelize.js');
const Task = require('./model/task.js');

const app = express();
app.use(express.json());


//          GET ALL TASKs
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

app.post('/create-task', async(req, res) => {
    const {title, description} = req.body;
    try{
        if(!title || !description){
            return res.status(400).json({message: 'All existing fields must be filled'});
        };
        const newTask = {
            title,
            description
        };

        const Task = await Task.create(newTask);
        return res.status(200).json({message: 'Task has been created successfully', task});
    } catch (error) {
        res.status(500).json(`Internal server error ${error.message}`);
        console.log(error);
    }
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