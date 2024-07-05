function fm_ret(){  
  //get_app_default();
  FM_TRANS='RET';
  FM_FM_MODE=2;
  FM_TABLE=DB_RET;    FM_TABLE_NAME='ret';
  FM_TABLE2=DB_RET2;  FM_TABLE_NAME2='ret2';

  FM_RKEY='trano';  FM_RKEY2='stockno';
  FM_CB='';

  FM_FIELDS=[ //display on screen; disp:1s and disp:0s 
    { div:"tx_trano", fld:"trano", type:"text", disp:1, save:true },
    { div:"tx_date", fld:"date", type:"date", disp:1, save:true },
    { div:"tx_areano", fld:"areano", type:"text", disp:0, save:true }
  ];
  
  FM_FIELDS2=[ //display on screen
    { hd:"", fld:"stockno", type:"text", input:false, width:"10%", align:"center", dupli:1, err:"Please enter Vaccine", disp:0, save:true },
    { hd:"", fld:"trano", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"date", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },    
    { hd:"", fld:"cost", type:"double", input:true, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },    
    { hd:"", fld:"amount", type:"double", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },    
    
    //{ hd:"", fld:"type", type:"number", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    
    { hd:"", fld:"areano", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"refno", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    //{ hd:"", fld:"docno", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:true },
    { hd:"", fld:"loc", type:"number", input:true, width:"10%", align:"center", dupli:0, err:"Please enter Location", disp:0, save:true },
    //{ hd:"Sub Area", fld:"areaname", type:"text", input:false, width:"25%", align:"left", dupli:0, err:"Please enter Sub Area.", disp:1, save:true },    
    { hd:"Vaccine", fld:"descrp", type:"text", input:false, width:"35%", align:"left", dupli:0, err:"Please enter an Item.", disp:1, save:true },
    { hd:"Lot No.", fld:"lotno", type:"text", input:true, width:"23%", align:"center", dupli:1, err:"Please enter Lot No.", disp:1, save:true },    
    { hd:"Expiry", fld:"expiry", type:"date", input:true, width:"12%", align:"center", dupli:0, err:"Please enter Expiry", disp:1, save:true },
    { hd:"Location", fld:"get_loc|loc", type:"text", input:true, width:"10%", align:"center", dupli:0, err:"Please enter Location", disp:1, save:false },    
    //{ hd:"Qty", fld:"qty", type:"number", input:true, width:"10%", align:"center", dupli:0, err:"Please enter Quantity.", disp:1, save:true },
    { hd:"Qty", fld:"qty", type:"number", input:true, width:"10%", align:"center", dupli:0, err:"Please enter Quantity.", disp:1, save:true },
    //{ hd:"R-Date", fld:"ret_date", type:"date", input:true, width:"12%", align:"center", dupli:0, err:"Please enter Returned Date.", disp:1, save:true },
    { hd:"RTI", fld:"rti", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"Please enter RTI flag.", disp:1, save:true }
    /*
    { hd:"FILLER", fld:"loc", type:"number", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:false },
    { hd:"FILLER", fld:"stockno", type:"text", input:false, width:"10%", align:"center", dupli:0, err:"", disp:0, save:false },
    { hd:"FILLER", fld:"qty", type:"number", input:false, width:"10%", align:"center", dupli:0, err:"Please enter .Quantity.", disp:0, save:false }
    */
  ];
    
  var fm_ob = {
    title:"RETURNS MASTER FILE",  
    title2:"RETURNS",
    width:"700px",height:"270px",
    foot:0
  };  
  FM_TITLE=fm_ob.title;
  
  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="290px";
  }
    
  var fm_layout_width='15';
  if(JBE_MOBILE){ fm_layout_width='33'; }

  var fm_layout=
    
    '<input id="tx_areano" type="text" style="display:none;" />'+

    '<div id="div_FM_head" style="width:100%;height:100px;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+

      '<div style="display:none;">'+        
        '<span id="rcvd_name"></span>'+  
        '<span id="rcvd_pos"></span>'+  
        '<span id="rcvd_tel"></span>'+  
      '</div>'+

      '<div class="cls_fm_dtl">'+        
        '<div style="width:'+fm_layout_width+'%;">'+    
          '<span onclick="JBE_SHOW_LOGGER(tx_trano.value,&quot;'+FM_TRANS+'&quot;)" style="float:left;cursor:help;">Ref No.:</span>'+
          '<input id="lu_trano" type="image" src="gfx/jsearch.png" onclick="lookup_trano_fm_ret(tx_trano.value)" />'+
        '</div>'+
        '<input id="tx_trano" type="text" style="width:40%;" data-docno="" onchange="FM_CHK_REC(tx_trano.value);chg_date_ret();" data-caption="Transaction No." value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_trano.id).focus()" />'+
        //'<input id="tx_trano" type="text" style="width:40%;" data-docno="" onchange="chk_trano_ret(this.value)" data-caption="Transaction No." value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_trano.id).focus()" />'+
        
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div style="width:'+fm_layout_width+'%;">Date:</div>'+  
        '<input id="tx_date" type="date" disabled style="width:40%;pointer-events:auto;" data-caption="Date" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_date.id).focus()" />'+
      '</div>'+
      
      '<div class="cls_fm_dtl">'+ 
        '<div style="width:'+fm_layout_width+'%;">'+               
          '<span>Sub Area:</span>'+
          '<input id="lu_areano" type="image" src="gfx/jsearch.png" data-caption="Sub Area Name" onclick="lookup_subarea_fm_ret(tx_areano.value)" />'+
        '</div>'+
        '<input id="tx_areaname" type="text" data-caption="Details" disabled style="width:'+(100-fm_layout_width+0)+'%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_areaname.id).focus()" />'+
      '</div>'+

    '</div>';
  
  FM_FUNC={
    lu:"lookup_fm_ret",
    look:"look_fm_ret",
    init:"init_fm_ret",
    add:"add_fm_ret",    
    edit:"edit_fm_ret",
    del:"del_fm_ret",
    prn:"prn_fm_ret",
    disp:"disp_fm_ret",
    save:"save_fm_ret",
    add_item:"add_item_fm_ret"
  }
  FM_MAIN(fm_ob,fm_layout);
  //var fm_layout_height=H_BODY-parseInt(document.getElementById('div_FM_head').style.height);
  //document.getElementById('div_FM_dtl').style.height=(fm_layout_height-70)+'px';
} 

