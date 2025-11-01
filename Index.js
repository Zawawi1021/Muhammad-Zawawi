const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const drivers = [
    { name: 'Awi', vehicle: 'Myvi', isAvailable: true, rating: 4.9 },
    { name: 'RAzin', vehicle: 'Saga', isAvailable: true, rating: 4.8 },
    { name: 'Aziz', vehicle: 'Axia', isAvailable: false, rating: 4.7 }
];

console.log('Drivers array:', drivers);
console.log('\nDriver names:');
drivers.forEach((d, i) => console.log(`${i + 1}. ${d.name}`));

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('testDB');
        const driverCollection = db.collection('drivers');

        // Insert all drivers at once
        const insertResult = await driverCollection.insertMany(drivers);
        const insertedCount = insertResult.insertedCount || Object.keys(insertResult.insertedIds || {}).length;
        console.log(`Inserted ${insertedCount} drivers into testDB.drivers`);

        // Example update: bump rating for Awi
        const updateResult = await driverCollection.updateOne({ name: 'Awi' }, { $inc: { rating: 0.1 } });
        console.log(`Driver update - matched: ${updateResult.matchedCount}, modified: ${updateResult.modifiedCount}`);

        // Example delete: remove one unavailable driver
        const deleteResult = await driverCollection.deleteOne({ isAvailable: false });
        console.log(`Driver delete - deletedCount: ${deleteResult.deletedCount}`);

    } catch (err) {
        console.error('Error pushing drivers to MongoDB:', err);
    } finally {
        await client.close();
    }
}

// Run push
main();


