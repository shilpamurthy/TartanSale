Meteor.publish('messages', function(){
	return Messages.find({});
});

Meteor.publish('dbfiles', function(){
	return DBFiles.find({});
});

Meteor.publish('homemessages', function(){
	return HomeMessages.find({});
});