function chg_date_ret(){
  //tx_date.value='2022-10-01';
  let trano=tx_trano.value;
  let v_date=JBE_DATE_FORMAT(trano.substring(4,trano.length-3),'YYYY-MM-DD');
  //alert(trano+' xxx '+v_date);
  tx_date.value=v_date;
  return;
  if(isDate(v_date)){       
    v_date=JBE_DATE_FORMAT(v_date,'YYYY-MM-DD');
    document.getElementById('ptrdate').value=v_date;        
    edit_ptr();
  }else{
    //alert('invalid date:'+v_date); 
    MSG_SHOW(vbOk,"ERROR:","Invalid entry.",function(){},function(){}); 
    init_ptr(); 
    return; 
  }
}

function lookup_trano_fm_ret(){  
  var flds=[
    { title:"", fld:"areano", type:"text", width:"25%", align:"left" },
    { title:"Ref. No", fld:"trano", type:"text", width:"25%", align:"left" },
    { title:"Date", fld:"date", type:"date", width:"25%", align:"left" },
    { title:"Sub Area", fld:"get_area|areano", type:"text", width:"50%", align:"left" }
  ];
  var ob=[
    { val:tx_trano.value, fld:"trano" }
  ];
  FM_LOOKUP2(true,tx_trano.value,ob,FM_TABLE,['*trano'],'LOOKUP','do_lookup_trano_fm_ret',flds);
}

function do_lookup_trano_fm_ret(ndx){	  
  if(ndx == -1){ 
    FM_INIT_REC();
    return; 
  }
  let val=document.getElementById('dd_trano'+ndx).innerHTML;
  let areano=document.getElementById('dd_areano'+ndx).innerHTML;
  document.getElementById('tx_trano').innerHTML=val;
  document.getElementById('tx_areaname').value=JBE_GETFLD('name',DB_AREA,'areano',areano);
  let vtype=JBE_GETFLD('type',DB_STOCK,'stockno',val);
  FM_DISP_REC(val);
  //look_fm_ret();
}

