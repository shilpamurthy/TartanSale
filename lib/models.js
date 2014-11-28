/**
 *Models
 */
Messages = new Meteor.Collection('messages');
DBFiles = new Meteor.Collection('dbfiles');
HomeMessages = new Meteor.Collection('homemessages');

/*Meteor.publish('messages', function(){
	return Messages.find({});
});

Meteor.publish('dbfiles', function(){
	return DBFiles.find({});
});

Meteor.publish('homemessages', function(){
	return HomeMessages.find({});
});*/

