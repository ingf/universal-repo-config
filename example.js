// https://github.com/ryanmcdermott/clean-code-javascript

//// Variables

// Bad:
var FIRST_US_PRESIDENT = 'George Washington'

// Good:
const FIRST_US_PRESIDENT = 'George Washington'

// 使用 ES6 的 const 定义常量

// Bad:
const yyyymmddstr = moment().format('YYYY/MM/DD')

// Good:
const yearMonthDay = moment().format('YYYY/MM/DD')

// 使用有意义，可读性好的变量名

// Bad:
// What the heck is 86400000 for?
setTimeout(blastOff, 86400000)

// Good:
// Declare them as capitalized `const` globals.
const MILLISECONDS_IN_A_DAY = 86400000
setTimeout(blastOff, MILLISECONDS_IN_A_DAY)

// 使用易于检索的名称

// Bad:
const address = 'One Infinite Loop, Cupertino 95014'
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/
saveCityZipCode(
  address.match(cityZipCodeRegex)[1],
  address.match(cityZipCodeRegex)[2]
)

// Good:
const address = 'One Infinite Loop, Cupertino 95014'
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/
const [, city, zipCode] = address.match(cityZipCodeRegex) || []
saveCityZipCode(city, zipCode)

// 使用说明性的变量(即有意义的变量名)

// Bad:
const Car = {
  carMake: 'Honda',
  carModel: 'Accord',
  carColor: 'Blue'
}

function paintCar(car) {
  car.carColor = 'Red'
}

// Good:
const Car = {
  make: 'Honda',
  model: 'Accord',
  color: 'Blue'
}

function paintCar(car) {
  car.color = 'Red'
}

// Don't add unneeded context

//// Functions

// Bad:
function createMicrobrewery(name) {
  const breweryName = name || 'Hipster Brew Co.'
  // ...
}

// Good:
function createMicrobrewery(name = 'Hipster Brew Co.') {
  // ...
}

// Use default arguments instead of short circuiting or conditionals

// Bad:
function createMenu(title, body, buttonText, cancellable) {
  // ...
}

// Good:
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
})

// Function arguments (3 or fewer ideally)

// Bad:
function emailClients(clients) {
  clients.forEach(client => {
    const clientRecord = database.lookup(client)
    if (clientRecord.isActive()) {
      email(client)
    }
  })
}

// Good:
function emailActiveClients(clients) {
  clients.filter(isActiveClient).forEach(email)
}

function isActiveClient(client) {
  const clientRecord = database.lookup(client)
  return clientRecord.isActive()
}

// Functions should do one thing

// Bad:
function addToDate(date, month) {
  // ...
}
const date = new Date()
// It's hard to tell from the function name what is added
addToDate(date, 1)

// Good:
function addMonthToDate(month, date) {
  // ...
}

const date = new Date()
addMonthToDate(1, date)

// Function names should say what they do

// Bad:
function showDeveloperList(developers) {
  developers.forEach(developer => {
    const expectedSalary = developer.calculateExpectedSalary()
    const experience = developer.getExperience()
    const githubLink = developer.getGithubLink()
    const data = {
      expectedSalary,
      experience,
      githubLink
    }

    render(data)
  })
}

function showManagerList(managers) {
  managers.forEach(manager => {
    const expectedSalary = manager.calculateExpectedSalary()
    const experience = manager.getExperience()
    const portfolio = manager.getMBAProjects()
    const data = {
      expectedSalary,
      experience,
      portfolio
    }

    render(data)
  })
}

// Good:
function showEmployeeList(employees) {
  employees.forEach(employee => {
    const expectedSalary = employee.calculateExpectedSalary()
    const experience = employee.getExperience()

    const data = {
      expectedSalary,
      experience
    }

    switch (employee.type) {
      case 'manager':
        data.portfolio = employee.getMBAProjects()
        break
      case 'developer':
        data.githubLink = employee.getGithubLink()
        break
    }

    render(data)
  })
}

// Remove duplicate code
// Rule of three (computer programming): https://en.wikipedia.org/wiki/Rule_of_three_%28computer_programming%29

// Bad:
const menuConfig = {
  title: null,
  body: 'Bar',
  buttonText: null,
  cancellable: true
}
function createMenu(config) {
  config.title = config.title || 'Foo'
  config.body = config.body || 'Bar'
  config.buttonText = config.buttonText || 'Baz'
  config.cancellable =
    config.cancellable !== undefined ? config.cancellable : true
}
createMenu(menuConfig)

// Good:
const menuConfig = {
  title: 'Order',
  // User did not include 'body' key
  buttonText: 'Send',
  cancellable: true
}

function createMenu(config) {
  config = Object.assign(
    {
      title: 'Foo',
      body: 'Bar',
      buttonText: 'Baz',
      cancellable: true
    },
    config
  )
  // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
  // ...
}

createMenu(menuConfig)

// Set default objects with Object.assign

// Bad:
const addItemToCart = (cart, item) => {
  cart.push({ item, date: Date.now() })
}

// Good:
const addItemToCart = (cart, item) => {
  return [...cart, { item, date: Date.now() }]
}

// Avoid Side Effects

// Bad:
Array.prototype.diff = function diff(comparisonArray) {
  const hash = new Set(comparisonArray)
  return this.filter(elem => !hash.has(elem))
}

// Good:
class SuperArray extends Array {
  diff(comparisonArray) {
    const hash = new Set(comparisonArray)
    return this.filter(elem => !hash.has(elem))
  }
}

// Don't write to global functions

//// ES6/ES7 features

// Bad:
function foo() {
  // code
}

// Good:
let foo = () => {
  // code
}

// arrow function

// Bad:
var message = 'Hello ' + name + ", it's " + time + ' now'

// Good:
const message = `Hello ${name}, it's ${time} now`

// template string

// Bad:
var data = { name: 'dys', age: 1 }
var name = data.name,
  age = data.age

// Good:
const data = { name: 'dys', age: 1 }
const { name, age } = data

// Destructuring

// Bad:
// 那个复杂的原型链继承就不贴代码了

// Good：
class Animal {
  constructor(age) {
    this.age = age
  }

  move() {
    /* ... */
  }
}

class Mammal extends Animal {
  constructor(age, furColor) {
    super(age)
    this.furColor = furColor
  }

  liveBirth() {
    /* ... */
  }
}
// Prefer ES2015/ES6 classes over ES5 plain functions

// Bad:
import { get } from 'request-promise'
import { writeFile } from 'fs-promise'

get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin')
  .then(response => {
    return writeFile('article.html', response)
  })
  .then(() => {
    console.log('File written')
  })
  .catch(err => {
    console.error(err)
  })

// Good:
import { get } from 'request-promise'
import { writeFile } from 'fs-promise'

async function getCleanCodeArticle() {
  try {
    const response = await get(
      'https://en.wikipedia.org/wiki/Robert_Cecil_Martin'
    )
    await writeFile('article.html', response)
    console.log('File written')
  } catch (err) {
    console.error(err)
  }
}

// Async/Await are even cleaner than Promises
