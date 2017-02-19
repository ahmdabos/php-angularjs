app.controller('productsCtrl', function($scope, $http, Data) {
	// delete product
	$scope.deleteProduct = function(id){
		// ask the user if he is sure to delete the record
		if(confirm("Are you sure?")){
			Data.send({ 'id' : id },'product/delete.php'
			).then(function successCallback(response) {
	 
				// tell the user product was deleted
				Materialize.toast(response.data, 4000);
	 
				// refresh the list
				$scope.getAll();
			});
		}
	}
	// update product record / save changes
	$scope.updateProduct = function(){
		Data.send({
				'id' : $scope.id,
				'name' : $scope.name,
				'description' : $scope.description,
				'price' : $scope.price
			},'product/update.php'
		).then(function successCallback(response) {
	 
			// tell the user product record was updated
			Materialize.toast(response.data, 4000);
	 
			// close modal
			$('#modal-product-form').modal('close');
	 
			// clear modal content
			$scope.clearForm();
	 
			// refresh the product list
			$scope.getAll();
		});
	}
	// retrieve record to fill out the form
	$scope.readOne = function(id){
	 
		// change modal title
		$('#modal-product-title').text("Edit Product");
	 
		// show udpate product button
		$('#btn-update-product').show();
	 
		// show create product button
		$('#btn-create-product').hide();
	 
		// post id of product to be edited
		Data.send({
			'id': id
		},'product/read_one.php').then(function (response) {
			console.log(response);
			// put the values in form
			$scope.id = response.data[0]["id"];
			$scope.name = response.data[0]["name"];
			$scope.description = response.data[0]["description"];
			$scope.price = response.data[0]["price"];
	 
			// show modal
			$('#modal-product-form').modal('open');
		}, function (error) {
                console.log(error.statusText);
            })
		
	}
	// read products
	$scope.getAll = function(){
		Data.get('product/read.php')
        .then(
            function (result) {
                $scope.names = result.records;
            },
            function (error) {
                console.log(error.statusText);
            }
        );
	};
	 
	$scope.showCreateForm = function(){
	 
		// clear form
		$scope.clearForm();
	 
		// change modal title
		$('#modal-product-title').text("Create New Product");
	 
		// hide update product button
		$('#btn-update-product').hide();
	 
		// show create product button
		$('#btn-create-product').show();
	 
	};
	// clear variable / form values
	$scope.clearForm = function(){
		$scope.id = "";
		$scope.name = "";
		$scope.description = "";
		$scope.price = "";
	};
	// create new product
	$scope.createProduct = function(){
	 
		Data.send({
				'name' : $scope.name,
				'description' : $scope.description,
				'price' : $scope.price
			},'product/create.php'

		).then(function successCallback(response) {
	 
			// tell the user new product was created
			Materialize.toast(response.data);
	 
			// close modal
			$('#modal-product-form').modal('close');
	 
			// clear modal content
			$scope.clearForm();
	 
			// refresh the list
			$scope.getAll();
		});
	}
});


