document.write("<script type='text/javascript' src='../main/js/datbase.js'></script>");
document.write("<script type='text/javascript' src='../main/js/main.js'></script>");
window.onload=function(){//显示所有商品信息
    let allItem=Message();
   for(let i=0;i<allItem.length;i++){
       let str="<tr id= good_id_"+i+"><td>"+allItem[i].name+"</td> <td>"+allItem[i].unit+"</td> <td>"+allItem[i].price+"元</td><td>"+allItem[i].charge+"</td>"+
       "<td><button class= 'add_button' onclick='add_Car()'>加入购物车</button>&nbsp;&nbsp;<input class='inputNumber' value='请输入数量' onclick='Input()'/></td>"
       $("#good_list").append(str);
    }
}

function Message(){//将优惠信息添加到商品列表中去
  let  allItem=loadAllItems();
  let load_promotions=loadPromotions();
  for(let i in allItem){
      for(let j in load_promotions){
          if(load_promotions[j].type='BUY_TWO_GET_ONE_FREE'){
             if(load_promotions[j].barcodes.includes(allItem[i].barcode)){
                allItem[i].charge="买二赠一";
             }else{
                allItem[i].charge="无"; 
             } 
          }
      }
  }
  return allItem;
}

 function add_Car(){//添加购物车
    $("#good_list").off().on("click", ".add_button", function(event){
        let tr = $(this).closest("tr");
       let name= $("#good_id_"+(tr.index())).children("td").first().html();
       let text=$(this).next().val();
       let goods=get_all_message(name);
    if(text=="请输入数量"){
        goods.count=1;
    }else{
        goods.count=text;
    }
    let count2=get_car_goods(name);
    if(count2==undefined){
    let str="<tr class='goods'><td>"+goods.name+"</td> <td>"+goods.unit+"</td> <td>"+goods.price+"元</td><td>"+goods.charge+"</td><td class='count'>"+goods.count+"</td>"
  +  "<td><button class= 'add_count' onclick='addCount()'>+</button>&nbsp;&nbsp;<button class= 'reduce_count' onclick='reduceCount()'>-</button></td></tr>";
    $("#car_good_list").append(str);
    }else{
        $("#car_good_list tr").each(function(i){
            let object=[];
            $(this).children('td').each(function(j){
                if($(this).text()==name){
                    $(this).parent().children(".count").html(Number(count2)+Number(goods.count));
                }
            });
        });     
    }
    });
}

function addCount(){
    $("#car_good_list").off().on("click",'.add_count',function(){
       let count=$(this).parent().parent().children('.count').html();
       $(this).parent().parent().children('.count').html(Number(count)+1);
    });
}

function reduceCount(){
    $("#car_good_list").off().on("click",'.reduce_count',function(){
        let count=$(this).parent().parent().children('.count').html();
        let count1=Number(count)-1;
        if(count1==0){
            $(this).parent().parent().remove();
        }else{
            $(this).parent().parent().children('.count').html(count1);
        }
    }); 
}

function get_car_goods(name){//获取购物车里面的信息
   // let result=[];
   let count;
    $("#car_good_list tr").each(function(i){
        let object=[];
        $(this).children('td').each(function(j){
            object.push($(this).text());
        });
        // let good_object={};
        // good_object.name=object[0];
        // good_object.unit=object[1];
        // good_object.price=object[2];
        // good_object.charge=object[3];
        // good_object.count=object[4];
        // result.push(good_object);
        if(object[0]==name){
            count=object[4];
        }
    });
    //alert(count);
    return count;
}

function get_all_message(name){//根据姓名获取商品信息
    let object={};
    let allItem=Message();
    allItem.filter(element=>{
        if(element.name==name){
            object.barcode=element.barcode;
            object.name=element.name;
            object.unit=element.unit;
            object.price=element.price;
            object.charge=element.charge;
            return object;
        }
    });
    return object;
}

function Input(){
    $(".inputNumber").click(function(){
        $(this).val("");
    })
}

