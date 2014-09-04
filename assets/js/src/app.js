$( document ).ready(function() {

	var MainContent = Backbone.Model.extend({
		el: '.content',
		initialize: {

		}
	});

	var MainContentCollection = Backbone.Collection.extend({
		model: MainContent,
		url: 'api/blocks',
		initialize: function() {
			this.fetch();
		},


	});
	/*
	var ContentView = Backbone.Marionette.CollectionView({

		el: '.content'
		//childView: 
	});

	var BlockView = Backbone.Marionette.ChildView.extend({
		//template:
	});
	*/




	function getAuth() {
		$.ajax({
			url: 'api/auth',
			type: 'GET',
			success: function (data) {
				console.log(data);
				if (data.auth) {
					var MainStuff = new MainContentCollection();
				}
			}
		})
	}

	var CoreRouter = Backbone.Router.extend({
		initialize: function () {
			console.log('Hey');
		},
		routes:{ 
			'workshopscmd/home': 'home',
			'workshopscmd/view': 'viewImage'
		},
		home: function () {
			console.log('HomePage');
			var MainContentLayout = new ContentLayout();

		},
		viewImage: function () {
			console.log('VIEW');	
		}
	});

	var BlockViews = new Backbone.Marionette.ItemView.extend({
		initialize: function () {


		}
	});

	var ContentLayout = new Backbone.Marionette.LayoutView.extend({
		el: '.wrap',
		regions: {
			pageContent: '.content'
		},
		initialize: function () {
			this.pageContent.show();
		}
	});


	function runApp() {
		/*this.$hero.owlCarousel({
			singleItem: true,
			autoPlay: 3000
		})*/
		$('code').each(function() {
			var $el = $(this);
			var code = $el.html();
			$el.html(_.escape(code));

		});

		var appRouter = new CoreRouter();

		appRouter.navigate('workshopscmd/home', {trigger: true});

		$('#code').click(function(event){
			event.preventDefault();
			appRouter.navigate('workshopscmd/view', {trigger: true});
		});
	}
	runApp();
});

Backbone.history.start({pushState: true});