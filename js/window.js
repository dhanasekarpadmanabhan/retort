const {app,BrowserWindow,Menu,shell} = require('electron')
const Menu1 = Menu;
const url = require('url')
const path = require('path')
const {
    ipcMain
} = require('electron')
const $ = require('jquery')
//win (1-10) for sales window
let win
let win1
let win2
let win4
//win (10-20) for sample window creation
let win10
/*
 *createWindow
 *will create a new broserwindow with size and load url of the first.html file
 *we provide at first the browser window will have baseMenuTemplate for the menu option
 *
 */



function createWindow()  {

    win = new BrowserWindow({
      fullscreen:true,

        icon: path.join(__dirname, '../assest/a.png')
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, '../html/first.html'),
        protocol: 'file:',
        slashes: true
    }))
    //this will set the menu for the particular window
    const mainWindowMenuBar = Menu.buildFromTemplate(baseMenuTemplate);
    win.setMenu(mainWindowMenuBar)

    win.on('closed', () => {
        win = app.quit();
    })
}


function secondWindow() {
    win1 = new BrowserWindow({
        width: 700,
        height: 650,
        parent: win
    })

    win1.loadURL(url.format({
        pathname: path.join(__dirname, '../html/second.html'),
        protocol: 'file:',
        slashes: true
    }))
    const childWindowMenuBar = Menu1.buildFromTemplate(mainMenuTemplate);
    //this will set the menu for the particular window
    win1.setMenu(childWindowMenuBar)
    win1.on('closed', () => {
        win1 = ""
    })
}


function sampleWindow() {
    win10 = new BrowserWindow({
        width: 700,
        height: 650,
        parent: win
    })
//win10 will open a new browser for which it has a sample_main_page .html page view by which it shows the detaile regarding perfoming operation in the sample window
    win10.loadURL(url.format({
        pathname: path.join(__dirname, '../html/sample_main_page.html'),
        protocol: 'file:',
        slashes: true
    }))
    const childWindowMenuBar = Menu1.buildFromTemplate(sampleMenuTemplate);
    //this will set the menu for the particular window
    win10.setMenu(childWindowMenuBar)
    win10.on('closed', () => {
        win10 = ""
    })
}



let wholequery;

