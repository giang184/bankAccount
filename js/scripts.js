// Business Logic for BankAccount ---------
function Bank () {
  this.accountList = {};
  this.currentID = 0;
}

Bank.prototype.addAccount = function (account) {
  account.id = this.assignAccountId();
  this.accountList[account.id] = account;
};

Bank.prototype.assignAccountId = function () {
  this.currentID += 1;
  return this.currentID;
};

Bank.prototype.findAccount = function (id) {
  if (this.accountList[id] != undefined) {
    return this.accountList[id];
  }
  return false;
};

Bank.prototype.deleteAccount = function (id) {
  if (this.accountList[id] === undefined) {
    return false;
  }
  delete this.accountList[id];
  return true;
};



// Business Logic for Account ---------
function Account (name, initialDeposit) {
  this.name = name;
  this.balance = initialDeposit;
}

Account.prototype.deposit = function (amount) {
  if(amount){
    this.balance += amount;
  }
};


// User Interface Logic ---------
let myBank = new Bank ();

function displayAccountDetails(bankToDisplay) {
  let accountsList = $("ul#accounts");
  let htmlForAccountInfo = "";
  Object.keys(bankToDisplay.accountList).forEach(function (key) {
    const account = bankToDisplay.findAccount(key);
    htmlForAccountInfo += "<li id=" + account.id + ">" + account.name + "</li>";
  });
  accountsList.html(htmlForAccountInfo);
}

function showAccount(accountId) {
  const account = myBank.findAccount(accountId);
  $("#show-account").show();
  $(".name").html(account.name);
  $(".accountID").html(account.id);
  $(".balance").html(account.balance);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + account.id + ">Delete</button>");
}

function attachAccountListeners() {
  $("ul#accounts").on("click", "li", function () {
    showAccount(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    myBank.deleteAccount(this.id);
    $("#show-account").hide();
    displayAccountDetails(myBank);
  });
}

$(document).ready(function () {
  attachAccountListeners();
  $("form#new-account").submit(function (event) {
    event.preventDefault();
    const inputtedName = $("input#name").val();
    const inputtedInitialDeposit = parseInt($("input#initialDeposit").val());

    $("input#name").val("");
    $("input#initialDeposit").val("");

    const newAccount = new Account(inputtedName, inputtedInitialDeposit);
    myBank.addAccount(newAccount);
    displayAccountDetails(myBank);
  });
});

$(document).ready(function () {
  attachAccountListeners();
  $("form#deposit").submit(function (event) {
    event.preventDefault();
    const accountID = $("input#accountID").val();
    const inputtedDepositAmount = parseInt($("input#deposit").val());
    const inputtedWithdrawalAmount = parseInt($("input#withdrawal").val());

    $("input#accountName").val("");
    $("input#deposit").val("");
    $("input#withdrawal").val("");
    
    const account = myBank.findAccount(accountID);
    if(inputtedDepositAmount)
    {
      account.deposit(inputtedDepositAmount );
    }
    if (inputtedWithdrawalAmount)
    {
      account.deposit(-inputtedWithdrawalAmount);
    }
    showAccount(account.id);
  });
});