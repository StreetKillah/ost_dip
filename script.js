$("#toggle").on('click', function () {
    if ( $(this).is(':checked') ) {
        document.querySelector(".form-group-2 label").innerHTML = "Снять правило SPT";
        sortTable(".sortable");
    }
    else {
        document.querySelector(".form-group-2 label").innerHTML = "Установить правило SPT";
        sortTable();
    }
})
  

 getRandom = (min, max, num) => {
    return  Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
}



var numberOfdetails=document.getElementById("numberOfdetails").value;


const table = document.getElementById("inputTable");

//10 станков...
createTable = () => {   
    let table=document.getElementById("inputTable");
    var numberOfdetails=document.getElementById("numberOfdetails").value;
    
    for(let i = 0; i < numberOfdetails; i++){
        
        var firstRow = table.insertRow(-1);
        let cell1 = firstRow.insertCell(-1);
        
        for(let j = 0; j < 10; j++){
           // var secondRow = table.insertRow(-1);
            var cell2 = firstRow.insertCell(-1);
            cell2.innerHTML = getRandom(0, 700, 50); 
        }
      
       
        cell1.innerHTML=i+1;
    }
   // var new_tab = new Tabulator("#inputTable", {});

   GetCellValues(numberOfdetails);
}



function sortTable(selector, compFunc) {
    var mySelector = '.sortable';
    var myCompFunc = function($td1, $td2, isAsc) {
      var v1 = $.trim($td1.text()).replace(/,|\s+|%/g, '');
      var v2 = $.trim($td2.text()).replace(/,|\s+|%/g, '');
      var pattern = /^\d+(\.\d*)?$/;
      if (pattern.test(v1) && pattern.test(v2)) {
        v1 = parseFloat(v1);
        v2 = parseFloat(v2);
      }

      return isAsc ? v1 > v2 : v1 < v2;
    };

    var doSort = function($tbody, index, compFunc, isAsc)
    {
      var $trList = $tbody.find("tr");
      var len = $trList.length;
      for(var i=0; i<len-1; i++) {
        for(var j=0; j<len-i-1; j++) {
          var $td1 = $trList.eq(j).find("td").eq(index);
          var $td2 = $trList.eq(j+1).find("td").eq(index);

          if (compFunc($td1, $td2, isAsc)) {
            var t = $trList.eq(j+1);
            $trList.eq(j).insertAfter(t);
            $trList = $tbody.find("tr");
          }
        }
      }
      console.log(table.rows[1]);
    }

    var init = function() {
      var $th = $("th" + selector);
      this.$table = $th.closest("table");
      var that = this;
      $th.click(function(){
        var index = $(this).index();
        var asc = $(this).attr('data-asc');
        isAsc = asc === undefined ? true : (asc > 0 ? true : false);

        doSort(that.$table.find("tbody"), index, compFunc, isAsc);

        $(this).attr('data-asc', 1 - (isAsc ? 1 : 0));
      });

      $th.css({'cursor': 'pointer'})
         .attr('title', "Нажмите, чтобы отсортировать")
         .append('&nbsp;<i class="fa fa-long-arrow-down" style="color:#2196F3" aria-hidden="true"></i><i class="fa fa-long-arrow-up" style="color:#2196F3" aria-hidden="true"></i>');
    };


    selector = selector || mySelector;
    compFunc = compFunc || myCompFunc;

    init();
  }



 GetCellValues = (numberOfdetails) => {
  
    let defaultArray = [];

    /*---------------------------------------------MY EDIT----------------------------------------------------------------*/

    var table = document.getElementById('inputTable');
    let tempSum;
   

    for (var r = 1, n = table.rows.length; r < n; r++) {
        tempSum = 0;
        for (var c = 1, m = table.rows[r].cells.length; c < m; c++) {
         tempSum += parseInt(table.rows[r].cells[c].innerHTML);
        
        }
        defaultArray.push(tempSum);
        continue;
    }


    let filteredArray = defaultArray.filter(el => el !== 0);

    let sortedTable = document.getElementById('sortedTable');

    for(let i = 0; i < numberOfdetails; i++){
        let firstRow = sortedTable.insertRow(-1);
        let cell1 = firstRow.insertCell(-1);
        let cell2 = firstRow.insertCell(-1);
        // for(let j = 0; j < 10; j++){
        //     cell2 = firstRow.insertCell(-1);
            
        // }
        cell2.innerHTML = filteredArray[i];
        cell1.innerHTML=i+1;
    }
  }


