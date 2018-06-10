document.write("<script type='text/javascript' src='../main/js/datbase.js'></script>");
function main(input) {
    let input_items=printInventory(input);
    let items_message=getItemsMessage(input_items);
    let promotions=promotionsItems(items_message);
    Items_list(items_message,promotions);
}
function printInventory(inputs){
    let input_items=[];
    let input_items_list=[];
    
    for(let i in inputs){
        if(/-/ig.test(inputs[i])){
            let temp=inputs[i].split('-');
            input_items[temp[0]]=temp[1];
        }else{
            if(input_items[inputs[i]]){
                input_items[inputs[i]]++;
            }else{
                input_items[inputs[i]]=1;
            }
        }
    }
   
    for(let i in input_items){
        let new_object={};
        new_object.barcode=i;
        new_object.count=input_items[i];
        input_items_list.push(new_object);
    }
    return input_items_list;
}

function getItemsMessage(input_item){
    let loadAllItems=Items.loadAllItems();
    let ItemsMessage=[];
    for(let i in loadAllItems){
        input_item.filter(element=>{
        if(element.barcode===loadAllItems[i].barcode){
           var new_object={};
           new_object.barcode=element.barcode;
           new_object.count=element.count;
           new_object.unit=loadAllItems[i].unit;
           new_object.name=loadAllItems[i].name;
           new_object.price=loadAllItems[i].price;
          return ItemsMessage.push(new_object);
        }
    });
   }
    return ItemsMessage;
}

function promotionsItems(items_message){
    let load_promotions=loadPromotions();
    let promotions_item=[];
    for(let i in load_promotions){
        if(load_promotions[i].type=='BUY_TWO_GET_ONE_FREE'){
            for(let j in load_promotions[i].barcodes){
        items_message.filter(element=>{
            if(load_promotions[i].barcodes[j]==element.barcode){
                let new_object={};
                new_object.barcode=element.barcode;
                new_object.name=element.name;
                new_object.price=element.price;
                new_object.count=1;
                new_object.unit=element.unit;
                return promotions_item.push(new_object);
            }
        });
    }
    }
}
return promotions_item;
}

function Items_list(items_message,promotions){
var str='***<没钱赚商店>购物清单***\n';

for(let i in items_message){
    items_message[i].count2=items_message[i].count;
}
for(let i in promotions){
    for(let j in items_message){
        if(items_message[j].barcode === promotions[i].barcode){
            items_message[j].count2--;
        }
    }
}

for(let i in items_message){
    str=str+'名称：'+items_message[i].name+'，数量：'+items_message[i].count+items_message[i].unit+
    '，单价：'+items_message[i].price.toFixed(2)+'(元)，小计：'+(items_message[i].count2*items_message[i].price).toFixed(2)
    +'(元)\n';
}

str=str+ '----------------------\n'+'挥泪赠送商品：\n' ;
for(let i in promotions){
    str=str+'名称：'+promotions[i].name+'，数量：'+promotions[i].count+promotions[i].unit+'\n';
}
str=str+'----------------------\n';

let price=items_message.reduce(function(value,element){
    return value+element.count2*element.price;
},0).toFixed(2);
let promotions_price=promotions.reduce(function(value,element){
    return value+element.count*element.price;
},0).toFixed(2);
str=str+"总计："+price+'(元)\n节省：' +promotions_price+'(元)\n' +
'**********************';
console.log(str);
return str;
}
