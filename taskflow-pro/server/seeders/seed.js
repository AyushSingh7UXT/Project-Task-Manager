import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';

dotenv.config({ path: '../.env' });

const seed = async () => {
  await connectDB();
  await User.deleteMany();

  await User.create([
    {
      name: 'Admin User',
      email: 'admin@taskflowpro.com',
      password: 'Admin@123',
      role: 'admin'
    },
    {
      name: 'Normal User',
      email: 'user@taskflowpro.com',
      password: 'User@123',
      role: 'user'
    }
  ]);

  console.log('Seed complete');
  process.exit(0);
};

seed();
