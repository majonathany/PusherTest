<!DOCTYPE html>
<html>
  	<head>
    	<title>Redux basic example</title>
        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>pusher_client/styles.css">
        <link rel="shortcut icon" href="">

    </head>
  	<body>


		<input id="initializePusher" type="button" value="Initialize Pusher">

		<input id="generateTestEvent" type="button" value="Ping Server to Produce Channel Event">

		<input id="makeEntry" type="button" value="Get Staff Id">

        <div id="output"></div>

        <script src="<?php echo base_url(); ?>pusher_client/polyfill.js"></script>

        <script src="<?php echo base_url(); ?>pusher_client/libs/pusher.min.js"></script>
        <script src="<?php echo base_url(); ?>pusher_client/libs/redux.js"></script>
        <script src="<?php echo base_url(); ?>pusher_client/libs/redux-saga.umd.js"></script>
        <script src="<?php echo base_url(); ?>pusher_client/helpers.js"></script>


		<script src="<?php echo base_url(); ?>pusher_client/actionTypes.js"></script>
		<script src="<?php echo base_url(); ?>pusher_client/actions.js"></script>
        <script src="<?php echo base_url(); ?>pusher_client/sagas.js"></script>
        <script src="<?php echo base_url(); ?>pusher_client/reducers.js"></script>
        <script src="<?php echo base_url(); ?>pusher_client/main.js"></script>
        <script>


        </script>
  	</body>
</html>