function lookup_subarea_fm_ret(){
  var flds=[    
    { title:"Area Name", fld:"name", type:"text", width:"50%", align:"center" },
    { title:"Area No", fld:"areano", type:"text", width:"50%", align:"center" }
  ];
  var ob=[
    { val:tx_areano.value, fld:"areano" }
  ];
  FM_LOOKUP2(true,tx_areaname.value,ob,DB_AREA,['name'],'LOOKUP','do_lookup_subarea_fm_ret',flds);
}
function do_lookup_subarea_fm_ret(ndx){  
  if(ndx == -1){ 
    document.getElementById('tx_areano').value='';
    document.getElementById('tx_areaname').value='';
    return; 
  }
  let val=document.getElementById('dd_areano'+ndx).innerHTML;  
  document.getElementById('tx_areano').value=val;
  document.getElementById('tx_areaname').value=document.getElementById('dd_name'+ndx).innerHTML;
}

function clear_add_item_ret(){
  document.getElementById('txt_stockno').innerHTML='';
  document.getElementById('txt_lotno').value='';
  document.getElementById('txt_loc').value='';
  document.getElementById('txt_descrp').innerHTML='';
}

function lookup_stock_fm_ret(){  
  /*
  let areano=document.getElementById('tx_areano').innerHTML;
  if(!areano){
    snackBar('Please enter Sub-Area first...');
    return;
  }
  */
    
  var flds=[        
    { title:"", fld:"stockno", type:"text", width:"0%", align:"center" },
    //{ title:"", fld:"expiry", type:"date", width:"0%", align:"center" },
    { title:"", fld:"cost", type:"double", width:"0%", align:"center" },    
    { title:"", fld:"refno", type:"text", width:"15%", align:"center" },
    { title:"Vaccine", fld:"descrp", type:"text", width:"25%", align:"center" },
    { title:"Lot No", fld:"lotno", type:"text", width:"18%", align:"center" },
    { title:"Expiry", fld:"expiry", type:"date", width:"15%", align:"center" },
    { title:"RSI Date", fld:"date_rel", type:"date", width:"15%", align:"center" },
    { title:"Qty", fld:"qty", type:"number", width:"7%", align:"center" },
    { title:"Ref-No", fld:"trano", type:"text", width:"20%", align:"center" }    
  ];
  
  //alert('tx_areano.value:'+tx_areano.value);
  var newArr1 = DB_PTR2.filter(function(DB_PTR2) {
    return DB_PTR2.areano == tx_areano.value;
  });
  
  /*
  alert('lookup'+
    '\nv_areano:'+tx_areano.value+
    '\nv_stockno:'+txt_stockno.innerHTML+
    '\nv_lotno:'+txt_lotno.value+
    '\nv_cost:'+txt_cost.value+
    '\nv_amt:'+txt_amount.innerHTML+
    '\nv_loc:'+txt_loc.value+
    '\nv_refno:'+txt_refno.innerHTML
  );
  */
  
  var ob=[
    { val:txt_stockno.innerHTML, fld:"stockno" },
    { val:txt_lotno.value, fld:"lotno" },
    { val:txt_refno.innerHTML, fld:"trano" }
  ];
  FM_LOOKUP2(true,txt_descrp.innerHTML,ob,newArr1,['*trano','*date','descrp'],'LOOKUP','do_lookup_stock_fm_ret',flds,'fld_color_rt');
}

function fld_color_rt(){
  var len_look=document.querySelectorAll('.cls_names').length; 
  for(var i=0;i<len_look;i++){
    let v_trano=document.getElementById('dd_trano'+i).innerHTML;
    console.log('*** fld_color_rt: '+v_trano);
    if(!v_trano || v_trano===undefined){ document.getElementById('d_'+i).style.color='blue'; }
  }
}

