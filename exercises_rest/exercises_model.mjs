/**
 * Add your first name and last name.
 * Owen Badzinski
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true}
}, {collection: 'exercises'});

const Exercise = mongoose.model(EXERCISE_DB_NAME, exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
}

const findExercises = async (filter) => {
  const query = Exercise.find(filter);
  return query.exec();
}

const findExercisesID = async (filter) => {
  const query = Exercise.findById(filter);
  return query.exec();
}

async function updateExercise(id, newValues){
    return Exercise.updateOne({ _id: id }, { $set: newValues });
}

const deleteById = async (_id) => {
  const result = await Exercise.deleteOne({ _id: _id });
  return result.deletedCount;
}

export { connect, createExercise, findExercises, findExercisesID, updateExercise, deleteById};