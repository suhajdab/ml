var bigml = require('bigml');

// Where does authentication fit in?? - https://github.com/bigmlcom/bigml-node
/*
 connection = new bigml.BigML('myusername', 'ae579e7e53fb9abd646a6ff8aa99d4afe83ac291')
 */

// TODO: learn https://bigml.com/how_it_works

var source = new bigml.Source();
source.create('./data/iris.csv', function(error, sourceInfo) {
	if (!error && sourceInfo) {
		var dataset = new bigml.Dataset();
		dataset.create(sourceInfo, function(error, datasetInfo) {
			if (!error && datasetInfo) {
				var model = new bigml.Model();
				model.create(datasetInfo, function (error, modelInfo) {
					if (!error && modelInfo) {
						var prediction = new bigml.Prediction();
						prediction.create(modelInfo, {'petal length': 1})
					}
				});
			}
		});
	}
});