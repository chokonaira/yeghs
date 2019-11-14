import scheduler from "./scheduler/scheduler";
import deleteUnverifiedTransactions from "./cron-job/deleteOTPs";

// schedule the deleteInactive users job
scheduler(100000, deleteUnverifiedTransactions);