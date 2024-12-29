```javascript
const query = { name: 'John Doe' };
const update = { $inc: { age: 1 } };

db.collection('users').updateOne(query, update, { upsert: true });
```