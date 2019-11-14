import Transaction from '../../db/models/transaction';

const deleteUnverifiedTransactions = async () => {
  const deletedOTP = await Transaction.deleteMany({ isVerified: false });

  if (deletedOTP.ok === 1) {
    let result = deletedOTP.n > 1 ? "transaction" : "transaction";
    console.log(`${deletedOTP.deletedCount} Inactive ${result} deleted`);
  } else {
    return "Error deleting OTPs";
  }
};

export default deleteUnverifiedTransactions;
