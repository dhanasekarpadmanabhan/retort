const {app,BrowserWindow,Menu,shell} = require('electron')

var template = require('./varTemplate.js')
const Menu1 = Menu;
const url = require('url')
const path = require('path')
const $ = require('jquery')
var functions1=require('./window.js');
function Gate_pass_details() {
    thirdWindow();
    console.log(global.industry)
}

function Gate_pass_entry() {
    console.log("this is the gate pass entry function here first the window is created and added the function by vue.js")
    console.log(global.industry)
}
//selectval will take value as argument to select whether this is 01-Pharmaceutical , 02-Laboratory , 03- k.c.corporation
//willl first establish connection to the database of
// db-last -->last month database of ms access
// connection established with user and password
//query is run to select all values from imas and stkdetl
function selectVal(value) {
    console.log(value)
    var h;
    // Add the credentials to access your database
    // Perform a query this is the querey needs to find the perfect way to write the secure and error porn query
    //SELECT b.CCode, a.SHCD,a.DESCR,a.PCAPCTY,a.UMN, b.ItemCd,b.BatchNo,b.RecDate,b.Qty,b.RATE,b.MRP,b.MfgDt,b.ExpDt FROM imas a, stkdetl b WHERE b.CCode=01 and a.SHCD=b.ItemCd and b.Qty>0 and ExpDt>CURDATE() ORDER BY `b`.`ExpDt` DESC
    //    $query = "SELECT a.CCode, a.SHCD,a.DESCR,a.PCAPCTY,a.UMN, b.ItemCd,b.BatchNo,b.RecDate,b.Qty,b.RATE,b.MRP,b.MfgDt,b.ExpDt FROM imas a, stkdetl b WHERE a.CCode = b.CCode and a.SHCD=b.ItemCd and b.CCode="+value+" and b.Qty>0  ORDER BY `b`.`RecDate` DESC";
    var field = "SELECT b.CCode, a.SHCD,a.DESCR,a.PCAPCTY,a.UMN, b.ItemCd,b.BatchNo,b.RecDate,b.Qty,b.RATE,b.MRP,b.MfgDt,b.ExpDt "
    var from = "FROM imas a, stkdetl b ";
    var where = "WHERE b.CCode=" + value + " and a.SHCD=b.ItemCd and b.Qty>0 and b.ExpDt>CURDATE() "
    var order = " ORDER BY `b`.`RecDate` DESC"
    var query = field + from + where + order;
    j1 = new Promise(function(resolve, reject) {
        resolve(selectquery(query))
    });
    //      j1 = selectquery(field,from,where,order,this);
    //this will send the value to ipcRenderer with item:add of second.html file
    j1.then(function(result) {
        functions1.win1.webContents.send('item:add', result);
    })
}

function selectquery(query) {
    return new Promise(function(resolve, reject) {
        var connection = connect();
        // connect to mysql
        connection.connect(function(err) {
            // in case of error
            if (err) {
                console.log(err.code);
                console.log(err.fatal);
            }
        });
        h = ""
        $query = query;
        console.log($query)
        connection.query($query, function(err, rows, fields) {
            if (err) {
                console.log("An error ocurred performing the query.");
                console.log(err);
                return;
            }
            h = rows;
            console.log(h)
            resolve(rows);
        });
    });
}

