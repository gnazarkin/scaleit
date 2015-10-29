import Ember from 'ember';

export default Ember.Controller.extend(
	Ember.Evented, {
	resetVal: 0,

	actions: {
		// TODO Make reset work
		reset: function() {
			ForceTouch.getForceTouchData(function (ForceTouchData){
				console.log(ForceTouchData);
				// console.log(ForceTouchData.touches[0].force);
				// this.set('weight', this.get('weight') - (ForceTouchData.touches[0].force * 412));
			});
		}
	}
});
