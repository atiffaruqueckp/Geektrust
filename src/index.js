const fs = require("fs");
const filename = process.argv[2];
const moment= require('moment')
let Plans = {
    MUSIC: {
    FREE:{
        amount:0,
        time:1
    },
    PERSONAL:{
        amount:100,
        time:1
    }
    ,PREMIUM:{
        amount:250,
        time:3
    }
}
,VIDEO:{
    FREE:{
        amount:0,
        time:1
    },
    PERSONAL:{
        amount:200,
        time:0
    }
    ,PREMIUM:{
        amount:500,
        time:3
    }
},
PODCAST : {
    FREE:{
        amount:0,
        time:1
    },
    PERSONAL:{
        amount:100,
        time:1
    }
    ,PREMIUM:{
        amount:300,
        time:2
    }
}
}
let topUp = {
    FOUR_DEVICE:{
        amount:50,
        device:4
    },
    TEN_DEVICE:{
        amount:100,
        device:10
    },
   
}
let subPlan= {};
let planList = [];
let totalPrice= 0;
let TOPUPLIST = [];
function main(dataInput) {
    var inputLines = dataInput.toString().split("\n")
    for (i = 0; i < inputLines.length; i++) {
        if (inputLines) {
            let input = inputLines[i].split(' ')
            switch (input[0]) {
                case 'START_SUBSCRIPTION':
                    addDate(input[1].trim());
                    break;
                case 'ADD_SUBSCRIPTION':
                    subScription(input[1],input[2]);
                    break;
                case 'ADD_TOPUP':
                    addTop(input[1],input[2]);
                        break;
                case 'PRINT_RENEWAL_DETAILS':
                    printInfo()
                        break;
                
            }
        }
    }
}
const printInfo =()=>{
    if(planList.length === 0){
        console.log('SUBSCRIPTIONS_NOT_FOUND');
        return;
    }
    for(j=0;j<planList.length;j++){
        console.log('RENEWAL_REMINDER '+planList[j].type+' '+planList[j].enDate);
    }
    console.log('RENEWAL_AMOUNT '+ totalPrice);
}

data = fs.readFileSync(process.argv[2]).toString();

const subScription= (type,plan)=>{
    let planDetails =  Plans[type];
    let month = planDetails[plan.trim()].time
    if(subPlan.date == 'NULL'){
        console.log('ADD_SUBSCRIPTION_FAILED INVALID_DATE');
        return;
    }
    
    let enDate = moment(subPlan.date, "DD-MM-YYYY").add(month, 'M').format('DD-MM-YYYY');
    let obj = {
        type,
        plan,
        startDate:subPlan.date,
        enDate: moment(enDate, "DD-MM-YYYY").subtract(10, 'days').format('DD-MM-YYYY')
    }
    let checkSub = planList.find(item=>item.type.trim()==type.trim())
    if(checkSub){
        console.log('ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY');
        return;
    } 
    if(!checkSub){
        planList.push(obj);
      totalPrice = totalPrice  + planDetails[plan.trim()].amount
    }

}


main(data);


module.exports = { main }