//this template is for first.html window
const baseMenuTemplate = [    {
        label: 'SAMPLE_APPLICATION',
        click() {
          win.loadURL(url.format({
              pathname: path.join(__dirname, "../html/sample_login.html"),
              protocol: 'file:',
              slashes: true,
              parent: win
          }))
        }
    },  {
          label: 'SALES_APPLICATION',
          click() {
            win.loadURL(url.format({
                pathname: path.join(__dirname, '../html/first.html'),
                protocol: 'file:',
                slashes: true
            }))
          }
      },
    {
        label: 'QUIT',
        click() {
            app.quit();
        }
    }
];
//this template is for second.html window
const sampleMenuTemplate = [
  {
    label:'Master',
    submenu:[{
      label:'Item_Master',
      click(){
        console.log("item details to add and modifie")
      }
    },{
      label:'FSM/PSR s',
      click(){
        console.log("reps")
      }
    },{
      label:'State/District Master',
      click(){
        console.log("state/district master")
      }
    },{
      label:'Gate Pass',
      submenu:[{
        label:'Gate_pass_entry',
        click(){
          Gate_pass_entry();
        }
      },{
        label:'Gate_Pass_Details',
        click(){
          global.industry="sample"
          Gate_pass_details();
        }
      }]
    }]
  },{
    label:'Transcation',
    submenu:[{
      label:'Stock Entry from gate Pass',
      click(){
        console.log("Stock entry from gate pass")
      }
    },{
      label:'Invoice ',
      click(){
        console.log("invoice details for reps provided details")
      }
    },{
      label:'Goods Return / Issues ',
      click(){

        console.log("Goods return / issue details")
      }
    }]
  }
]
const mainMenuTemplate = [
    // Each object is a dropdown
    {
        label: 'Factory',
        submenu: [{
                label: 'closing_stock',
                click() {

                }
            },
            {
                label: 'Production_Current_month',
                click() {

                }
            },
            {
                label: 'Schedule_for_year',
                click() {

                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Sales',
        submenu: [{
                label: 'Customer_Info',
                click() {
                    fourthWindow();
                }
            }, {
                label: 'closing_stock',
                submenu: [{ //when Pharmaceuticals is clicked in window menu
                        // then  i value is assigned as 01 so that the code can take the value to find Pharmaceuticals(CCode) in the database
                        label: "Pharmaceuticals",
                        click() {
                            i = "01"
                            //selectVal is the function which will collect all the data from the database
                       selectVal(i, this)
                        }
                    },
                    {
                        label: "Laboratory",
                        click() {
                            i = "02"
                            selectVal(i, this)
                        }
                    },
                    {
                        label: "K.C.Corp",
                        click() {
                            i = "03"
                            selectVal(i, this)
                        }
                    }
                ]
            },
            {
                label: 'Regional_sales',
                submenu: [{ //when Pharmaceuticals is clicked in window menu
                        // then  i value is assigned as 01 so that the code can take the value to find Pharmaceuticals(CCode) in the database
                        label: "Pharmaceuticals",
                        click() {
                            i = "01"
                            //selectVal is the function which will collect all the data from the database
                          regionVal(i, this)
                        }
                    },
                    {
                        label: "Laboratory",
                        click() {
                            i = "02"
                            regionVal(i, this)
                        }
                    },
                    {
                        label: "K.C.Corp",
                        click() {
                            i = "03"
                            regionVal(i, this)
                        }
                    }
                ]

            },
            {
                label: 'Invoice_Details',
                click() {
                  global.industry="sales"
             thirdWindow();
                }
            }
        ]
    },
    {
        label: 'Marketing',
        submenu: [{
            label: 'Reps',
            submenu: [{
                    label: 'Tour_Plan'
                },
                {
                    label: 'Daily_Call_Sheet'
                }
            ]
        },
      {
        label:'sample',
        submenu:[{
          label:'current_month',
          submenu:[{
            label:'Report'
          },{
            label:'product_details'
          }]
        }]
      }]
    }

];

// If OSX, add empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if (process.env.NODE_ENV !== 'production') {
    baseMenuTemplate.push({
        label: 'print_Screen',
        click() {
            var window = BrowserWindow.getFocusedWindow();
            window.webContents.print({
                silent: false
            });
        }
    }, {
        label: 'Developer Tools',
        submenu: [{
                role: 'reload'
            },
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    })
    mainMenuTemplate.push({
        label: 'print_Screen',
        click() {
            var window = BrowserWindow.getFocusedWindow();
            window.webContents.print({
                silent: false
            });
        }
    }, {
        label: 'Developer Tools',
        submenu: [{
                role: 'reload'
            },
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });


    sampleMenuTemplate.push({
        label: 'print_Screen',
        click() {
            var window = BrowserWindow.getFocusedWindow();
            window.webContents.print({
                silent: false
            });
        }
    }, {
        label: 'Developer Tools',
        submenu: [{
                role: 'reload'
            },
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });

}
function Gate_pass_details()
{
  thirdWindow();
values=global.industry
  console.log(values)
}
function  Gate_pass_entry()
{
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
        win1.webContents.send('item:add', result);
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
        win1.webContents.send('item:region', result);
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

function thirdWindow() {
    win2 = new BrowserWindow({
        width: 250,
        height: 300
    })

    win2.loadURL(url.format({
        pathname: path.join(__dirname, '../html/third.html'),
        protocol: 'file:',
        slashes: true
    }))

    win2.on('closed', () => {
        win2 = ""
    })
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
        win1.webContents.send('item:invo', result);
    })
    //this will send the value to ipcRenderer with item:add of second.html file



}

function fourthWindow() {
    win4 = new BrowserWindow({
        width: 400,
        height: 500
    })

    win4.loadURL(url.format({
        pathname: path.join(__dirname, '../html/fourth.html'),
        protocol: 'file:',
        slashes: true
    }))

    win4.on('closed', () => {
        win2 = ""
    })
}


ipcMain.on('item:customer', (event, arg) => {
    fourth(arg, this)
})
ipcMain.on('item:sales/invoice', (event, arg) => {
  fifth(arg, this)
})
function fifth(val)
{
console.log('the global value'+global.industry)
win2.webContents.send('item:details', global.industry);

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
        win4.webContents.send('item:cust_Details', result);
    })

}


module.exports = {
  win:win,
  win1:win1,
  win2:win2,
  win4:win4,
  win10:win10,
  third:third,
  fourth:fourth,
  fifth:fifth,
  createWindow:createWindow,
  secondWindow:secondWindow,
  sampleWindow:sampleWindow,
  Gate_pass_entry:Gate_pass_entry,
  Gate_pass_details:Gate_pass_details,
  fourthWindow:fourthWindow ,
  selectVal:selectVal,
  regionVal :regionVal,
  thirdWindow:thirdWindow
};
