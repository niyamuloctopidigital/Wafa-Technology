const dbConnect = require('./src/lib/mongodb');
const User = require('./src/models/User');

(async () => {
  try {
    await dbConnect();
    const user = await User.findOne({ email: 'wafa@gmail.com' }).lean();
    console.log(user ? JSON.stringify(user, null, 2) : 'no user');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
})();
