<!DOCTYPE html>
<html>
  	<head>
    	<title>Redux basic example</title>
        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>pusher_client/styles.css">
        <link rel="shortcut icon" href="">
        <style>
            #buttons
            {
                display: flex;
                align-items: center;
                justify-content: space-between;

                height: 30rem;
                width: 20rem;
            }
            div.container
            {
                background-color: blue;
                width: 20rem;
                height: 30rem;
                border: 1px solid black;
            }
        </style>
    </head>
  	<body>

        <div id="buttons">
            <input id="initializePusher" type="button" value="Initialize Pusher">

            <input id="generateTestEvent" type="button" value="Ping Server to Produce Channel Event">

            <input id="makeEntry" type="button" value="Get Staff Id">
        </div>

        <div class="container" style="display: flex;">
            <ul id="output" style="block">

            </ul>
            <div id="sessionToken"></div>
        </div>

        <script type="module" src="<?php echo base_url(); ?>dist/bundle.js"></script>
  	</body>
</html>
