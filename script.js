'use strict'
const calculating = document.getElementById('start');
const incomeAdd = document.getElementsByTagName('button')[0];
const expensesAdd = document.getElementsByTagName('button')[1];
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetDayValue = document.getElementsByClassName('result-total')[1];
const expensesMonthValue = document.getElementsByClassName('result-total')[2];
const additionalIncomeValue = document.getElementsByClassName('result-total')[3];
const additionalExpensesValue = document.getElementsByClassName('result-total')[4];
const incomePeriodValue = document.getElementsByClassName('result-total')[5];
const targetMonthValue = document.getElementsByClassName('result-total')[6];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
let incomeItems = document.querySelectorAll('.income-items');
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositCheckmark = document.querySelector('.deposit-checkmark');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const budgetMonthValue = document.querySelector('.budget_month-value');
let periodAmount = document.querySelector('.period-amount');
const inputs = document.querySelectorAll('input');
const reset = document.getElementById('cancel')

// let isNumber = function(n) {
//     return !isNaN(parseFloat(n)) && isFinite(n)
// };

let appData = {
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    getStatusIncome: 0,
    expensesMonth: 0,
    start: function() {
        this.budget = +salaryAmount.value;
        this.getIncome();
        this.getAddIncome();
        this.getExpenses();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getTargetMonth();
        this.getBudget();
        this.showResult();
        inputs.forEach(input => {
            input.disabled = true;
        });
        cancel.style.display = "block";
        start.style.display = "none";
        // appData.getTargetMonth();
        // appData.getStatusIncome(); 
    },
    blockStart: () => {
        start.disabled = !salaryAmount.value.trim();
    },
    reset: function(){
        cancel.style.display = "none";
        start.style.display = "block";
        this.income = {};
        this.addIncome = [];
        this.incomeMonth = 0;
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.mission = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.getStatusIncome = 0;
        this.expensesMonth = 0;
        
        // for (let i = incomeItems.length - 1; i > 0; i--) {                                              //
        //     incomeItems[0].parentNode.removeChild(incomeItems[i]);
        // }
        // for (let i = expensesItems.length - 1; i > 0; i--) {
        //     expensesItems[0].parentNode.removeChild(expensesItems[i]);
        // }                                                                                               //
        incomeAdd.style.display = '';
        expensesAdd.style.display = '';
        inputs.forEach(input => {
            input.disabled = false;
            input.value = '';
        });
    },
    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value =this.addExpenses.join(', '); 
        additionalIncomeValue.value = this.addIncome.join(', ')
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeAdd.before(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomeAdd.style.display = 'none';
        }
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        })
        for (let key in this.income){
            this.incomeMonth += +this.income[key]
        }
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        })
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesAdd.before(cloneExpensesItem) ;
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesAdd.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] =  cashExpenses;  
            }
        })
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item); 
            }
        })
    },
    getExpensesMonth: function() { 
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        } 
        console.log('Сумма расходов за месяц:', this.expensesMonth);
    },
    getPeriod: function() {
        periodAmount.textContent = periodSelect.value;
        appData.showResult();
    },
    getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth/30);
        console.log('Ваш дневной бюджет =', this.budgetDay);
    },
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value/this.budgetMonth);
    },
    getStatusIncome: function() {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        } 
    },
    getInfoDeposit: function(){
        if(this.deposit){
            do {
            this.percentDeposit = prompt('Какой годовой процент?');
            } while (!isNumber(this.percentDeposit));
            do {
            this.moneyDeposit = prompt('Какая сумма заложена');
            }  while (!isNumber(this.moneyDeposit));
        }
    },
    calcSavedMoney: function(){
        return this.budgetMonth * periodSelect.value;
    }
};

appData.blockStart();
let foo = appData.start.bind(appData);
let resetFoo = appData.reset.bind(appData);
start.addEventListener('click', foo);
reset.addEventListener('click', resetFoo);

incomeAdd.addEventListener('click', appData.addIncomeBlock);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('change', appData.getPeriod);
salaryAmount.addEventListener('input', appData.blockStart);

// if(appData.budgetMonth>0) {
//     console.log('Период равен', appData.getTargetMonth(), 'месяцев');
// } else {
//     console.log('Цель не будет достигнута');
// }
// appData.getInfoDeposit();





    