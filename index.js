const axios = require('axios');

let properties = [];
// Make a request for a user with a given ID
axios.get('https://www.hyatt.com/explore-hotels/service/hotels')
  .then(response => {
    // // handle success
    let data = response.data

    for (var key of Object.keys(data)) {
      let row = data[key];
      
      if(row && row.rate){
        let obj = {
          value: (row.rate.marketingPointsValue / row.rate.usdRate).toFixed(2),
          name: row.name
        }
        properties.push(obj);
      }
    }
    
    properties.sort((a,b) =>{
      return a.value - b.value;
    })

    console.log(properties)
    
  })
  // .then(props =>{
  //   console.log(props.length)
  // })
  .catch(function (error) {
    // handle error
    console.log(error);
  })