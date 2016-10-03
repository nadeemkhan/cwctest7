var apiKey = '45268642';
var sessionId = '2_MX40NTI2ODY0Mn5-MTQ3Mzc2NDE2Mzk4NX5WMjVwY3dFRWZEbWFLOGxBM1oyczhZSVR-fg';
var token = 'T1==cGFydG5lcl9pZD00NTI2ODY0MiZzaWc9ZmNiNWVkODhhMmZiMTM2NjNmZTdkNWI0YjIzZjRhNTJhNDk3NTA2MzpzZXNzaW9uX2lkPTJfTVg0ME5USTJPRFkwTW41LU1UUTNNemMyTkRFMk16azROWDVXTWpWd1kzZEZSV1pFYldGTE9HeEJNMW95Y3poWlNWUi1mZyZjcmVhdGVfdGltZT0xNDczNzY0MTk1Jm5vbmNlPTAuMzA5ODE1MjczODUzMDE4OSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNDc2MzU2MTky';

$(document).ready(function() {
  // Make an Ajax request to get the OpenTok API key, session ID, and token from the server
    
    alert(SAMPLE_SERVER_BASE_URL);
  $.get(SAMPLE_SERVER_BASE_URL + '/session', function(res) {
    apiKey = res.apiKey;
    sessionId = res.sessionId;
    token = res.token;

    initializeSession();
  });
});

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    });
  });

  session.on('sessionDisconnected', function(event) {
    console.log('You were disconnected from the session.', event.reason);
  });

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (!error) {
      var publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      });

      session.publish(publisher);
    } else {
      console.log('There was an error connecting to the session: ', error.code, error.message);
    }
  });
}
