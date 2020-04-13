
//Create a dropdown list
function buildlist() {

    d3.json("samples.json").then((incomingData) => {
        
        var names = incomingData.names
    
        var dropdownMenu = d3.select("#selDataset");
    
        dropdownMenu.selectAll("option")
            .data(names)
            .enter()
            .append("option")
            .text(function(d) {
                return d;
            })
            .attr("value", function(d) {
                return d;
                });
    });
}

buildlist()

//capture and pass the values of dropdown value changes
function optionChanged(val) {
    buildbar(val);
    buildbubble(val);
    buildinfo(val);
  }

//Build Bar chart
function buildbar(val) {
  d3.json("samples.json").then((incomingData) => {
    
    var samples = incomingData.samples
    
    function filter_id(x) {
        return x.id === val;
      }

    var selected_id = samples.filter(filter_id);
    

    var otu_ids = selected_id.map(x => x.otu_ids);
    let otu_ids_sliced = otu_ids[0].slice(0, 10);
    let otu_ids_reversed = otu_ids_sliced.reverse();
    var otu_ids_string = otu_ids_reversed.map(x => `OTU ${x}`);

    var otu_labels = selected_id.map(x => x.otu_labels);
    let otu_labels_sliced = otu_labels[0].slice(0, 10);
    let otu_labels_reversed = otu_labels_sliced.reverse();

    var sample_values = selected_id.map(x => x.sample_values);
    let sample_values_sliced = sample_values[0].slice(0, 10);
    let sample_values_reversed = sample_values_sliced.reverse();
    
    var data = [{
        type: 'bar',
        x: sample_values_reversed,
        y: otu_ids_string,
        text: otu_labels_reversed,
        orientation: 'h'
      }];
      
      Plotly.newPlot('bar', data);

    
});
}

buildbar("940");

// Build Bubble chart
function buildbubble(val) {
    d3.json("samples.json").then((incomingData) => {
      
      var samples = incomingData.samples
      
      function filter_id(x) {
          return x.id === val;
        }
  
      var selected_id = samples.filter(filter_id);
    
      var otu_ids = selected_id.map(x => x.otu_ids);
      console.log(otu_ids);
      var otu_labels = selected_id.map(x => x.otu_labels);
      console.log(otu_labels);

      var sample_values = selected_id.map(x => x.sample_values);
      
    
  
        var trace1 = {
        x: otu_ids[0],
        y: sample_values[0],
        mode: 'markers',
        marker: {
          size: sample_values[0],
          color: otu_ids[0]
        },
        text: otu_labels[0],
        
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Marker Size',
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('bubble', data, layout);
  
      
  });
  }

  buildbubble("940");
  
//Create an info window.
  function buildinfo(val) {
    d3.json("samples.json").then((incomingData) => {
      
      var metadata = incomingData.metadata
     
      int_val = parseInt(val)
        console.log(int_val)

      function filter_id(x) {
          return x.id === int_val;
        }
  
      var selected_info = metadata.filter(filter_id);

        var keys = Object.keys(selected_info[0]);
        var values = Object.values(selected_info[0]);
        var entries = Object.entries(selected_info[0]);


      var info_box = d3.select("#sample-metadata");
        info_box.text("");

      for (var i = 0; i < keys.length; i++) {
        info_box.append("p").text(`${keys[i]}: ${values[i]}`)
      }
 
   
  });
  }
  


buildinfo("940");