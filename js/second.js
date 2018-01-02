const electron = require('electron');
const {ipcRenderer} = electron;
const $ = require('jquery')
ipcRenderer.on('item:invo', function(e, val) {
  $("#s1").text("")

  $("#table").text("")

  if (val[0]['CCode'] == "01") {
      $("#s1").append("<div 'style=float:center;'>Invoice Details of -->Pharmaceutical</div><br>")
  } else if (val[0]['CCode'] == "02") {
      $("#s1").append("<div 'style=float:center;'>Invoice Details of -->Laboratory</div><br>")
  } else {
      $("#s1").append("<div 'style=float:center;'>Invoice Details of --> K.C.Corporation</div><br>")
  }


h=val;
    console.log(h)
    l=0
    for (var i = 0; i < h.length; i++) {
      if (i + 1 < h.length) {
          if (typeof(h[i + 1]['InvDt']) != undefined) {
              k = h[i + 1]['InvDt'];
              if (l == 0) {
                  $("#s1").append("	<h3 class='panel-title'>" +"The Invoice no is = > "+ h[i]['InvNo'] + " for the particula date is = "+h[i]['InvDt']+"</h3><div class='pull-right'><span class='clickable filter' data-toggle='tooltip' title='Toggle table filter' data-container='body'<i class='glyphicon glyphicon-filter'></i></span></div><br>")
                  $("#s1").append("<div >")
                  table = $("<table border=1 cellpadding=1 class='responstable'>")
                  tr = $('<tr>')
                  tr.append("<tr><th data-th='Driver details'>Customer_Code</th><th>Item_Code</th><th>Batch_No</th><th>Mfg_Date</th><th>Exp_Date</th><th>Qty</th><th>FreeQty</th><th>Total_Value</th><br></tr>")
              }
              if (h[i]['InvDt'] == k) {
                  tr.append("<tr><td>" + h[i]['Pcode'] + "</td><td>" + h[i]['ItemCode'] + "</td><td>" + h[i]['BatchNo'] + "</td><td>" + h[i]['MfgDt'] + "</td><td>" + h[i]['ExpDt'] + "</td><td>"+h[i]['Qty'] +"</td><td>" + h[i]['FreeQty'] + "</td><td>" + h[i]['TValue'] + "</td></tr>")
l++;
              } else {
                  tr.append("<tr><td>" + h[i]['Pcode'] + "</td><td>" + h[i]['ItemCode'] + "</td><td>" + h[i]['BatchNo'] + "</td><td>" + h[i]['MfgDt'] + "</td><td>" + h[i]['ExpDt'] + "</td><td>"+h[i]['Qty'] +"</td><td>" + h[i]['FreeQty'] + "</td><td>" + h[i]['TValue'] + "</td></tr>")
                  table.append(tr);
                l=0;
                  $("#s1").append(table)
                  $("#s1").append("<div>")
                  console.log(h[i]['DtName'] + " ----> " + l)

              }
          }
      } else {
          tr.append("<tr><td>" + h[i]['Pcode'] + "</td><td>" + h[i]['ItemCode'] + "</td><td>" + h[i]['BatchNo'] + "</td><td>" + h[i]['MfgDt'] + "</td><td>" + h[i]['ExpDt'] + "</td><td>"+h[i]['Qty'] +"</td><td>" + h[i]['FreeQty'] + "</td><td>" + h[i]['TValue'] + "</td></tr>")
            table.append(tr);
          table.append(tr1);
          $("#s1").append(table)

      }



// this is the last line








///
    }
})

