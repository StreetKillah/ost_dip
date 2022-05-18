$("#toggle").on('click', function () {
    if ( $(this).is(':checked') ) {
        document.querySelector(".form-group-2 label").innerHTML = "Снять правило SPT";
    }
    else {
        document.querySelector(".form-group-2 label").innerHTML = "Установить правило SPT";
    }
})
  

 getRandom = (min, max, num) => {
    return  Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
}


//10 станков...
createTable = () => {   
    let table=document.getElementById("inputTable");
    var numberOfdetails=document.getElementById("numberOfdetails").value;


    for(let i = 0; i < numberOfdetails; i++){
        
        let firstRow = table.insertRow(-1);
        let cell1 = firstRow.insertCell(-1);
        for(let j = 0; j < 10; j++){
           // var secondRow = table.insertRow(-1);
            let cell2 = firstRow.insertCell(-1);
            cell2.innerHTML = getRandom(0, 700, 50); 
        }

        cell1.innerHTML=i+1;
    }

    GetCellValues(numberOfdetails);
}


 GetCellValues = (numberOfdetails) => {
  
    // items is the sorted list
    var items = [];
    let defaultArray = [];

    /*---------------------------------------------MY EDIT----------------------------------------------------------------*/

    var table = document.getElementById('inputTable');
    let tempSum;
    let nextTemp;
 

    for (var r = 1, n = table.rows.length; r < n; r++) {
        tempSum = 0;
        for (var c = 1, m = table.rows[r].cells.length; c < m; c++) {
         tempSum += parseInt(table.rows[r].cells[c].innerHTML);
         nextTemp += parseInt(table.rows[r].cells[c].innerHTML);
        }
        defaultArray.push(tempSum);
        continue;
    }


    let filteredArray = defaultArray.filter(el => el !== 0);

    console.log(filteredArray.sort((a,b) => a - b));


    let sortedTable = document.getElementById('sortedTable');

    for(let i = 0; i < numberOfdetails; i++){
        let firstRow = sortedTable.insertRow(-1);
        let cell1 = firstRow.insertCell(-1);
        for(let j = 0; j < 10; j++){
            var cell2 = firstRow.insertCell(-1);
            
        }
        cell2.innerHTML = filteredArray[i];
        cell1.innerHTML=i+1;
    }


   

     /*---------------------------------------------MY EDIT----------------------------------------------------------------*/
    
    var toggle = document.getElementById("toggle").checked;
    
    if (toggle == true)
        items = preemptiveSelection(pid,at,bt,flag,bt2);
    else
       // items = nonPreemptiveSelection(pid,at,bt,flag);
    
    return items;

  }


// nonPreemptiveSelection = (pid,at,bt,flag) => {
//     var n = pid.length;
//     var clock = 0;
//     var tot = 0;
//     var items =[];
//     var ct=[];
//     var ta=[];
//     var wt=[];
//     var avgwt=0;
//     var avgta=0;
    

//     while(true)
//     {
//         var min=100;
//         var c = n; // c represents the current PID
//         if (tot == n) // total no of process = completed process loop will be terminated
//             break;
        
//         for (var i=0; i< n; i++)
//         {
//             /*
//              * If i'th process arrival time <= system time and its flag=0 and burst<min 
//              * That process will be executed first 
//              */ 
//             var count=0;
//             if ((at[i] <= clock) && (flag[i] == 0) && (bt[i]<min))
//                 {
//                     min=bt[i];
//                     c=i;
//                 } 

//         }
//         /* If c==n means c value can not updated because no process arrival time< system time so we increase the system time */
//         if (c==n) 
//             clock++;
//         else
//         {
//             var temp = [];
//             temp.push(pid[c]);
//             temp.push(bt[c]);
//             items.push(temp);

//             ct[c]=clock+bt[c];
//             ta[c]=ct[c]-at[c];
//             wt[c]=ta[c]-bt[c];
            
//             clock+=bt[c];
//             flag[c]=1;
//             tot++;   
//         }
//     }

//     for(i=0;i<n;i++)
//     {
//         avgwt +=wt[i];
//         avgta +=ta[i];
//     }

//     avgwt/=n;
//     avgta/=n;
//     printStat(ct,ta,wt,avgwt,avgta,pid); 
//     return items;
//   }

//  preemptiveSelection = (pid,at,bt,flag,bt2) =>{
//     var n = pid.length;
//     var clock = 0;
//     var tot = 0;
//     var items =[];
//     var ct=[];
//     var ta=[];
//     var wt=[];
//     var avgwt=0;
//     var avgta=0;
    
//     var count2=0;

//     while (true)
//     {
//         var c = n;
//         var min =100;
//         if (tot==n)
//         {
//             items.push(temp);
//             break;
//         }
            
