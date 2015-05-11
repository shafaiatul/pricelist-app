var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
	
	var refresh = function () {
		$http.get('/pricelist').success(function (response) {
			console.log('I got the data I requested');
			$scope.pricelist = response; // 'response' is what I received from the data. This line of code will put the data in index.html
			$scope.product = ''; //this will clear out the input boxes after I call the refresh() function. 
		});
	};

	refresh(); //call the function so that it will get the data right when I load the page. Lets call the refresh() function end of 
	//"addProduct" function to imediately refresh the page after clicking the "Add Contact" button

	$scope.addProduct = function () {
		console.log($scope.product); //this is going to send to the console the info in the input boxes
		$http.post('/pricelist', $scope.product).success(function (response) {//'$scope.product' is the data I am sending to the server
			console.log(response);
			//call the refresh() function end of the addProduct() function to immediately refresh the page after I click the "Add Product" button
			refresh(); 
		}); 
	};

	$scope.remove = function (id) {
		console.log(id);
		$http.delete('/pricelist/' + id).success(function (response) {//the idea of the function is send the URL of the 'id' I want to delete. 
			
			refresh();
		});
	};

	$scope.edit = function (id) { //I wanna pass in the id of the product I want to edit
		console.log(id);
		$http.get('/pricelist/' + id).success(function (response) {
			$scope.product = response; //putting the response to the product input box
		});
	};

	$scope.update = function () {
		console.log($scope.product._id); //this will put the id of the product in the input boxes into the console, same id is produced when click the update button
		//Now I am going use a PUT request to send the data to the server to be updated
		$http.put('/pricelist/' + $scope.product._id, $scope.product).success(function (response) {
			refresh();
		}); 
		//('/pricelist/' + $scope.product._id) > thats the url of the product in the box
		// ($scope.product) > then send to server everything in the input boxes (product.productname, product.price,product.size)  
	};

	$scope.deselect = function () {
		$scope.product = '';
	};


}]);