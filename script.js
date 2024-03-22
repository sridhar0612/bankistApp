'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayUi= function(acc){
  //display movements
  displayMovements(acc.movements)
  //display balance
  calcDisplayBalance(acc)
  //display summary
  calcDisplaySummary(acc);
}
const displayMovements= function(movements){
  containerMovements.innerHTML='' 
movements.forEach(function(mov,i){
  //console.log(mov)
  // containerMovements.innerHTML=''
  const type= mov > 0 ? 'deposit':'withdrawal'
  const html= `
  
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
    
    <div class="movements__value">${mov}</div>
    </div>`
   containerMovements.insertAdjacentHTML('afterbegin',html);
})
}

//displayMovements(account1.movements)

const calcDisplayBalance= function (acc){
  const balance= acc.movements.reduce((acc,cur)=>acc+cur,0)
  acc.balance=balance;
  labelBalance.textContent= `${balance}EUR`;
}
// calcDisplayMovements(account1.movements)

//--------------summary----------------------------------

const calcDisplaySummary= function(acc){
  const incomes= acc.movements.filter(mov=> mov>0)
  .reduce((acc,mov)=>acc+mov,0)
  //console.log(incomes)
  labelSumIn.textContent = `${incomes}€`

  const out= acc.movements.filter((mov)=>mov<0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest= acc.movements.filter(mov=>mov>0).map(deposit=>(deposit*1.2)/100)
  .filter(int=>int>=1).reduce((acc,int)=> acc+int,0);
  labelSumInterest.textContent = `${interest}€`;
}
//calcDisplaySummary(account1.movements);


//---------inserting usernames in to the object-------------------
const createUserNames= function(accs){
  accs.forEach((acc)=>{
    acc.userName=  acc.owner
    .toLowerCase() //returns an string
    .split(' ')// returns an array
    .map(name => name[0]) //returns an arreay
    .join(''); // returns a string.
    //console.log(acc)
  })
  
}
createUserNames(accounts)

//----------user Login---------------------------------
let currentAccount
btnLogin.addEventListener('click',(e)=>{
  e.preventDefault();
 // console.log('login')
  currentAccount=accounts.find(acc=>acc.userName===inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin===Number(inputLoginPin.value)){
    
    //display UI and message
    labelWelcome.textContent=`Welcome back ${currentAccount.owner.split(' ')[0]}`
     containerApp.style.opacity="100";
     //clear input fields
     inputLoginUsername.value=inputLoginPin.value='';
     inputLoginPin.blur()
    // display movements
    // displayMovements(currentAccount.movements)
    // display balance
    // calcDisplayBalance(currentAccount)
    // display summary
    // calcDisplaySummary(currentAccount);
    displayUi(currentAccount)
  }
})

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount= Number(inputTransferAmount.value);
  const receiverAcc= accounts.find(acc=>acc.userName===inputTransferTo.value)
  
  console.log(amount,receiverAcc)
  if(amount>0 && currentAccount.balance>0 && receiverAcc?.userName!==currentAccount.userName){
    console.log('valid transit')
    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount)
    displayUi(currentAccount)
  }
  inputTransferAmount.value=inputTransferTo.value=''
})


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits= movements.filter((mov)=>{
  return mov>0 
  })
 // console.log(deposits)

/////////////////////////////////////////////////


//Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). 
For now, they are just interested in knowing whether a dog is an adult or a puppy. 
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const checkDogs= function(dogsJulia , dogsKate){
//   console.log(dogsKate)
// dogsJulia.forEach((dog1,i)=>{
// const compare=dog1>=3 ? 'adult': 'puppy'
// console.log(`Dog number ${i+1} is an ${compare} and is ${dog1} years old `)
// })
// dogsKate.forEach((dog2,i)=>{
//   const compare=dog2>=3 ? 'adult': 'puppy'
//   console.log(`Dog number ${i+1} is an ${compare} and is ${dog2} years old `)
//   })
// }

// let julia=[9, 16, 6, 8, 3];

// const correctJulia=[...julia]

// correctJulia.splice(0,1)
// correctJulia.splice(-2)
// console.log(correctJulia);
// const kate= [4, 1, 15, 8, 3];
// checkDogs(correctJulia,kate)

//------------------------------------------------------------------------------------------------//

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const calcAverageHumanAge=(dogAge)=>{
//   const humanAge= dogAge.map(age=>age<=2 ? 2*age : 16+age*4)
//   .filter(age=>age>=18).reduce((acc,cur,i,arr)=>acc+cur/arr.length,0)
//   return average 
// }
// //console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);