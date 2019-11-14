import Transaction from "../../db/models/transaction";

const deleteUnverifiedTransactions = async () => {
  const unvarifiedTransactions = await Transaction.find({ isVerified: false });
  const fiveMinutes = 5 * 60 * 1000;
  unvarifiedTransactions.forEach(async transaction => {
    const { transactionDate, _id } = transaction;
    const diff = new Date() - new Date(transactionDate);
    if (diff > fiveMinutes) {
      await Transaction.deleteOne({ _id });
      console.log("Deleted transaction with id: ", _id);
    }
  });
};

export default deleteUnverifiedTransactions;
