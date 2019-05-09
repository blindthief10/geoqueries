// Having Asynchronous operations

//Way 1 .then()

fetch('urlToHell', {})
.then(response => response.json())
.then(myData => {
  console.log(myData);
}).catch(err => {
  console.log(err);
})

console.log('before or after');

// Async / await
const myAsyncFunction = async () => {
  try {
    const response = await fetch('urlToHell', {});
    const myData = await response.json();
    console.log(myData);
  } catch (error) {
    console.log(error);
  }

}
