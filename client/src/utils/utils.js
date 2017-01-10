
const post = data => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  })
);

post('ASYNC OPERATION COMPLETE').then((data) => {
  console.log(data);
});
