
/*
  Meteor.subscribe('messages', function () {
    console.log(Messages.find({}).count());
});

  Meteor.subscribe('dbfiles', function () {
    console.log(DBFiles.find({}).count());
});

  Meteor.subscribe('homemessages', function () {
    console.log(HomeMessages.find({}).count());
});*/

  Template.messages.helpers({

		messages: function(){
	    	return Messages.find({userid: Meteor.userId()}, {sort: {time: -1}});
	    }
	});

    Template.homeMessages.helpers({
    messages: function(){
        var id = " " + Meteor.userId() + " ";
        return HomeMessages.find({buyerId: id}, {sort: {time: -1}});
      }
  });

    Template.homeMessages.events({
      'submit form': function(e, template){
        e.preventDefault();
        var id = e.target.id;
        HomeMessages.remove({_id:id});
      }
    });

  Template.messages.events({
        'submit form': function(e, template){
        e.preventDefault();
        var id = e.target.id;
        console.log(e.target);
        var buyerId = "p1_" + id;
        var result = "p2_" + id;
        var desID = "p3_" + id;
        var remID = "p4_" + id;
        console.log(buyerId);
        var bID = document.getElementById(buyerId).innerHTML;
        var res = document.getElementById(result).innerHTML;
        var description = document.getElementById(desID).innerHTML;
        var remove = document.getElementById(remID).innerHTML;
        console.log(res);
        HomeMessages.insert({
          buyerId: bID,
          message: res,
          description: description,
          time: Date.now(),
        });

        Messages.remove({_id:remove});
      }
  });


    Template.welcome.helpers({
    	name : function(){
    		return Meteor.user().profile.name;
    	}
	});

    Template.sidebar.helpers({
    	activeIfTemplateIs: function (template) {
      		var currentRoute = Router.current();
      		return (template === currentRoute.lookupTemplate()) ? "active" : "";
    	}
    });	

    Template.mymarketplace.helpers({
    	images:  function(){
        	return DBFiles.find({user:Meteor.userId()});
    	}
    });

    Template.marketplace.helpers({
    	images:  function(){
        	return DBFiles.find({});
    	}

    });

    Template.marketplace.events({
    	'submit form': function(e, template) {
  			console.log(e.target);
  		    e.preventDefault();
          var bidder = Meteor.userId();
  		    var name = Meteor.user().profile.name;
  		    console.log("bajeesus1");
  		    var user = e.target.id;
          var pID = "p_"+user;
          var uID = document.getElementById(pID).innerHTML;
          var buttonId = "but_" + user;
          var des = document.getElementById(buttonId).value;
          var msg = name + " " + des;
  		    console.log(msg);
  		     Messages.insert({
            name: name,
					  userid: uID,
						message: msg,
						time: Date.now(),
            buyer: bidder,
            description: des,
					});
  		 	}

    });

   	Template.upload.events({
      'submit form': function(e, template) {
          e.preventDefault();
          var file = template.find('#fileinput').files[0];
          var filedes = template.find('#description').value;
          var price = template.find('#price').value;
          var meteoruser = Meteor.userId();
          var reader = new FileReader();
          reader.onload = function(e) {
              DBFiles.insert({src:e.target.result,user:meteoruser,description:filedes, price:price});
          };
          reader.readAsDataURL(file);
      }
  });

 Router.configure({
 	layoutTemplate: 'layout'
 });

Router.map(function(){
    this.route('home', {path: '/'});
    this.route('homeMessages', {path: '/homeMessages'});
    this.route('upload', {path: '/upload'});
    this.route('marketplace', {path: '/marketplace'});
    this.route('mymarketplace', {path: '/mymarketplace'});
    this.route('messages', {path: '/messages'});
    this.route('home', {path: '/home'});
    this.route('upload', {path: '/upload'});
    this.route('homeMessages', {path: '/homeMessages'});
});
 