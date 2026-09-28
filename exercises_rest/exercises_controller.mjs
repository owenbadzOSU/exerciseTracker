/**
 * Add your first name and last name.
 * Owen Badzinski
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});


app.post('/exercises', asyncHandler(async (req, res) => {
    
   
    if (!isValid(req.body)){
        return res.status(400).json({ Error: "Invalid request" });
    }
   const exercise = await exercises.createExercise(req.body.name, 
                            req.body.reps, 
                            req.body.weight,
                            req.body.unit,
                            req.body.date
                        );
    return res.status(201).json(exercise);


}));

function isValid(body){
    if (body.name === undefined || body.reps === undefined || body.weight === undefined || body.unit === undefined || body.date === undefined){
        return false
   }

   const allowed = ["name", "reps", "weight", "unit", "date"];
   const keys = Object.keys(body);

    for (const key of keys) {
        if (allowed.includes(key) === false) {
            return false
        }
    }

   if (typeof(body.name) !== "string" || typeof(body.reps) !== "number" || typeof(body.weight) !== "number" || typeof(body.unit) !== "string" || typeof(body.date) !== "string"){
        return false
   }

   if(!Number.isInteger(body.reps)){
    return false
   }

   if(!Number.isInteger(body.weight)){
    return false
   }


   if(body.name.length < 1){
        return false
   }

   if(body.reps < 1){
        return false
   }

   if(body.weight < 1){
        return false
   }

   if(body.unit !== "lbs" && body.unit !== "kgs"){
        return false
   }

   if(isDateValid(body.date) === false){
        return false
   }

   return true
}


/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}


app.get('/exercises', asyncHandler(async (req, res) => {
    const exercisesList = await exercises.findExercises(req.query)
    return res.json(exercisesList)
}));

app.get('/exercises/:id', asyncHandler(async (req, res) => {
    const exercise = await exercises.findExercisesID(req.params.id);
    if (!exercise) {
      return res.status(404).json({ Error: "Not found" });
    }
    else{
        return res.json(exercise)
    }
    
    
}));

app.put('/exercises/:id', asyncHandler(async (req, res) => {
    if (!isValid(req.body)){
        return res.status(400).json({ Error: "Invalid request" });
    }
    const exercise = await exercises.findExercisesID(req.params.id);
    if (!exercise) {
      return res.status(404).json({ Error: "Not found" });
    }
    else{
        await exercises.updateExercise(req.params.id, req.body)
        const updatedExercise = await exercises.findExercisesID(req.params.id);
        return res.json(updatedExercise)
    }
}));

app.delete('/exercises/:id', asyncHandler(async (req, res) => {
    const exercise = await exercises.findExercisesID(req.params.id);
    if (!exercise) {
      return res.status(404).json({ Error: "Not found" });
    }
    else{
        await exercises.deleteById(req.params.id)
        res.status(204).send()
    }
}));