// generateGanttChartData = (data) => {   
//     // Data contains the processes in the required order
//     var n = data.length;
//     var finalData = [];
//     var clock = 0;
    
//     //console.log(n);

//     for (var i=0; i<n; i++)
//     {
//         var temp = {
//                 "category": "",
//                 "segments": [ {
//                     "start": 0,
//                     "duration": 0,
//                     "color": "#727d6f",
//                     "task": ""
//                 }, ]
//             }

//         temp.category = "Process " + (parseInt(data[i][0])).toString();
//         temp.segments[0].start = clock;
//         temp.segments[0].duration = data[i][1];
//         temp.segments[0].task = "Process " + (parseInt(data[i][0])).toString();

//         clock = clock + data[i][1];
//         finalData.push(temp);
//     }
     
//     return finalData;
// }



//  printGanttChart = () => {
//     //chartData contains data for dataProvider KEY
//     var chartData = generateGanttChartData(GetCellValues());
    

//     var chart = AmCharts.makeChart( "chartdiv", 
//         {
//         "type": "gantt",
//         "theme": "dark",
//         "marginRight": 70,
//         "period": "hh:mm:ss",
//         "dataDateFormat":"YYYY-MM-DD",
//         "balloonDateFormat": "JJ:NN",
//         "columnWidth": 0.5,
//         "valueAxis": {
//             "type": "timecode"
//         },
//         "brightnessStep": 10,
//         "graph": {
//             "fillAlphas": 1,
//             "balloonText": "<b>[[task]]</b>: [[open]] [[value]]"
//         },
//         "rotate": true,
//         "categoryField": "category",
//         "segmentsField": "segments",
//         "colorField": "color",
//         "startDate": "00:00:00:00",
//         "startField": "start",
//         "endField": "end",
//         "durationField": "duration",


//         // This key contains values generated by generateGanttChartData FUNCTION
//         "dataProvider": chartData,


//         "valueScrollbar": {
//             "autoGridCount":true
//         },
//         "chartCursor": {
//             "cursorColor":"#55bb76",
//             "valueBalloonsEnabled": false,
//             "cursorAlpha": 0,
//             "valueLineAlpha":0.5,
//             "valueLineBalloonEnabled": true,
//             "valueLineEnabled": true,
//             "zoomable":false,
//             "valueZoomable":true
//         },
//         "export": {
//             "enabled": true
//          }
//     } );
// }


//  printStat = (ct,ta,wt,avgwt,avgta,pid) => {
//     console.log(ct);
//     console.log(ta);
//     console.log(wt);
//     console.log(avgwt);
//     console.log(avgta);
    
//     document.getElementById("wtOutput").innerHTML=avgwt;
//     document.getElementById("taOutput").innerHTML=avgta;
    
//     var table_2=document.getElementById("statTable");

//     console.log("len");
//     console.log(table_2.rows.length);

//     for(var i = table_2. rows. length; i > 1; i--)
//     {
//             console.log(i);
//             table_2. deleteRow(i-1);
//     }

//     for (var i=0;i<pid.length;i++)
//     {   
//     var firstRow = table_2.insertRow(i+1);
//     var cell1 = firstRow.insertCell(0);
//     var cell2 = firstRow.insertCell(1);
//     var cell3 = firstRow.insertCell(2);
//     var cell4 = firstRow.insertCell(3);
//         cell1.innerHTML=pid[i];
//         cell2.innerHTML=ct[i];
//         cell3.innerHTML=ta[i];
//         cell4.innerHTML=wt[i];
//     }
    
// }



