function fm_dtr(){
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  var n = new Date().toLocaleTimeString('it-IT');
  document.getElementById('back_view1').style.display='none';  
  mnu_fm_dtr();

  let pa_height=H_VIEW-20;
  
  var dtl= 
  '<div id="dv_dtr" data-maxdays=0 data-print=0  style="height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:5px;border:1px solid lightgray;background:white;">'+

    '<div style="height:35px;width:100%;padding:0px;border:1px solid lightgray;background:none;">'+             
      
      '<div class="cls_daily" style="margin:0 auto;width:250px;height:100%;padding:4px;border:0px solid lightgray;">'+ 
        '<span style="float:left;width:40%;height:100%;padding:3px 0 0 0;font-size:14px;font-weight:bold;background:none;">DTR Month of:</span>'+ 
        '<input id="date_dtr" style="width:60%;height:100%;" onchange="chg_dtr_month(this.value)" type="month" value="'+JBE_DATE_FORMAT(CURR_DATE,'YYYY-MM')+'"  placeholder="Date" />'+       
      '</div>'+

    '</div>'+   

    '<div style="width:100%;height:'+pa_height+'px;border:1px solid lightgray;overflow:auto;padding:10px 0 10px 0;background:lightgray;">'+     
      '<div id="dv_ret_dtr" style="margin:0 auto;width:360px;height:1110px;padding:5px;border:1px solid black;background:white;">'+
          ret_dtr(JBE_DATE_FORMAT(CURR_DATE,'YYYY-MM'),false)+
      '</div>'+
    '</div>'+
        
  '</div>';
  
  JBE_OPEN_VIEW(dtl,'My DTR','showMainPage');       
  querySel_dtr();
  
  disp_month(JBE_DATE_FORMAT(CURR_DATE,'YYYY-MM'));
  disp_user_time(JBE_DATE_FORMAT(CURR_DATE,'YYYY-MM'));
}

function disp_user_time(vDate){
  console.clear();
  /*
  alert('disp_user_time:'+vDate+
       '\n usercode:'+CURR_USER+
       '\nlen:'+DB_DAILY.length
   );
   */
  //let max_days=document.getElementById('dv_dtr').getAttribute('data-maxdays');
  let str=vDate.split('-');
  let numDays = (y, m) => new Date(y, m, 0).getDate();
  let max_days=numDays(str[0], str[1]);
  let vDate2=vDate+'-01';
  let ctr=0;
  
  for(var i=0;i<DB_DAILY.length;i++){
    if(DB_DAILY[i].usercode != CURR_USER){ continue; }

    //let curdate=JBE_DATE_FORMAT(vDate2,'YYYY-MM');
    let curdate=vDate;
    let v_date=JBE_DATE_FORMAT(DB_DAILY[i].date,'YYYY-MM');

    console.log(CURR_USER+' - '+ctr+':: vdate:'+v_date+' vs curdate:'+curdate);
    
    if(v_date != curdate){ continue; }

    ctr++;
    console.log(ctr+':: vdate:'+v_date+' vs curdate:'+curdate);
          
    let vdate=JBE_DATE_FORMAT(DB_DAILY[i].date,'YYYY-MM-DD');
    let vday=parseInt(vdate.substring(8,10));  
    
    //*** CHECK IF NON WORKING DAY */
    if(parseInt(document.getElementById('dtl_'+vday).getAttribute('data-work')) != -1){
      document.getElementById('dtl_nn_'+vday).style.display='none';
      for(var j=1;j<=4;j++){
          document.getElementById('dtl_t'+j+'_'+vday).style.display='block';
      }
      document.getElementById('dtl_hh_'+vday).style.display='block';
      document.getElementById('dtl_mm_'+vday).style.display='block';
    }
    
    
    //document.getElementById('dtl_ymd'+'_'+vday).innerHTML=vdate;
    document.getElementById('dtl_t1'+'_'+vday).innerHTML=DB_DAILY[i].time1.replace(/^0+/, "");
    document.getElementById('dtl_t2'+'_'+vday).innerHTML=DB_DAILY[i].time2.replace(/^0+/, "");
    document.getElementById('dtl_t3'+'_'+vday).innerHTML=DB_DAILY[i].time3.replace(/^0+/, "");
    document.getElementById('dtl_t4'+'_'+vday).innerHTML=DB_DAILY[i].time4.replace(/^0+/, "");
    //console.log('====>>> Day '+vdate);
  }
  document.getElementById('div_total').innerHTML=ctr;
}


function chg_dtr_month(v){
  //alert('jbe: '+v);
  document.getElementById('dv_ret_dtr').innerHTML=ret_dtr(v,false);
  querySel_dtr();
  //disp_month(JBE_DATE_FORMAT(v,'YYYY-MM'));
  disp_month(v);
  disp_user_time(v);
}
function ret_weekend(myDate){
  var myDate = new Date();
  //if(myDate.getDay() == 6 || myDate.getDay() == 0) alert('Weekend!');
  if(myDate.getDay() == 6){ return 'Saturday'; }
  if(myDate.getDay() == 0){ return 'Sunday'; }
}

function close_fm_dtr(){
  //JBE_CLOSE_VIEW();
  showMainPage();
  //mnu_main_repo();
}

