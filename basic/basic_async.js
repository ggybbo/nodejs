const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      // cb('callback is done!!!!');
      resolve('callback is done!!!!');
    }, 1000);
  });
  return promise;
}

setTimeout(() => {
  console.log('Timer is done!!!!');
  fetchData()
    .then(text => {
      console.log(text);
      return fetchData();
    }).then(text2 => {
      console.log(text2);
    });
}, 2000);