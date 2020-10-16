

module.exports.matchOrderTags = async(orderArray, tagArray)=>{
  console.log(orderArray.length, "orderArray");
  console.log(tagArray.length, "tagArray");
let tempArray = []

  let result = await orderArray.map((item, i) => {
    item.order.item.forEach((orderItem, j) => {
      tagArray.forEach((tagItem, k) => {

        if (orderItem.tag!=='') {


          let splitItem = orderItem.tag.split(',')

          if (splitItem.includes(tagItem.tag)) {

            orderItem.tagValue = tagItem.inputValue
            console.log(orderItem, "orderItem");
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
