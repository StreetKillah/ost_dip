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

      


var seriesArr = [];



var numberOfparts = document.getElementById("numberOfparts").value;

var withParts = m.map(item => item.map(el => el * numberOfparts));




const labels = [
  'Станок 1',
  'Станок 2',
  'Станок 3',
  'Станок 4',
  'Станок 5',
  'Станок 6',
  'Станок 7',
  'Станок 8',
  'Станок 9',
  'Станок 10',
];

const randomColor  = () => {
  return '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
}






createData = (arr,data) => {
  for(let i = 0; i < arr.length; i++){
    let item = {};

      item.label = `Деталь ${i+1}`;
      item.backgroundColor = randomColor();
      item.data = [];
      item.order = i;


    for(let j = 0; j < 10; j++){
      if(i >= 1){
        data.datasets[0].data.push(arr[i-1][j]);
        
      }
      item.data.push(arr[i][j]);
    }
    data.datasets.push(item);
    continue;
  }

}


const data = {
  labels: labels,
  datasets: [
    {
      data: [0],
      backgroundColor: 'rgba(255, 255, 255, .0)',
    }
  //   {
  //   label: 'My First dataset',
  //   backgroundColor: randomColor(),
  //   borderColor: 'rgb(255, 99, 132)',
  //   data: [20, 10, 5, 2, 20, 30, 45, ],
  // },
  // {
  //   label: 'My Second dataset',
  //   backgroundColor: randomColor(),
  //   borderColor: 'rgb(255, 99, 132)',
  //   data: [10, 10, 5, 2, 20, 30, 45],
  // },
]
};


createData(withParts, data);

const config = {
  type: 'bar',
  data: data,
  options: {
    indexAxis:'y',
    elements : {
      bar : {
        borderWidth: 2,
      }
    },
    responsive: true,
    plugins : {
      legend: {
        position:'right',
      },
      title: {
        display: true,
       text: 'Диаграмма Гантта'
    },
  },
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
      beginAtZero: false,
      ticks: {
        min: 500,
      }
    },
    y: {
      stacked: true,
    }
  }
}
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);





//       // JS 
// var chart = JSC.chart('chartDiv', { 

   
//     debug: true, 
//     /*Typical Gantt setup. Horizontal columns by default.*/
//     type: 'horizontal column', 
    
//     /*Make columns overlap.*/
//     zAxis_scale_type: 'stacked', 
//     /*Time Y Axis.*/
//     yAxis_scale_type: 'stacked', 
//     xAxis_scale_type: 'stacked',
//     yAxis_line_breaks :{
//       invert: true,
    
//     },
//     yAxis_formatString: 'MMMM', 
//     xAxis: {
//         scale_type: 'stacked',
//         alternateGridFill: 'none'
//     },
//     xAxis_defaultTick_label_style: { 
//       fontSize: 16, 
//       fontWeight: 'bold',
//     }, 
    
//     defaultPoint_opacity: 0.8, 
    
//     legend: { 
//       template: '%icon %name', 
//       position: 'inside top right',
//       reversed: true,
      
//     }, 
//     title_label_text: 'Расписание обработки деталей', 
    
//     series: [ 
      
//     //   { 
//     //     name: 'Деталь 1', 
//     //     points: [ 
//     //       { 
//     //         name: 'Станок 1', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 2', 
//     //         y: 100, 
//     //         complete: 1 
//     //       },
//     //       { 
//     //         name: 'Станок 3', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 4', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 5', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 6', 
//     //         y:100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 7', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 8', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 9', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 10', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //     ] 
//     //   }, 


//     //   { 
//     //     name: 'Деталь 2', 
//     //     points: [ 
//     //       { 
//     //         name: 'Станок 1', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 2', 
//     //         y: 100, 
//     //         complete: 1 
//     //       },
//     //       { 
//     //         name: 'Станок 3', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 4', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 5', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 6', 
//     //         y:100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 7', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 8', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 9', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //       { 
//     //         name: 'Станок 10', 
//     //         y: 100, 
//     //         complete: 1 
//     //       }, 
//     //     ] 
//     //   }, 
      
//     ], 
//     toolbar_visible: false
//   }); 

  


// console.log(withParts)

// createData(chart, withParts);

document.querySelector('.prim').innerHTML = `На диаграмме учитано количество партий ${numberOfparts}`;


   

      
  }
  else {
      document.querySelector(".form-group-3 label").innerHTML = "Установить правило SPT";
  }
})




}