function do_lookup_stock_fm_ret(ndx){	  
  if(ndx == -1){ 
    clear_add_item_ret();    
    return; 
  }  
  let val=document.getElementById('dd_stockno'+ndx).innerHTML;
  let lotno=document.getElementById('dd_lotno'+ndx).innerHTML;
  let ptr_qty=document.getElementById('dd_qty'+ndx).innerHTML;
  let qty=document.getElementById('txt_qty').value;
  
  //alert('PTR Qty:'+ptr_qty+'\nRET Qty:'+txt_qty.value+'\nTOTAL:'+(ptr_qty*qty));
  let cost=Number(document.getElementById('dd_cost'+ndx).innerHTML);
  if(!cost){
    cost=JBE_GETFLD2('cost',DB_RECEIVE2, [
      { "fld":"stockno","val":val },
      { "fld":"lotno","val":lotno }
    ]);
    txt_amount.innerHTML=qty*cost;
  }
  //alert('cost:'+cost+'\nQty:'+qty+'\nAmt:'+txt_amount.innerHTML);
  document.getElementById('txt_stockno').innerHTML=val;
  document.getElementById('txt_lotno').value=lotno
  document.getElementById('txt_descrp').innerHTML=document.getElementById('dd_descrp'+ndx).innerHTML;
  let vtype=JBE_GETFLD('type',DB_STOCK,'stockno',val);
  document.getElementById('txt_expiry').value=document.getElementById('dd_expiry'+ndx).innerHTML;
  document.getElementById('txt_cost').value=cost;
  document.getElementById('txt_refno').innerHTML=document.getElementById('dd_trano'+ndx).innerHTML;  
  document.getElementById('txt_ptr_qty').innerHTML=ptr_qty;  
  if(qty){ chg_qty_ret(qty); }  
}

//
function init_fm_ret(){  
  document.getElementById('tx_trano').value='';  
  document.getElementById('lu_trano').disabled=false;
  document.getElementById('lu_trano').style.opacity='1';    

  document.getElementById('lu_areano').style.opacity='0.5';    
  document.getElementById('lu_areano').disabled=true;
  //document.getElementById('tx_areaname').disabled=true;
  document.getElementById('tx_areaname').value='';
}

function add_fm_ret(){  
  //alert('add_fm_ret');
  let prfx='RET ';
  //let last_trano='1';
  let v_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');  
  //let sql='SELECT * FROM '+FM_TABLE_NAME+' ORDER BY trano';
  let sql='SELECT * FROM ret ORDER BY trano';
  //axios.get('/api/fmlib_get', { params: {sql:sql} })
  console.log(FM_TABLE_NAME);
  axios.get('/items/fmlib_get', { params: {tbl:FM_TABLE_NAME} })
  .then(function (response) { 
    let newArr=response.data;    
    var last_trano='1';
    let last_date=v_date;
    //let v_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
    if(newArr.length > 0){ 
      newArr.sort(JBE_SORT_ARRAY(['trano']));
      last_trano=newArr[newArr.length-1].trano; 
      last_date=JBE_DATE_FORMAT(newArr[newArr.length-1].date,'YYYY-MM-DD');
      if(last_date > v_date){v_date=last_date; }
      //v_date=last_date;
      
    }
    var new_trano=prfx+v_date;
    var v_num=0;
    
    if(last_trano.substring(0,14) == new_trano){
      v_num=parseInt(last_trano.substring(15,17))+1;
    }else{
      v_num=1;
    }
    new_trano=new_trano+'-'+v_num.toString().padStart(2,0);  
    console.log('ret new trano: '+new_trano);

    document.getElementById('tx_trano').value=new_trano;  
    document.getElementById('tx_trano').disabled=false;
    //document.getElementById('btn_name').disabled=false;
    document.getElementById('tx_trano').setAttribute('data-docno',new_trano);
    document.getElementById('tx_date').value=v_date;  
    document.getElementById('lu_areano').disabled=false;
    document.getElementById('lu_areano').style.opacity='1'; 
        
    //FM_FORCE_ADDREC(FM_TRANS,new_trano,'edit_fm_ret','tx_trano');    
  })    
  .catch(function (error) { console.log(error); });
}
//

