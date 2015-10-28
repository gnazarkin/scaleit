import Ember from 'ember';

export default Ember.Controller.extend(
	Ember.Evented, {
	forceTouch: '',
	edited: false,
	resetVal: 0,

	editedForce: Ember.computed('forceTouch', 'edited', 'resetVal', function() {
		if(this.get('edited')===true) {
			return (this.get('forceTouch.force') - this.get('resetVal'));
		} else {
			return this.get('forceTouch.force');
		}
	}),

	resetRest: Ember.observer('forceTouch', function() {
		if(this.get('forceTouch.force')===0) {
			this.set('edited', false);
		}
	}),

	actions: {
		reset: function() {
			this.set('edited', true);
			this.set('resetVal', this.get('forceTouch.force'));
		}
	}
});
