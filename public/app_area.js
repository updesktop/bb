function fm_area(){  
  FM_TRANS='AREA';
  FM_FM_MODE=1;
  FM_TABLE=DB_AREA;  FM_TABLE_NAME='area';  FM_RKEY='areano';
  FM_CB='showMainPage';
  //FM_TABLE2=DB_RECEIVE2;

  FM_FIELDS=[ //display on screen    
    { div:"tx_area_no", fld:"areano", type:"text", disp:1, save:true },
    { div:"tx_area_name", fld:"name", type:"text", disp:1, save:true }
  ];
    
  var fm_ob = {
    title:"AREA MASTER FILE",  
    title2:"AREA",
    width:"700px",height:"270px"
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="290px";
  }
    
  var fm_layout=
    //'<input id="tx_area_no" type="text" onchange="FM_CHK_REC(id.value)" style="display:none;" value="" />'+
    '<div id="div_FM_head" style="width:100%;height:100px;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+
    
      '<div class="cls_fm_dtl">'+        
        '<div>'+          
          '<span onclick="JBE_SHOW_LOGGER(tx_area_no.value,&quot;'+FM_TRANS+'&quot;)" style="cursor:help;">Area Name:</span>'+           
          '<input id="lu_area_no" type="image" src="gfx/jsearch.png" onclick="look_areano(tx_area_no.value)" />'+
        '</div>'+
        '<input id="tx_area_name" type="text" data-caption="Stock Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_area_name.id).focus()" />'+
      '</div>'+      
      '<div class="cls_fm_dtl">'+
        '<div>Area No.:</div>'+  
        '<input id="tx_area_no" disabled type="text" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_expiry.id).focus()" />'+
      '</div>'+
    '</div>';
  
  FM_FUNC={
    look:"look_fm_area",
    init:"init_fm_area",
    add:"add_fm_area",
    edit:"edit_fm_area",
    del:"del_fm_area",
    disp:"disp_fm_area",
    save:"save_fm_area"
  }
  FM_MAIN(fm_ob,fm_layout);
}

function look_areano(){
  //{ "title":"Product Name", "width":"60%", "align":"left" },
  var flds=[
    { title:"Area No", fld:"areano", type:"text", width:"20%", align:"left" },
    { title:"Area Name", fld:"name", type:"text", width:"80%", align:"left" }
  ];
  //FM_LOOKUP(true,tx_area_name.value,FM_TABLE,[],'AREA LOOKUP','lookup_fm_area','name',flds,FM_RKEY);
  var ob=[
    { val:tx_area_no.value, fld:"areano" }
  ];
  FM_LOOKUP2(true,tx_area_name.value,ob,FM_TABLE,[],'LOOKUP','lookup_fm_area',flds);
}

function lookup_fm_area(ndx){	  
  if(ndx == -1){ 
    FM_INIT_REC();
    return; 
  }
  let val=document.getElementById('dd_areano'+ndx).innerHTML;
  document.getElementById('tx_area_no').value=val;
  document.getElementById('tx_area_name').value=document.getElementById('dd_name'+ndx).innerHTML;
  FM_DISP_REC(val); 
  disp_fm_area();
}
//
function init_fm_area(){  
  document.getElementById('tx_area_no').value='';
  document.getElementById('lu_area_no').disabled=false;
  document.getElementById('lu_area_no').style.opacity='1';
}
//
function add_fm_area(){
  document.getElementById('lu_area_no').disabled=true;
  document.getElementById('lu_area_no').style.opacity='0.5';
  document.getElementById('tx_area_name').focus();
}
//edit
function edit_fm_area(){
  document.getElementById('lu_area_no').disabled=true;
  document.getElementById('lu_area_no').style.opacity='0.5';
  document.getElementById('tx_area_name').focus();
}
//look
function look_fm_area(){
    disp_fm_area();
}
//del
function del_fm_area(stat,r){
  //alert('stat :'+stat+' r:'+r);
  if(stat==1){ 
    let refno=JBE_REC_EXIST(DB_PTR,FM_RKEY,document.getElementById('tx_area_no').value,'trano');
    if(refno){
      MSG_SHOW(vbOk,"CONFIRM: ","Record is used in RIS No:"+refno,function(){},function(){}); 
      //return false; 
    }
  }
  if(stat==2){ DB_AREA=r; } 
}
//save
function save_fm_area(stat,r){
  //alert('stat :'+stat+' r:'+r);
  var recno=document.getElementById('tx_area_no').value;    
  if(stat==2){
    var targetDIR=JBE_API+'upload/photo/';
    var newName = 'party_'+recno.trim() + '.jpg';
    if(THISFILE[0]){     
      let ob = [
        { "div":"img_stock" }
      ];
      //uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
    }  
    DB_AREA=r; 
  }
}
//disp
function disp_fm_area(){   
  //alert('disp_fm_area '+disp_mode);
  var n = new Date().toLocaleTimeString('it-IT'); 
  document.getElementById('lu_area_no').disabled=false;
  document.getElementById('lu_area_no').style.opacity='1';    
}
