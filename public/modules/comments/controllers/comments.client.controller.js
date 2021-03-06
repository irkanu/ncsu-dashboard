'use strict';

// Comments controller
angular.module('comments').controller('CommentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Comments', 'Articles',
	function($scope, $stateParams, $location, Authentication, Comments, Articles) {
		$scope.authentication = Authentication;

		// Create new Comment
		$scope.create = function() {
			// Create new Comment object
			var comment = new Comments ({
                //articleId: $stateParams.id,
				body: this.body
			});
            var article = $scope.article;
            console.log('Comment Object : ' + comment);

			// Redirect after save
			comment.$save(function(response) {
                $location.path('articles/' + article._id);

                console.log('Comment $save : ' + comment);

				// Clear form fields
				$scope.body = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Comment
		$scope.remove = function(comment) {
			if ( comment ) { 
				comment.$remove();

				for (var i in $scope.comments) {
					if ($scope.comments [i] === comment) {
						$scope.comments.splice(i, 1);
					}
				}
			} else {
				$scope.comment.$remove(function() {
					$location.path('comments');
				});
			}
		};

		// Update existing Comment
		$scope.update = function() {
			var comment = $scope.comment;

			comment.$update(function() {
				$location.path('articles/:articleId/comments/' + comment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Comments
		$scope.find = function() {
			$scope.comments = Comments.query();
            console.log(Comments.query());
		};

		// Find existing Comment
		$scope.findOne = function() {
			$scope.comment = Comments.get({ 
				commentId: $stateParams.commentId
			});
            console.log($stateParams);
            console.log($scope.comment);
		};
	}
]);