ipcRenderer.on('item:region', function(e, val) {
    $("#s1").text("")

    $("#table").text("")

    if (val[0]['CCode'] == "01") {
        $("#s1").append("Regional Sales of -->Pharmaceutical<br>")
    } else if (val[0]['CCode'] == "02") {
        $("#s1").append("Regional Sales of -->Laboratory<br>")
    } else {
        $("#s1").append("Regional Sales of --> K.C.Corporation<br>")
    }
    console.log(val)
    console.log(z1 = val);
    h = val;
    var k = 0;
    var l = 0;
    for (i = 0; i < h.length; i++) {
        if (i + 1 < h.length) {
            if (typeof(h[i + 1]['DtCode']) != undefined) {
                k = h[i + 1]['DtCode'];
                if (l == 0) {
                    $("#s1").append("	<h3 class='panel-title'>" + h[i]['DtName'] + "</h3><div class='pull-right'><span class='clickable filter' data-toggle='tooltip' title='Toggle table filter' data-container='body'<i class='glyphicon glyphicon-filter'></i></span></div><br>")
                    $("#s1").append("<div >")
                    table = $("<table border=1 cellpadding=1 class='responstable'>")
                    tr = $('<tr>')
                    tr1 = $('<tr>')
                    tr.append("<tr><th data-th='Driver details'>Invoice_No</th><th>Invoice Date</th><th>Customer code</th><th>Customer name</th><th>Cost</th><br></tr>")
                }
                if (h[i]['DtCode'] == k) {
                    l += h[i]['AssVal'];
                    tr.append("<tr><td>" + h[i]['invno'] + "</td><td>" + h[i]['InvDt'] + "</td><td>" + h[i]['Pcode'] + "</td><td>" + h[i]['PNAME'] + "</td><td>" + h[i]['AssVal'] + "</td></tr>")
                } else {
                    l += h[i]['AssVal'];
                    tr.append("<tr><td>" + h[i]['invno'] + "</td><td>" + h[i]['InvDt'] + "</td><td>" + h[i]['Pcode'] + "</td><td>" + h[i]['PNAME'] + "</td><td>" + h[i]['AssVal'] + "</td></tr>")
                    tr.append("<tr><td></td><td></td><td></td><td>Total=======></td><td>" + l + "</td></tr>")
                    table.append(tr);
                    table.append(tr1);
                    $("#s1").append(table)
                    $("#s1").append("<div>")
                    console.log(h[i]['DtName'] + " ----> " + l)
                    l = 0;
                }
            }
        } else {
            l += h[i]['AssVal']
            tr.append("<tr><td>" + h[i]['invno'] + "</td><td>" + h[i]['InvDt'] + "</td><td>" + h[i]['Pcode'] + "</td><td>" + h[i]['PNAME'] + "</td><td>" + h[i]['AssVal'] + "</td></tr>")
            tr.append("<tr><td></td><td></td><td></td><td>Total========></td><td>" + l + "</td></tr>")
            table.append(tr);
            table.append(tr1);
            $("#s1").append(table)
            console.log(h[i]['DtName'] + " >---- " + l)
            l = 0;
        }
    }
    console.log("this is the value of region")
})
//this mainWindow.html will first create ipcRenderer and ul for the html
ipcRenderer.on('item:add', function(e, val) {

    $("#table").find("tr").remove();
    console.log(val);
    var size = val.length;


    for (var i = 0; i < size; i++) {
        var k = "";
        l = ""
        if (val[i]['UMN'] == "ML ") {
            k = "ML"
        } else {
            k = "stripe"
        }
        if (i == 0) {
            var table1 = document.getElementById("table");
            var row1 = table1.insertRow();
            var c1ell1 = row1.insertCell(0);
            var c1ell2 = row1.insertCell(1);
            var c1ell3 = row1.insertCell(2);
            var c1ell4 = row1.insertCell(3);
            var c1ell5 = row1.insertCell(4)
            var c1ell6 = row1.insertCell(5);
            var c1ell7 = row1.insertCell(6);
            var c1ell8 = row1.insertCell(7);
            var c1ell9 = row1.insertCell(8);
            var c1ell10 = row1.insertCell(9)
            var c1ell11 = row1.insertCell(10);



            c1ell1.innerHTML = "S.No";
            c1ell2.innerHTML = "Batch Number";

            c1ell3.innerHTML = "Product Name";
            c1ell4.innerHTML = "Packet capacity";
            c1ell5.innerHTML = "ml/s";
            c1ell6.innerHTML = "Item code";
            c1ell7.innerHTML = "Rate";
            c1ell8.innerHTML = "Mrp";
            c1ell9.innerHTML = "Manufacture date";
            c1ell10.innerHTML = "Exp date";
            c1ell11.innerHTML = "Qty";
        }

        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
      //  var cell3 = row.insertCell(2);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3)
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8)
        var cell10 = row.insertCell(9);
        var cell11 = row.insertCell(10)


        cell1.innerHTML = i;
        cell2.innerHTML = val[i]['BatchNo'];

        if (val[i]['CCode'] == "02") {
            l = "Laboratories"
        } else if (val[i]['CCode'] == "01") {
            l = "Pharmaceuticals"
        } else {
            l = "K.C.Corporation"
        }
        console.log(l)
        cell3.innerHTML = val[i]['DESCR'];
        cell4.innerHTML = val[i]['PCAPCTY'];
        cell5.innerHTML = k;
        cell6.innerHTML = val[i]['ItemCd'];
        cell7.innerHTML = val[i]['RATE'];
        cell8.innerHTML = val[i]['MRP'];
        cell9.innerHTML = val[i]['MfgDt'];
        cell10.innerHTML = val[i]['ExpDt'];
        cell11.innerHTML = val[i]['Qty']
        $("#s1").text("The closing Stock for - - " + l);
    }
});