function add_item_fm_ret(f_add){
  var curRow=document.getElementById('div_FM_dtl_div2').getAttribute('data-row');
  var recno=document.getElementById('tx_trano').value;
  var v_areaname=document.getElementById('tx_areaname').value;
  var v_date=document.getElementById('tx_date').value;
  
  //alert('add_item_fm_ret(f_add):'+f_add);
  if(!recno){ 
    snackBar('Ref. No. is Empty.');
    document.getElementById('tx_trano').focus();
    return false;
  }
  if(!v_date){ 
    snackBar('Date is Empty.');
    document.getElementById('tx_date').focus();
    return false;
  }

  if(!v_areaname){ 
    snackBar('Sub Area is Empty.');
    //document.getElementById('tx_trano').focus();
    return false;
  }

  var len_dtls=document.querySelectorAll('.dtls').length;   
  if(len_dtls==0 && !f_add){ 
    snackBar('Cannot Edit empty record');
    return false;
  }

  let v_vaccine='';
  let v_lotno='';
  let v_loc='';
  let v_stockno='';
  let v_expiry='';
  let v_cost='';
  let v_amount=0;
  let v_ptr_qty=0;
  //let v_areaname='';
  let v_areano=tx_areano.value;
  let v_qty='';
  //let v_ret_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  let v_rti='-';
  let v_trano=recno;  
  let v_refno='';

  if(!f_add){
    v_vaccine=document.getElementById('dtl_descrp_'+curRow).innerHTML;
    v_lotno=document.getElementById('dtl_lotno_'+curRow).innerHTML;
    v_loc=document.getElementById('dtl_loc_'+curRow).innerHTML;
    v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_'+curRow).innerHTML);
    v_rti=document.getElementById('dtl_rti_'+curRow).innerHTML;
    v_stockno=document.getElementById('dtl_stockno_'+curRow).innerHTML;
    v_expiry=JBE_DATE_FORMAT(document.getElementById('dtl_expiry_'+curRow).innerHTML,'YYYY-MM-DD');
    v_cost=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_cost_'+curRow).innerHTML);
    v_amount=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_amount_'+curRow).innerHTML);
    v_refno=document.getElementById('dtl_refno_'+curRow).innerHTML;
    v_trano=document.getElementById('dtl_trano_'+curRow).innerHTML;
  }

  if(!v_ptr_qty || v_ptr_qty==0){
    v_ptr_qty=JBE_GETFLD2('qty',DB_PTR2,[
      { "fld":"trano","val":v_refno },
      { "fld":"stockno","val":v_stockno },
      { "fld":"lotno","val":v_lotno }
    ]);    
  }
    
  var dtl=          
    '<div id="div_name" data-zoom=0 style="width:100%;height:100%;font-text:14px;padding:5px;background-color:white;">'+  
      '<div class="class_mtr0" style="display:none;margin-top:5px;">'+                        
        '<span id="txt_trano" class="class_mtr2" style="width:50%;color:red;">'+v_trano+'</span>'+
        '<span id="txt_stockno" class="class_mtr2" style="width:50%;color:red;">'+v_stockno+'</span>'+
        '<span id="txt_amount" class="class_mtr2" style="width:50%;color:red;">'+v_amount+'</span>'+
        '<span id="txt_ptr_qty" class="class_mtr2" style="width:50%;color:red;">'+v_ptr_qty+'</span>'+
        '<span id="txt_areano" class="class_mtr2" style="width:50%;color:red;">'+v_areano+'</span>'+
        '<span id="txt_date" class="class_mtr2" style="width:50%;color:red;">'+v_date+'</span>'+
        '<span id="txt_refno" class="class_mtr2" style="width:50%;color:red;">'+v_refno+'</span>'+  
        '<span id="txt_old_loc" class="class_mtr2" style="width:50%;color:red;">'+v_loc+'</span>'+       
      '</div>'+ 
      /*
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Sub-Area:</span>'+        
        '<span id="tx_areaname" class="class_mtr2" style="width:50%;color:red;overflow:auto;">'+v_areaname+'</span>'+
        '<button id="btn_areaname" style="float:right;width:40px;height:100%;font-weight:bold;margin-right:3px;border-radius:5px;color:white;background:'+JBE_CLOR+';" onclick="lookup_subarea_fm_ret()">...</button>'+        
      '</div>'+ 
      */
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Vaccine:</span>'+        
        '<span id="txt_descrp" class="class_mtr2" style="width:50%;color:red;overflow:auto;">'+v_vaccine+'</span>'+
        '<button id="btn_descrp" style="float:right;width:40px;height:100%;font-weight:bold;margin-right:3px;border-radius:5px;color:white;background:'+JBE_CLOR+';" onclick="lookup_stock_fm_ret()">...</button>'+        
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Lot No.:</span>'+        
        '<input type="text" id="txt_lotno" class="class_mtr2" disabled style="color:red;overflow:auto;" value="'+v_lotno+'" />'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Expiry:</span>'+        
        '<input type="date" id="txt_expiry" class="class_mtr2" disabled style="color:red;overflow:auto;" value="'+v_expiry+'" />'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Cost:</span>'+        
        '<input type="number" id="txt_cost" class="class_mtr2" disabled style="color:red;overflow:auto;" value="'+v_cost+'" />'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Quantity:</span>'+        
        '<input type="number" id="txt_qty" onchange="chg_qty_ret(this.value)" class="class_mtr2" style="color:red;overflow:auto;" value="'+v_qty+'" />'+
      '</div>'+
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Location:</span>'+        
        '<select id="txt_loc" name="txt_loc" onchange="chg_loc_ret(this.value)" class="class_mtr2" style="float:left;width:50%;color:red;height:100%;padding:0px;">';
          let dtlfld='';            
          for(var i=0;i < DB_WHOUSE.length;i++){
            let vsel='';
            if(v_loc==DB_WHOUSE[i].whcode){ vsel='selected'; }
            dtlfld+='<option '+vsel+' value="'+DB_WHOUSE[i].whcode+'">'+DB_WHOUSE[i].name+'</option>';
          }
          dtl+=dtlfld+
        '</select>'+
      '</div>'+
            
      
      /*
      '<div class="class_mtr0" style="display:none;margin-top:5px;">'+        
        '<span class="class_mtr1">Ret. Date:</span>'+        
        '<input type="date" id="txt_ret_date" class="class_mtr2" style="color:red;overflow:auto;" value='+v_ret_date+' />'+
      '</div>'+ 
      */
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">RTI:</span>'+  
        '<span id="txt_rti" class="class_mtr1" style="display:none;">'+v_rti+'</span>'+           
        '<span id="txt_rti2" data-rti='+v_rti+' class="class_mtr2" style="color:red;">'+
          '<input type="radio" id="rti1" '+iif(v_rti == 'YES','checked','')+' onclick="chg_rti(&quot;YES&quot;)" name="fav_rti" style="margin-left:0px;" value=0>'+
            '<label for="rti1">Yes</label>'+
          '<input type="radio" id="rti2" '+iif(v_rti != 'YES','checked','')+' onclick="chg_rti(&quot;-&quot;)" name="fav_rti" style="margin-left:30px;" value=1>'+
            '<label for="rti2">No</label>'+   
        '</span>'+         
      '</div>'+ 
      
    '</div>';
  JBE_OPEN_VIEW(dtl,'','');
  return true;
}

