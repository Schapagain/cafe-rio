
const getCleanTransactions = transactions => {
    
    if (!Array.isArray(transactions)) transactions = [transactions]

    return transactions.map( transaction => {
        let {id,amount,title,date,type,category} = transaction;
            return {id,amount,title,date,type,category}
    })
}

module.exports = {getCleanTransactions}