function mnu_fm_dtr(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+
      '<div onclick="ref_ctr();snackBar(`Refreshed...`);" style="float:left;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jrefresh.png" alt="call image" />'+
          '<span>Refresh</span>'+
        '</div>'+
      '</div>'+       
      '<div style="float:left;width:50%;height:100%;padding:12px 0 0 0;text-align:center;background:none;">'+
        'DTR File Maintenance'+
      '</div>'+
      '<div onclick="showMainPage()" style="float:right;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span>Close</span>'+
        '</div>'+
      '</div>'+
    '</div>';
  dispMenu(false,jmenu);
}

/*
function ref_dtr(){
  disp_user_time(date_dtr.value);
  snackBar('Refreshed...');
}
*/
  

function print_back(){
  //alert('rp_dtr');
  /*
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  var repTilt='';
  */
  document.getElementById('back_view2').style.display='none';
  document.getElementById('cap_viewMid2').innerHTML='';
  
  let pa_height=H_VIEW-30;
  if(JBE_MOBILE){ pa_height=H_VIEW-30; }

  let dtl=
  '<div id="dv_dtr2" data-maxdays=0 data-print=1 style="height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:10px;border:0px solid lightgray;background:white;">'+

    '<div id="printableBorder2" style="height:'+pa_height+'px;">'+    
      '<div id="printableArea2" style="width:705px;">'+
        '<div id="pa_dtl2">'+
        '</div>'+
      '</div>'+
    '</div>'+
      
  '</div>';

  JBE_OPEN_VIEW(dtl,'Print BACK PAGE','');
  mnu_repo2();
  let unod=
  '<div style="width:100%;height:1100px;margin-top:0px;font-size:14px;padding:0px;border:0px solid green;">'+  
    '<div id="dtr_b1" style="float:left;width:auto;height:800px;border:0px solid black;"></div>'+
    '<div id="dtr_b2" style="float:right;width:auto;height:800px;border:0px solid black;"></div>'+
  '</div>';
  document.getElementById('pa_dtl2').innerHTML=unod;
  ret_back_page();  
}

function ret_back_page(){
  let dtl=
  '<div style="width:320px;height:1100px;font-family:Times New Roman, Times, serif, sans-serif; font-size:14px; font-weight:bold; text-align:left;border:0px solid gold;">'+

    '<div style="height:60px;padding:10px;font-size:18px;text-align:center; text-decoration-line:underline;background:none;">I N S T R U C T I O N S</div>'+

    '<div style="text-indent:20px;">'+
      "Civil Service Form No. 48, after completion, should be filed in the records of the Bureau or Office which submits the monthly report on Civil Service Form No. 3 to the Bureau of Civil Service."+
    '<div>'+
    '<div style="text-indent:20px;">'+
      "In lieu of the above, court interpreters and stenographers who accompany the judges of the Court of First Instance will fill out the daily time reports on this form in triplicate, after which they should be approved by the judge with whom service has been rendered, or by an officer of the Department of Justice authorized to do so.  The original should be forwarded promptly after the end of the month to the Bureau of Civil Service, thru the Department of Justice, the duplicate to be kept in the Department of Justice; and the triplicate, in the office of the Clerk of Court where service was rendered."+
    '<div>'+
    '<div style="text-indent:20px;">'+
      'In the space provided for the purpose on the other side will be indicated the office hours the employee is required to observe, as for example, "Regular days, 8:00 to 12:00 and 1:00 to 4:00; Saturdays 8:00 to 1:00."'+
    '<div>'+
    '<div style="text-indent:20px;">'+
      'Attention is invited to paragraph 3, Civil Service Rule XV, Executive Order No. 5, series of 1909, which reads as follows:'+
    '<div>'+
    '<div style="text-indent:20px;">'+
      '"Each chief of a Bureau or Office shall require a daily record of attendance of all the officers and employees under him entitled to leave or absence or vacation (including teachers) to be kept on the proper form and also a systematic office record showing for each day all absences from duty from any cause whatever.  At the beginning of each month he shall report to the Commissioner on the proper form of all absences from any cause whatever, including the exact amount of undertime of each person for each day.  Officers or employees serving in the field or on the water need not be required to keep a daily record, but all absences of such employees must be included in the monthly report of changes and absences.  Falsification of time records will render the offending officers or employee liable to summary removal from the service and criminal prosecution.'+
    '<div>'+

    '<div style="margin-top:20px;text-indent:20px;">'+
      '<div style="margin-top:20px;width:100%;height:10px;border-bottom:2px solid black;"></div>'+
      '<div style="margin-top:2px;font-weight:normal;font-style:italic;font-size:13px;padding:5px;">'+
        '(NOTE - A record made from memory at sometime subsequent to the occurrence of as event is not reliable. Non observance of office hours deprives the employee of the leave privileges although he may have rendered overtime service. '+
        'Where sservice rendered outside of the Office for the whole morning or afternoon, notation to that effect should be made clearly.)'+
      '<div>'+
    '<div>'+

    '<div style="margin-top:30px;width:100%;height:auto;font-style:normal;background:violet;">'+
      '<div style="float:right;width:200px;height:100px;text-align:center;border:0px solid red;background:none;">'+
        '<div style="width:100%;height:20%;">'+
          '<img style="height:100%;" src="gfx/choAdmin.png" />'+
        '</div>'+
        '<div style="width:100%;height:80%;padding:0px;">CHO-Admin</div>'+
      '</div>'+
    '<div>'+

  '</div>';
  //return dtl;
  dtr_b1.innerHTML=dtl;
  dtr_b2.innerHTML=dtl;
}