function chg_qty_ret(qty){  
  let ptr_qty=Number(txt_ptr_qty.innerHTML);
  qty=Number(qty);
  if(qty==0){ txt_qty.value=''; txt_qty.focus(); return; }
  if(qty > ptr_qty){ 
    MSG_SHOW(vbYesNo,"CONFIRM!!!: ","Returned Quantity ("+qty+") IS GREATER THAN the Quantity Dispensed ("+ptr_qty+").<br><br>Do you wish to continue?",
      function(){ txt_loc.focus(); },function(){ txt_qty.focus(); return; }
    ); 
  }    
  //alert(qty+1);
  let cost=txt_cost.value;  
  //txt_amount.innerHTML=JBE_FORMAT_DOUBLE_TO_STR(cost * qty);
  txt_amount.innerHTML=cost * qty;
}

function chg_loc_ret(loc){
  let qty=Number(txt_qty.value);
  //alert('txt_qty.value:'+qty);
  if(qty==0){    
    snackBar('ERROR: Quantity field is Empty...');
    txt_qty.value='';
    txt_qty.focus();
    return;
  }
  /*
  let curRow=document.getElementById('div_FM_dtl_div2').getAttribute('data-row');
  let oldLoc=document.getElementById('dtl_loc_'+curRow).innerHTML;
  console.log(loc,txt_stockno.innerHTML,txt_lotno.value);
  */
  //alert('loc:'+loc);  
  //alert('txt_old_loc:'+txt_old_loc.innerHTML);  
  /*
  let rec=JBE_GETFLD2('id',DB_TRANSFER2,[
    { "fld":"loc","val":loc },
    { "fld":"stockno","val":txt_stockno.innerHTML },
    { "fld":"lotno","val":txt_lotno.value }
  ]);   
  console.log('rec:'+rec);
  */

  let db=JBE_GETARRY2(DB_TRANSFER2,[
    { "fld":"loc","val":loc },
    { "fld":"stockno","val":txt_stockno.innerHTML },
    { "fld":"lotno","val":txt_lotno.value }
  ]); 
    
  //alert('db len:'+Object.keys(db).length);  

  if(Object.keys(db).length==0){
    let date;
    let expiry;
    let descrp;
    let locname;
    let cost=0;

    let rr=JBE_GETARRY2(DB_RECEIVE2,[
      { "fld":"stockno","val":txt_stockno.innerHTML },
      { "fld":"lotno","val":txt_lotno.value }
    ]);
    if(Object.keys(rr).length>0){
      //alert('yes:'+Object.keys(rr).length);
      date=tx_date.value;
      expiry=rr.expiry;
      descrp=rr.descrp;
      locname=get_loc(loc);
      cost=rr.cost;
    }
    //alert('descrp:'+descrp);
    //MSG_SHOW(vbOk,"ERROR: ","Location/Freezer Not Found...,<br>Add New Location at Freezer Facility.",function(){},function(){}); 
    MSG_SHOW(vbYesNo,'CONFIRM: ','Location/Freezer Not Found...,<br>Add New Location at Freezer Facility?',function(){
      
      FM_AXIOS_SQL='INSERT INTO transfer2 (trano,loc,stockno,lotno,refno,date,expiry,descrp,locname,qty,balance,cost,date_tf,stat_tf) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
      FM_AXIOS_PARA1=['ST-0001',loc,txt_stockno.innerHTML,txt_lotno.value,tx_trano.value,date,expiry,descrp,locname,txt_qty.value,txt_qty.value,cost,date,1];
      console.log('FM_AXIOS_SQL:'+FM_AXIOS_SQL);
      console.log('FM_AXIOS_PARA1:'+FM_AXIOS_PARA1);
      axios.post('/api/fmlib_save', {headers: { 'Content-Type': 'application/json' }}, { params: { sql:FM_AXIOS_SQL,fld:FM_AXIOS_PARA1,tbl:FM_TABLE_NAME2,fm_mode:1 } })    
      .then(function (response) {
        DB_TRANSFER2=response.data; 
        snackBar('Location created successfully...');
      }).catch(function (error) { console.log(error); showProgress(false); });      
    },function(){ 
      txt_loc.value=parseInt(txt_old_loc.innerHTML);
      return; 
    });    
  }
}