function regionVal(values1) {
    // Perform a query this is the querey needs to find the perfect way to write the secure and error porn query
    //SELECT b.CCode, a.SHCD,a.DESCR,a.PCAPCTY,a.UMN, b.ItemCd,b.BatchNo,b.RecDate,b.Qty,b.RATE,b.MRP,b.MfgDt,b.ExpDt FROM imas a, stkdetl b WHERE b.CCode=01 and a.SHCD=b.ItemCd and b.Qty>0 and ExpDt>CURDATE() ORDER BY `b`.`ExpDt` DESC
    //    $query = "SELECT a.CCode, a.SHCD,a.DESCR,a.PCAPCTY,a.UMN, b.ItemCd,b.BatchNo,b.RecDate,b.Qty,b.RATE,b.MRP,b.MfgDt,b.ExpDt FROM imas a, stkdetl b WHERE a.CCode = b.CCode and a.SHCD=b.ItemCd and b.CCode="+value+" and b.Qty>0  ORDER BY `b`.`RecDate` DESC";
    //$query="SELECT a.CCode,b.DtCode,c.DtName,b.PNAME,a.invno,a.InvDt,a.Pcode,a.AssVal FROM invcontrol a,customer b,districtmaster c WHERE a.CCode="+values1+" and a.InvDt between '2017-11-01 00:00:00' and '2017-11-31 23:59:00' and a.Pcode=b.Pcode and c.DtCode=b.DtCode order by a.InvDt desc";
    var field = "SELECT a.CCode,b.DtCode,c.DtName,b.PNAME,a.invno,a.InvDt,a.Pcode,a.AssVal "
    var from = "FROM invcontrol a,customer b,districtmaster c ";
    var where = " WHERE a.CCode=" + values1 + " and a.InvDt between '2017-11-01 00:00:00' and '2017-11-31 23:59:00' and a.Pcode=b.Pcode and c.DtCode=b.DtCode "
    var order = " ORDER BY `c`.`DtName` ASC "
    var query = field + from + where + order;
    j1 = new Promise(function(resolve, reject) {
        resolve(selectquery(query))
    });
    //      j1 = selectquery(field,from,where,order,this);
    //this will send the value to ipcRenderer with item:add of second.html file
    j1.then(function(result) {
        functions1.win1.webContents.send('item:region', result);
    })
}

function connect() {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: null,
        database: 'last'
    });
    return con;
}


function third(val) {
    InvoNo = val.Invo;
    retort = val.retort;
    // Perform a query this is the querey needs to find the perfect way to write the secure and error porn query
    //SELECT b.CCode, a.SHCD,a.DESCR,a.PCAPCTY,a.UMN, b.ItemCd,b.BatchNo,b.RecDate,b.Qty,b.RATE,b.MRP,b.MfgDt,b.ExpDt FROM imas a, stkdetl b WHERE b.CCode=01 and a.SHCD=b.ItemCd and b.Qty>0 and ExpDt>CURDATE() ORDER BY `b`.`ExpDt` DESC
    //    $query = "SELECT a.CCode, a.SHCD,a.DESCR,a.PCAPCTY,a.UMN, b.ItemCd,b.BatchNo,b.RecDate,b.Qty,b.RATE,b.MRP,b.MfgDt,b.ExpDt FROM imas a, stkdetl b WHERE a.CCode = b.CCode and a.SHCD=b.ItemCd and b.CCode="+value+" and b.Qty>0  ORDER BY `b`.`RecDate` DESC";
    //$query="SELECT a.CCode,b.DtCode,c.DtName,b.PNAME,a.invno,a.InvDt,a.Pcode,a.AssVal FROM invcontrol a,customer b,districtmaster c WHERE a.CCode="+values1+" and a.InvDt between '2017-11-01 00:00:00' and '2017-11-31 23:59:00' and a.Pcode=b.Pcode and c.DtCode=b.DtCode order by a.InvDt desc";
    //$query="SELECT a.CCode,a.InvNo,a.InvDt,a.BatchNo,a.ItemCode,a.Qty,a.FreeQty,a.Rate,b.MfgDt,b.ExpDt from invdetails a, stkdetl b where a.CCode=b.CCode and a.ItemCode=b.itemcd and a.BatchNo=b.BatchNo and a.CCode="+retort+" and a.InvNo="+InvoNo+" ORDER BY `a`.`InvDt`DESC , a.InvNo DESC"
    var field = "SELECT a.CCode,a.InvNo,a.InvDt,a.BatchNo,c.Pcode,a.ItemCode,a.Qty,a.FreeQty,a.TValue,b.MfgDt,b.ExpDt "
    var from = "from invdetails a, stkdetl b,invcontrol c ";
    var where = " where c.InvNo=a.InvNo and c.InvDt=a.InvDt and a.CCode=b.CCode and a.ItemCode=b.itemcd and a.BatchNo=b.BatchNo and a.CCode=" + retort + " and a.InvNo=" + InvoNo + "  "
    var order = " ORDER BY `a`.`InvDt`DESC , a.InvNo DESC "
    var query = field + from + where + order;
    j1 = new Promise(function(resolve, reject) {
        resolve(selectquery(query))
    });
    //      j1 = selectquery(field,from,where,order,this);
    //this will send the value to ipcRenderer with item:add of second.html file
    j1.then(function(result) {
        functions1.win1.webContents.send('item:invo', result);
    })
    //this will send the value to ipcRenderer with item:add of second.html file
}

