import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI);

        const connection = mongoose.connection;

        connection.on('connected', async () => {
            console.log("Successfully connected to database.");
        })

        connection.on('error', (error) => {
            console.log("Error in connecting to database." + error);
            process.exit();
        });

    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}