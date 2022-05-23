

  $("#toggle").on('click', function () {
    if ( $(this).is(':checked') ) {
        document.querySelector(".form-group-2 label").innerHTML = "Снять правило LUKR";
        sortTable(".sortable");
    }
    else {
        document.querySelector(".form-group-2 label").innerHTML = "Установить правило LUKR";
        sortTable();
    }
})
  
 getRandom = (min, max, num) => {
    return  Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
}

 
 createTable = () => {
  var numberOfdetails = document.getElementById("numberOfdetails").value;

  rebuildMatrix = (arr) => {
  
    arr.sort((a,b) => {
      return a[0] - b[0];
    })
     return arr;
   }

  createMatrix = (stanki, numberOfdetails) => {
    var dig_matrix = [];
 
    for (let i = 0; i < numberOfdetails; i++) {
       dig_matrix[i] = [];
        for (let j = 0; j < stanki; j++) {
        var div = document.createElement('div');
        div.className = 'cell';
          dig_matrix[i][j] = getRandom(0,700,50);

        }
    }
    
    return dig_matrix;
 }


  let w =10;
  let h = numberOfdetails;
  let m = createMatrix(w,h);

  console.log(m)

  let d = document.querySelector(".unsorted > tbody");
  for(let i=0; i<m.length; i++){
    const row_id = document.createElement('td');
    row_id.innerHTML = `${i+1}`;
    let row = m[i];
    let r = document.createElement('tr');
     // r.innerHTML = `${m[i]}`;
     d.appendChild(r);
     r.appendChild(row_id);
      for(let j=0; j < row.length; j++){
        let col = document.createElement('td');
        col.innerHTML = `${row[j]}`;
       r.appendChild(col);
      }
      d.appendChild(document.createElement('div')); //для разделения строк
  }

//console.log(createMatrix(10, numberOfdetails));




$("#toggle_spt").on('click', function () {
  if ( $(this).is(':checked') ) {
      document.querySelector(".form-group-3 label").innerHTML = "Снять правило SPT";
      console.log('/////////////////////ПОСЛЕ СОРТИРОВКИ///////////////////////////////////////////');
     
      console.log(rebuildMatrix(m));


      let d = document.querySelector(".sorted > tbody");
      for(let i=0; i<m.length; i++){
        let row_id = document.createElement('td');
        row_id.innerHTML = `${i+1}`;
        let row = m[i];
        let r = document.createElement('tr');
         // r.innerHTML = `${m[i]}`;
         d.appendChild(r);
         r.appendChild(row_id);
          for(let j=0; j < row.length; j++){
            let col = document.createElement('td');
            col.innerHTML = `${row[j]}`;
           r.appendChild(col);
          }
          d.appendChild(document.createElement('div')); //для разделения строк
      }



      var barOptions_stacked = {
        hover :{
            animationDuration:10
        },
        scales: {
            xAxes: [{
                label:"Duration",
                ticks: {
                    beginAtZero:true,
                    fontFamily: "'Open Sans Bold', sans-serif",
                    fontSize:11
                },
                scaleLabel:{
                    display:false
                },
                gridLines: {
                }, 
                stacked: true
            }],
            yAxes: [{
                gridLines: {
                    display:false,
                    color: "#fff",
                    zeroLineColor: "#fff",
                    zeroLineWidth: 0
                },
                ticks: {
                    fontFamily: "'Open Sans Bold', sans-serif",
                    fontSize:11
                },
                stacked: true
            }]
        },
        legend:{
            display:false
        },
    };

// var taskArray = m.map((row) => (
//   {  data: row,
//     backgroundColor: ['red', 'green', 'blue', 'yellow'],
 
// }));

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {    
    type: 'horizontalBar',
    data: {
        labels: m.map(item => `Деталь ${m.indexOf(item) + 1}`),
        datasets: [{
                data: [0,1500,1800,1900,2200],
                backgroundColor: "rgba(63,103,126,0)",
                hoverBackgroundColor: "rgba(50,90,100,0)"
            },
            {
              data: [2800, 2500,2000,1500, 2200],
              backgroundColor: ['red', 'green', 'blue', 'yellow','brown'],
          }]
  
     },
    options: barOptions_stacked,
});



console.log(Object.values(myChart.data.datasets[0]))


   
   

// this part to make the tooltip only active on your real dataset
var originalGetElementAtEvent = myChart.getElementAtEvent;
myChart.getElementAtEvent =  (e) => {
    return originalGetElementAtEvent.apply(this, arguments).filter((e) => {
        return e._datasetIndex === 1;
    });
}

      
  }
  else {
      document.querySelector(".form-group-3 label").innerHTML = "Установить правило SPT";
  }
})




}



//LUKR, MWKR

// function sortTable(selector, compFunc) {
//     var mySelector = '.sortable';
//     var myCompFunc = function($td1, $td2, isAsc) {
//       var v1 = $.trim($td1.text()).replace(/,|\s+|%/g, '');
//       var v2 = $.trim($td2.text()).replace(/,|\s+|%/g, '');
//       var pattern = /^\d+(\.\d*)?$/;
//       if (pattern.test(v1) && pattern.test(v2)) {
//         v1 = parseFloat(v1);
//         v2 = parseFloat(v2);
//       }

//       return isAsc ? v1 > v2 : v1 < v2;
//     };

//     var doSort = function($tbody, index, compFunc, isAsc)
//     {
//       var $trList = $tbody.find("tr");
//       var len = $trList.length;
//       for(var i=0; i<len-1; i++) {
//         for(var j=0; j<len-i-1; j++) {
//           var $td1 = $trList.eq(j).find("td").eq(index);
//           var $td2 = $trList.eq(j+1).find("td").eq(index);

//           if (compFunc($td1, $td2, isAsc)) {
//             var t = $trList.eq(j+1);
//             $trList.eq(j).insertAfter(t);
//             $trList = $tbody.find("tr");
//           }
//         }
//       }
//       console.log(table.rows[1]);
//     }

//     var init = function() {
//       var $th = $("th" + selector);
//       this.$table = $th.closest("table");
//       var that = this;
//       $th.click(function(){
//         var index = $(this).index();
//         var asc = $(this).attr('data-asc');
//         isAsc = asc === undefined ? true : (asc > 0 ? true : false);

//         doSort(that.$table.find("tbody"), index, compFunc, isAsc);

//         $(this).attr('data-asc', 1 - (isAsc ? 1 : 0));
//       });

//       $th.css({'cursor': 'pointer'})
//          .attr('title', "Нажмите, чтобы отсортировать")
//          .append('&nbsp;<i class="fa fa-long-arrow-down" style="color:#2196F3" aria-hidden="true"></i><i class="fa fa-long-arrow-up" style="color:#2196F3" aria-hidden="true"></i>');
//     };


//     selector = selector || mySelector;
//     compFunc = compFunc || myCompFunc;

//     init();
//   }




// generateGanttChartData = (data) => {   
//     // Data contains the processes in the required order
//     var n = data.length;
//     var finalData = [];
//     var clock = 0;
    
//     console.log(data[0]);

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

//         temp.category = "Деталь " + (parseInt(i + 1)).toString();
//         temp.segments[0].start = clock;
      
//         temp.segments[0].duration = data[i][0];
//         temp.segments[0].task = "Деталь " + (i + 1).toString();

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



