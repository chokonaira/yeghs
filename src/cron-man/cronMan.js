import scheduler from "./scheduler/scheduler";
import deleteUnverifiedTransactions from "./cron-job/deleteOTPs";

// schedule the deleteUnverified transactions job
scheduler(500000, deleteUnverifiedTransactions);