function chg_rti(v){
  document.getElementById('rti1').value=0;
  document.getElementById('rti2').value=1;
  if(v=='YES'){ 
    document.getElementById('rti1').value=1; 
    document.getElementById('rti2').value=0; 
  }
  //document.getElementById('txt_rti').setAttribute('data-rti',v); 
  document.getElementById('txt_rti').innerHTML=v;
}

//edit
function edit_fm_ret(){
  document.getElementById('lu_trano').disabled=true;
  document.getElementById('lu_trano').style.opacity='.5';
  document.getElementById('lu_areano').disabled=false;
  document.getElementById('lu_areano').style.opacity='1';
  //document.getElementById('tx_areaname').disabled=true;
}
//look
function look_fm_ret(fld){
  if(fld=='trano'){ 
    disp_fm_ret();
    //disp_fm_ret(1);
  }  
}
//del
function del_fm_ret(stat,r){
  if(stat==2){ DB_RET=r; } 
}
//save
function save_fm_ret(stat,r){
  //alert('stat :'+stat+' r:'+r.length);
  if(stat==0){
    let ob=[      
      { fld:"date",val:document.getElementById('tx_date').value },
      { fld:"areano",val:document.getElementById('tx_areano').value }
    ];
    return ob;
  }  
  if(stat==1){
    //alert('interrupted....'); return false;
    /*
    console.clear();
    var len_dtls=document.querySelectorAll('.dtls').length;    
    for(var i=1;i<=len_dtls;i++){ 
      if(!document.getElementById('fil_areano_'+i)){
        alert('new add');
        continue;
      }
      let v_loc_old=Number(document.getElementById('fil_areano_'+i).innerHTML);
      let v_loc=Number(document.getElementById('dtl_areano_'+i).innerHTML);
      alert(v_loc_old+' vs new: '+v_loc);
    }
    //return false;
    */
    //update_stocks_ret(-1);
  }    
  if(stat==2){
    /*
    var targetDIR=JBE_API+'upload/photo/';
    var newName = 'party_'+recno.trim() + '.jpg';
    if(THISFILE[0]){     
      let ob = [
        { "div":"img_stock" }
      ];
      //uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
    }  
    */
    //console.clear();
    //alert('----alams na!!!!!!!:'+FM_FM_MODE);
    DB_RET=r; 
  }
  if(stat==3){
    console.log('----show na!!2222222!!!!!:'+FM_FM_MODE);
    DB_RET2=r; 
    //update_stocks_ret(1);
  }
}