function fourth(val) {
    InvoNo = val.no;
    Region = val.reg;
    console.log(val.no)
    console.log(val.reg)
    variable = "";
    if (InvoNo != "") {
        variable = "WHERE PCode='" + InvoNo + "'";
    } else {
        variable = "WHERE `DtCode` ='" + Region + "'";
    }
    console.log(variable)
    // Perform a query this is the querey needs to find the perfect way to write the secure and error porn query
    //SELECT b.CCode, a.SHCD,a.DESCR,a.PCAPCTY,a.UMN, b.ItemCd,b.BatchNo,b.RecDate,b.Qty,b.RATE,b.MRP,b.MfgDt,b.ExpDt FROM imas a, stkdetl b WHERE b.CCode=01 and a.SHCD=b.ItemCd and b.Qty>0 and ExpDt>CURDATE() ORDER BY `b`.`ExpDt` DESC
    //    $query = "SELECT a.CCode, a.SHCD,a.DESCR,a.PCAPCTY,a.UMN, b.ItemCd,b.BatchNo,b.RecDate,b.Qty,b.RATE,b.MRP,b.MfgDt,b.ExpDt FROM imas a, stkdetl b WHERE a.CCode = b.CCode and a.SHCD=b.ItemCd and b.CCode="+value+" and b.Qty>0  ORDER BY `b`.`RecDate` DESC";
    //$query="SELECT a.CCode,b.DtCode,c.DtName,b.PNAME,a.invno,a.InvDt,a.Pcode,a.AssVal FROM invcontrol a,customer b,districtmaster c WHERE a.CCode="+values1+" and a.InvDt between '2017-11-01 00:00:00' and '2017-11-31 23:59:00' and a.Pcode=b.Pcode and c.DtCode=b.DtCode order by a.InvDt desc";
    //$query="SELECT a.CCode,a.InvNo,a.InvDt,a.BatchNo,a.ItemCode,a.Qty,a.FreeQty,a.Rate,b.MfgDt,b.ExpDt from invdetails a, stkdetl b where a.CCode=b.CCode and a.ItemCode=b.itemcd and a.BatchNo=b.BatchNo and a.CCode="+retort+" and a.InvNo="+InvoNo+" ORDER BY `a`.`InvDt`DESC , a.InvNo DESC"
    var field = "SELECT *   "
    var from = "FROM `customer` ";
    var where = variable
    var order = ""
    var query = field + from + where + order;
    j1 = new Promise(function(resolve, reject) {
        resolve(selectquery(query))
    });
    //      j1 = selectquery(field,from,where,order,this);
    //this will send the value to ipcRenderer with item:add of second.html file
    j1.then(function(result) {
        functions1.win4.webContents.send('item:cust_Details', result);
    })
}

function fifth() {
    if (global.industry == "sales") {
        functions1.win2.webContents.send('item:details', "sales");
    } else {
        functions1.win2.webContents.send('item:details', "sample");
    }
}
function quit()
{
  app.quit();
}

module.exports={

    fifth:fifth,
    fourth:fourth,
    third:third,
    regionVal:regionVal,
    selectquery:selectquery,
    Gate_pass_details:Gate_pass_details,
    Gate_pass_entry:Gate_pass_entry,
    selectVal:selectVal,
    quit:quit

}
