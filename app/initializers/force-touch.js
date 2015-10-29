export function initialize(container, application) {
  application.deferReadiness();
  document.addEventListener("deviceready", onDeviceReady , false);
  function onDeviceReady() {
    console.log(device.cordova);
    // on cordova start, asks plugin continuosly for ForceTouchData
    setInterval(getForceTouchData, 15); // 15? => 1000ms/15 = ~60fps;
   
    // getForceTouchData Method
    function getForceTouchData()
    {
      application.advanceReadiness();
      ForceTouch.getForceTouchData(function (ForceTouchData)
      {
        // checking if device allows ForceTouch interaction
        var forceTouchCapability = '';
        switch(ForceTouchData.forceTouchCapability)
        {
          case '0':
            forceTouchCapability = 'Unknown';
          break;
          case '1':
            forceTouchCapability = 'Unavailable';
          break;
          case '2':
            forceTouchCapability = 'Available';
          break;
        }

        document.getElementById('forceTouchCapability').innerHTML = forceTouchCapability;
        if(ForceTouchData.touches[0])
        { 
          // setting output values for first Touch Point at index:0 -> "ForceTouchData.touches[0]"
          document.getElementById('tapCount').innerHTML = ForceTouchData.touches[0].tapCount;
          document.getElementById('timestamp').innerHTML = ForceTouchData.touches[0].timestamp;
          document.getElementById('phase').innerHTML = ForceTouchData.touches[0].phase;
          document.getElementById('force').innerHTML = ForceTouchData.touches[0].force * 412;
          document.getElementById('maximumPossibleForce').innerHTML = ForceTouchData.touches[0].maximumPossibleForce;

          var force = parseFloat(ForceTouchData.touches[0].force);
          // checking if No Touch or StandardTouch or Force Touch
          if(ForceTouchData.touches[0].tapCount == 0 && force == 0.0)
            document.getElementById('touchType').innerHTML = 'No Touch';
          else
          if((ForceTouchData.touches[0].tapCount > 0 && force == 0.0) || (force > 0.0 && force < 0.08))
            document.getElementById('touchType').innerHTML = 'Standard Touch';
          else
          if(force > 0.08)
            document.getElementById('touchType').innerHTML = 'Force Touch';

          // printing Touch Point position coordinates
          console.log("x: " + ForceTouchData.touches[0].position.x + " ; " + "y: " + ForceTouchData.touches[0].position.y);
        }
        else
        {
          // no Touch Point available -> resetting output values
          document.getElementById('tapCount').innerHTML = '0';
          document.getElementById('timestamp').innerHTML = '0.000000';
          document.getElementById('phase').innerHTML = '0';
          document.getElementById('force').innerHTML = '0.000000';
          document.getElementById('maximumPossibleForce').innerHTML = '0.000000';
          document.getElementById('touchType').innerHTML = 'No Touch';
        }
        // printing ForceTouchData output for each Touch Point available on screen
        console.log(JSON.stringify(ForceTouchData.touches));
      });
    }
  }
}

export default {
  name: 'force-touch',
  initialize: initialize
};