function update_stocks_ret(mode){
  return;
  //alert('update_stocks_ret mode:'+mode);
  console.clear();
  var len_dtls=document.querySelectorAll('.dtls').length;    
  for(var i=1;i<=len_dtls;i++){
    let v_display=document.getElementById('dtl_'+i).style.display; 
    let v_loc=Number(document.getElementById('dtl_loc_'+i).innerHTML);
    let v_stockno=Number(document.getElementById('dtl_stockno_'+i).innerHTML);
    let v_lotno=document.getElementById('dtl_lotno_'+i).innerHTML; 
    let v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_'+i).innerHTML);
    if(mode == -1){
      for(var k=0;k<FM_FIELDS2.length;k++){
        if(!FM_FIELDS2[k].hd=='FILLER'){ continue; }

        let div='fil_'+FM_FIELDS2[k].fld+'_'+i;
        if(!document.getElementById(div)){ continue; }

        console.log(i+' good: '+div);
      }
      //v_loc=Number(document.getElementById('fil_loc_'+i).innerHTML);
      //v_stockno=Number(document.getElementById('fil_stockno_'+i).innerHTML);
      //v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('fil_qty_'+i).innerHTML); 
      v_loc=Number(document.getElementById('dtl_loc_'+i).innerHTML);
      v_stockno=Number(document.getElementById('dtl_stockno_'+i).innerHTML);
      v_qty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_'+i).innerHTML); 
      UPDATE_LOC_STOCKBAL(v_loc,v_stockno,v_lotno,v_qty,0); 
    }else{
      UPDATE_LOC_STOCKBAL(v_loc,v_stockno,v_lotno,0,0); 
    }
    console.log(i+' proceed....');
    //UPDATE_LOC_STOCKBAL(v_loc,v_stockno,v_lotno,0,0); 
  }
}

//prn
function prn_fm_ret(){
  prn_ret();
  //alert(9);
  //FM_MAIN_BOX(2);
  //FM_DISP_REC(tx_trano.value);
}

//disp
function disp_fm_ret(){
  //alert(v);
  document.getElementById('lu_trano').disabled=false;
  document.getElementById('lu_trano').style.opacity='1';  
  document.getElementById('lu_areano').disabled=true;
  document.getElementById('lu_areano').style.opacity='0.5';    
  document.getElementById('FM_PRN_BTN').style.display='block';
  //tx_areaname
  document.getElementById('tx_areaname').value=get_area(tx_areano.value);
  //mnu_disp_ret();
}
//
function quit_fm_ret(){   
  return 0;
}

/*
function save_item_fm_ret(){ 
  //alert('process save item; add:'+f_add);  
  let aryFLD=[    
    { fld:"descrp", type:"text", dupli:0, disp:1, err:"Please enter an Item." },
    { fld:"qty", type:"number", dupli:0, disp:1, err:"Please enter Quantity." },
    { fld:"ret_date", type:"date", dupli:0, disp:1, err:"Please enter Returned Date." },
    { fld:"rti", type:"number", dupli:0, disp:1, err:"Please enter orig RTI flag." },
    { fld:"areano", type:"text", dupli:0, disp:0, err:"Sub Area No. is Empty." },
    { fld:"stockno", type:"text", dupli:1, disp:0, err:"Stock No. is Empty." },
    { fld:"date", type:"text", dupli:0, disp:0, err:"Date is Empty." },
    { fld:"trano", type:"text", dupli:0, disp:0, err:"Trano is Empty." }
  ];
  return aryFLD;
}
*/