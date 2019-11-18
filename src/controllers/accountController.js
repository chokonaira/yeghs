import Account from "../db/models/account";

class AccountController {
  static async createAccount(req, res) {
    try {
      const { holderEmail, balance } = req.body;
      const { email, phone } = req.authUser;
      const BVN = 123456789
      const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
      const createdAt = Date.now();
      const updatedAt = Date.now();
      const values = {
        accountNumber,
        holderEmail,
        balance,
        BVN,
        phone,
        createdAt,
        updatedAt
      };

      if (holderEmail === email) {
        const accountExist = await Account.findOne({})
        if(accountExist){
          return res.status(401).json({
            status: 401,
            message: "Unathorized, You can only have one account with this email."
          });
        }
        const newAccount = new Account(values);
        await newAccount.save();

        return res.status(201).json({
          status: 201,
          message: 'Account created succesfully',
          data: [newAccount]
        });
      
    }
      return res.status(401).json({
        status: 401,
        message: "Unathorized, There is no User linked with this email address."
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

  static async creditAccount(req, res) {
    try {
      const { email } = req.authUser;
      const { amount } = req.body;
      const updatedAt = Date.now();


      if (email) {
        const account = await Account.findOne({});

        const { balance, _id } = account;

        const newBalance = ((+balance) + (+amount))

        const creditedAccount = await Account.findByIdAndUpdate({_id}, {balance: newBalance, updatedAt});

        return res.status(200).json({
          status: 200,
          message: "Accounts credited succcesfully",
          data:  [creditedAccount]
        });
      }
      return res.status(204).json({
        status: 204,
        message: "There is are no accounts available for this user"
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  static async viewUserAccount(req, res) {
    try {
      const { email } = req.authUser;

      if (email) {
        const allAccounts = await Account.find({});
        return res.status(200).json({
          status: 200,
          message: "Accounts fetched succcesfully",
          data:  allAccounts 
        });
      }
      return res.status(204).json({
        status: 204,
        message: "There is are no accounts available for this user"
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
}

export default AccountController;