//         for (var i=0; i< n; i++)
//         {
//             /*
//              * If i'th process arrival time <= system time and its flag=0 and burst<min 
//              * That process will be executed first 
//              */ 
//             var count=0;
//             if ((at[i] <= clock) && (flag[i] == 0) && (bt[i]<min))
//                 {
//                     min=bt[i];
//                     c=i;
//                 } 

//         }
        
//         // If there's no c:
//         if (c==n)
//         {
//             clock+=1;
//         }
//         // If there's a c:
//         else
//         {
//             bt[c]--;
//             clock++;
//             if (bt[c]==0)
//             {   
//                 ct[c]=clock;
//                 flag[c]=1
//                 tot++;
//             }

//             if (count2==0)
//             {
//                 //temp2 holds the previous c
//                 var temp2=c;
//                 var temp = [];
//                 temp.push(pid[c]);
//                 temp.push(1)
//             }

//             else
//             {
//                  if (c==temp2)
//                 {
//                     temp[1]++;
//                 }
//                 else
//                 {
//                     items.push(temp);
//                     var temp =[];
//                     temp.push(pid[c]);
//                     temp.push(1);
//                     temp2=c;
//                 }
//             }
//             console.log(c); 
//             count2++;
//         }
           
//     }

//     for(i=0;i<n;i++)
//     {
//         ta[i] = ct[i] - at[i];
//         wt[i] = ta[i] - bt2[i];
//         avgwt +=wt[i];
//         avgta +=ta[i];
//     }

//     avgwt/=n;
//     avgta/=n;

//     printStat(ct,ta,wt,avgwt,avgta,pid);            
//     return items;
        
// }


generateGanttChartData = (data) => {   
    // Data contains the processes in the required order
    var n = data.length;
    var finalData = [];
    var clock = 0;
    
    //console.log(n);

    for (var i=0; i<n; i++)
    {
        var temp = {
                "category": "",
                "segments": [ {
                    "start": 0,
                    "duration": 0,
                    "color": "#727d6f",
                    "task": ""
                }, ]
            }

        temp.category = "Process " + (parseInt(data[i][0])).toString();
        temp.segments[0].start = clock;
        temp.segments[0].duration = data[i][1];
        temp.segments[0].task = "Process " + (parseInt(data[i][0])).toString();

        clock = clock + data[i][1];
        finalData.push(temp);
    }
     
    return finalData;
}



 printGanttChart = () => {
    //chartData contains data for dataProvider KEY
    var chartData = generateGanttChartData(GetCellValues());
    

    var chart = AmCharts.makeChart( "chartdiv", 
        {
        "type": "gantt",
        "theme": "dark",
        "marginRight": 70,
        "period": "hh:mm:ss",
        "dataDateFormat":"YYYY-MM-DD",
        "balloonDateFormat": "JJ:NN",
        "columnWidth": 0.5,
        "valueAxis": {
            "type": "timecode"
        },
        "brightnessStep": 10,
        "graph": {
            "fillAlphas": 1,
            "balloonText": "<b>[[task]]</b>: [[open]] [[value]]"
        },
        "rotate": true,
        "categoryField": "category",
        "segmentsField": "segments",
        "colorField": "color",
        "startDate": "00:00:00:00",
        "startField": "start",
        "endField": "end",
        "durationField": "duration",


        // This key contains values generated by generateGanttChartData FUNCTION
        "dataProvider": chartData,


        "valueScrollbar": {
            "autoGridCount":true
        },
        "chartCursor": {
            "cursorColor":"#55bb76",
            "valueBalloonsEnabled": false,
            "cursorAlpha": 0,
            "valueLineAlpha":0.5,
            "valueLineBalloonEnabled": true,
            "valueLineEnabled": true,
            "zoomable":false,
            "valueZoomable":true
        },
        "export": {
            "enabled": true
         }
    } );
}


 printStat = (ct,ta,wt,avgwt,avgta,pid) => {
    console.log(ct);
    console.log(ta);
    console.log(wt);
    console.log(avgwt);
    console.log(avgta);
    
    document.getElementById("wtOutput").innerHTML=avgwt;
    document.getElementById("taOutput").innerHTML=avgta;
    
    var table_2=document.getElementById("statTable");

    console.log("len");
    console.log(table_2.rows.length);

    for(var i = table_2. rows. length; i > 1; i--)
    {
            console.log(i);
            table_2. deleteRow(i-1);
    }

    for (var i=0;i<pid.length;i++)
    {   
    var firstRow = table_2.insertRow(i+1);
    var cell1 = firstRow.insertCell(0);
    var cell2 = firstRow.insertCell(1);
    var cell3 = firstRow.insertCell(2);
    var cell4 = firstRow.insertCell(3);
        cell1.innerHTML=pid[i];
        cell2.innerHTML=ct[i];
        cell3.innerHTML=ta[i];
        cell4.innerHTML=wt[i];
    }
    
}

