

let tempFunction = async(orderArray, tagArray)=>{
  console.log(orderArray.length, "orderArray");
  console.log(tagArray.length, "tagArray");
let tempArray = []
//const found = arr1.some(r=> arr2.includes(r))

  let result = await orderArray.map((item, i) => {
    item.order.item.forEach((orderItem, j) => {
      tagArray.forEach((tagItem, k) => {

        if (orderItem.tag!=='') {
          let splitItem = orderItem.tag.split(',')
            console.log(splitItem.includes(tagItem.tag)===true, item.order.orderId, "checking");
          if (splitItem.includes(tagItem.tag)) {

            orderItem.tagValue = tagItem.inputValue
            // console.log(tagItem.tag, item.order.orderId, splitItem,"if");
            // console.log(orderItem, "orderItem");
            return orderItem;
          }

        }

        else {
          orderItem.tagValue = ["No Tag Found"]
          return orderItem
        }
      });

    });
    tempArray.push(item)
  });

  return Promise.all(tempArray);

}


let matchOrderTags = async(orderArray, tagArray)=>{
  let fun = await tempFunction(orderArray, tagArray)
              .then(arr=>{
                arr.map((order, i) => {
                  order.order.item.forEach((itemData, k) => {
                    if(itemData.tagValue===undefined){
                      itemData.tagValue = ["No Tag Match"]
                      return itemData;
                    }

                  });

                });

                return arr;
              })
              .catch(error=>{
                console.log(error, "catch error");
                return error;
              })
  return fun;
}
module.exports.matchOrderTags = matchOrderTags
