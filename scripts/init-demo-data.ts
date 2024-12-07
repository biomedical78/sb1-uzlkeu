import { config } from 'dotenv';
import { initializeDemoCourses } from '../src/services/courses';

config();

async function initializeDemoData() {
  console.log('Initializing demo data...');

  try {
    const { success, error } = await initializeDemoCourses();
    
    if (success) {
      console.log('✅ Demo data initialized successfully');
    } else {
      console.error('❌ Failed to initialize demo data:', error);
    }
    
    return success;
  } catch (error) {
    console.error('❌ Demo data initialization failed:', error);
    return false;
  }
}

initializeDemoData().then((success) => {
  process.exit(success ? 0 : 1);
});