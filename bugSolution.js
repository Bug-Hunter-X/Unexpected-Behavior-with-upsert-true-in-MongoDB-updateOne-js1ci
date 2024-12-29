```javascript
//Instead of relying solely on upsert: true, explicitly handle potential errors and validate data before the update.

function updateUser(name, ageIncrement) {
  //Data validation
  if (typeof ageIncrement !== 'number' || ageIncrement <=0) {
    return Promise.reject('Invalid age increment value');
  }

  const query = { name: name };
  const update = { $inc: { age: ageIncrement } };

  return db.collection('users').updateOne(query, update)
  .then(result => {
    if(result.modifiedCount === 0 && result.upsertedCount === 0){
      return Promise.reject('Update and insertion failed. Check validation rules and data.');
    }
    console.log('User updated or inserted successfully!');
  })
  .catch(error => {
    console.error('Error updating user:', error);
  });
}

//Example usage
updateUser('John Doe', 1)
.then(()=>{
    console.log('Success!')
})
.catch(error => console.error(error));
```